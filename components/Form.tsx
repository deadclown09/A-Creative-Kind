"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import Loader from "./Loader";

const Form = ({
  type,
  post,
  setPost,
  loading,
  setLoading,
  handleSubmit,
}: {
  type: string;
  post: { quote: string; tag: string };
  setPost: Dispatch<SetStateAction<{ quote: string; tag: string }>>;
  loading?: boolean;
  setLoading?: Dispatch<SetStateAction<boolean>>;
  handleSubmit: any;
}) => {
  const router = useRouter();
  return (
    <form
      className="w-full flex flex-col items-start justify-start gap-2 px-7 py-2"
      onSubmit={handleSubmit}
    >
      <label htmlFor="quote" className="text-lg font-semibold text-zinc-800">
        Quote
      </label>
      <textarea
        id="quote"
        value={post.quote}
        className="w-full bg-white text-zinc-600 font-medium px-6 py-4 rounded-md resize-none min-h-[150px] shadow-sm shadow-gray-300 mb-4"
        placeholder="Write down your quote..."
        onChange={(e) =>
          setPost((post) => ({ ...post, quote: e.target.value }))
        }
        required
      ></textarea>

      <label htmlFor="tag" className="text-lg font-semibold text-zinc-800">
        Tag
      </label>
      <input
        id="tag"
        type="text"
        value={post.tag}
        className="w-full bg-white text-zinc-600 font-medium px-6 py-4 rounded-md  shadow-sm shadow-gray-300 mb-4"
        placeholder="Give a tag and start with #"
        onChange={(e) => setPost((post) => ({ ...post, tag: e.target.value }))}
        required
      ></input>

      <div className="w-full flex justify-end gap-4">
        <button
          type="button"
          className="primary_btn bg-gradient-to-r from-red-500 to-red-400"
          onClick={() => router.push("/")}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="primary_btn bg-gradient-to-r from-blue-600 to-cyan-600 min-w-[100px]"
        >
          {loading ? <Loader /> : type}
        </button>
      </div>
    </form>
  );
};

export default Form;
