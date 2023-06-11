"use client";

import { FormEvent, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";

const CreatePost = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState<{ quote: string; tag: string }>({
    quote: "",
    tag: "",
  });

  const createPost = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/post/new", {
        method: "POST",
        body: JSON.stringify({
          quote: post.quote,
          userId: session?.user?.id,
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

  return (
    <div className="flex flex-col items-start justify-start gap-6 p-5 w-full">
      <h1 className="blue_gradient text-5xl font-extrabold">Create Post</h1>
      <p className="text-xl text-primary-black">
        Share here the quote you have in mind before you forget it. Also don't
        forget to provide a suitable tag for the quote. Eg: #motivation, #love,
        etc.
      </p>
      <Form
        type="CREATE"
        post={post}
        setPost={setPost}
        loading={loading}
        setLoading={setLoading}
        handleSubmit={createPost}
      ></Form>
    </div>
  );
};

export default CreatePost;
