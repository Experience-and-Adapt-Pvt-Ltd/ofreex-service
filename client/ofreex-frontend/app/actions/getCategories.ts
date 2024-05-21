import prisma from "@/app/libs/prismadb";
import axios from "axios";

export interface IListingsParams {
  label?: string;
}

export default async function getCategories() {
  try {
    let { data: categories } = await axios.get(
      `http://localhost:4002/listings/getCategories`
    )

    const safeCategories = categories.map((listing: any) => ({
      ...listing,
    }));

    return safeCategories;
  } catch (error: any) {
    console.error("Error details:", error.response?.data || error.message);
    throw new Error(error);
  }
}
