import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex flex-col justify-center items-center gap-8 pt-10">
      <h1 className="text-center font-extrabold text-5xl mb-2 ">
        Discover & Share
        <br className="" />
        <span className="orange_gradient text-6xl text-center font-bold">
          Your Favorite Quotes
        </span>
      </h1>
      <p className="text-2xl text-center text-primary-black">
        <span className="orange_gradient font-medium">A CREATIVE KIND</span> is
        a common place for all creative minds like you and me where we all share
        with each other our personal favorites quotes with people like you.
        Whether they are yours, or some famous or successful person's, we value
        them here regardless.
      </p>
      <p className="text-2xl font-medium text-center text-primary-black capitalize">
        "Your quotes have power to greatly impact other's lives."
      </p>

      {/*sign up for free right now button */}

      <Feed />
    </section>
  );
};

export default Home;
