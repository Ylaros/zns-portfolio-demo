import type { NextConfig } from "next";

const isGitHubBuild = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  basePath: isGitHubBuild ? "/zns-portfolio-demo" : "",
  assetPrefix: isGitHubBuild ? "/zns-portfolio-demo/" : "",
};

export default nextConfig;
