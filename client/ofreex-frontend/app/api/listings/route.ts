import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import axios from "axios";

export async function POST(
  request: Request,
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const {
    title,
    description,
    imageSrc,
    category,
    location,
    price,
    gstNumber,
  } = body;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });
  const imageUrls = [imageSrc];
  let { data: listing } = await axios.post(
    `http://localhost:4002/listings/`, {
    title,
    description,
    imageUrls,
    category,
    city: location.value,
    condition: "Excellent",
    price: parseInt(price, 10),
    userId: currentUser.id,
    postedAt: "2024-04-01T13:12:04.833Z",
    gstNumber,
  }
  )

  return NextResponse.json(listing);
}
