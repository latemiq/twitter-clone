import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import AuthHeader from "../src/features/auth/components/AuthHeader";
import "../src/index.css";
import "../src/app/App.css";
import "../src/features/explore/components/Widgets.css";
import "../src/features/tweets/components/Feed.css";
import "../src/features/navigation/components/Sidebar.css";
import "../src/features/navigation/components/SidebarOption.css";
import "../src/features/tweets/components/Post.css";
import "../src/features/tweets/components/TweetBox.css";

export const metadata: Metadata = {
  title: "Twitter Clone",
  description: "Next.js App Router with Clerk",
};

const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
const hasClerkKey =
  !!publishableKey &&
  publishableKey !== "YOUR_PUBLISHABLE_KEY" &&
  (publishableKey.startsWith("pk_test_") || publishableKey.startsWith("pk_live_"));

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!hasClerkKey) {
    return (
      <html lang="en">
        <body>
          <header className="px-4 py-3 border-b border-gray-200 bg-white text-sm text-gray-700">
            Set a valid `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` in `.env.local` to enable Clerk.
          </header>
          {children}
        </body>
      </html>
    );
  }

  return (
    <ClerkProvider
      publishableKey={publishableKey}
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
    >
      <html lang="en">
        <body>
          <AuthHeader />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
