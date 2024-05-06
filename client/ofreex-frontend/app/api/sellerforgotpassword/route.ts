import { NextResponse } from "next/server";
import axios from "axios";

interface IParams {
}

export async function POST(
  request: Request,
  { params }: { params: IParams }
) {
  try{
    const body = await request.json();
    const { email } = body;
    const { data } = await axios.post(`http://localhost:4003/graphql`, {
      query: `mutation forgetPassword{
        forgotPassword(forgotPasswordDto:{email: "${email}"}){
          message
        }
      }
      `,
    });

    if (data.errors) {
      // Check if the activation failed due to an invalid code
      throw new Error('Email id does not exist');
    }
    return NextResponse.json(data);
  } catch(error){
    console.error('Error during activation:', error.message);
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
