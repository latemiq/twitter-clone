import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const resolvedAuthDomain =
  process.env.NEXT_PUBLIC_TWITTER_AUTH_DOMAIN ||
  process.env.REACT_APP_TWITTER_AUTH_DOMAIN ||
  "";
const derivedProjectId = resolvedAuthDomain.endsWith(".firebaseapp.com")
  ? resolvedAuthDomain.replace(".firebaseapp.com", "")
  : "";

/** @type {import("next").NextConfig} */
const nextConfig = {
  turbopack: {
    root: __dirname,
  },
  env: {
    NEXT_PUBLIC_TWITTER_API_KEY:
      process.env.NEXT_PUBLIC_TWITTER_API_KEY ||
      process.env.REACT_APP_TWITTER_API_KEY,
    NEXT_PUBLIC_TWITTER_AUTH_DOMAIN:
      process.env.NEXT_PUBLIC_TWITTER_AUTH_DOMAIN ||
      process.env.REACT_APP_TWITTER_AUTH_DOMAIN,
    NEXT_PUBLIC_TWITTER_PROJECT_ID:
      process.env.NEXT_PUBLIC_TWITTER_PROJECT_ID ||
      process.env.REACT_APP_TWITTER_PROJECT_ID ||
      derivedProjectId,
  },
};

export default nextConfig;
