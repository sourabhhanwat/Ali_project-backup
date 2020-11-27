import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Link from '@material-ui/core/Link';
import { styled } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import React from 'react';
import { useForm } from 'react-hook-form';
import '../modules/Subject';
import { useAuthContext } from './AuthProvider';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="#">
                AR Asset Integrity Solutions
            </Link>{' '}
            {new Date().getFullYear()}
            {/* {'.'} */}
        </Typography>
    );
}

const StyledAvatar = styled(Avatar)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
}));

const StyledImage = styled('img')(({ theme }) => ({
    width: theme.spacing(25),
    marginBottom: theme.spacing(2),
    objectFit: 'contain',
    textAlign: 'center',
}));

export function SignInForm() {
    const { register, handleSubmit, errors } = useForm<Login>();

    const auth = useAuthContext();

    const [isPending, setIsPending] = React.useState<boolean>();
    const [isFailed, setIsFailed] = React.useState<boolean>();

    const handleAuth = (state: State<User | null>) => {
        setIsPending(state.isPending);
        setIsFailed(state.isFailed);
    };

    React.useEffect(() => {
        auth.attach(handleAuth);
        return () => auth.detach(handleAuth);
    }, [auth]);

    return (
        <form onSubmit={handleSubmit((value) => auth.login(value))} noValidate>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                mb={8}
            >
                <StyledImage src="/logo.jpg" />
                <Typography component="p" align="center">
                    One stop solution for Risk Analysis
                </Typography>
            </Box>

            <Box display="flex" justifyContent="center" mb={2}>
                <StyledAvatar>
                    <LockOutlinedIcon />
                </StyledAvatar>
            </Box>

            <Box display="flex" justifyContent="center" mb={2}>
                <Typography component="h1" variant="h5" align="center">
                    Sign in
                </Typography>
            </Box>

            <Box mb={2}>
                <TextField
                    inputRef={register({
                        required: {
                            value: true,
                            message: 'Username required',
                        },
                        minLength: {
                            value: 3,
                            message: 'Username too short',
                        },
                    })}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Username"
                    name="username"
                    autoComplete="username"
                    error={!!errors['username']}
                    helperText={errors['username']?.message}
                    autoFocus
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    inputRef={register({
                        required: {
                            value: true,
                            message: 'Password required',
                        },
                        minLength: {
                            value: 3,
                            message: 'Password too short',
                        },
                    })}
                    error={!!errors['password']}
                    helperText={errors['password']?.message}
                />
            </Box>

            <Box mb={2}>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                >
                    {!isPending && 'Sign In'}
                    {isPending && <CircularProgress />}
                </Button>
            </Box>

            {isFailed && (
                <Box display="flex" justifyContent="center" mb={2}>
                    <Typography color="error">Authentication failed</Typography>
                </Box>
            )}

            <Box>
                <Copyright />
            </Box>
        </form>
    );
}
