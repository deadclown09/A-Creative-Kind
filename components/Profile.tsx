import PostCard, { PostType } from "./PostCard";

const Profile = ({
  name,
  desc,
  data,
  handleEdit,
  handleDelete,
}: {
  name: string;
  desc: string;
  data: any;
  handleEdit: (post: PostType) => void;
  handleDelete: (post: PostType) => void;
}) => {
  return (
    <section className="flex flex-col gap-3 w-full pt-10 mb-10">
      <h1 className="blue_gradient text-5xl font-extrabold capitalize">
        {name} Profile
      </h1>
      <p className="text-xl text-primary-black">{desc}</p>

      <div className="w-full flex justify-start items-start flex-wrap mt-10 ">
        {data.map((post: PostType) => (
          <PostCard
            key={post._id}
            post={post}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
