import { PublicClientApplication } from "@azure/msal-browser";

const msalConfig = {
  auth: {
    clientId: ProcessingInstruction.event.REACT_APP_AZURE_CLIENT_ID,  
    authority: "https://login.microsoftonline.com/{REACT_APP_AZURE_TENANT_ID}",  
    redirectUri: "http://localhost:3000",  
  },
  cache: {
    cacheLocation: "sessionStorage",  
    storeAuthStateInCookie: true, 
  }
};

const msalInstance = new PublicClientApplication(msalConfig);

export default msalInstance;
