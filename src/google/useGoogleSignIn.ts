import { GoogleSignin, statusCodes, type User } from '@react-native-google-signin/google-signin';
import type { GoogleUserData } from './types';

interface GoogleSignInResult {
    userInfo: GoogleUserData | null;
    error: Error | null;
}

const useGoogleSignIn = (): { signIn: () => Promise<GoogleSignInResult>, signOut: () => Promise<GoogleSignInResult> } => {
    const signIn = async (): Promise<GoogleSignInResult> => {
        try {
            await GoogleSignin.hasPlayServices();
            const user: User | null = await GoogleSignin.signIn();
            console.log("User:", JSON.stringify(user))
            if (user) {
                const googleUserData: GoogleUserData = {
                    scopes: user.scopes ?? [],
                    serverAuthCode: user.serverAuthCode ?? null,
                    idToken: user.idToken ?? null,
                    user: {
                        photo: user.user.photo ?? '',
                        givenName: user.user.givenName ?? '',
                        familyName: user.user.familyName ?? '',
                        email: user.user.email ?? '',
                        name: user.user.name ?? '',
                        id: user.user.id ?? '',
                    },
                };
                return { userInfo: googleUserData, error: null };
            } else {
                return { userInfo: null, error: new Error('User info not available') };
            }
        } catch (error: any) {
            console.log('error:', error);
            let customError = error;
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log('User cancelled the login flow');
                customError = new Error('User cancelled the login flow');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log('Operation (e.g. sign in) is in progress already');
                customError = new Error('Operation (e.g. sign in) is in progress already');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log('Play services not available or outdated');
                customError = new Error('Play services not available or outdated');
            }
            return { userInfo: null, error: customError };
        }
    };

    const signOut = async (): Promise<GoogleSignInResult> => {
        try {
            await GoogleSignin.signOut();
            return { userInfo: null, error: null };
        } catch (error: any) {
            return { userInfo: null, error };
        }
    };

    return { signIn, signOut };
};

export default useGoogleSignIn;
