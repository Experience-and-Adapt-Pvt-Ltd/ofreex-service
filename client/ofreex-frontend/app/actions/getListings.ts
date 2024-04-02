import prisma from "@/app/libs/prismadb";
import axios from "axios";

export interface IListingsParams {
  userId?: string;
  category?: string;
}

export default async function getListings(
  params: IListingsParams
) {
  try {
    if (params.userId) {
      const userId = params.userId;
      let { data: listings } = await axios.post(
        `http://localhost:4002/listings/getListingsByUserId`, {
        userId,
      }
      )
      const safeListings = listings.map((listing: any) => ({
        ...listing,
        // createdAt: listing.postedAt.toISOString(),
      }));

      return safeListings;
    }
    else {
      let { data: premiumListings } = await axios.post(
        `http://localhost:4002/listings/premium`, {
        limit: 20
      }
      )
      let { data: listings } = await axios.post(
        `http://localhost:4002/listings/getListings`, {
        limit: 20
      }
      )
      //append 2 arrays into one
      premiumListings.map((listing: { title: string; }) => {
        console.log(listing.title)
      })
      listings = [...premiumListings, ...listings];
      // let query: any = {};

      // if (userId) {
      //   query.userId = userId;
      // }

      // if (category) {
      //   query.category = category;
      // }

      // if (roomCount) {
      //   query.roomCount = {
      //     gte: +roomCount
      //   }
      // }

      // if (guestCount) {
      //   query.guestCount = {
      //     gte: +guestCount
      //   }
      // }

      // if (bathroomCount) {
      //   query.bathroomCount = {
      //     gte: +bathroomCount
      //   }
      // }

      // if (locationValue) {
      //   query.locationValue = locationValue;
      // }

      // if (startDate && endDate) {
      //   query.NOT = {
      //     reservations: {
      //       some: {
      //         OR: [
      //           {
      //             endDate: { gte: startDate },
      //             startDate: { lte: startDate }
      //           },
      //           {
      //             startDate: { lte: endDate },
      //             endDate: { gte: endDate }
      //           }
      //         ]
      //       }
      //     }
      //   }
      // }

      // const listings = await prisma.listing?.findMany({
      //   where: query,
      //   orderBy: {
      //     createdAt: 'desc'
      //   }
      // });

      const safeListings = listings.map((listing: any) => ({
        ...listing,
        // createdAt: listing.postedAt.toISOString(),
      }));

      return safeListings;
    }
  } catch (error: any) {
    throw new Error(error);
  }
}
