import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectToDB } from "@/app/utils/DB-connect";
import User from "@/app/models/User";

export const authOptions = {
  providers: [
    // ...add more providers here
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "credentials",

      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          await connectToDB();
          const findUser = await User.findOne({ email });
          if (!findUser) {
            return null;
          }
          const passwordMatch = await bcrypt.compare(
            password,
            findUser.password
          );

          if (!passwordMatch) {
            return null;
          }
          return findUser;
        } catch (error) {
          console.log("error: ", error);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
