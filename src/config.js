
import { LogLevel } from "@azure/msal-browser";

const url = "https://login.microsoftonline.com/47a5a918-b4ec-470f-86ca-c67e821ce45b"
const encoded_url = encodeURIComponent(url)

console.log(encoded_url);

export const msalConfig = {
    auth: {
        clientId: "5c70bf05-ec45-4fde-9e20-83ea7fbd4070",
        authority: "https://login.microsoftonline.com/47a5a918-b4ec-470f-86ca-c67e821ce45b",
        redirectUri: '/',
        postLogoutRedirectUri: '/',
        navigateToLoginRequestUri: false,
    },

    cache:{
        cacheLocation: 'sessionStorage',
        storeAuthStateInCookie:false,
    },

    system: {
        loggerOptions:{
            loggerCallback: (level, message,containsPii) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                    default:
                        return;
                }
            },
        },
    },
};

export const loginRequest = {
    scopes: ['user.read'],
};