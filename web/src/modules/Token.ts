import jwtDecode from 'jwt-decode';
import isFuture from 'date-fns/isFuture';
import fromUnixTime from 'date-fns/fromUnixTime';
import addMinutes from 'date-fns/addMinutes';
import axios from 'axios';

let accessToken: string | undefined;

function setAccessToken(token: string): void {
    accessToken = token;
}

type AccessToken = {
    token_type: string;
    exp: number;
    user_id: string;
    jti: string;
};

function isAccessTokenValid(): boolean {
    if (!accessToken) {
        return false;
    }

    const { exp } = jwtDecode<AccessToken>(accessToken);

    return isFuture(addMinutes(fromUnixTime(exp), 1));
}

async function getAccessToken(): Promise<string | undefined> {
    if (isAccessTokenValid()) {
        console.log('access token is valid');
        return accessToken;
    }

    console.log('access token is invalid');

    if (!isRefreshTokenValid()) {
        console.log('refresh token is invalid');
        return;
    }

    console.log('refresh token is valid');

    const refreshToken = getRefreshToken();

    console.log('renewing access token');

    const {
        data: { access },
    } = await axios.post<{ access: string }>(
        '/api/token/refresh/',
        {
            refresh: refreshToken,
        },
        {
            baseURL: process.env.REACT_APP_BASE_API_URL,
        }
    );

    setAccessToken(access);

    return access;
}

function removeAccessToken(): void {
    accessToken = undefined;
}

let refreshToken: string | undefined;

function setRefreshToken(token: string) {
    localStorage.setItem('refresh-token', token);
    refreshToken = token;
}

function getRefreshToken(): string | undefined {
    if (refreshToken) {
        return refreshToken;
    }

    refreshToken = localStorage.getItem('refresh-token') ?? undefined;

    return refreshToken;
}

type RefreshToken = {
    token_type: string;
    exp: number;
    user_id: string;
    jti: string;
};

/**
 * Check if refresh is token valid
 */
function isRefreshTokenValid(): boolean {
    const token = getRefreshToken();

    if (!token) {
        return false;
    }

    const { exp } = jwtDecode<RefreshToken>(token);

    return isFuture(addMinutes(fromUnixTime(exp), 1));
}

function removeRefreshToken() {
    localStorage.removeItem('refresh-token');
    refreshToken = undefined;
}

export type Credential = {
    username: string;
    password: string;
};

type Response = {
    refresh: string;
    access: string;
};

async function login({ username, password }: Credential) {
    const {
        data: { refresh, access },
    } = await axios.post<Response>(
        '/api/token/',
        {
            username,
            password,
        },
        {
            baseURL: process.env.REACT_APP_BASE_API_URL,
        }
    );

    setRefreshToken(refresh);
    setAccessToken(access);
}

async function logout() {
    removeAccessToken();
    removeRefreshToken();
}

export default {
    getAccessToken,
    isRefreshTokenValid,
    login,
    logout,
};
