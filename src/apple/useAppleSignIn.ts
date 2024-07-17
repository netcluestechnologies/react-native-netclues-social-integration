import { appleAuth } from '@invertase/react-native-apple-authentication';
import type { AppleSignInResponse, AppleUserInfo } from './types';

const useAppleSignIn = () => {
    const performAppleSignIn = async (): Promise<AppleSignInResponse> => {
        try {
            const response = await appleAuth.performRequest({
                requestedOperation: appleAuth.Operation.LOGIN,
                requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
            });

            const userInfo: AppleUserInfo = {
                user: response.user,
                email: response.email,
                fullName: response.fullName,
            };

            return {
                success: true,
                userInfo,
            };
        } catch (error) {
            let errorMessage = 'Unknown error';

            if (error instanceof Error) {
                errorMessage = error.message;
            }

            return {
                success: false,
                error: errorMessage,
            };
        }
    };

    return { performAppleSignIn };
};

export default useAppleSignIn;
