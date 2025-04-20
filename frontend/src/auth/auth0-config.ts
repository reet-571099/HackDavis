import { CacheLocation } from "@auth0/auth0-react";

const getRedirectUri = () => {
  if (import.meta.env.DEV) {
    return "http://localhost:3000/dashboard";
  }
  return "https://kindness-quest-ruby.vercel.app/dashboard";
};

export const auth0Config = {
  domain: import.meta.env.VITE_AUTH0_DOMAIN || "",
  clientId: import.meta.env.VITE_AUTH0_CLIENT_ID || "",
  authorizationParams: {
    redirect_uri: getRedirectUri(),
    audience: "https://dev-tajhnjsaemxki5cz.us.auth0.com/api/v2/",
    response_type: "code",
    response_mode: "query",
    scope: "openid profile email offline_access send:email",
  },
  onRedirectCallback: (appState: any) => {
    window.history.replaceState(
      {},
      document.title,
      appState?.returnTo || window.location.pathname
    );
  },
  useRefreshTokens: true,
  cacheLocation: "localstorage" as CacheLocation,
  advancedOptions: {
    defaultScope: "openid profile email offline_access send:email",
  },
};
