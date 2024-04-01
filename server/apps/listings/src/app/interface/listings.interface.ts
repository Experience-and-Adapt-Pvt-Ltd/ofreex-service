export interface Listing {
  id: number;
  title: string;
  description: string;
  category: string;
  subCategory?: string;
  condition: string;
  price: number;
  city: string;
  state?: string;
  imageUrls: string[];
  userId: number;
  postedAt: Date;
  rating?: number;
}
