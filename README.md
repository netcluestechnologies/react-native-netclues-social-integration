# @netclues/react-native-netclues-social-integration

[![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue.svg?logo=typescript&style=flat)](https://www.typescriptlang.org/)
[![React Native](https://img.shields.io/badge/React%20Native-Supported-green.svg?style=flat-square)](https://reactnative.dev/)
[![Platform](https://img.shields.io/badge/Platform-iOS%20%7C%20Android-lightgrey.svg?style=flat-square)](https://www.reactnative.dev/)
[![npm version](https://img.shields.io/npm/v/@netclues/react-native-netclues-social-integration.svg?style=flat-square)](https://www.npmjs.com/package/@netclues/react-native-netclues-social-integration)
[![npm downloads](https://img.shields.io/npm/dt/@netclues/react-native-netclues-social-integration.svg?style=flat-square)](https://www.npmjs.com/package/@netclues/react-native-netclues-social-integration)
[![Google Sign-In](https://img.shields.io/badge/Google%20Sign--In-Used-blue.svg?style=flat-square)](https://github.com/react-native-google-signin/google-signin)
[![Apple Sign-In](https://img.shields.io/badge/Apple%20Sign--In-Used-blue.svg?style=flat-square)](https://github.com/invertase/react-native-apple-authentication)
[![Facebook Sign-In](https://img.shields.io/badge/Facebook%20Sign--In-Used-blue.svg?style=flat-square)](https://github.com/facebook/react-native-fbsdk)
[![license](https://img.shields.io/npm/l/@netclues/react-native-netclues-social-integration.svg?style=flat-square)](https://www.npmjs.com/package/@netclues/react-native-netclues-social-integration)

The @netclues/react-native-netclues-social-integration package offers easy integration for Google, Facebook, and Apple sign-ins in React Native apps, providing efficient authentication across Android and iOS platforms.

## Installation

Using npm:

```sh
npm install @netclues/react-native-netclues-social-integration
```

or using yarn:

```sh
yarn add  @netclues/react-native-netclues-social-integration
```

## Configuration

### Google

This configuration file defines the settings required for integrating Google Sign-In with the @netclues/react-native-netclues-social-integration package in a React Native application. It includes various options such as scopes, web client ID, offline access, hosted domain, force code for refresh token, account name, and iOS client ID to customize and manage the Google Sign-In process.

```js

// googleSigninConfig.ts

import { GoogleSigninConfig } from "@netclues/react-native-netclues-social-integration";

const googleSigninConfig: GoogleSigninConfig = {
    scopes: [],  // OAuth2 scopes to request
    webClientId: '',  // Web client ID from Google Developer Console
    offlineAccess: true,  // Enables obtaining refresh tokens
    hostedDomain: '',  // Optional: restricts sign-in to users of a specific domain
    forceCodeForRefreshToken: true,  // Forces code-based token retrieval
    accountName: '',  // Optional: specifies a default account name
    iosClientId: '',  // iOS client ID from Google Developer Console
};

export default googleSigninConfig;

```
This code sets up Google Sign-In configuration for the @netclues/react-native-netclues-social-integration package by calling setGoogleSigninConfig within a useEffect hook to initialize settings when the component mounts. 

```js

import { setGoogleSigninConfig } from '@netclues/react-native-netclues-social-integration';
import googleSigninConfig from './path/to/googleSigninConfig'; // Replace './path/to/googleSigninConfig' with the actual path to where your googleSigninConfig file is located.

useEffect(() => {
  setGoogleSigninConfig(googleSigninConfig);
}, []);

```

### Facebook

Use setPermissions to dynamically configure permissions for Facebook sign-in with the @netclues/react-native-netclues-social-integration package. Default permissions include public_profile and email, with options to add user_friends for additional data access.

```js

import { useFacebookLogin } from "@netclues/react-native-netclues-social-integration";

const { setPermissions } = useFacebookLogin();

useEffect(() => {
  setPermissions(['public_profile', 'email', 'user_friends']);
}, []);

```

## Usage

### Google

The useGoogleSignIn hook from @netclues/react-native-netclues-social-integration facilitates seamless integration of Google Sign-In functionality into React Native applications. It provides signIn and signOut methods for handling user authentication with Google, managing user information and errors via state variables like userInfo and error.

```js
import { GoogleUserData, useGoogleSignIn } from '@netclues/react-native-netclues-social-integration';

// ...

const { signIn, signOut } = useGoogleSignIn();
const [userInfo, setUserInfo] = useState<GoogleUserData | null>(null);
const [error, setError] = useState<Error | null>(null);

const handleSignIn = async () => {
  const result = await signIn();
  setUserInfo(result.userInfo);
  setError(result.error);
};

const handleSignOut = async () => {
  const result = await signOut();
  setUserInfo(result.userInfo);
  setError(result.error);
};

```
#### userInfo

Example userInfo which is returned after successful sign in with Google.

```js

{
  idToken: string,
  serverAuthCode: string,
  scopes: Array<string>
  user: {
    email: string,
    id: string,
    givenName: string,
    familyName: string,
    photo: string, // url
    name: string // full name
  }
}

```

### Facebook

The useFacebookLogin hook from @netclues/react-native-netclues-social-integration facilitates seamless integration of Facebook Sign-In functionality into React Native applications. It provides loginWithFacebook, logoutFromFacebook, and setPermissions methods for handling user authentication with Facebook, managing user information and errors via state variables like userInfo and error.

```js

import { useFacebookLogin,FacebookUserInfo } from '@netclues/react-native-netclues-social-integration';

 const [userInfo, setUserInfo] = useState<FacebookUserInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { loginWithFacebook, logoutFromFacebook, setPermissions } = useFacebookLogin();

  useEffect(() => {
    setPermissions(['public_profile', 'email', 'user_friends']);
  }, []);

  const handleLogin = () => {
    loginWithFacebook(
      (userInfo: FacebookUserInfo) => {
        // Handle successful sign-in
        setUserInfo(userInfo)
      },
      (error: string) => {
        // Handle error
        console.log('Error:', error);
        setError(error)
      }
    );
  };

  const handleLogout = () => {
    logoutFromFacebook();
    setUserInfo(null);
    setError(null);
  };

```

### Apple

The useAppleSignIn hook from @netclues/react-native-netclues-social-integration facilitates seamless integration of Apple Sign-In functionality into React Native applications. It provides the performAppleSignIn method for handling user authentication with Apple, managing user information and errors via the AppleSignInResponse object.

```js

import { useAppleSignIn, AppleSignInResponse } from '@netclues/react-native-netclues-social-integration';

const { performAppleSignIn } = useAppleSignIn();

const handleAppleSignIn = async () => {
  const response: AppleSignInResponse = await performAppleSignIn();
  if (response.success) {
    // Handle successful sign-in
    console.log('User Info:', response.userInfo);
  } else {
    // Handle error
    console.log('Error:', response.error);
  }
};

```
## License

(MIT)

