import { Injectable } from '@nestjs/common';
import { PrismaClient } from '../node_modules/.prisma/client';
import { ConfigService } from '@nestjs/config';
import {
  AddItemToCartDto,
  CreateCartDto,
  RemoveItemFromCartDto,
  UpdateItemQuantityDto,
  WishlistItemDto,
} from './dto/cart.dto';
// import { Cart } from '.prisma/client';
import { Cart } from '../node_modules/.prisma/client';

@Injectable()
export class CartService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly configService: ConfigService
  ) {}

  async createCart(createCartDto: CreateCartDto) {
    const cart = await this.prisma.cart.create({
      data: {
        user: createCartDto.user,
      },
    });
    return cart;
  }

  async fetchMyCart(userId: string) {
    const cart = await this.prisma.cart.findFirst({
      where: {
        user: userId,
      },
      include: {
        items: true,
      },
    });
    return cart;
  }

  async fetchMyCartDetails(userId: string) {
    const cart = await this.prisma.cart.findFirst({
      where: {
        user: userId,
      },
      include: {
        items: true,
      },
    });
    return cart;
  }

  async addItemToCart(addItemToCartDto: AddItemToCartDto) {
    const cart = await this.fetchMyCart(addItemToCartDto.user);
    const existingItem = cart.items.find(
      (item) => item.listingId === addItemToCartDto.item
    );
    if (existingItem) {
      // If the item already exists in the cart, update its quantity
      await this.prisma.item.update({
        where: {
          id: existingItem.id,
        },
        data: {
          quantity: existingItem.quantity + addItemToCartDto.quantity,
        },
      });
      return await this.prisma.cart.update({
        where: {
          id: cart.id,
        },
        data: {
          totalAmount:
            cart.totalAmount +
            addItemToCartDto.price * addItemToCartDto.quantity,
        },
      });
    } else {
      // If the item is not already in the cart, add it
      await this.prisma.item.create({
        data: {
          seller: addItemToCartDto.seller,
          price: addItemToCartDto.price,
          listingId: addItemToCartDto.item.toString(),
          quantity: addItemToCartDto.quantity,
          cart: {
            connect: { id: cart.id }, // Connect the item to the cart
          },
        },
      });
      return await this.prisma.cart.update({
        where: {
          id: cart.id,
        },
        data: {
          totalAmount:
            cart.totalAmount +
            addItemToCartDto.price * addItemToCartDto.quantity,
          totalItem: cart.items.length + 1,
        },
      });
    }
  }

  async removeItemFromCart(removeItemFromCartDto: RemoveItemFromCartDto) {
    let cart: any = await this.fetchMyCart(removeItemFromCartDto.user);

    const existingItem = cart.items.find(
      (item) => item.id === removeItemFromCartDto.item.toString()
    );

    if (!existingItem) {
      throw new Error('Item not found in the cart');
    }

    await this.prisma.item.delete({
      where: {
        id: removeItemFromCartDto.item.toString(),
      },
    });

    cart = await this.prisma.cart.update({
      where: {
        id: cart.id,
      },
      data: {
        totalAmount:
          cart.totalAmount - existingItem.price * existingItem.quantity,
        totalItem: cart.totalItem - 1,
      },
    });
  }

  async fetchCartSettings() {
    return await this.prisma.settings.findFirst({
      where: {
        key: 'itemCount',
      },
    });
  }

  async wishlistItem(wishlistItemDto: WishlistItemDto) {
    let cart: any = await this.fetchMyCart(wishlistItemDto.user);

    const existingItem = cart.items.find(
      (item) => item.listingId === wishlistItemDto.listingId.toString()
    );

    if (!existingItem) {
      throw new Error('Item not found in the cart');
    }

    await this.prisma.item.delete({
      where: {
        id: existingItem.id,
      },
    });
    await this.prisma.wishlist.create({
      data: {
        listingId: existingItem.listingId,
        user: cart.user,
      },
    });
    cart = await this.prisma.cart.update({
      where: {
        id: cart.id,
      },
      data: {
        totalAmount:
          cart.totalAmount - existingItem.price * existingItem.quantity,
        totalItem: cart.totalItem - 1,
      },
    });
  }

  async updateItemQuantity(updateItemQuantityDto: UpdateItemQuantityDto) {
    let cart: any = await this.fetchMyCart(updateItemQuantityDto.user);

    const existingItem = cart.items.find(
      (item: any) => item.id === updateItemQuantityDto.itemId.toString()
    );

    if (!existingItem) {
      throw new Error('Item not found in the cart');
    }

    await this.prisma.item.update({
      where: {
        id: existingItem.id,
      },
      data: {
        quantity: updateItemQuantityDto.quantity,
      },
    });
    cart = await this.fetchMyCart(updateItemQuantityDto.user);
    const totalAmount = cart.items.reduce((total: any, e: any) => {
      total = total + e.quantity * e.price;
      return total;
    }, 0);
    console.log(totalAmount);
    cart = await this.prisma.cart.update({
      where: {
        id: cart.id,
      },
      data: {
        totalAmount: totalAmount,
      },
    });
  }
  // async placeOrderForCart() {}

  // async fetchMyOrders() {}
}
