import { SignUp } from "@clerk/nextjs";
import AuthShell from "../../_components/AuthShell";
import { twitterClerkAppearance } from "../../_clerkAppearance";

export default function Page() {
  return (
    <AuthShell title="Create your account" subtitle="Join Twitter and start sharing today.">
      <SignUp
        appearance={twitterClerkAppearance}
        routing="path"
        path="/sign-up"
        signInUrl="/sign-in"
      />
    </AuthShell>
  );
}
