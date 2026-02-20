"use client";

import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { usePathname } from "next/navigation";

const hiddenHeaderRoutes = ["/sign-in", "/sign-up"];

export default function AuthHeader() {
  const pathname = usePathname();
  const shouldHideHeader = hiddenHeaderRoutes.some((route) => pathname?.startsWith(route));

  if (shouldHideHeader) {
    return null;
  }

  return (
    <header className="flex items-center justify-end gap-3 border-b border-gray-200 bg-white px-4 py-3">
      <SignedOut>
        <SignInButton mode="redirect" />
        <SignUpButton mode="redirect" />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  );
}
