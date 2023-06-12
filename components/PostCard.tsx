"use client";

import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { LuCopy, LuCopyCheck, LuEdit, LuTrash } from "react-icons/lu";

export interface PostType {
  creator: {
    id: string;
    email: string;
    username: string;
    image: string;
  };
  quote: string;
  tag: string;
  _id: string;
}

const PostCard = ({
  post,
  handleTagClick,
  handleEdit,
  handleDelete,
}: {
  post: PostType;
  handleTagClick?: () => void;
  handleEdit?: (post: PostType) => void;
  handleDelete?: (post: PostType) => void;
}) => {
  const [copied, setCopied] = useState("");
  const { data: session } = useSession();
  const pathname = usePathname();

  const handleCopy = () => {
    setCopied(post.quote);
    navigator.clipboard.writeText(post.quote);
    setTimeout(() => setCopied(""), 3000);
  };

  return (
    <div className="w-full md:w-[45%] flex flex-col gap-4 bg-gradient-to-br from-white to-zinc-200 rounded-md p-6 m-3">
      <div className="flex justify-between items-center">
        <div className="flex justify-start items-center gap-3">
          <Image
            src={post.creator.image}
            alt={post.creator.username}
            height={30}
            width={30}
            className="rounded-full object-contain"
          />
          <p className="font-semibold text-primary-black">
            {post.creator.username}
          </p>
        </div>

        {copied ? (
          <LuCopyCheck size={20} className="text-gray-600" />
        ) : (
          <LuCopy size={20} onClick={handleCopy} className="cursor-pointer" />
        )}
      </div>

      <div className="flex flex-col items-start justify-start gap-3">
        <p className="text-sm font-medium text-zinc-700 text-justify">
          {post.quote}
        </p>
        <span className="w-full flex justify-between items-center">
          <span
            className="bg-gray-300 rounded-full px-4 py-1 text-blue-500 text-sm font-medium"
            onClick={handleTagClick}
          >
            {post.tag}
          </span>

          {session?.user?.id === post.creator._id &&
            pathname === "/profile" && (
              <span className="flex items-center gap-2 justify-end">
                <LuEdit
                  size={20}
                  color="#498AF3"
                  className="cursor-pointer"
                  onClick={() => handleEdit?.(post)}
                />
                <LuTrash
                  size={20}
                  color="red"
                  className="cursor-pointer"
                  onClick={() => handleDelete?.(post)}
                />
              </span>
            )}
        </span>
      </div>
    </div>
  );
};

export default PostCard;
