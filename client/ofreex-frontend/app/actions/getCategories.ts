import prisma from "@/app/libs/prismadb";
import axios from "axios";

export interface IListingsParams {
  label?: string;
}

export default async function getCategories(
) {
  try {
    let { data: categories } = await axios.get(
      `http://localhost:4002/listings/getCategories`
    )

    //append 2 arrays into one
    // premiumListings.map((listing: { title: string; }) => {
    //   console.log(listing.title)
    // })

    const safeCategories = categories.map((listing: any) => ({
      ...listing,
      // createdAt: listing.postedAt.toISOString(),
    }));

    return safeCategories;
  } catch (error: any) {
    throw new Error(error);
  }
}
