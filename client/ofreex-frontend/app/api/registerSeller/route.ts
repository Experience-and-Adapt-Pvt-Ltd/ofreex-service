import { NextResponse } from "next/server";

import axios from "axios";

export async function POST(
  request: Request,
) {
  try{
  const body = await request.json();
  const {
    email,
    name,
    password,
    phoneNumber,
    accountNumber,
    bankName,
    IFSC,
    GST,
  } = body;

  //const hashedPassword = await bcrypt.hash(password, 15);
    const { data: registerSeller } = await axios.post(
    `http://localhost:4001/graphql`, {
    query: `mutation registerSeller {
  registerSeller(sellerDto:{
    name: "${name}",
    email: "${email}",
    password: "${password}",
    phoneNumber: ${phoneNumber},
    isPremium: false,
    accountNumber: "${accountNumber}",
    bankName: "${bankName}",
    IFSC: "${IFSC}",
    GST: "${GST}"
  }
  ) {
    activation_token
  }
}
`
  }
  )
    console.log(`Regitering Seller ${registerSeller}`);
    const { activation_token } = registerSeller.data.registerSeller;

    return NextResponse.json(activation_token);

  }catch(error){
    console.log(error);
    return NextResponse.json({ message: error }, { status: 400 })
  }
}
