import { PublicClientApplication } from "@azure/msal-browser";

const msalConfig = {
  auth: {
    clientId: "YOUR_CLIENT_ID",  
    authority: "https://login.microsoftonline.com/YOUR_TENANT_ID",  
    redirectUri: "http://localhost:3000",  
  },
  cache: {
    cacheLocation: "sessionStorage",  
    storeAuthStateInCookie: true, 
  }
};

const msalInstance = new PublicClientApplication(msalConfig);

export default msalInstance;
