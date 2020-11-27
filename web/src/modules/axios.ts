import axios from 'axios';
import Token from './Token';

axios.interceptors.request.use(async ({ url, ...rest }) => {
    if (!url?.startsWith('/api/v1/')) {
        return {
            ...rest,
            url,
        };
    }

    try {
        const accessToken = await Token.getAccessToken();

        return {
            ...rest,
            url,
            baseURL: process.env.REACT_APP_BASE_API_URL,
            headers: {
                ...(rest.headers || {}),
                Authorization: `Bearer ${accessToken}`,
            },
        };
    } catch (e) {
        if (e.response?.status === 401 || e.response?.status === 403) {
            Token.logout();
            throw new Error('User unauthorized. Please re-login');
        }
        throw e;
    }
});
