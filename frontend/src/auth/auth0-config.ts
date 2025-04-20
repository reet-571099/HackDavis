export const auth0Config = {
  domain: import.meta.env.VITE_AUTH0_DOMAIN || "",
  clientId: import.meta.env.VITE_AUTH0_CLIENT_ID || "",
  authorizationParams: {
    redirect_uri: "http://localhost:3000/dashboard",
    audience: import.meta.env.VITE_AUTH0_AUDIENCE,
  },
};
