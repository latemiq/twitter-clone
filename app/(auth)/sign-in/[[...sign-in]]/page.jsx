import { SignIn } from "@clerk/nextjs";
import AuthShell from "../../_components/AuthShell";
import { twitterClerkAppearance } from "../../_clerkAppearance";

export default function Page() {
  return (
    <AuthShell title="Sign in to Twitter" subtitle="Welcome back. Continue where you left off.">
      <SignIn
        appearance={twitterClerkAppearance}
        routing="path"
        path="/sign-in"
        signUpUrl="/sign-up"
      />
    </AuthShell>
  );
}
