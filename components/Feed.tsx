"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import PostCard, { PostType } from "./PostCard";

export const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);

  const regex = new RegExp(searchText, "i");

  const handleTagClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    console.log(e.currentTarget.innerText);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/post");
      const data = await response.json();
      setPosts(data);
      setFilteredPosts(data);
    };
    !posts.length && !searchText && fetchPosts();

    setFilteredPosts(
      searchText
        ? posts.filter(
            (post: PostType) =>
              regex.test(post.quote) ||
              regex.test(post.tag) ||
              regex.test(post.creator.email)
          )
        : posts
    );
  }, [searchText]);

  return (
    <section className="mx-auto w-full max-w-xl flex justify-center items-center flex-col gap-2 mb-10">
      <form className="w-full ">
        <input
          type="text"
          value={searchText}
          className="w-full px-6 py-3 font-medium text-zinc-700 rounded-full shadow-lg my-4"
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search for quotes or tags"
          required
        />
      </form>

      <div className="posts-layout">
        {filteredPosts.map((post: PostType) => (
          <PostCard
            key={post._id}
            post={post}
            handleTagClick={(e: React.MouseEvent<HTMLSpanElement>) =>
              setSearchText(e.currentTarget.innerText)
            }
          />
        ))}
      </div>
    </section>
  );
};
