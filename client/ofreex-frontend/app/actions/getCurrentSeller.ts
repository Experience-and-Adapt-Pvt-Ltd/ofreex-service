import { getServerSession } from "next-auth/next"

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/app/libs/prismadb";
import axios from "axios";

export async function getSession() {
  return await getServerSession(authOptions)
}

export default async function getCurrentSeller() {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }
    console.log("Session");
    console.log(session.user.email);
    const { data: getSellerByEmail } = await axios.post(
      `http://localhost:4001/graphql`, {
      query: `query GetSellerByEmail {
          getSellerByEmail(email: "${session.user.email}") {
          id
          name
          email
          password
          isPremium
        }
      }`
    }
    )
    const currentUser = getSellerByEmail.data.getSellerByEmail;
    console.log(getSellerByEmail);
    console.log(currentUser);
    // const currentUser = await prisma.user.findUnique({
    //   where: {
    //     email: session.user.email as string,
    //   }
    // });

    if (!currentUser) {
      return null;
    }
    console.log(currentUser);
    return {
      ...currentUser,
      // createdAt: currentUser.createdAt.toISOString(),
      // updatedAt: currentUser.updatedAt.toISOString(),
      // emailVerified:
      // currentUser.emailVerified?.toISOString() || null,
    };
  } catch (error: any) {
    return null;
  }
}

