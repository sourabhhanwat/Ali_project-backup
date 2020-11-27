import axios from 'axios';
import React, { PropsWithChildren } from 'react';
import Subject from '../modules/Subject';
import Token from '../modules/Token';

declare global {
    interface User {
        username: string;
        email: string;
        first_name?: string;
        last_name?: string;
    }

    interface Login {
        username: string;
        password: string;
    }
}

class AuthSubject extends Subject<User | null> {
    get = this.createAsync(async () => {
        const { data } = await axios.get<User>('/api/v1/users/me');
        return data;
    });

    login = this.createAsync(async (value: Login) => {
        await Token.login(value);
        const { data } = await axios.get<User>('/api/v1/users/me');
        return data;
    });

    logout = this.createAsync(async () => {
        Token.logout();
        return null;
    });

    validate = this.createAsync(async () => {
        if (!Token.isRefreshTokenValid()) {
            return null;
        }

        const { data } = await axios.get<User>('/api/v1/users/me');
        return data;
    });
}

export const authSubject = new AuthSubject(null);

export function useAuth(): {
    subject: AuthSubject;
} {
    return { subject: authSubject };
}

const AuthContext = React.createContext(authSubject);

export function useAuthContext() {
    return React.useContext(AuthContext);
}

export default function AuthProvider({
    children,
    subject,
}: PropsWithChildren<{ subject: AuthSubject }>) {
    return (
        <AuthContext.Provider value={subject}>{children}</AuthContext.Provider>
    );
}
