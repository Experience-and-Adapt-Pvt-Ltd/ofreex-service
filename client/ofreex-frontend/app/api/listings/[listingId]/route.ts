import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import axios from "axios";

interface IParams {
  listingId?: string;
}

export async function DELETE(
  request: Request, 
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid ID');
  }
  let { data: listing } = await axios.delete(
    `http://localhost:4002/listings/${listingId}`,
  )
  // const listing = await prisma.listing.deleteMany({
  //   where: {
  //     id: listingId,
  //     userId: currentUser.id
  //   }
  // });

  return NextResponse.json(listing);
}
