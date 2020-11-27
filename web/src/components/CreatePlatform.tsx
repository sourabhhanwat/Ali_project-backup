import Grid from '@material-ui/core/Grid';
import { styled, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { navigate, RouteComponentProps, useMatch } from '@reach/router';
import React from 'react';
import '../modules/Subject';
import { SkeletonProjectCard } from './ProjectCard';
import Button from '@material-ui/core/Button';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';

import { Link } from '@reach/router';
// -----------------------
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { usePlatformList } from './PlatformListProvider';
import { SkeletonPlatformCard } from './PlatformCard';
import { useProjectList } from './ProjectListProvider';
import { Box } from '@material-ui/core';
import axios from "axios";


var p = {
    height: '20px',
};

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);


//   function createData(no: string, Platform_Name: string, Primary_Function: string, Platfom_Manned_Status: string, Platform_Risk_Ranking: string,
//     Exposure_Category: string, Inspection_Intervals: string, Last_Inspection_Date: string, Next_Inspection_Date: string, Next_10_year: string ) {
//     return { no, Platform_Name, Primary_Function, Platfom_Manned_Status, Platform_Risk_Ranking, Exposure_Category ,  Inspection_Intervals,
//         Last_Inspection_Date, Next_Inspection_Date, Next_10_year };
//   }
  
//   const rows = [
//     createData('1', 'PP', 'Production (P)', 'Yes', 'VH','L-1', '1', '01/03/2019', '01/03/2019', 'Level 1'),
//     createData('2', 'RP', 'Production (P)', 'NO', 'H', 'L-1', '3', '01/03/2019', '01/03/2019', 'Level 1'),
//     createData('3', 'WP1', 'Drilling (D)', 'Yes', 'M', 'L-1', '6', '01/03/2019', '01/03/2019', 'Level 1'),
//     createData('4', 'WP10', 'Drilling (D)', 'Yes', 'M', 'L-1', '3', '01/03/2019', '01/03/2019', 'Level 1'),
//     createData('5', 'QP', 'LQ (Q)', 'Yes', 'L', 'L-1', '3', '01/03/2019', '01/03/2019', 'Level 1'),
//   ];
  
  const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
  });


// const StyledDivider = styled(Divider)(
//     ({
//         theme,
//         bgcolor,
//     }: {
//         theme: Theme;
//         bgcolor?: 'veryHigh' | 'high' | 'medium' | 'low' | 'veryLow';
//     }) => ({
//         backgroundColor: bgcolor
//             ? theme.palette[bgcolor].main
//             : theme.palette.divider,
//         height: 4,
//         marginTop: theme.spacing(1),
//         marginBottom: theme.spacing(1),
//         width: theme.spacing(4),
//         border: `1px solid ${
//             bgcolor ? theme.palette[bgcolor].main : theme.palette.divider
//         }`,
//         borderRadius: theme.spacing(1),
//     })
// );

const StyledTypography = styled(Typography)({
    textTransform: 'uppercase',
    fontWeight: 800,
});

const SkeletonProjectCards = React.memo(() => (
    <>
        {[...Array(3).keys()].map((id) => (
            <Grid key={id} item xs={12}>
                <SkeletonProjectCard />
            </Grid>
        ))}
    </>
));

const SkeletonPlatformCards = React.memo(() => (
    <>
        {[...Array(3).keys()].map((index) => (
            <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                <SkeletonPlatformCard />
            </Grid>
        ))}
    </>
));



