import { GoogleSignin } from '@react-native-google-signin/google-signin';
import type { GoogleSigninConfig } from './types';

let googleSigninConfig: GoogleSigninConfig = {};

export const setGoogleSigninConfig = (config: GoogleSigninConfig) => {
    googleSigninConfig = config;
    configureGoogleSignin();
};

const configureGoogleSignin = () => {
    GoogleSignin.configure({
        scopes: googleSigninConfig.scopes || ['https://www.googleapis.com/auth/userinfo.profile'],
        webClientId: googleSigninConfig.webClientId || '',
        offlineAccess: googleSigninConfig.offlineAccess || true,
        hostedDomain: googleSigninConfig.hostedDomain || '',
        forceCodeForRefreshToken: googleSigninConfig.forceCodeForRefreshToken || true,
        accountName: googleSigninConfig.accountName || '',
        iosClientId: googleSigninConfig.iosClientId || '',
    });
};
