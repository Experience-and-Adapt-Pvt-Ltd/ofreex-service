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

  //count the number of existing listings for the current user
  const listingCount = await prisma.listing.count({
    where: {
      userId: currentUser.id,
    }
  });

  if(listingCount >= 3){
    return NextResponse.json({
      message: 'You cannot create more than 3 listings',
    }, {
      status: 400
    })
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid ID');
  }
  let { data: listing } = await axios.delete(
    `http://localhost:4002/listings/${listingId}`,
  )

  return NextResponse.json(listing);
}
