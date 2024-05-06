import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import axios from "axios";

interface IParams {
  verify?: string;
}

export async function POST(
  request: Request,
  { params }: { params: IParams }
) {
  const body = await request.json();
  const { activationToken, nPassword } = body;
  //const { activationToken, activationCode } = body;
  console.log(activationToken, nPassword);
  const { data } = await axios.post(`http://localhost:4001/graphql`, {
    query: `
      mutation resetPassword{
  resetPassword(resetPasswordDto:{activationToken:"${activationToken}", password:"${nPassword}"}){
    user{
      name,
      email
    }
  }
}
    `,
  });


  return NextResponse.json(data);

}
