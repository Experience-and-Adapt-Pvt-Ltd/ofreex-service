"use client";

import { gql, DocumentNode } from "@apollo/client";

export const GET_USER: DocumentNode = gql`
  query {
    loginUser {
      user {
        id
        name
        email
        address
        password
      }
      accessToken
      refreshToken
    }
  }
`;