export default function CreatePlatform(_: RouteComponentProps) {


    // const { subject } = useProjectList();
    // const [isPending, setIsPending] = React.useState<boolean | undefined>();
    // const [projects, setProjects] = React.useState<Project[] | null>();

    // const handleProjectList = (state: State<Project[] | null>) => {
    //     setIsPending(state.isPending);
    //     setProjects(state.value);
    // };

    // React.useEffect(() => {
    //     subject.attach(handleProjectList);
    //     subject.list();
    //     return () => subject.detach(handleProjectList);
    // }, [subject]);

    const { subject } = useProjectList();
    // const [isPending, setIsPending] = React.useState<boolean | undefined>();
    const [projects, setProjects] = React.useState<Project[] | null>();

    const handleProjectList = (state: State<Project[] | null>) => {
        setIsPending(state.isPending);
        setProjects(state.value);
    };

    React.useEffect(() => {
        subject.attach(handleProjectList);
        subject.list();
        return () => subject.detach(handleProjectList);
    }, [subject]);

    const platformList = usePlatformList();

    const [isPending, setIsPending] = React.useState<boolean>();
    const [platforms, setPlatforms] = React.useState<Platform[] | null>();

    const handlePlatformList = (state: State<Platform[] | null>) => {
        setIsPending(state.isPending);
        setPlatforms(state.value);
    };

    let projectId: number | undefined;

    const match = useMatch('/dashboard/project/:projectId/platforms');

    if (match) {
        projectId = parseInt((match as any).projectId);
    }

    const StyledLink = styled(Link)({ textDecoration: 'none' });

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

    const classes = useStyles();

    // let backgroundColor: string[] = [];
    // let Color: string[] = [];
    let data: number[] = [];
    // let hoverBackgroundColor: string[] = [];
    // let BackgroundColor: string[] = [];
    // let pltname: string[] = [];
    // let label: string[] = [];
    let id: number = 0;
    //=========================
    let i = 0;
    {platforms?.map((platform) => (
        data.push(i+1)
    ))}

    // {platforms?.map((platform) => (
    //     pltname.push(platform.name)
    //     ))}
    // console.log(data)    


    //=========================
    // {platforms?.map((platform) => (
    //     backgroundColor.push(platform.risk_ranking)
    // ))}

    // const state = {
    //     labels: pltname,
    //     datasets: [
    //       {
    //         label: 'Platform Risk',
    //         backgroundColor: Color,
    //         hoverBackgroundColor: BackgroundColor,
    //         data: data
    //       }
    //     ]
    //   }

    const deleteProject = (value : any) => {

        console.log(value);

        axios.post('/api/v1/deleteproject/', {
            projectId: value,
          })
    
          .then(function (response) {
            console.log(response);
        })
          .catch(function (error) {
            console.log(error);
          });
      
    };

    return ( 
        <>
            {/* <Box justifyContent="flex-end" my={2}>Create Platform */}
                        {/* <p style={p}></p> */}
            {/* </Box> */}

            <Box display="flex" justifyContent="flex-end" my={2}>
                <Box fontWeight={800} clone>
                    <Button
                        onClick={() => navigate('/dashboard/newProject')}
                        variant="contained"
                        size="large"
                        color="primary"
                        style={{margin: 5}}
                        disabled={isPending}>
                        Add Project
                    </Button>
                </Box>

                {/* <Box fontWeight={800} clone>
                    <Button
                        onClick={() => navigate('/dashboard/newProject')}
                        variant="contained"
                        size="large"
                        color="primary"
                        style={{margin: 5}}
                        disabled={isPending}>
                        Update Project
                    </Button>
                </Box>

                <Box fontWeight={800} clone>
                    <Button
                        onClick={() => navigate('/dashboard/newProject')}
                        variant="contained"
                        size="large"
                        color="primary"
                        style={{margin: 5}}
                        disabled={isPending}>
                        Delete Project
                    </Button>
                </Box> */}
                    
            </Box>

            <Grid container spacing={2}>

                    <Grid item container spacing={1}>
                        <h3>Project List : </h3>
                    </Grid>

                    <Grid item container spacing={3}>
                        {/* {projects?.map((project) => (
                            <Grid key={project.id} item xs={12}>
                                <p>{project.name}</p>
                                {/* <ProjectCard project={project} /> */}
                            {/* </Grid> */}
                        {/* ))} */}
                        {/* {isPending && <SkeletonProjectCards />}  */}

                        <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label="customized table">
                                <TableHead >
                                    <TableRow>
                                        <StyledTableCell style={{minWidth: 30}} align="center" >S No.</StyledTableCell>
                                        <StyledTableCell style={{minWidth: 30}} align="center">Project Name</StyledTableCell>
                                        <StyledTableCell  style={{minWidth: 30}} align="center">Project Description</StyledTableCell>
                                        <StyledTableCell style={{minWidth: 30}} align="center">Start Date</StyledTableCell>
                                        <StyledTableCell  style={{minWidth: 30}} align="center">End Date</StyledTableCell>
                                        <StyledTableCell align="center" >Project &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Platform</StyledTableCell>
                                        {/* <StyledTableCell align="center" >Platform</StyledTableCell> */}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {projects?.map((project) => (

                                    <StyledTableRow key={project.id}>
                                    <StyledTableCell style={{minWidth: 30}} align="center" component="th" scope="row"> {id += 1 }</StyledTableCell>                                    
                                    <StyledTableCell style={{minWidth: 30}} align="center" component="th" scope="row">{project.name}</StyledTableCell>             
                                    <StyledTableCell style={{minWidth: 30}} align="center">{project.description}</StyledTableCell>
                                    <StyledTableCell style={{minWidth: 30}} align="center">{project.start_date.toString().split('T')[0]}</StyledTableCell>             
                                    <StyledTableCell style={{minWidth: 30}} align="center">{project.end_date.toString().split('T')[0]}</StyledTableCell>
                                    <StyledTableCell align="center" >
                                        <StyledLink to={`/dashboard/UpdateProject/${project.id}`}>
                                                <Button size= "medium" color="primary">
                                                <UpdateIcon />
                                                </Button>
                                        </StyledLink> 
                                        <StyledLink to={`/dashboard/CreatePlatform/`}>
                                                <Button size= "medium" color="primary"
                                                    onClick={() => deleteProject(project.id)}
                                                >
                                                
                                                    <DeleteIcon />
                                                </Button>
                                        </StyledLink>
                                    {/* </StyledTableCell>
                                    <StyledTableCell align="center"> */}
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <StyledLink to={`/dashboard/NewPlatform/${project.id}`}>
                                                <Button size= "medium" color="primary" >
                                                    Create<ChevronRightIcon />
                                                </Button>
                                        </StyledLink>
                                        <StyledLink to={`/dashboard/project/${project.id}/platforms`}>
                                                <Button size= "medium" color="primary" >
                                                    View <ChevronRightIcon />
                                                </Button>
                                        </StyledLink>
                                     </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                                </TableBody>
                            </Table>
                            </TableContainer>

                    </Grid>

                    <Grid item container spacing={1}>
                        <p style={p}></p>
                    </Grid>
            
            </Grid>
            
        </>
    );
}