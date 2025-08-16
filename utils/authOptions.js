import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        prompt: "consent",
        access_type: "offline",
        response_type: "code",
      },
    }),
  ],
  callbacks: {
    //Invoked on success sign in
    async signIn({ profile }) {
      //1. connect to db already handelded by prismaclient.

      //2. check if user exist
      try {
        const userExists = await prisma.user.findUnique({
          where: {
            email: profile.email,
          },
        });
        //3. if not , create user
        if (!userExists) {
          await prisma.user.create({
            data: {
              email: profile.email,
              name: profile.name,
              image: profile.picture,
            },
          });
        }
        return true; //4. return true to allow sign in
      } catch (error) {
        console.error("signin error", error);
        return false;
      }
    },
    //session callback function that modifies the sesssion object
    async session({ session }) {
      try {
        const user = await prisma.user.findUnique({
          where: {
            email: session.user.email,
          },
        });

        if (user) {
          session.user.id = user.id; // attach DB ID to session
        }

        return session;
      } catch (error) {
        console.error("Session error:", error);
        return session; // return original session if error
      }
    },
  },
};

export default NextAuth(authOptions);
