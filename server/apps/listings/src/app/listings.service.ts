import { Injectable, NotFoundException, BadRequestException, HttpStatus } from '@nestjs/common';
import { PrismaClient, Listing as PrismaListing } from '@prisma/client';
import { Listing } from './interface/listings.interface';
import { CreateListingDto } from './dto/create_listing.dto';
import { HttpModule } from '@nestjs/axios';


@Injectable()
export class ListingsService {
  constructor(private readonly prisma: PrismaClient, private readonly http: HttpClient) { }


  async findAll(): Promise<Listing[]> {
    try {
      const listings: PrismaListing[] = await this.prisma.listing.findMany();
      return listings.map(this.convertToDto);
    } catch (error) {
      throw new BadRequestException(`Could not fetch listings: ${error.message}`);
    }
  }

  async findOne(id: number): Promise<Listing> {
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
        data: createListingDto,
      });
      return this.convertToDto(createdListing);
    } catch (error) {
      throw new BadRequestException(`Could not create listing: ${error.message}`);
    }
  }

  async update(id: number, updateListingDto: Partial<CreateListingDto>): Promise<Listing> {
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

  async remove(id: number): Promise<void> {
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
  async getPremiumListings(limit: number = 5, category?: string, subCategory?: string): Promise<Listing[]> {
    try {
      const premiumUsers = await this.http.get<User[]>(`Api Endpoint`);

      const premiumListings: Listing[] = [];
      for (const user of premiumUsers) {
        const userListings = await this.prisma.listing.findMany({
          where: { userId: user.id },
        });

        const filteredListings = category && subCategory
          ? userListings.filter(
            (listing) => listing.category === category && listing.subCategory === subCategory
          )
          : userListings;

        premiumListings.push(...filteredListings);
      }

      premiumListings.sort((a, b) => b.rating - a.rating);

      return premiumListings.slice(0, limit);
    } catch (error) {
      throw new BadRequestException(`Could not fetch premium listings: ${error.message}`);
    }
  }


  async getUserData(userId: string): Promise<UserPartial> {
    try {
      const response = await this.http.get<User>(
        `http://localhost:3000/api/v1/users/${userId}`
      );
      return { id: response.data.id, name: response.data.name };
    } catch (error) {
      if (error.response.status === HttpStatus.NOT_FOUND) {
        return null;
      }
      throw error;
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