import { setGoogleSigninConfig } from './google/GoogleSigninConfig';
import useGoogleSignIn from './google/useGoogleSignIn';
import type { GoogleUserData } from './google/types';
import useFacebookLogin from './facebook/useFacebookSignIn';
export { default as useAppleSignIn } from './apple/useAppleSignIn';
export * from './apple/types';

export { setGoogleSigninConfig, useGoogleSignIn };
export type { GoogleUserData };
export { useFacebookLogin }; 