import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismadb";
import axios from "axios";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { activationToken, activationCode } = body;
    const { data } = await axios.post(`http://localhost:4001/graphql`, {
      query: `
        mutation activateUser {
          activateUser(activationDto: {
            activationToken: "${activationToken}",
            activationCode: "${activationCode}"
          }) {
            user {
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

    if (data.errors) {
      // Check if the activation failed due to an invalid code
      throw new Error('Activation Code is Invalid');
    }

    console.log(data);
    return NextResponse.json(data);
  } catch (error) {
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
