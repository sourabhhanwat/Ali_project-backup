import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Redirect, Router } from '@reach/router';
import React from 'react';
import AuthProvider, { useAuth } from './components/AuthProvider';
import './modules/Subject';

const Dashboard = React.lazy(() => import('./components/Dashboard'));

const SignIn = React.lazy(() => import('./components/Signin'));

function Loader() {
    return (
        <Box
            display="flex"
            width="100vw"
            height="100vh"
            justifyContent="center"
            alignItems="center"
        >
            <CircularProgress />
        </Box>
    );
}

export default function App() {
    const auths = useAuth();

    const [isPending, setIsPending] = React.useState<boolean>(true);
    const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>();

    const handleAuth = (state: State<User | null>) => {
        if (!state.isResolved) {
            return;
        }
        setIsPending(false);
        setIsAuthenticated(!!state.value);
    };

    React.useEffect(() => {
        auths.subject.attach(handleAuth);
        auths.subject.validate();
        return () => auths.subject.detach(handleAuth);
    }, [auths.subject]);

    if (isPending) {
        return <Loader />;
    }

    return (
        <React.Suspense fallback={<Loader />}>
            <AuthProvider {...auths}>
                {!isAuthenticated && <SignIn />}
                {isAuthenticated && (
                    <Router>
                        <Dashboard path="/dashboard/*" />
                        <Redirect from="*" to="/dashboard" noThrow />
                    </Router>
                )}
            </AuthProvider>
        </React.Suspense>
    );
}
