import { NextResponse } from "next/server";
import getCurrentUser from "../../../actions/getCurrentUser";
import axios from "axios";
export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.error();
    }

    const body = await request.json();

    const { street, city, state, pincode,saveAs, defaultAddress } = body;
    console.log(`data: ${body.data}`);

    const addressDto = {
        street, city, state, pincode, saveAs ,defaultAddress
    }
    console.log("Address DTO:", addressDto)
    const addressDtoForGraphQL = JSON.stringify(addressDto)
    .replace(/"([^(")"]+)":/g, '$1:')  // remove quotes around keys
    .replace(/"true"/g, 'true')       // convert "true" to true
    .replace(/"false"/g, 'false');  

    const response = await axios.post("http://localhost:4004/graphql", {
            query: `
                mutation addAddress{
                    addAddress(userId: "${currentUser.id}", address: ${addressDtoForGraphQL}){
                        street
                        city
                        state
                        pincode
                        defaultAddress
                        saveAs
                    } 
                }
            `,
        }); 

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error(
      "Error during adding:",
      error.response?.data || error.message
    );
    return new Response(
      JSON.stringify({
        error: error.message,
      }),
      {
        status: 400, // Bad Request status code
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}