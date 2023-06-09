"use client";

import { PostType } from "@components/PostCard";
import Profile from "@components/Profile";
import { SessionType } from "@components/Provider";
import { connectToDB } from "@utils/database";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const ProfilePage = ({ params }: { params: { username: string } }) => {
  const { data } = useSession();
  const session = data as SessionType;
  const router = useRouter();
  const [posts, setPosts] = useState([]);

  const handleEdit = (post: PostType) => {
    router.push(`/update-post?id=${post._id}`);
  };

  const handleDelete = async (post: PostType) => {
    const hasConfirmed = confirm("Are you sure you want to delete this post?");

    if (hasConfirmed) {
      try {
        await fetch(`/api/post/${post._id}`, {
          method: "DELETE",
        });

        const filteredPosts = posts.filter(
          (item: PostType) => item._id !== post._id
        );
        setPosts(filteredPosts);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params.username}/posts`);
      const data = await response.json();

      setPosts(data);
    };

    fetchPosts();
  }, [session]);

  return (
    <Profile
      name={params.username + "'s"}
      desc={`Welcome to ${
        session?.user?.name === params.username
          ? "your"
          : params.username + "'s"
      } personalized profile page`}
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default ProfilePage;
