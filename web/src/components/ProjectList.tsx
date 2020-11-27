import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { styled, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { RouteComponentProps, useMatch } from '@reach/router';
import React from 'react';
import '../modules/Subject';
import { SkeletonProjectCard } from './ProjectCard';
import {Pie} from 'react-chartjs-2';
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
import { Box, Button } from '@material-ui/core';
import { useProjectList } from './ProjectListProvider';
import MaterialTable from 'material-table';
import { useForm } from "react-hook-form";
import { ContinuousColorLegend } from 'react-vis';

  
interface IFormInput {
    firstName: string;
}

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
  

  function createData(no: string, Platform_Name: string, Primary_Function: string, Platfom_Manned_Status: string, Platform_Risk_Ranking: string,
    Exposure_Category: string, Inspection_Intervals: string, Last_Inspection_Date: string, Next_Inspection_Date: string, Next_10_year: string ) {
    return { no, Platform_Name, Primary_Function, Platfom_Manned_Status, Platform_Risk_Ranking, Exposure_Category ,  Inspection_Intervals,
        Last_Inspection_Date, Next_Inspection_Date, Next_10_year };
  }
  
  const rows = [
    createData('1', 'PP', 'Production (P)', 'Yes', 'VH','L-1', '1', '01/03/2019', '01/03/2019', 'Level 1'),
    createData('2', 'RP', 'Production (P)', 'NO', 'H', 'L-1', '3', '01/03/2019', '01/03/2019', 'Level 1'),
    createData('3', 'WP1', 'Drilling (D)', 'Yes', 'M', 'L-1', '6', '01/03/2019', '01/03/2019', 'Level 1'),
    createData('4', 'WP10', 'Drilling (D)', 'Yes', 'M', 'L-1', '3', '01/03/2019', '01/03/2019', 'Level 1'),
    createData('5', 'QP', 'LQ (Q)', 'Yes', 'L', 'L-1', '3', '01/03/2019', '01/03/2019', 'Level 1'),
  ];
  
  const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
  });


const StyledDivider = styled(Divider)(
    ({
        theme,
        bgcolor,
    }: {
        theme: Theme;
        bgcolor?: 'veryHigh' | 'high' | 'medium' | 'low' | 'veryLow';
    }) => ({
        backgroundColor: bgcolor
            ? theme.palette[bgcolor].main
            : theme.palette.divider,
        height: 4,
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        width: theme.spacing(4),
        border: `1px solid ${
            bgcolor ? theme.palette[bgcolor].main : theme.palette.divider
        }`,
        borderRadius: theme.spacing(1),
    })
);

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


