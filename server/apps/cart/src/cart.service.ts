import { Injectable } from '@nestjs/common';
import { PrismaClient } from '../node_modules/.prisma/client';
import { ConfigService } from '@nestjs/config';
import {
  AddItemToCartDto,
  AddItemToWishlistDto,
  AddressDto,
  CreateCartDto,
  RemoveItemFromCartDto,
  UpdateItemQuantityDto,
} from './dto/cart.dto';
import { Address } from './types/cart.types';

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

  async fetchMyWishlist(userId: string) {
    const wishlist = await this.prisma.wishlist.findFirst({
      where: {
        user: userId,
      },
      include: {
        items: true,
      },
    });
    return wishlist;
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

    const existingItem = cart.items?.find(
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

  async updateItemQuantity(updateItemQuantityDto: UpdateItemQuantityDto) {
    let cart: any = await this.fetchMyCart(updateItemQuantityDto.user);

    const existingItem = cart.items?.find(
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
    cart = await this.prisma.cart.update({
      where: {
        id: cart.id,
      },
      data: {
        totalAmount: totalAmount,
      },
    });
  }

  async createWishlist(userId: string) {
    return this.prisma.wishlist.create({
      data: {
        user: userId,
      },
    });
  }

  async addItemToWishlist(addToWishlistDto: AddItemToWishlistDto) {
    // Check if the user already has a wishlist
    let wishlist: any = await this.prisma.wishlist.findUnique({
      where: {
        user: addToWishlistDto.user,
      },
      include: {
        items: true,
      },
    });
    this.removeItemFromCart({
      item: addToWishlistDto.item,
      user: addToWishlistDto.user,
    });
    if (!wishlist) {
      // If the user doesn't have a wishlist, create a new one
      wishlist = await this.prisma.wishlist.create({
        data: {
          user: addToWishlistDto.user,
          items: {
            create: [
              {
                listingId: addToWishlistDto.listingId,
                seller: addToWishlistDto.seller,
                quantity: 1,
                price: addToWishlistDto.price,
              },
            ],
          },
        },
      });
    } else {
      // If the user already has a wishlist, update it with the new item
      wishlist = await this.prisma.wishlist.update({
        where: {
          id: wishlist.id,
        },
        data: {
          items: {
            create: [
              {
                listingId: addToWishlistDto.listingId,
                seller: addToWishlistDto.seller,
                quantity: 1,
                price: addToWishlistDto.price,
              },
            ],
          },
        },
      });
    }

    return wishlist;
  }

  async addAddress(userId: string, addressDto: AddressDto) {
    // Check if the user already has addresses
    try{
      console.log(`Adding address for user ${userId}`, addressDto);
      const address = await this.prisma.address.findMany({
        where: {
          user: userId,
        },
      });
  
      let isDefaultSet = false;
  
      if (address.length === 0) {
        addressDto.defaultAddress = true;
        isDefaultSet = true;
      } else {
        if (addressDto.defaultAddress) {
          await this.prisma.address.updateMany({
            where: {
              user: userId,
              defaultAddress: true,
            },
            data: {
              defaultAddress: false,
            },
          });
          isDefaultSet = true;
        }
      }
  
      //create new Address
      const newAddress = await this.prisma.address.create({
        data: {
          user: userId,
          street: addressDto.street,
          city: addressDto.city,
          state: addressDto.state,
          pincode: addressDto.pincode,
          defaultAddress: isDefaultSet ? true : false,
          saveAs: addressDto.saveAs,
        },
      });
  
      return newAddress;
    } catch (error) {
      console.error('Failed to add address:', error);
      throw new Error('Failed to add address');
    }

    // if(addressDto.default){
    //   await this.prisma.address.updateMany({
    //     where: {
    //       user: userId,
    //       default: true
    //     },
    //     data:{
    //       default: false,
    //     }
    //   })
    // }

    // return await this.prisma.address.create({
    //   data: {
    //     user: userId,
    //     ...addressDto
    //   }
    // });
  }

  async updateAddress(
    addressId: string,
    addressDto: AddressDto
  ): Promise<Address> {
    if (addressDto.defaultAddress) {
      await this.prisma.address.updateMany({
        where: {
          id: addressId,
          NOT: { id: addressId },
          defaultAddress: true,
        },
        data: { defaultAddress: false },
      });
    }

    return await this.prisma.address.update({
      where: {
        id: addressId,
      },
      data: addressDto,
    });
  }

  async deleteAddress(userId: string, addressId: string): Promise<Address> {
    const address = await this.prisma.address.findUnique({
      where: {
        id: addressId,
        user: userId,
      },
    });

    if (!address) {
      throw new Error('Address not found');
    }

    const deltedAddress = { ...address };

    await this.prisma.address.delete({
      where: {
        id: addressId,
      },
    });

    if (address.defaultAddress) {
      const nextAddress = await this.prisma.address.findFirst({
        where: {
          user: userId,
        },
        orderBy: {
          createdAt: 'desc', 
        },
      });

      if (nextAddress) {
        await this.prisma.address.update({
          where: {
            id: nextAddress.id,
          },
          data: {
            defaultAddress: true,
          },
        });
      }
    }

    return deltedAddress;
  }

  async listAddresses(userId: string) {
  console.log("Fetching addresses for user:", userId);
  const addresses = await this.prisma.address.findMany({
    where: { user: userId },
  });
  console.log("Retrieved addresses:", addresses);
  return addresses;
}
}
