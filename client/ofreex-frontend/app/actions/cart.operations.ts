import axios from "axios";
import getListingById from "./getListingById";

export async function getCartByUserId(userId: string) {
  try {
    let { data: fetchMyCart } = await axios.post(
      "http://localhost:4004/graphql",
      {
        query: `
          query {
            fetchMyCart(fetchMyCart:{user:"${userId}"}) {
              id,
              user,
              totalAmount,
              totalItem,
              items {
                id,
                listingId,
                quantity,
              }
            }
          }
        `,
      }
    );
    const listings = [];
    for (let i = 0; i < fetchMyCart.data.fetchMyCart.items.length; i++) {
      const listing = await getListingById({
        listingId: fetchMyCart.data.fetchMyCart.items[i].listingId,
      });
      listings.push(listing);
    }
    return { cart: fetchMyCart.data.fetchMyCart, listings };
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function addItemToCart(listing: any, currentUser: any) {
  try {
    let { data: response } = await axios.post("http://localhost:4004/graphql", {
      query: `
      mutation {
        AddItemToCartDto(addItemToCartDto: {
          item: "${listing.id}",
          quantity: 1,
          price:${listing.price}  
          seller: "${listing.userId}",
          user: "${currentUser.id}"
        }) {
          id
          user
        }
      }
        `,
    });
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}

export async function getCartSettings() {
  try {
    let { data: response } = await axios.post("http://localhost:4004/graphql", {
      query: `
      query{
        fetchCartSettings{
          value
        }
      }
        `,
    });
    return response.data.fetchCartSettings.value;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function removeItemFromCart(itemId: any, userId: any) {
  try {
    let { data: response } = await axios.post("http://localhost:4004/graphql", {
      query: `
      mutation{
        removeItemFromCart(removeItemFromCartDto:{
          item:"${itemId}",
          user:"${userId}"
        }){
          id,
          user,
          }
      }
        `,
    });
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function wishlistFromCart(
  itemId: any,
  userId: any,
  price: any,
  seller: any,
  listingId: any
) {
  try {
    let { data: response } = await axios.post("http://localhost:4004/graphql", {
      query: `
      mutation{
        wishlistItem(wishlistItem:{
          item:"${itemId}",
          listingId:"${listingId}",
          quantity:1,
          price:${price},
          user:"${userId}",
          seller:"${seller}"
        }){
          id,
          user
        }
      }
        `,
    });
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function updateItemQuantity(
  itemId: any,
  userId: any,
  quantity: any
) {
  try {
    let { data: response } = await axios.post("http://localhost:4004/graphql", {
      query: `
      mutation{
        updateItemQuantity(updateItemQuantity:{
          itemId:"${itemId}",
          user:"${userId}",
          quantity:${quantity}
        }){
          id,
          user,
          }
      }
        `,
    });
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function fetchWishlistItems() {
  try {
    let { data: response } = await axios.post("http://localhost:4004/graphql", {
      query: `
      query{
        getWishlist(fetchWishlistDto:{
          user:"9714a90a-bf28-462e-9ed0-41128f7399bc"
        }){
          id,
          user,
          items{
            id,
            seller,
            quantity,
            price,
            listingId
          },
          
        }
      }
        `,
    });
    console.log(response);
  } catch (error: any) {
    throw new Error(error);
  }
}