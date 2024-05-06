import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
  try {
  const body = await request.json();
  const { activationToken, activationCode } = body;
  //console.log("asdfasfasdfasdfasfasdfadfasfafa");
  const { data } = await axios.post(`http://localhost:4003/graphql`, {
    query: `mutation activateUser {
      activateUser(activationDto:{
        activationToken: "${activationToken}",
        activationCode: "${activationCode}"
      })
      {
        seller{
          name
          email
          password
          phoneNumber
          address
          gstNumber
          bankName
          IFSC
          accountNumber
        }
      }
}

`,
  });
  if (data.errors) {
    // Check if the activation failed due to an invalid code
    throw new Error('Activation Code is Invalid');
  }
  return NextResponse.json(data);
} catch (error) {
  return new Response(JSON.stringify({
    error: error.message
  }), {
    status: 400, // Bad Request status code
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
}
