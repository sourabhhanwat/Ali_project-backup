import { Grid, Hidden, styled } from '@material-ui/core';
import React from 'react';
import { SignInForm } from './SigninForm';

const LeftGrid = styled(Grid)({
    background: 'url(/banner.jpg) center center no-repeat',
    backgroundSize: 'cover',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    transform: 'scaleX(-1)',
});

const RightGrid = styled(Grid)({
    alignItems: 'center',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
});

export default function SignIn() {
    return (
        <Grid container>
            <Hidden smDown>
                <LeftGrid item xs={7} />
            </Hidden>
            <RightGrid item xs={12} md={5}>
                <SignInForm />
            </RightGrid>
        </Grid>
    );
}
