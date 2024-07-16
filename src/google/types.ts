export interface GoogleSigninConfig {
    scopes?: string[];
    webClientId?: string;
    offlineAccess?: boolean;
    hostedDomain?: string;
    forceCodeForRefreshToken?: boolean;
    accountName?: string;
    iosClientId?: string;
}

export interface GoogleUserData {
    scopes: string[];
    serverAuthCode: string | null;
    idToken: string | null;
    user: {
        photo: string;
        givenName: string;
        familyName: string;
        email: string;
        name: string;
        id: string;
    };
}