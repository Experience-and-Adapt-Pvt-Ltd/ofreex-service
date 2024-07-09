import { LimitedUserData } from "../types/listings.types";

export interface Listing {
  id: string;
  title: string;
  description: string;
  categoryId: string;    // Correctly using categoryId to link to Category by UUID
  subCategoryId?: string; // Optional; links to SubCategory by UUID if present
  condition: string;
  price: number;
  imageUrls: string[];
  userId: string;
  postedAt: Date;
  rating?: number; // Optional rating, can be undefined
  discount?: number; // Optional discount, can be undefined
  delivery: string;
  quantity: number;
}
export interface Category {
  id: string; // Ensure there's an id field to uniquely identify the category
  label: string;
  description: string;
  icon?: string; // Optional icon field
  visible: boolean;
  subCategories: SubCategory[]; // Array of SubCategory, enforcing structural consistency
}

export interface SubCategory {
  id: string; // Unique identifier for SubCategory
  label: string;
  description?: string; // Optional description
  categoryId: string; // UUID linking back to the parent Category
}

export interface GetPremiumUsersResponse {
  data: {
    getPremiumUsers: LimitedUserData[];
  };
}
export interface GetBasicUsersResponse {
  data: {
    getSeller: LimitedUserData[];
  };
}

export interface GetFavIdsResponse {
  data: {
    getFavoriteIds: string[];
  };
}