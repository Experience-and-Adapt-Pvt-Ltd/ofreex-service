import { Injectable, NotFoundException, BadRequestException, HttpStatus, Logger } from '@nestjs/common';
import { PrismaClient, Listing as PrismaListing, Category as PrismaCategory } from '../node_modules/.prisma/client';
import { Category, GetBasicUsersResponse, GetFavIdsResponse, GetPremiumUsersResponse, Listing, SubCategory } from './interface/listings.interface';
import { CreateCategoryDto, CreateListingDto, CreateSubCategoryDto, UpdateCategoryDto } from './dto/create_listing.dto';
import { HttpModule, HttpService } from '@nestjs/axios';
import { LimitedUserData } from './types/listings.types';

@Injectable()
export class ListingsService {
  constructor(private readonly prisma: PrismaClient, private readonly httpService: HttpService) { }
  //////////////////////////////////Category//////////////////////////////////////////////////
  async getCategories(): Promise<Category[]> {
    try {
      const categories = await this.prisma.category.findMany({
        include: {
          subCategories: true
        }
      });
      return categories.map(category => this.convertToCategoryDto(category));
    } catch (error) {
      throw new BadRequestException(`Could not fetch categories: ${error.message}`);
    }
  }

  // Creates a new category in the database using the provided CreateCategoryDto
  async createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
    try {
      const createdCategory = await this.prisma.category.create({
        data: {
          label: createCategoryDto.label,
          description: createCategoryDto.description,
          icon: createCategoryDto.icon,
          subCategories: {
            create: createCategoryDto.subCategories // Assuming subCategories is part of CreateCategoryDto
          }
        },
        include: {
          subCategories: true
        }
      });
      return this.convertToCategoryDto(createdCategory);
    } catch (error) {
      throw new BadRequestException(`Could not create Category: ${error.message}`);
    }
  }

  // Updates an existing category identified by its label with the provided update data.
  async updateCategory(label: string, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    try {
        const categoryToUpdate = await this.prisma.category.findUnique({ where: { label } });
        if (!categoryToUpdate) {
            throw new NotFoundException(`Category with label ${label} not found`);
        }

        const updatedCategory = await this.prisma.category.update({
            where: { label },
            data: {
                ...updateCategoryDto,
                subCategories: updateCategoryDto.subCategories ? {
                    update: updateCategoryDto.subCategories.map(subCat => ({
                        where: { id: subCat.id },
                        data: subCat
                    }))
                } : undefined
            },
            include: {
                subCategories: true
            }
        });

        return this.convertToCategoryDto(updatedCategory);
    } catch (error) {
        throw new BadRequestException(`Could not update category: ${error.message}`);
    }
}

  //for removing category
  async removeCategory(label: string): Promise<void> {
    try {
      const category = await this.prisma.category.findUnique({ where: { label } });

      if (!category) {
        throw new NotFoundException(`Category with label ${label} not found`);
      }

      await this.prisma.subCategory.deleteMany({
        where: { categoryId: category.id }
      });
    

      await this.prisma.category.delete({ where: { label } });
    } catch (error) {
      throw new BadRequestException(`Could not delete category: ${error.message}`);
    }
  }

  //  Fetches all listings from the database and converts them into Listing DTO
  async findAll(): Promise<Listing[]> {
    try {
      const listings: PrismaListing[] = await this.prisma.listing.findMany();
      return listings.map(this.convertToDto);
    } catch (error) {
      throw new BadRequestException(`Could not fetch listings: ${error.message}`);
    }
  }

  //Fetches a single listing identified by its ID from the database and converts it into a Listing DTO
  async findOne(id: string): Promise<Listing> {
    try {
      const listing: PrismaListing | null = await this.prisma.listing.findUnique({
        where: { id },
      });

      if (!listing) {
        throw new NotFoundException(`Listing with ID ${id} not found`);
      }

      return this.convertToDto(listing);
    } catch (error) {
      throw new BadRequestException(`Could not fetch listing: ${error.message}`);
    }
  }

  async create(createListingDto: CreateListingDto): Promise<Listing> {
    try {
      Logger.log('In create method');
     // Ensure categoryLabel is defined before proceeding
     if (!createListingDto.categoryLabel) {
      throw new BadRequestException('Category label is undefined');
  }

       const category = await this.prisma.category.findUnique({
        where: { label: createListingDto.categoryLabel }
    });

      console.log(`category ID: ${category?.id}`);
      if (!category) {
        throw new BadRequestException(`Category with ID ${createListingDto.categoryLabel} does not exist.`);
      }
  
      console.log("Creating listing with data:", createListingDto);
  
      const createdListing = await this.prisma.listing.create({
        data: {
          title: createListingDto.title,
          description: createListingDto.description,
          categoryId: category.id,
          subCategoryId: createListingDto.subCategoryId,
          condition: createListingDto.condition,
          price: createListingDto.price,
          imageUrls: createListingDto.imageUrls,
          userId: createListingDto.userId,
          postedAt: new Date(),
          rating: createListingDto.rating,
          discount: createListingDto.discount,
          delivery: createListingDto.delivery,
          quantity: createListingDto.quantity,
        },
      });
      return this.convertToDto(createdListing);
    } catch (error) {
      console.error("Failed to create listing:", error);
      throw new BadRequestException(`Could not create listing: ${error.message}`);
    }
  }

  //to update category
  async update(id: string, updateListingDto: Partial<CreateListingDto>): Promise<Listing> {
    try {
      const listingToUpdate: PrismaListing | null = await this.prisma.listing.findUnique({ where: { id } });

      if (!listingToUpdate) {
        throw new NotFoundException(`Listing with ID ${id} not found`);
      }

      const updatedListing: PrismaListing = await this.prisma.listing.update({ where: { id }, data: updateListingDto });

      return this.convertToDto(updatedListing);
    } catch (error) {
      throw new BadRequestException(`Could not update listing: ${error.message}`);
    }
  }

   // Creates a new subcategory within a category
   async createSubCategory(createSubCategoryDto: CreateSubCategoryDto): Promise<SubCategory> {
    try {
      const createdSubCategory = await this.prisma.subCategory.create({
        data: {
          label: createSubCategoryDto.label,
          description: createSubCategoryDto.description,
          categoryId: createSubCategoryDto.categoryId,
        },
      });
      return this.convertToSubCategoryDto(createdSubCategory);
    } catch (error) {
      throw new BadRequestException(`Could not create SubCategory: ${error.message}`);
    }
  }

  private convertToSubCategoryDto(subCategory: SubCategory): SubCategory {
    return {
      id: subCategory.id,
      label: subCategory.label,
      description: subCategory.description || "", 
      categoryId: subCategory.categoryId
    };
  }
  //to get SubCategory
  async getSubCategoriesByCategory(categoryLabel: string): Promise<SubCategory[]> {
    try {
      const subCategories = await this.prisma.category.findUnique({
        where: { label: categoryLabel },
        include: { subCategories: true }
      });
  
      if (!subCategories) {
        throw new BadRequestException(`Category with label ${categoryLabel} not found`);
      }
      return subCategories.subCategories;
    } catch (error) {
      throw new BadRequestException(`Failed to fetch subcategories: ${error.message}`);
    }
  }

  //to remove listing
  async remove(id: string): Promise<void> {
    try {
      const listingToDelete: PrismaListing | null = await this.prisma.listing.findUnique({ where: { id } });

      if (!listingToDelete) {
        throw new NotFoundException(`Listing with ID ${id} not found`);
      }

      await this.prisma.listing.delete({ where: { id } });
    } catch (error) {
      throw new BadRequestException(`Could not delete listing: ${error.message}`);
    }
  }

  //for flitering out category
  async findListingsByCategory(categoryId: string, subCategoryId?: string): Promise<Listing[]> {
    try {
      if (!categoryId) {
        throw new BadRequestException('Category ID is required');
      }
      const listings = await this.prisma.listing.findMany({
        where: {
          categoryId,
          ...(subCategoryId && { subCategoryId }) // No need to reset the filter
        }
      });
      return listings.map(this.convertToDto);
    } catch (error) {
      throw new BadRequestException(`Could not fetch listings: ${error.message}`);
    }
  }

  //to fetch premium users when user is logged out
  async getPremiumUsers(): Promise<LimitedUserData[]> {
    try {
      Logger.log('fetching premium users in service:');
      const { data } = await this.httpService
        .post<GetPremiumUsersResponse>("http://localhost:4001/graphql", {
          query: `query GetPremiumUsers {
          getPremiumUsers {
            id
            isPremium
          }
        }
        `,
        })
        .toPromise();
      Logger.log('fetching premium users in service22:', data.data.getPremiumUsers);
      const getPremiumUsers = data.data.getPremiumUsers;
      return getPremiumUsers;
    } catch (error) {
      throw new BadRequestException(`Could not fetch premium listings: ${error.message}`);
    }
  }

  //to get basic users who dont have premium purchase
  async getBasicUsers(): Promise<LimitedUserData[]> {
    try {
      Logger.log('fetching basic users in service:');
      const { data } = await this.httpService
        .post<GetBasicUsersResponse>("http://localhost:4003/graphql", {
          query: `query GetSeller {
          getSeller{
            id
          }
        }
        `,
        })
        .toPromise();
      Logger.log('fetching basic users in service22:', data.data.getSeller);
      const getBasicUsers = data.data.getSeller;
      return getBasicUsers;
    } catch (error) {
      throw new BadRequestException(`Could not fetch premium listings: ${error.message}`);
    }
  }

  //to mark it fovourites
  async getFavoriteIds(id: string): Promise<string[]> {
    try {
      Logger.log('fetching favIds in service:');
      const { data } = await this.httpService
        .post<GetFavIdsResponse>("http://localhost:4001/graphql", {
          query: `query getFavoriteIds {
                    getFavoriteIds(userId: "${id}")
                  }        `,
        })
        .toPromise();
      Logger.log('fetching favIds in service22:', data.data.getFavoriteIds);
      const favIds = data.data.getFavoriteIds;
      return favIds;
    } catch (error) {
      throw new BadRequestException(`Could not fetch premium listings: ${error.message}`);
    }
  }

  //to get favouriteListings
  async getFavoriteListings(id: string): Promise<Listing[]> {
    try {
      const favIdsObjs = await this.getFavoriteIds(id);
      const favIds = favIdsObjs.map((user) => user);

      const userListings = await this.prisma.listing.findMany({
        where: { id: { in: favIds } },
      });
      Logger.log(`Listing ${userListings.length} found`);
      Logger.log(`Listings are: ${userListings}`);
      const filteredListings = userListings;
      // const filteredListings = userListings;
      // Logger.log(`${limit}`)
      filteredListings.sort((a, b) => b.rating - a.rating);
      const limitedListings = filteredListings;
      Logger.log(`${filteredListings.length}`)
      return limitedListings;
    } catch (error) {
      throw new BadRequestException(`Could not fetch fav listings: ${error.message}`);
    }
  }

  async getPremiumListings(limit = 5, category?: string, subCategory?: string): Promise<Listing[]> {
    try {
      const premiumUsers = await this.getPremiumUsers();
      const premiumUserIds = premiumUsers.map((user) => user.id);

      const userListings = await this.prisma.listing.findMany({
        where: { userId: { in: premiumUserIds } },
      });
      Logger.log(`Listing ${userListings.length} found`);
      Logger.log(`Listings are: ${userListings}`);
      const filteredListings = category && subCategory
        ? userListings.filter(
          (listing) => listing.categoryId === category && listing.subCategoryId === subCategory
        )
        : userListings;
      // const filteredListings = userListings;
      // Logger.log(`${limit}`)
      filteredListings.sort((a, b) => b.rating - a.rating);
      const limitedListings = filteredListings.slice(0, limit);
      Logger.log(`${filteredListings.length}`)
      return limitedListings;
    } catch (error) {
      throw new BadRequestException(`Could not fetch premium listings: ${error.message}`);
    }
  }

  //to fetch all Listing
  async getListings(limit = 5, category?: string, subCategory?: string): Promise<Listing[]> {
    try {
      const basicUsers = await this.getBasicUsers();
      const basicUserIds = basicUsers.map((user) => user.id);

      const userListings = await this.prisma.listing.findMany({
        where: { userId: { in: basicUserIds } },
      });
      Logger.log(`Listing ${userListings.length} found`);
      Logger.log(`Listings are: ${userListings}`);
      const filteredListings = category && subCategory
        ? userListings.filter(
          (listing) => listing.categoryId === category && listing.subCategoryId === subCategory
        )
        : userListings;
      // Sort and limit the listings as necessary
      if (limit != 1 && filteredListings.length != 1)
        filteredListings.sort((a, b) => b.rating - a.rating);
      const limitedListings = filteredListings.slice(0, limit);
      Logger.log(`filtered listings = ${filteredListings.length}`);
      // Convert each item to match the Listing type
      return filteredListings.map(this.convertToDto);
    } catch (error) {
      throw new BadRequestException(`Could not fetch basic listings: ${error.message}`);
    }
  }
  async getListingsByUserId(userId: string): Promise<Listing[]> {
    try {
      //const basicUsers = await this.getBasicUsers();
      //const basicUsersIds = basicUsers.map((user) => user.id);

      const userListings = await this.prisma.listing.findMany({
        where: { userId },
      });
      Logger.log(`Listing ${userListings.length} found`);
      Logger.log(`Listings are: ${userListings}`);
      // Convert each PrismaListing object to Listing object
      const limitedListings = userListings.map(this.convertToDto);
      Logger.log(`userListings = ${userListings.length}`);
      Logger.log(`filtered listings = ${limitedListings.length}`);
      return limitedListings;
    } catch (error) {
      throw new BadRequestException(`Could not fetch listings By User ID: ${error.message}`);
    }
  }

  private convertToDto(listing: { id: string; title: string; description: string; categoryId: string; subCategoryId?: string; condition: string; price: number; imageUrls: string[]; userId: string; postedAt: Date; rating?: number; discount?: number; delivery: string; quantity: number }): Listing {
    return {
      id: listing.id,
      title: listing.title,
      description: listing.description,
      categoryId: listing.categoryId,
      subCategoryId: listing.subCategoryId,
      condition: listing.condition,
      price: listing.price,
      imageUrls: listing.imageUrls,
      userId: listing.userId,
      postedAt: listing.postedAt,
      rating: listing.rating,
      discount: listing.discount,
      delivery: listing.delivery,
      quantity: listing.quantity,
    };
  }
  private convertToCategoryDto(category: PrismaCategory & { subCategories?: SubCategory[] }): Category {
    return {
      id: category.id,
      label: category.label,
      description: category.description,
      icon: category.icon,
      visible: category.visible,
      subCategories: category.subCategories ? category.subCategories.map(subCategory => this.convertToSubCategoryDto(subCategory)) : []
    };
  }

  //To Search Item 
  async searchListings(query: string, category?: string): Promise<Listing[]> {
    try {
      
      const searchResults = await this.prisma.listing.findMany({
        where: {
          OR: [
            { title: { contains: query, mode: 'insensitive' }},
            { description: { contains: query, mode: 'insensitive' }}
          ],
          ...(category && { categoryId: category })
        }
      });
      return searchResults.map(this.convertToDto);
    } catch (error) {
      throw new BadRequestException(`Search failed: ${error.message}`);
    }
  }

  //Get listing of that category
  async getListingsByCategory(categoryId: string): Promise<Listing[]>{
    try{
      const category  = await this.prisma.listing.findFirst({
        where: { categoryId }
      })
      //Check wether category exist or not
     if(!category){
      throw new BadRequestException(`No Listing Found for this category`)
     }

     const listings = await this.prisma.listing.findMany({
       where: { categoryId },
     })
     return listings.map(this.convertToDto);
    } catch(error) {
     throw new BadRequestException(`Could not fetch listings for category ${categoryId}: ${error.message}`);
    }
 }
}

interface UserPartial {
  id: string;
  name: string;
}

interface User {
  id: string;
  isPremium: boolean;
}