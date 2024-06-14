import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CartService } from './cart.service';
import { BadRequestException } from '@nestjs/common';
import {
  AddItemToCartDto,
  AddItemToWishlistDto,
  AddressDto,
  AddressUpdateDto,
  FetchCartDto,
  FetchWishlistDto,
  RemoveItemFromCartDto,
  UpdateItemQuantityDto,
} from './dto/cart.dto';
import { Address, Cart, CartSettings, Wishlist } from './types/cart.types';
@Resolver('Cart')
export class CartResolver {
  constructor(private readonly cartService: CartService) {}

  @Mutation(() => Cart)
  async AddItemToCartDto(
    @Args('addItemToCartDto') addItemToCartDto: AddItemToCartDto,
    @Context() context: { res: Response }
  ): Promise<Cart> {
    let cart: any = await this.cartService.fetchMyCart(addItemToCartDto.user);
    if (!cart) {
      cart = await this.cartService.createCart({
        user: addItemToCartDto.user,
      });
    } else {
      cart = await this.cartService.addItemToCart(addItemToCartDto);
    }
    return cart;
  }

  @Mutation(() => Cart)
  async removeItemFromCart(
    @Args('removeItemFromCartDto') removeItemFromCartDto: RemoveItemFromCartDto
  ) {
    await this.cartService.removeItemFromCart({
      item: removeItemFromCartDto.item,
      user: removeItemFromCartDto.user,
    });
    let cart: any = await this.cartService.fetchMyCart(
      removeItemFromCartDto.user
    );
    return cart;
  }

  @Mutation(() => Wishlist)
  async wishlistItem(
    @Args('wishlistItem') addItemToWishlistDto: AddItemToWishlistDto
  ) {
    let wishlist: any = await this.cartService.fetchMyWishlist(
      addItemToWishlistDto.user
    );
    if (!wishlist) {
      wishlist = await this.cartService.createWishlist(
        addItemToWishlistDto.user
      );
    } else {
      wishlist = await this.cartService.addItemToWishlist(addItemToWishlistDto);
    }
    return wishlist;
  }

  @Mutation(() => Cart)
  async updateItemQuantity(
    @Args('updateItemQuantity') updateItemQuantityDto: UpdateItemQuantityDto
  ) {
    await this.cartService.updateItemQuantity(updateItemQuantityDto);
    let cart: any = await this.cartService.fetchMyCart(
      updateItemQuantityDto.user
    );
    return cart;
  }

  @Query(() => Cart)
  async fetchMyCart(
    @Args('fetchMyCart') fetchMycart: FetchCartDto,
    @Context() context: { req: any }
  ) {
    try{
      const cart = await this.cartService.fetchMyCartDetails(fetchMycart.user);
      return cart;
    } catch(error){
      console.error("Failed to fetch cart:", error);
      throw new BadRequestException("Failed to fetch cart", error.message);
    }
  }

  @Query(() => CartSettings)
  async fetchCartSettings() {
    const data = await this.cartService.fetchCartSettings();
    return data;
  }

  @Query(() => Wishlist)
  async getWishlist(@Args('fetchWishlistDto') fetchMycart: FetchWishlistDto) {
    const data = await this.cartService.fetchMyWishlist(fetchMycart.user);
    return data;
  }


  // Address CRUD

  @Mutation(() => Address)
  async addAddress(@Args('userId') userId: string,
  @Args('address') addressDto: AddressDto) 
  {
    try {
      return this.cartService.addAddress(userId,addressDto)
    } catch (error) {
      throw new BadRequestException(error.response?.message)
    }
  }

  @Mutation(() => Address)
  async updateAddress(
    @Args('addressUpdateDto') addressUpdateDto: AddressUpdateDto,
    // @Args('userId') userId: string
  ){
    try {
      return await this.cartService.updateAddress(
        // userId,
        addressUpdateDto.id,
        addressUpdateDto
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Mutation(() => Address)
  async deleteAddress(
    @Args('userId') userId: string,
    @Args('addressId') addressId: string,
  ) {
    return this.cartService.deleteAddress(userId,addressId);
  }

  @Query(() => [Address])
  async listAddresses(@Args('userId') userId: string) {
    return this.cartService.listAddresses(userId);
  }
}