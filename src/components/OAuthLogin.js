import { View, Text, WebView } from "react-native";
import React from "react";

const config = {
  clientId: "126fd50e9623fb78609b4bf0-408fe89c0088f404ea3c8f76add3f081",
  clientSecret:
    "ZjUzMDJjY2M2YTk1YmI1ZjI1MDBmMmUyY2U0OWRkZTMyNDFjODNmMDI1YjVlNzhjNzc3Njg5MWVhMDBlZDg2ZmJiZGY0ZTA4MjlmMDIwZjM4NGYzZmQxNTMwNDBiMDk4ODkyMGExOTIwNzMxYjVkMDgxYmQxM2QwOGRhZGEwZDE=",
  redirectUri: "https://consumer.energy.mn/auth/callback",
  authorizationEndpoint: "https://sso.gov.mn/oauth2/authorize",
  tokenEndpoint: "https://sso.gov.mn/oauth2/token",
  scopes: [
    "W3sic2VydmljZXMiOiBbIldTMTAwMTAxX2dldENpdGl6ZW5JRENhcmRJbmZvIl0sICJ3c2RsIjogImh0dHBzOi8veHlwLmdvdi5tbi9jaXRpemVuLTEuMy4wL3dzP1dTREwifV0=",
  ], // Scopes your app needs
};

const generateAuthUrl = () => {
  const params = new URLSearchParams({
    client_id: config.clientId,
    redirect_uri: config.redirectUri,
    response_type: "code",
    scope: config.scopes,
    state: "",
  });
  return `${config.authorizationEndpoint}?${params.toString()}`;
};

const OauthLogin = ({ onCodeReceived }) => {
  const authUrl = generateAuthUrl();

  return (
    <WebView
      source={{ uri: authUrl }}
      onNavigationStateChange={(navState) => {
        if (navState.url.startsWith(config.redirectUri)) {
          onCodeReceived(navState.url);
        }
      }}
    />
  );
};

export default OauthLogin;
