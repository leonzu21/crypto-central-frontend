import NextAuth, { NextAuthOptions } from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      issuer: process.env.AUTH0_ISSUER,
    }),
    // ...add more providers here
  ],
  callbacks: {
    session: async ({ session, user, token }) => {
      return Promise.resolve({ session, token });
    },
  },
  secret: process.env.AUTH_SECRET,
};

export default NextAuth(authOptions);
