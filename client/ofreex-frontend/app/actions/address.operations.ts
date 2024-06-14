import axios from "axios";
import getCurrentUser from "./getCurrentUser";

export async function getAddresses() {
  try {
    const currentUser = await getCurrentUser();
    console.log("hyyy");

    if (!currentUser) {
      return "No User Found";
    }

    const { data: fetchAddress } = await axios.post(
      "http://localhost:4004/graphql",
      {
        query: `query listAddresses{
                listAddresses(userId: "${currentUser.id}"){
                id
                    street
                    city
                    state
                    pincode
                    defaultAddress
                }
            }`,
      }
    );

    console.log(
      "Data received from GraphQL:",
      fetchAddress.data.listAddresses.length
    );

    return fetchAddress.data.listAddresses;
  } catch (error: any) {
    console.error("Error details:", error.response?.data || error.message);
    throw new Error(error.message);
  }
}

export async function deleteAddresses(deleteAddressId: any) {
  try {
    console.log(`deleteAddressId: ${deleteAddressId}`);
    const currentUser = await getCurrentUser();
    let { data: response } = await axios.post(
      "http://localhost:4004/graphql",
      {
        query: `query deleteAddress{
                deleteAddress(userId: "${currentUser.id}",addressId: "${deleteAddressId}"){
                    street
                    city
                    state
                    pincode
                    defaultAddress
                }
            }`,
      }
    );
    return response.data.deleteAddress;
  } catch (error: any) {
    // console.error("Error details:", error.response?.data || error.message);
    throw new Error(error.message);
  }
}


export async function updateAddress(addressId:any,updatedAddress:any) {
  const query = `
    mutation UpdateAddress($id: String!, $street: String!, $city: String!, $state: String!, $pincode: String!, $defaultAddress: Boolean!) {
      updateAddress(addressUpdateDto: {
        id: $id,
        street: $street,
        city: $city,
        state: $state,
        pincode: $pincode,
        defaultAddress: $defaultAddress
      }) {
        id
        street
        city
        state
        pincode
        defaultAddress
      }
    }
  `;

  const variables = {
    id: addressId,
    ...updatedAddress
  };

  try {
    const response = await fetch('http://localhost:4004/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'), // Assuming token-based auth
      },
      body: JSON.stringify({
        query: query,
        variables: variables
      })
    });

    const responseData = await response.json();
    if (response.ok) {
      return responseData.data.updateAddress;
    } else {
      console.error('GraphQL Error:', responseData.errors);
      throw new Error('Failed to update address');
    }
  } catch (error) {
    console.error('Network Error:', error);
    throw error;
  }
}