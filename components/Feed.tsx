"use client";

import { ChangeEvent, useEffect, useState } from "react";
import PostCard from "./PostCard";

export const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/post");
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <section className="flex flex-col items-start justify-center gap-6 w-full">
      <form className="w-full md:px-32">
        <input
          type="text"
          value={searchText}
          className="w-full px-5 py-2 font-medium text-zinc-700 rounded-full shadow-lg my-4"
          onChange={handleSearchChange}
          placeholder="Search for quotes or tags"
          required
        />
      </form>

      <div className="w-full flex justify-evenly items-start flex-wrap ">
        {posts.map((post) => (
          <PostCard />
        ))}
      </div>
    </section>
  );
};
