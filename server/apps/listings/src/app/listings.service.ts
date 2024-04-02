import { Injectable, NotFoundException, BadRequestException, HttpStatus, Logger } from '@nestjs/common';
import { PrismaClient, Listing as PrismaListing } from '../../node_modules/.prisma/client';
import { GetBasicUsersResponse, GetPremiumUsersResponse, Listing } from './interface/listings.interface';
import { CreateListingDto } from './dto/create_listing.dto';
import { HttpModule, HttpService } from '@nestjs/axios';
import { LimitedUserData } from './types/listings.types';
import { catchError, firstValueFrom, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ListingsService {
  constructor(private readonly prisma: PrismaClient, private readonly httpService: HttpService) { }


  async findAll(): Promise<Listing[]> {
    try {
      const listings: PrismaListing[] = await this.prisma.listing.findMany();
      return listings.map(this.convertToDto);
    } catch (error) {
      throw new BadRequestException(`Could not fetch listings: ${error.message}`);
    }
  }

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
      const createdListing: PrismaListing = await this.prisma.listing.create({
        data: {
          title: createListingDto.title,
          description: createListingDto.description,
          category: createListingDto.category,
          subCategory: createListingDto.subCategory,
          condition: createListingDto.condition,
          price: createListingDto.price,
          city: createListingDto.city,
          state: createListingDto.state,
          imageUrls: createListingDto.imageUrls,
          userId: createListingDto.userId,
          postedAt: new Date(),
          rating: createListingDto.rating,
        },
      });
      return this.convertToDto(createdListing);
    } catch (error) {
      throw new BadRequestException(`Could not create listing: ${error.message}`);
    }
  }

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

  async findListingsByCategory(category: string, subCategory?: string, limit: number = 10): Promise<Listing[]> {
    try {
      if (!category) {
        throw new BadRequestException('Category is required');
      }

      if (isNaN(limit) || limit <= 0) {
        throw new BadRequestException('Limit must be a positive number');
      }

      let listingsQuery = {
        where: {
          category,
        },
        take: limit,
      };

      if (subCategory) {
        listingsQuery['where']['subCategory'] = subCategory;
      }

      const listings: PrismaListing[] = await this.prisma.listing.findMany(listingsQuery);
      return listings.map(this.convertToDto);
    } catch (error) {
      throw new BadRequestException(`Could not fetch listings: ${error.message}`);
    }
  }
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
  async getBasicUsers(): Promise<LimitedUserData[]> {
    try {
      Logger.log('fetching basic users in service:');
      const { data } = await this.httpService
        .post<GetBasicUsersResponse>("http://localhost:4001/graphql", {
          query: `query GetBasicUsers {
          getBasicUsers {
            id
            isPremium
          }
        }
        `,
        })
        .toPromise();
      Logger.log('fetching basic users in service22:', data.data.getBasicUsers);
      const getBasicUsers = data.data.getBasicUsers;
      return getBasicUsers;
    } catch (error) {
      throw new BadRequestException(`Could not fetch premium listings: ${error.message}`);
    }
  }
  async getPremiumListings(limit: number = 5, category?: string, subCategory?: string): Promise<Listing[]> {
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
          (listing) => listing.category === category && listing.subCategory === subCategory
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
  async getListings(limit: number = 5, category?: string, subCategory?: string): Promise<Listing[]> {
    try {
      const basicUsers = await this.getBasicUsers();
      const basicUsersIds = basicUsers.map((user) => user.id);

      const userListings = await this.prisma.listing.findMany({
        where: { userId: { in: basicUsersIds } },
      });
      Logger.log(`Listing ${userListings.length} found`);
      Logger.log(`Listings are: ${userListings}`);
      const filteredListings = category && subCategory
        ? userListings.filter(
          (listing) => listing.category === category && listing.subCategory === subCategory
        )
        : userListings;
      // const filteredListings = userListings;
      Logger.log(`userListings = ${userListings.length}`);
      if (limit != 1 && filteredListings.length != 1)
        filteredListings.sort((a, b) => b.rating - a.rating);
      const limitedListings = filteredListings.slice(0, limit);
      Logger.log(`filtered listings = ${filteredListings.length}`)
      return limitedListings;
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
      const filteredListings = userListings;
      // const filteredListings = userListings;
      Logger.log(`userListings = ${userListings.length}`);
      const limitedListings = filteredListings;
      Logger.log(`filtered listings = ${filteredListings.length}`)
      return limitedListings;
    } catch (error) {
      throw new BadRequestException(`Could not fetch listings By User ID: ${error.message}`);
    }
  }

  private convertToDto(listing: PrismaListing): Listing {
    return {
      id: listing.id,
      title: listing.title,
      description: listing.description,
      category: listing.category,
      subCategory: listing.subCategory,
      condition: listing.condition,
      price: listing.price,
      city: listing.city,
      state: listing.state,
      imageUrls: listing.imageUrls,
      userId: listing.userId,
      postedAt: listing.postedAt,
      rating: listing.rating,
    };
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