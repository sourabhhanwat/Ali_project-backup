import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import MDrawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { styled, Theme } from '@material-ui/core/styles';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { navigate } from '@reach/router';
import React from 'react';
import '../modules/Subject';
import { useAuthContext } from './AuthProvider';
import PlatformIcon from './icons/Platform';
import ProjectIcon from './icons/Project';
import NewuserIcon from './icons/Newuser';
import SiteIcon from './icons/Site';
// import Add from './icons/Add';
import ExcistinguserIcon from './icons/Existinguser';

function toggleDrawer({ theme, open }: { theme: Theme; open: boolean }) {
    return {
        open: {
            width: theme.shape.drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        close: {
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            overflowX: 'hidden',
            width: theme.spacing(8) + 1,
        },
    }[open ? 'open' : 'close'] as CSSProperties;
}

const StyledDrawer = styled(MDrawer)(
    ({ theme, open }: { theme: Theme; open: boolean }) => ({
        flexShrink: 0,
        whiteSpace: 'nowrap',
        width: theme.shape.drawerWidth,
        ...toggleDrawer({ theme, open }),
        '& .MuiDrawer-paper': {
            ...toggleDrawer({ theme, open }),
        },
    })
);

const StyledAvatar = styled(Avatar)(({ theme }) => ({
    width: theme.spacing(4),
    height: theme.spacing(4),
    backgroundColor: theme.palette.secondary.main,
}));

export default function Drawer({ open }: { open: boolean }) {
    const auth = useAuthContext();
    const [user, setUser] = React.useState<User | null>();

    const handleAuth = (state: State<User | null>) => {
        setUser(state.value);
    };

    React.useEffect(() => {
        auth.attach(handleAuth);
        auth.validate();
        return () => auth.detach(handleAuth);
    }, [auth]);

    return (
        <StyledDrawer
            variant="permanent"
            open={open}
            PaperProps={{ elevation: 2 }}
        >
            <Toolbar />
            <List>
                <ListItem>
                    <Tooltip title={user?.username ?? ''}>
                        <ListItemIcon>
                            <StyledAvatar>
                                {user?.username.charAt(0)}
                            </StyledAvatar>
                        </ListItemIcon>
                    </Tooltip>
                    <ListItemText
                        primary={
                            <Box>
                                <Typography variant="h6">
                                    {user?.username}
                                </Typography>
                                <Typography variant="subtitle2">
                                    {user?.email}
                                </Typography>
                            </Box>
                        }
                    />
                </ListItem>
            </List>
            <List>
                
                <ListItem
                    button
                    onClick={() => navigate('/dashboard/newuser')}>
                    <Tooltip title="New User">
                        <ListItemIcon>
                            <NewuserIcon />
                        </ListItemIcon>
                    </Tooltip>
                    <ListItemText primary="New User" />
                </ListItem>

                <ListItem
                    button
                    onClick={() => navigate('/dashboard/existinguser')}>
                    <Tooltip title="Existing User">
                        <ListItemIcon>
                            <ExcistinguserIcon />
                        </ListItemIcon>
                    </Tooltip>
                    <ListItemText primary="Existing User" />
                </ListItem>

                <ListItem
                    button
                    onClick={() => navigate('/dashboard')}>
                    <Tooltip title="RBUI Summary Dashboard">
                        <ListItemIcon>
                            <ProjectIcon />
                        </ListItemIcon>
                    </Tooltip>
                    <ListItemText primary="RBUI Dashboard" />
                </ListItem>

                <ListItem button onClick={() => navigate('/dashboard/CreatePlatform')}>
                    <Tooltip title="Projects">
                        <ListItemIcon>
                            <SiteIcon />
                        </ListItemIcon>
                    </Tooltip>
                    <ListItemText primary="Projects" />
                </ListItem>

                {/* <ListItem
                    button
                    onClick={() => navigate('/dashboard/platforms')}
                >
                    <Tooltip title="Platforms">
                        <ListItemIcon>
                            <PlatformIcon />
                        </ListItemIcon>
                    </Tooltip>
                    <ListItemText primary="Platforms" />
                </ListItem> */}
                <ListItem button onClick={() => auth.logout()}>
                    <Tooltip title="Logout">
                        <ListItemIcon>
                            <ExitToAppIcon />
                        </ListItemIcon>
                    </Tooltip>
                    <ListItemText primary="Logout" />
                </ListItem>
            </List>
        </StyledDrawer>
    );
}
