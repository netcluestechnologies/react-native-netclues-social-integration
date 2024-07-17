export interface AppleUserInfo {
    user: string;
    email: string | null;
    fullName: {
        givenName: string | null;
        familyName: string | null;
    } | null;
}

export interface AppleSignInResponse {
    success: boolean;
    userInfo?: AppleUserInfo;
    error?: string;
}
