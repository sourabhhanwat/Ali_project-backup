import { styled } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Link, navigate, RouteComponentProps, useMatch } from '@reach/router';
import React from 'react';
import '../modules/Subject';
import PlatformCard, { SkeletonPlatformCard } from './PlatformCard';
import { usePlatformList } from './PlatformListProvider';

const SkeletonPlatformCards = React.memo(() => (
    <>
        {[...Array(3).keys()].map((index) => (
            <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                <SkeletonPlatformCard />
            </Grid>
        ))}
    </>
));

const StyledLink = styled(Link)({ textDecoration: 'none' });

export default function PlatformsList(this: any, {projectId}: RouteComponentProps<{projectId: number;}>) {
    const platformList = usePlatformList();

    const [isPending, setIsPending] = React.useState<boolean>();
    const [platforms, setPlatforms] = React.useState<Platform[] | null>();

    const handlePlatformList = (state: State<Platform[] | null>) => {
        setIsPending(state.isPending);
        let values = state.value?.filter((v) => v.project === projectId)
        console.log('project 1 value = ', values)
        setPlatforms(values);
    };

    // let projectId: number | undefined;

    const match = useMatch('/dashboard/project/:projectId/platforms');

    if (match) {
        projectId = parseInt((match as any).projectId);
    }

    console.log("================", projectId);

    const fetch = React.useCallback(() => {
        if (projectId) {
            platformList.subject.list({
                filter: {
                    project: projectId,
                },
            });
        } else {
            platformList.subject.list(undefined);
        }
    }, [projectId, platformList.subject]);


    React.useEffect(() => {
        platformList.subject.attach(handlePlatformList);
        fetch();
        return () => platformList.subject.detach(handlePlatformList);
    }, [fetch, platformList.subject]);

    return (
        <>
            <Box display="flex" justifyContent="flex-end" my={2}>
                <Box fontWeight={800} clone>
                <StyledLink to={`/dashboard/NewPlatform/${projectId}`}>
                <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    style={{margin: 5, fontWeight: 'bold'}}
                    disabled={isPending}>
                    New Platform
                </Button>
                </StyledLink>
                </Box>
                <Box fontWeight={800} clone>
                    <Button
                        onClick={() => fetch()}
                        variant="contained"
                        size="large"
                        color="primary"
                        style={{margin: 5}}
                        disabled={isPending}>
                        Refresh
                    </Button>
                </Box>
            </Box>
            <Grid container spacing={3}>
                {platforms?.map((platform) => (
                    <Grid key={platform.id} item xs={12} sm={6} md={4} lg={3}>
                        <PlatformCard platform={platform} />
                    </Grid>
                ))}
                {isPending && <SkeletonPlatformCards />}
            </Grid>
        </>
    );
}
