import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb";
import axios from "axios";

export async function POST(request: Request) {
  const body = await request.json();
  const { activationToken, activationCode } = body;
  const { data } = await axios.post(`http://localhost:4001/graphql`, {
    query: `mutation activateUser {
  activateUser(activationDto:{
    activationToken: "${activationToken}",
    activationCode: "${activationCode}"
  })
    {
    user{
      id
      name
      email
      password
      address
      phoneNumber
      isPremium
    }

  }
}
`,
  });

  // const { id,
  //     name,
  //     email,
  //     password,
  //     address,
  //     phoneNumber,
  //     isPremium } = user.data.user;

  //  const user = await prisma.user.create({
  //   data: {
  //     email,
  //     name,
  //     hashedPassword,
  //   }
  // });

  return NextResponse.json(data);
}
