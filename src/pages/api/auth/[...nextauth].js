import NextAuth from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      issuer: process.env.AUTH0_ISSUER,
      idToken: true,
      authorization: { params: { audience: process.env.AUTH0_AUDIENCE } },
    }),
    // ...add more providers here
  ],
  secret: process.env.AUTH_SECRET,
  session: {
    jwt: true,
  },

  callbacks: {
    async jwt({ token, account }) {
      if (account?.access_token) {
        token.accessToken = account.access_token;
      }
      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.userId = token.sub.replace("auth0|", "");
      return { session, token };
    },
  },
};

export default NextAuth(authOptions);
