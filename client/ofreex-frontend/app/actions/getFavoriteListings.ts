import prisma from "@/app/libs/prismadb";

import getCurrentUser from "./getCurrentUser";
import axios from "axios";
import getListingById from "./getListingById";

export default async function getFavoriteListings() {
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
    const listings = [];
    console.log(response.data.getWishlist.items);
    for (let i = 0; i < response.data.getWishlist.items.length; i++) {
      const listing = await getListingById({
        listingId: response.data.getWishlist.items[i].listingId,
      });
      listings.push(listing);
    }
    return listings;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}