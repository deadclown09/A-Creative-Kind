import NextAuth, { SessionOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { connectToDB } from "@utils/database";
import User from "@models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],

  callbacks: {
    async session({ session }: { session?: any }) {
      const sessionUser = await User.findOne({
        email: session.user.email,
      });
      session.user.id = sessionUser._id.toString();
      session.user.name = sessionUser.username;
      return session;
    },

    async signIn({ profile }: { profile?: any }) {
      try {
        await connectToDB();

        //check if a user already exists
        const userExists = await User.findOne({
          email: profile.email,
        });

        //check if the user doesn't exist
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.email.replace("@gmail.com", ""),
            image: profile.picture,
          });
        }

        return true;
      } catch (error: unknown) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
