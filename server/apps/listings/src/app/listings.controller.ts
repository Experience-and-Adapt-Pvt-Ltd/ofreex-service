import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  InternalServerErrorException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { ListingsService } from './listings.service';
import { Listing } from './interface/listings.interface';
import { CreateListingDto } from './dto/create_listing.dto';
import { LimitedUserData } from './types/listings.types';
import { Logger } from '@nestjs/common';

@Controller('listings')
export class ListingsController {
  constructor(private readonly listingService: ListingsService) { }
  @Post('getListings')
  //get limit parameter from body
  async getListings(@Body() data): Promise<Listing[]> {
    try {
      return await this.listingService.getListings(data.limit);
    } catch (error) {
      throw new BadRequestException(`Could not fetch premium listings: ${error.message}`);
    }
  }

  @Post('getListingsByUserId')
  //get limit parameter from body
  async getListingsByUserId(@Body() data): Promise<Listing[]> {
    try {
      return await this.listingService.getListingsByUserId(data.userId);
    } catch (error) {
      throw new BadRequestException(`Could not fetch premium listings: ${error.message}`);
    }
  }


  @Post('premium')
  //get limit parameter from body
  async getPremiumListings(@Body() data): Promise<Listing[]> {
    try {
      Logger.log(`Limit ${(data.limit)} found`);
      const listings = await this.listingService.getPremiumListings(data.limit);
      Logger.log(`Premium Listing ${listings.length} found`);
      Logger.log(`Premium Listings are: ${listings}`);
      return listings;
    } catch (error) {
      throw new BadRequestException(`Could not fetch premium listings: ${error.message}`);
    }
  }
  @Get('/premiumUsers')
  async getPremiumUsers(): Promise<LimitedUserData[]> {
    try {
      Logger.log("Fetching premium users");
      const users = this.listingService.getPremiumUsers();
      Logger.log("Users = ", users);
      return users;
    } catch (error) {
      Logger.log(`Could not fetch premium users: ${error.message}`);
    }
  }
  @Get('/')
  greet() {
    return 'Hello! Welcome to the Listings API.';
  }
  @Get()

  async findAll(): Promise<Listing[]> {
    try {
      return this.listingService.findAll();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Listing> {
    try {
      return this.listingService.findOne(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  @Post()
  async create(@Body() createListingDto: CreateListingDto): Promise<Listing> {
    try {
      return this.listingService.create(createListingDto);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  @Patch(':id')
  async update(@Param('id') idStr: string, @Body() updateListingDto: Partial<CreateListingDto>): Promise<Listing> {
    try {
      return this.listingService.update(idStr, updateListingDto);
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    try {
      await this.listingService.remove(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  @Get('category/:category')
  async findListingsByCategory(@Param('category') category: string, @Query('subCategory') subCategory?: string, @Query('limit') limit: number = 10): Promise<Listing[]> {
    try {
      return this.listingService.findListingsByCategory(category, subCategory, limit);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }


}
