"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const [placeholderText, setPlaceholderText] = useState(
    "What are you looking for?"
  );

  useEffect(() => {
    const handleResize = () => {
      // breakpoint for mobile devices
      if (window.innerWidth < 768) {
        setPlaceholderText("Search Ofreex.in");
      } else {
        setPlaceholderText("What are you looking for?");
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const onSearch = (event: React.FormEvent) => {
    event.preventDefault();

    const encodedSearchQuery = encodeURI(searchQuery);
    router.push(`/search?q=${searchQuery}`);

    console.log(encodedSearchQuery);
  };

  return (
    <form className="flex justify-center sm:w-2/3" onSubmit={onSearch}>
      <input
        type="text"
        placeholder={placeholderText}
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        className="px-1 py-1 sm:w-full sm:block hidden w-full sm:px-5 sm:py-2 md:flex text-black border border-zinc-800 rounded-xl"
      />
      <div className="relative md:top-1 md:right-9 right-6">
        <IoSearch className="h-8" />
      </div>
    </form>
  );
};

export default Search;
