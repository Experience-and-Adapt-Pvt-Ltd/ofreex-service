import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { activationToken, activationCode } = body;
    
    console.log(`Activation Code: ${activationCode}`);
    console.log(`Activation Token: ${activationToken}`);
    
    const { data } = await axios.post(`http://localhost:4003/graphql`, {
      query: `
        mutation activateUser {
          activateUser(activationDto: {
            activationToken: "${activationToken}",
            activationCode: "${activationCode}"
          }) {
            seller {
              name
              email
              phoneNumber
              password
              address
              gstNumber
              bankName
              accountNumber
              IFSC
            }
          }
        }
      `, 
    });

    // Handle GraphQL errors
    if (data.errors) {
      console.error('GraphQL Errors:', data.errors);
      return new Response(JSON.stringify({ error: 'Activation Code is Invalid' }), {
        status: 422, // Unprocessable Entity (semantic errors in request)
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Server Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500, // Internal Server Error
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