export default function ProjectList(_: RouteComponentProps) {

    const { register, handleSubmit } = useForm<IFormInput>();

    const [project, updateProject] = React.useState<any>([]);


    const { subject } = useProjectList();
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

    console.log("project====>", projects);

    let searchresult : any


    const platformList = usePlatformList();

    const [isPending, setIsPending] = React.useState<boolean>();
    const [platforms, setPlatforms] = React.useState<Platform[] | null>();
    const [copied, copyPlatforms] = React.useState<Platform[] | null>();

    const handlePlatformList = (state: State<Platform[] | null>) => {
        setIsPending(state.isPending);
        setPlatforms(state.value);
        copyPlatforms(state.value);
    };

    const onSubmit = (data: IFormInput) => {
        let searchdata = data.firstName;

        if(!searchdata){
            console.log("INSIDE IF ==>", platforms)
            setPlatforms(copied)
        }

        else{
            let searchId = projects?.filter((v : any) => v.name == searchdata)
            // console.log('project 1 value = ', values)
            // console.log("I am searched ==>" , searchdata, searchId ? searchId[0].id : null )   

            searchresult = searchId ? searchId[0].id : null;
            console.log("platform 2 value ===>" ,platforms)
            let values = platforms?.filter((v) => v.project == searchresult)
            console.log('project 2 value ===> ', values)
            setPlatforms(values);
        }
        
        
    };
    
    console.log("I AM TESTING ===> ", platforms)

    let projectId: number | undefined;

    const match = useMatch('/dashboard/project/:projectId/platforms');

    if (match) {
        projectId = parseInt((match as any).siteId);
    }

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

    console.log("I AM PLATFORM ==>", platformList.subject)

    React.useEffect(() => {
        platformList.subject.attach(handlePlatformList);
        fetch();
        return () => platformList.subject.detach(handlePlatformList);
    }, [fetch, platformList.subject]);



    const classes = useStyles();

    let backgroundColor: string[] = [];
    let Color: string[] = [];
    let data: number[] = [];
    let hoverBackgroundColor: string[] = [];
    let BackgroundColor: string[] = [];
    let pltname: string[] = [];
    let label: string[] = [];
    let id: number = 0;

    //=========================
    let i = 0;
    {platforms?.map((platform) => (
        data.push(i+1)
    ))}

    {platforms?.map((platform) => (
        pltname.push(platform.name)
        ))}
    // console.log(data)    


    //=========================
    var arr: (string | null)[]= []
    {platforms?.map((platform) => (
        arr.push(platform.risk_ranking)
        // var val = arr.push(8)
    ))}

    for(let i in arr){

        switch(arr[i]) { 
            case "VL": { 
               label.push('Very Low')
               console.log('VL')
               Color.push('#006400');
               hoverBackgroundColor.push('#006400');
            //    console.log("Excellent"); 
               break; 
            } 
            case "H": { 
                label.push('High')
                console.log('high')
                Color.push('#FF8C00');
                hoverBackgroundColor.push('#FF8C00');
                break; 
            } 
            case "M": {
                label.push('Medium')
                console.log('Medium')
                Color.push('#FFA500');
                hoverBackgroundColor.push('#FFA500');
                break;    
            } 
            case "L": { 
                label.push('Low')
                console.log('Low')
                Color.push('#ADFF2F');
                hoverBackgroundColor.push('#ADFF2F');
                break; 
            }  
            default: { 
                label.push('Very High')
                console.log('VH')
                Color.push('#FF0000');
                hoverBackgroundColor.push('#FF0000');
                break;              
            } 
        }
    }

    const state = {
        labels: pltname,
        datasets: [
          {
            label: 'Platform Risk',
            backgroundColor: Color,
            hoverBackgroundColor: BackgroundColor,
            data: data
          }
        ]
      }

    return ( 
        <form onSubmit={handleSubmit(onSubmit)}>

            <Grid container spacing={2}>
                    <Grid item container spacing={1}>
                        <Grid item xs={12}>
                                <Pie
                                    data={state}
                                    width={500}
                                    height={140}
                                    options={{
                                        title:{
                                            display:true,
                                            text:'',
                                            fontSize:20
                                            },
                                        legend:{
                                        display:true,
                                        position:'bottom'
                                        }
                                    }}
                                />
                        </Grid>  
                    </Grid>

                    <Grid item container spacing={1}>
                        <p style={p}></p>
                    </Grid>

                    <Grid item container spacing={1}>
                         <h3>Platform List : </h3>
                    </Grid>
                    
                    {/* /// search Box Added  */}

                    <Grid item container spacing={1}>
                        <Grid item xs={8}>
                            {/* <form onSubmit={handleSubmit(onSubmit)}> */}
                                <input style={{ width : "400px" , height: "40px", margin:"10px"}} placeholder="Search by Project Name" name="firstName"  ref={register}/> 
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;
                                <Box fontWeight={800} clone>
                                    <Button
                                        type = "submit"
                                        variant="contained"
                                        size="large"
                                        color="primary"
                                        style={{margin: 5}}
                                        disabled={isPending}>
                                        Submit
                                    </Button>
                                </Box>
                        </Grid>
                       
                    </Grid>
                    {/* SearchBox Ended */}

                    <Grid item container spacing={1}>
                        <Grid item xs={12}>
                        <TableContainer component={Paper}>
                            
                            <Table className={classes.table} aria-label="customized table">
                                <TableHead >
                                    <TableRow>
                                        <StyledTableCell style={{minWidth: 120}} align="center" >S No.</StyledTableCell>
                                        <StyledTableCell style={{minWidth: 120}} align="center">Platform Name</StyledTableCell>
                                        <StyledTableCell  style={{minWidth: 120}} align="center">Primary Function</StyledTableCell>
                                        <StyledTableCell style={{minWidth: 120}} align="center">Platform Manned Status</StyledTableCell>
                                        <StyledTableCell style={{minWidth: 120}} align="center">Platform Risk Ranking</StyledTableCell>
                                        <StyledTableCell style={{minWidth: 120}} align="center">Exposure Category</StyledTableCell>
                                        <StyledTableCell colSpan={3} style={{minWidth: 120}} align="center">Selected Next Inspection Intervals (years)</StyledTableCell>
                                        <StyledTableCell colSpan={3} style={{minWidth: 120}} align="center">Last Inspection Date</StyledTableCell>
                                        <StyledTableCell colSpan={3} style={{minWidth: 120}} align="center">Next Inspection Date</StyledTableCell>
                                        <StyledTableCell colSpan={10} style={{minWidth: 120}} align="center">Recommended Inspection Plan for Next 10 years</StyledTableCell>
                                    </TableRow>
                                    <TableRow>
                                        <StyledTableCell style={{minWidth: 120}} ></StyledTableCell>
                                        <StyledTableCell style={{minWidth: 120}} align="center"></StyledTableCell>
                                        <StyledTableCell  style={{minWidth: 120}} align="center"></StyledTableCell>
                                        <StyledTableCell style={{minWidth: 120}} align="center"></StyledTableCell>
                                        <StyledTableCell style={{minWidth: 120}} align="center"></StyledTableCell>
                                        <StyledTableCell style={{minWidth: 120}} align="center"></StyledTableCell>
                                        <StyledTableCell style={{minWidth: 120}} align="center">Level 1</StyledTableCell>
                                        <StyledTableCell style={{minWidth: 120}} align="center">Level 2</StyledTableCell>
                                        <StyledTableCell style={{minWidth: 120}} align="center">Level 3</StyledTableCell>
                                        <StyledTableCell style={{minWidth: 120}} align="center">Level 1</StyledTableCell>
                                        <StyledTableCell style={{minWidth: 120}} align="center">Level 2</StyledTableCell>
                                        <StyledTableCell style={{minWidth: 120}} align="center">Level 3</StyledTableCell>
                                        <StyledTableCell style={{minWidth: 120}} align="center">Level 1</StyledTableCell>
                                        <StyledTableCell style={{minWidth: 120}} align="center">Level 2</StyledTableCell>
                                        <StyledTableCell style={{minWidth: 120}} align="center">Level 3</StyledTableCell>
                                        <StyledTableCell style={{minWidth: 120}} align="center">2020</StyledTableCell>
                                        <StyledTableCell style={{minWidth: 120}} align="center">2021</StyledTableCell>
                                        <StyledTableCell style={{minWidth: 120}} align="center">2022</StyledTableCell>
                                        <StyledTableCell style={{minWidth: 120}} align="center">2023</StyledTableCell>
                                        <StyledTableCell style={{minWidth: 120}} align="center">2024</StyledTableCell>
                                        <StyledTableCell style={{minWidth: 120}} align="center">2025</StyledTableCell>
                                        <StyledTableCell style={{minWidth: 120}} align="center">2026</StyledTableCell>
                                        <StyledTableCell style={{minWidth: 120}} align="center">2027</StyledTableCell>
                                        <StyledTableCell style={{minWidth: 120}} align="center">2028</StyledTableCell>
                                        <StyledTableCell style={{minWidth: 120}} align="center">2029</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {platforms?.map((platform) => (

                                    // console.log("DATATAT ===>" ,platform.manned);
                                    <StyledTableRow key={platform.id}>
                                    <StyledTableCell style={{minWidth: 120}} align="center" component="th" scope="row"> {id += 1}</StyledTableCell>
                                    <StyledTableCell style={{minWidth: 120}} align="center" component="th" scope="row">{platform.name}</StyledTableCell>             
                                    <StyledTableCell style={{minWidth: 120}} align="center">{platform.environmental_consequence.platform_type == null ? '-' : platform.environmental_consequence.platform_type.name  }</StyledTableCell>
                                    <StyledTableCell style={{minWidth: 120}} align="center">{platform.manned == false ? 'False' : 'True'}</StyledTableCell>
                                    <StyledTableCell style={{minWidth: 120}} align="center">{platform.risk_ranking == null ? '-' : platform.risk_ranking}</StyledTableCell>
                                    <StyledTableCell style={{minWidth: 120}} align="center">{platform.exposure_category_level == null ? '-' : platform.exposure_category_level}</StyledTableCell>
                                    <StyledTableCell style={{minWidth: 120}} align="center">{platform.level_1_selected_inspection_interval_for_next_inspection}</StyledTableCell>
                                    <StyledTableCell style={{minWidth: 120}} align="center">{platform.level_2_selected_inspection_interval_for_next_inspection}</StyledTableCell>
                                    <StyledTableCell style={{minWidth: 120}} align="center">{platform.level_3_selected_inspection_interval_for_next_inspection}</StyledTableCell>
                                    <StyledTableCell style={{minWidth: 120}} align="center">{platform.level_1_last_inspection_date}</StyledTableCell>
                                    <StyledTableCell style={{minWidth: 120}} align="center">{platform.level_2_last_inspection_date}</StyledTableCell>
                                    <StyledTableCell style={{minWidth: 120}} align="center">{platform.level_3_last_inspection_date}</StyledTableCell>
                                    <StyledTableCell style={{minWidth: 120}} align="center">{platform.level_1_next_inspection_date}</StyledTableCell>
                                    <StyledTableCell style={{minWidth: 120}} align="center">{platform.level_2_next_inspection_date}</StyledTableCell>
                                    <StyledTableCell style={{minWidth: 120}} align="center">{platform.level_3_next_inspection_date}</StyledTableCell>
                                    
                                    {platform.next_10_years_inspection_plan?.map((next) => (
                                        <StyledTableCell style={{minWidth: 130}} align="center">{next.level}</StyledTableCell>
                                    ))},
                                    {/* <StyledTableCell style={{minWidth: 130}} align="center">Level 3</StyledTableCell>
                                    <StyledTableCell style={{minWidth: 130}} align="center">Level 1 Level 2</StyledTableCell>
                                    <StyledTableCell style={{minWidth: 130}} align="center">Level 2</StyledTableCell>
                                    <StyledTableCell style={{minWidth: 130}} align="center">Level 1 Level 2 Level 3</StyledTableCell>
                                    <StyledTableCell style={{minWidth: 130}} align="center">Level 2</StyledTableCell>
                                    <StyledTableCell style={{minWidth: 130}} align="center">Level 1</StyledTableCell>
                                    <StyledTableCell style={{minWidth: 130}} align="center">Level 2</StyledTableCell>
                                    <StyledTableCell style={{minWidth: 130}} align="center">Level 2</StyledTableCell>
                                    <StyledTableCell style={{minWidth: 130}} align="center">Level 2</StyledTableCell>
                                    <StyledTableCell style={{minWidth: 130}} align="center">Level 2 Level 3</StyledTableCell> */}
                                    
                                    </StyledTableRow>
                                ))}
                                </TableBody>
                            </Table>
                            </TableContainer>
                        </Grid>  
                    </Grid>


                    <Grid item container spacing={1}>
                        <p style={p}></p>
                    </Grid>           
            </Grid>
            
            </form>
                );
}