export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/Properties/add", "/profile", "/message", "/Properties/saved"],
};
