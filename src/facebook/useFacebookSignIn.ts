import { AccessToken, GraphRequest, GraphRequestManager, LoginManager } from 'react-native-fbsdk';
import { defaultFacebookPermissions, type FacebookUserInfo } from './types';

const useFacebookLogin = () => {

    let permissions = defaultFacebookPermissions;

    const setPermissions = (perms: string[]) => {
        permissions = perms;
    };


    const loginWithFacebook = (onSuccess: (userInfo: FacebookUserInfo) => void, onError: (error: string) => void) => {
        LoginManager.logInWithPermissions(permissions).then(
            (login) => {
                if (login.isCancelled) {
                    onError("FB LOGIN CANCELLED");
                } else {
                    AccessToken.getCurrentAccessToken().then((data) => {
                        if (data) {
                            const accessToken = data.accessToken.toString();
                            getInfoFromToken(accessToken, onSuccess, onError);
                        } else {
                            onError("Access token not available");
                        }
                    }).catch((error) => {
                        onError("Error fetching access token: " + error);
                    });
                }
            },
            (error) => {
                onError("FB LOGIN FAILED WITH ERROR: " + error);
            },
        );
    };

    const logoutFromFacebook = () => {
        LoginManager.logOut();
    };

    const getInfoFromToken = (token: string, onSuccess: (userInfo: FacebookUserInfo) => void, onError: (error: string) => void) => {
        const PROFILE_REQUEST_PARAMS = {
            fields: {
                string: 'id,name,first_name,last_name,email',
            },
        };

        const profileRequest = new GraphRequest(
            '/me',
            { accessToken: token, parameters: PROFILE_REQUEST_PARAMS },
            (error, result) => {
                if (error) {
                    onError("FB LOGIN FAILED WITH ERROR: " + error.toString());
                } else {
                    const user: FacebookUserInfo = result as FacebookUserInfo; // Adjust according to actual response structure
                    onSuccess(user);
                }
            },
        );

        new GraphRequestManager().addRequest(profileRequest).start();
    };

    return { loginWithFacebook, logoutFromFacebook, setPermissions };
};

export default useFacebookLogin;
