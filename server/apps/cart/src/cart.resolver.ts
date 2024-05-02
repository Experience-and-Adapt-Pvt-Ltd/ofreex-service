import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CartService } from './cart.service';
import { BadRequestException } from '@nestjs/common';
import {
  AddItemToCartDto,
  FetchCartDto,
  RemoveItemFromCartDto,
  UpdateItemQuantityDto,
  WishlistItemDto,
} from './dto/cart.dto';
import { Cart, CartSettings } from './types/cart.types';
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
    console.log(removeItemFromCartDto);
    await this.cartService.removeItemFromCart({
      item: removeItemFromCartDto.item,
      user: removeItemFromCartDto.user,
    });
    let cart: any = await this.cartService.fetchMyCart(
      removeItemFromCartDto.user
    );
    return cart;
  }

  @Mutation(() => Cart)
  async wishlistItem(@Args('wishlistItem') wishlistItem: WishlistItemDto) {
    await this.cartService.removeItemFromCart({
      item: wishlistItem.listingId,
      user: wishlistItem.user,
    });
    let cart: any = await this.cartService.fetchMyCart(wishlistItem.user);
    return cart;
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
    const cart = await this.cartService.fetchMyCartDetails(fetchMycart.user);
    return cart;
  }

  @Query(() => CartSettings)
  async fetchCartSettings() {
    const data = await this.cartService.fetchCartSettings();
    return data;
  }
}
