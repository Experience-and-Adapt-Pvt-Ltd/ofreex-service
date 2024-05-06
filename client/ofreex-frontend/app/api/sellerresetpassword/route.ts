import { NextResponse } from "next/server";
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
  console.log(activationToken, nPassword);
  const { data } = await axios.post(`http://localhost:4003/graphql`, {
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
