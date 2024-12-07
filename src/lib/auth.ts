import { db } from "@/lib/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import { render } from "@react-email/components";

import { mail } from "@/lib/mail";

import { env } from "../../env.mjs";
import SignInEmail from "@/components/emails/SignInEmail";
import ActivationEmail from "@/components/emails/ActivationEmail";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID!,
      clientSecret: env.GOOGLE_CLIENT_SECRET!,
    }),
    EmailProvider({
      from: env.SMTP_HOST,
      sendVerificationRequest: async ({ identifier, url, provider }) => {
        const user = await db.user.findUnique({
          where: {
            email: identifier,
          },
          select: {
            emailVerified: true,
            name: true,
          },
        });

        try {
          if (user?.emailVerified) {
            await mail.sendMail({
              from: `${env.SMTP_FROM} <${env.SMTP_HOST}>`,
              to: identifier,
              subject: "Sign-in link for FII Practic",
              html: render(SignInEmail({ authUrl: url })),
              headers: {
                "X-Entity-Ref-ID": new Date().getTime() + "",
              },
            });
          } else {
            await mail.sendMail({
              from: `${env.SMTP_FROM} <${env.SMTP_HOST}>`,
              to: identifier,
              subject: "Activate your account",
              html: render(ActivationEmail({ authUrl: url })),
              headers: {
                "X-Entity-Ref-ID": new Date().getTime() + "",
              },
            });
          }
        } catch (e) {
          console.error(e);
          throw e;
        }
      },
    }),
  ],
  callbacks: {
    async signIn(params) {
      // update profile image on sign in
      // TODO: uncomment when we have profile image
      // if (params.profile?.image) {
      //   await db.user.update({
      //     where: {
      //       id: params.user.id,
      //     },
      //     data: {
      //       image: params.profile.image,
      //     },
      //   });
      // }
      // const { invite_id } = req.cookies;
      // console.log(params);
      // console.log("Sign in callback");
      return true;
    },
    // do something with invite_id

    // What info we get when we call useSession() in our components
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
        // session.user.username = token.username;
        session.user.role = token.role;
      }

      return session;
    },
    // What info we what to store in the token
    async jwt({ token, user }) {
      // console.log("JWT callback");
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      });

      if (!dbUser) {
        console.log("Creating new user");
        token.id = user!.id;
        return token;
      }

      // if (!dbUser.username) {
      //   console.log("Updating username");
      //   await db.user.update({
      //     where: {
      //       id: dbUser.id,
      //     },
      //     data: {
      //       username: nanoid(10),
      //     },
      //   });
      // }

      // console.log("Returning token");

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
        // username: dbUser.username,
        role: dbUser.role,
      };
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);
