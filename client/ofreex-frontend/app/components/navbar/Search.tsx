"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const onSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const encodedSearchQuery = encodeURI(searchQuery);
    router.push(`/search?q=${encodedSearchQuery}`);
    console.log(encodedSearchQuery);
  };

  return (
    <form className="flex justify-center sm:w-2/3" onSubmit={onSearch}>
      <input
        type="text"
        placeholder="What are you looking for?"
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        className="px-1 py-1 sm:w-full w-full sm:px-5 sm:py-2 md:flex text-black border border-zinc-800 rounded-xl"
      />
      <button type="submit" className="relative md:top-0 md:right-9 right-6 bg-transparent border-none p-0">
        <IoSearch className="h-8" />
      </button>
    </form>
  );
};

export default Search;
