export interface FacebookUserInfo {
    id: string;
    name: string;
    first_name: string;
    last_name: string;
    email: string;
}

export const defaultFacebookPermissions = ['public_profile', 'email'];