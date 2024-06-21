"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import ListingCard from "../components/listings/ListingCard";
import Loading from "../loading";

type ListingProps = {
  id: string;
  title: string;
  description: string;
  price: number;
  condition: string;
  rating: string;
  quantity: string;
  discount: number;
  imageUrls: string[];
};

const SearchPage = () => {
  const searchParams = useSearchParams();
  const [listings, setListings] = useState<ListingProps[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchListings = async () => {
      if (!searchParams) {
        return;
      }
      const query = searchParams.get("q");
      if (!query) {
        console.log("Search parameters are not available.");
        return;
      }

      setLoading(true);
      const params = { query };

      try {
        const response = await axios.get(
          `http://localhost:4002/listings/search`,
          { params }
        );
        console.log("API response data:", response.data);
        setListings(response.data);
      } catch (error: any) {
        console.error("Error fetching listings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [searchParams]);

  if (loading) return <Loading />;

  return (
    <div className="my-2 mx-4">
      <h1>Search Results:</h1>
      <div
        className="
            grid 
            grid-cols-2 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6 gap-4
            mt-4
          "
      >
        {listings.map((listing: any) => (
          <ListingCard
            key={listing.id}
            data={listing}
            discount={listing.discount}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
