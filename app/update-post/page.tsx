"use client";

import { FormEvent, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";

const UpdatePost = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const postId = searchParams.get("id");
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState<{ quote: string; tag: string }>({
    quote: "",
    tag: "",
  });

  const updatePost = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/post/${postId}`, {
        method: "PATCH",
        body: JSON.stringify({
          quote: post.quote,
          tag: post.tag,
        }),
      });

      response.ok && router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchPostDetails = async () => {
      const response = await fetch(`/api/post/${postId}`);
      const data = await response.json();

      setPost({ quote: data.quote, tag: data.tag });
    };

    if (postId) fetchPostDetails();
  }, [postId]);

  return (
    <section className="flex flex-col items-start justify-start gap-6 p-5 w-full">
      <h1 className="blue_gradient text-5xl font-extrabold">Update Post</h1>
      <p className="text-xl text-primary-black">
        Share here the quote you have in mind before you forget it. Also don't
        forget to provide a suitable tag for the quote. Eg: #motivation, #love,
        etc.
      </p>
      <Form
        type="Update"
        post={post}
        setPost={setPost}
        loading={loading}
        setLoading={setLoading}
        handleSubmit={updatePost}
      ></Form>
    </section>
  );
};

export default UpdatePost;
