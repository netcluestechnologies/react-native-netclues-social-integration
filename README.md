# @netclues/react-native-netclues-social-integration

[![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue.svg?logo=typescript&style=flat)](https://www.typescriptlang.org/)
[![React Native](https://img.shields.io/badge/React%20Native-Supported-green.svg?style=flat-square)](https://reactnative.dev/)
[![Platform](https://img.shields.io/badge/Platform-iOS%20%7C%20Android-lightgrey.svg?style=flat-square)](https://www.reactnative.dev/)
[![npm version](https://img.shields.io/npm/v/@netclues/react-native-netclues-social-integration.svg?style=flat-square)](https://www.npmjs.com/package/@netclues/react-native-netclues-social-integration)
[![npm downloads](https://img.shields.io/npm/dt/@netclues/react-native-netclues-social-integration.svg?style=flat-square)](https://www.npmjs.com/package/@netclues/react-native-netclues-social-integration)
[![Google Sign-In](https://img.shields.io/badge/Google%20Sign--In-Used-blue.svg?style=flat-square)](https://github.com/react-native-google-signin/google-signin)
[![license](https://img.shields.io/npm/l/@netclues/react-native-netclues-social-integration.svg?style=flat-square)](https://www.npmjs.com/package/@netclues/react-native-netclues-social-integration)

The @netclues/react-native-netclues-social-integration package enables seamless integration of Google Sign-In into your React Native applications. It simplifies user authentication by providing an easy-to-use interface for signing in with Google, ensuring a secure and efficient sign-in process across both Android and iOS platforms.

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

This configuration file defines the settings required for integrating Google Sign-In with the @netclues/react-native-netclues-social-integration package in a React Native application. It includes various options such as scopes, web client ID, offline access, hosted domain, force code for refresh token, account name, and iOS client ID to customize and manage the Google Sign-In process.

```js

// googleSigninConfig.ts

import { GoogleSigninConfig } from "@netclues/react-native-netclues-social-integration/lib/typescript/src/google/types";

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
## Usage

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
## userInfo

Example userInfo which is returned after successful sign in.

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

## License

(MIT)

