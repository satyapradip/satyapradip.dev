import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";

/**
 * Clean helper function to strip potential wrapping quotes or backslashes from env variables
 */
function cleanEnvString(val: string | undefined): string {
  if (!val) return "";
  return val
    .replace(/^["']|["']$/g, "") // strip leading/trailing quotes
    .replace(/\\/g, "")           // strip backslashes used for escaping
    .trim();
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        const inputEmail = credentials.email.trim().toLowerCase();
        const inputPassword = credentials.password.trim();

        // 1. Database User Lookup via Prisma (Primary Production Security via Bcrypt)
        try {
          const user = await prisma.user.findFirst({
            where: {
              email: {
                equals: inputEmail,
                mode: "insensitive",
              },
            },
          });

          if (user && user.password) {
            const isValid = await bcrypt.compare(inputPassword, user.password);
            if (isValid) {
              return {
                id: user.id,
                name: user.name || "Satyapradip Das (Owner)",
                email: user.email,
                image: user.image || undefined,
              };
            }
          }
        } catch (error) {
          console.warn("Prisma user lookup skipped or failed:", error);
        }

        // 2. Dynamic Environment Variable Check (Zero Hardcoded Secrets in Code)
        const envEmail = cleanEnvString(process.env.ADMIN_EMAIL).toLowerCase();
        const envPassword = cleanEnvString(process.env.ADMIN_PASSWORD);

        const isEmailMatch = envEmail ? inputEmail === envEmail : false;
        const isPasswordMatch = envPassword ? inputPassword === envPassword : false;

        if (isEmailMatch && isPasswordMatch) {
          // Asynchronously upsert admin user into MongoDB with bcrypt hash for seamless future logins
          bcrypt
            .hash(inputPassword, 10)
            .then((hashedPassword) => {
              prisma.user
                .upsert({
                  where: { email: inputEmail },
                  update: { password: hashedPassword },
                  create: {
                    email: inputEmail,
                    name: "Satyapradip Das",
                    password: hashedPassword,
                  },
                })
                .catch(() => null);
            })
            .catch(() => null);

          return {
            id: "admin-env-user",
            name: "Satyapradip Das (Owner)",
            email: inputEmail,
          };
        }

        throw new Error("Invalid email or password");
      },
    }),
    ...(process.env.GITHUB_ID && process.env.GITHUB_SECRET
      ? [
          GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
          }),
        ]
      : []),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        (session.user as { id?: string }).id = token.id as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "secure-portfolio-nextauth-secret-2026",
};
