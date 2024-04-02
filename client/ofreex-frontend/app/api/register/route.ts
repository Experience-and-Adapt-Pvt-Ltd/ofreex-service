import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb";
import axios from "axios";

export async function POST(
  request: Request,
) {
  const body = await request.json();
  const {
    email,
    name,
    password,
    phoneNumber,
  } = body;

  //const hashedPassword = await bcrypt.hash(password, 15);
  const { data: register } = await axios.post(
    `http://localhost:4001/graphql`, {
    query: `mutation register {
  register(registerDto:{
    name: "${name}",
    email: "${email}",
    password: "${password}",
    phoneNumber: ${phoneNumber},
    isPremium: false
  }
  ) {
    activation_token
  }
}
`
  }
  )
  console.log(register);
  const { activation_token } = register.data.register;

  //  const user = await prisma.user.create({
  //   data: {
  //     email,
  //     name,
  //     hashedPassword,
  //   }
  // });

  return NextResponse.json(activation_token);
}
