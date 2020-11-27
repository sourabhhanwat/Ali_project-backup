import Box from '@material-ui/core/Box';
import { Accordion } from '@material-ui/core'
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import '../../../modules/Subject';
import Checkbox from '../../FormWidget/Checkbox';
import Select from '../../FormWidget/Select';
import { usePlatformMannedStatusListContext } from '../../PlatformMannedStatusListProvider';
import ExpansionRow from '../ExpansionRow';
import AdditionalAppurtenance from './AdditionalAppurtenance';
import BraceLegs from './BraceLegs';
import Corrosion from './Corrosion';
import DeckElevationWaveInDeck from './DeckElevationWaveInDeck';
import DeckLoad from './DeckLoad';
import FatigueLoad from './FatigueLoad';
import FloodedMember from './FloodedMember';
import GroutedPiles from './GroutedPiles';
import LastInspection from './LastInspection';
import MarineGrowth from './MarineGrowth';
import MechanicalDamage from './MechanicalDamage';
import PlatformVintage from './PlatformVintage';
import Scour from './Scour';
import ShallowGas from './ShallowGas';
import UnprotectedAppurtenances from './UnprotectedAppurtenances';
import TextField from '../../FormWidget/TextField';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import IconButton from '@material-ui/core/IconButton';
import Info from '@material-ui/icons/Info';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import 'dropdown-select/dist/css/dropdown-select.css';
import axios from "axios";
import {styled} from '@material-ui/core';

enum CatEnum {
    A = "A",
    B = "B",
    C = "C",
    D = "D",
    E = "E"
  }


  const StyledImage = styled('img')(({ theme }) => ({
    width: theme.spacing(60),
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
    objectFit: 'contain',
    textAlign: 'center',
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 12,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(lof: string, score: string) {
  return { lof, score };
}

function createData1(cof: string, ilof: string, clof: string) {
    return { cof, ilof , clof};
  }


const rows = [
  createData('5', ' ≥ 680'),
  createData('4', '>= 490 to < 680'),
  createData('3','≥ 310 to < 490' ),
  createData('2', '≥ 120 < 310'),
  createData('1','< 120' ),
];

function createData2(a: string, b: string, c: string) {
    return { a, b , c};
  }


const rows_env = [
  createData2('E', ' ≥ 50,000','Event where structural failure is expected to cause more than 50,000 equivalent bbl oil leak'),
  createData2('D', ' ≥ 5,000 to < 50,000','Event where structural failure is expected to cause between 5,000 to 50,000 equivalent bbl oil leak'),
  createData2('C', '>= 500 to < 5,000','Event where structural failure is expected to cause between 500 to 5,000 equivalent bbl oil leak'),
  createData2('B','≥ 50 to < 500', 'Event where structural failure is expected to cause between 50 to 500 equivalent bbl oil leak'),
  createData2('A', '< 50','Event where structural failure is expected to cause between 1 to 50 equivalent bbl oil leak'),
];

function createData3(a: string, b: string, c: string) {
    return { a, b , c};
}


const rows_eco = [
  createData3('E', ' ≥ 100','The consequence of failure represents very high cost'),
  createData3('D', ' ≥ 75 - < 100','The consequence of failure represents very high cost'),
  createData3('C', '>= 45 - < 75','The consequence of failure represents  medium cost'),
  createData3('B','≥ 6 - < 45', 'The consequence of failure represents low cost'),
  createData3('A', '< 6','The consequence of failure represents very low cost'),
];

function createData4(a: string, b: string, c: string) {
    return { a, b , c};
}


const rows_cof = [
  createData3('E', 'Manned Non-Evacuated','The manned, non-evacuated category refres to a platform that is continuosly occupied by persons accommodated and living thereon, and personnel evacuation prior to the design metocean, or it is impractical.'),
  createData3('D', 'Not-Normally Manned with Temporary Accommodation','The not-normally manned category refres to a platform that is not normally manned, which is occasionally manned.'),
  createData3('C', 'Not-Normally Manned without any Accommodation,but with a Boat-Landing or bridge linked to another platform','The not-normally manned category refers to a platform that is not normally manned, which is occasionally manned.'),
  createData3('B','Not in use', 'Not Applicable'),
  createData3('A', 'Unmanned or Manned-Evacuated','The unmanned category refers to a platform that is not normally manned and has no accommodation, no boat landing and no bridge link to another platform.'),
];

const useStyles = makeStyles({
  table: {
    minWidth: 200,
  },
});

const graphStyles = makeStyles({
    table: {
        border: '1.6px solid white',
        fontSize: 26,
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
    },

    table_head: {
        width: '29rem',
        borderCollapse : 'collapse',
        margin: '0 auto',
    },

    x_design:{
        transform: 'rotate(-90deg)',
        color: 'black',
        width: '1%',
        fontSize: '15px',
        letterSpacing: '1.5px',
    },

    y_design:{
        textAlign: 'end',
        color: 'black',
        fontSize: '15px',
        letterSpacing: '1.5px',
        paddingRight: '1.8rem', 
    },

    x_axis :{
        borderTop : '2px solid black',
        textAlign: 'center',
        fontWeight: 'bold',
        height: 60,
        width: '10%'
    },

    y_axis : {
        borderRight : '2px solid black',
        height: 60,
        width: '10%',
        textAlign: 'center',
        fontWeight: 'bold',
    },

    red: {
        backgroundColor: '#FF0000',
    },

    darkGreen:{
        backgroundColor: '#539204',
    },

    lightGreen: {
        backgroundColor: '#92D050',
    },

    orange: {
        backgroundColor: '#FFC000',
    },

    yellow: {
        backgroundColor: '#FFFF00'
    },

});

export default function EvaluationTab(this: any, { hidden }: { hidden?: boolean }) {

    const [lst, setLst] = React.useState([])    

    const onDrop = () => {
        axios.get('/api/v1/category/')
        .then(function (response) {
          setLst(response.data.map((item: any) => item))
        })
        .catch(function (error) {
          console.log(error);
        });
      };

    const { watch } = useFormContext();

    const classes = useStyles();

    const graph = graphStyles();

    const platformMannedStatusListSubject = usePlatformMannedStatusListContext();

    const platform_manned_status_id = watch('platform_manned_status_id');

    
    // console.log(platform_manned_status_id);


    let state = {
        labels: ['January', 'February', 'March',
                 'April', 'May'],
        datasets: [
          {
            label: 'Rainfall',
            backgroundColor: [
              '#B21F00',
              '#C9DE00',
              '#2FDE00',
              '#00A6B4',
              '#6800B4'
            ],
            hoverBackgroundColor: [
            '#501800',
            '#4B5000',
            '#175000',
            '#003350',
            '#35014F'
            ],
            data: [65, 59, 80, 81, 56]
          }
        ]
      }

    const [
        platformMannedStatusList,
        setPlatformMannedStatusList,
    ] = React.useState<platform_manned_status[]>([]);

    const handlePlatformMannedStatus = React.useCallback(
        (state: State<platform_manned_status[] | null>) => {
            setPlatformMannedStatusList(state.value ?? []);
        },
        []
    );

    React.useEffect(() => {
        platformMannedStatusListSubject.attach(handlePlatformMannedStatus);
        return () =>
            platformMannedStatusListSubject.detach(handlePlatformMannedStatus);
    }, [platformMannedStatusListSubject, handlePlatformMannedStatus]);

    const platformMannedStatus = React.useMemo(
        () =>
            platformMannedStatusList.find(
                (value) => value.id === platform_manned_status_id
            ),
        [platform_manned_status_id, platformMannedStatusList]
    );

    const daily_oil_production = watch(
        'environmental_consequence.daily_oil_production'
    );
    
    const environmental_consequence_description = watch(
        'environmental_consequence_description'
    );

    const calculated_economic_impact_consequence = watch(
        'calculated_economic_impact_consequence'
    );

    const calculate_economic_impact_remaining_life_services = watch(
        'calculate_economic_impact_remaining_life_services'
    );

    const structure_replacement_decision = watch(
            'structure_replacement_decision'
    );
    

    const final_consequence_category = watch(
        'final_consequence_category'
    );
    const economic_consequence_category = watch(
        'economic_consequence_category'
    );
    const environmental_consequence_category = watch(
        'environmental_consequence_category'
    );
     
    const lof_ranking = watch('lof_ranking');

    const risk_based_underwater_inspection_interval = watch(
        'risk_based_underwater_inspection_interval'
    );

    const risk_ranking = watch(
        'risk_ranking'
    );

    const calculated_environmental_consequence = watch(
        'calculated_environmental_consequence'
    );

    let calculated_environmental_consequence1 = (calculated_environmental_consequence === null) ?  'Unknown' : calculated_environmental_consequence;


    let structure_replacement_decision1 = (structure_replacement_decision === 'false') ?  'Do Not Replace' : ' Replace Structure';


    let environmental_consequence_description1 = (environmental_consequence_description === 'Unknown') ?  'environmental_consequence_description' : 'Blank';
    
    const sizes = [ "X-Small", "Small", "Medium", "Large", "X-Large", "2X-Large" ];

    let red = (risk_ranking === 'H') ?  'orange' : (risk_ranking === 'VH') ?  'red' : (risk_ranking === 'M') ?  'yellow' : (risk_ranking === 'L') ?  'yellowgreen' : 'green';    
    
    // Graph Calculation

    let graphMarking = lof_ranking + final_consequence_category;

    return (
        <Box hidden={hidden}>
            <Typography variant="h4" gutterBottom>
                Likelihood of Failure Calculation
            </Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell colSpan={2}>
                                <Checkbox
                                    name="reserve_strength_ratio_score.rsr_override"
                                    label="Override RSR?"
                                />
                            </TableCell>
                            <TableCell>
                                <Box clone fontWeight="fontWeightBold">
                                    <Typography variant="body2">
                                        RSR Override
                                    </Typography>
                                </Box>
                            </TableCell>
                            <TableCell>
                                <Box clone fontWeight="fontWeightBold">
                                    <Typography variant="body2">
                                        Evaluated Score
                                    </Typography>
                                </Box>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <ExpansionRow
                            title="Robustness Score"
                            score={watch('robustness_score')}
                            contentNoBorderBottom
                        >
                            <Table>
                                <TableBody>
                                    <PlatformVintage />
                                    <BraceLegs />
                                    <GroutedPiles />
                                    <ShallowGas />
                                </TableBody>
                            </Table>
                        </ExpansionRow>

                        <ExpansionRow
                            title="Condition Score"
                            score={watch('condition_score')}
                            contentNoBorderBottom
                        >
                            <Table>
                                <TableBody>
                                    <LastInspection />
                                    <MechanicalDamage />
                                    <Corrosion />
                                    <MarineGrowth />
                                    <Scour />
                                    <FloodedMember />
                                    <UnprotectedAppurtenances />
                                </TableBody>
                            </Table>
                        </ExpansionRow>

                        <ExpansionRow
                            title="Loading Score"
                            score={watch('loading_score')}
                            contentNoBorderBottom
                        >
                            <Table>
                                <TableBody>
                                    <DeckLoad />
                                    <DeckElevationWaveInDeck />
                                    <AdditionalAppurtenance />
                                    <FatigueLoad />
                                </TableBody>
                            </Table>
                        </ExpansionRow>

                        <TableRow>
                            <TableCell colSpan={2}></TableCell>
                            <TableCell>RSR Override Score</TableCell>
                            <TableCell>{watch('rsr_override_score')}</TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell colSpan={2}></TableCell>
                            <TableCell>Total Score</TableCell>
                            <TableCell>{watch('total_score')}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            
            <Grid container spacing={2}>
                <Grid item xs={4}>
                <Typography variant="h5" gutterBottom>
                    <p></p>
                    <p>Likelihood of Failure Category</p>
                </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="h5" gutterBottom>
                        <p></p>
                        {watch('lof_ranking')}
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    {/* // ek button */}
                    <Typography variant="h5" gutterBottom>
                        <p></p>
                        <p></p>
                        <p></p>
                    </Typography>
                    <Popup trigger={
                        <IconButton color="secondary" aria-label="add an alarm">
                        <Info />
                        </IconButton>
                    }>
                        <div >    
                            <TableContainer component={Paper}>
                                 <Table className={classes.table} aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell align="center" >LOF Ranking</StyledTableCell>
                                            <StyledTableCell align="center" >Total Score Range</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map((row) => (
                                            <StyledTableRow key={row.lof}>
                                            <StyledTableCell component="th" scope="row" align="center">
                                                {row.lof}
                                            </StyledTableCell>
                                            <StyledTableCell  align="center">{row.score}</StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                        </TableBody>
                                 </Table>
                            </TableContainer>
                        </div>
                    </Popup>
                </Grid>
            </Grid>

            <Typography variant="h4" gutterBottom>
                Consequence of Failure Calculation
            </Typography>

            <Box>
                <Accordion defaultExpanded>
                    <AccordionSummary style={{backgroundColor: "#68c1a6"}}>
                        <Typography style={{color: "White"}} variant="h6">Life-Safety Consequence</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={2}>
                        <Grid item xs={12} md={12}>
                         </Grid>
                            <Grid item xs={12}>
                                <Select
                                    toOption={(option) => option}
                                    name="platform_manned_status.id"
                                    subject={platformMannedStatusListSubject}
                                    label="Platform Manned Status"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Typography variant="subtitle2">
                                    Description
                                </Typography>
                                <Typography variant="body1">
                                    {platformMannedStatus?.description ??
                                        'Unknown'}
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="subtitle2">
                                    Ranking
                                </Typography>
                                <Typography variant="h5">
                                    {platformMannedStatus?.ranking ?? 'Unknown'}
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                    <Typography variant="h5" gutterBottom>
                        <p></p>
                        <p></p>
                        <p></p>
                        
                    </Typography>
                    <Box>
                         <Popup  trigger={      
                             <IconButton color="secondary" aria-label="add an alarm">
                              <Info />
                        </IconButton>
                        } position = 'top center' >
                        <div > 
                            <TableContainer style={{minWidth: 10}} component={Paper}>
                                 <Table className={classes.table} aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell style={{minWidth: 10}} align="center" >COF Ranking</StyledTableCell>
                                            <StyledTableCell style={{minWidth: 10}} align="center" >Platform Manned Status</StyledTableCell>
                                            <StyledTableCell style={{minWidth: 10}} align="center" >Description</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows_cof.map((row) => (
                                            <StyledTableRow style={{minWidth: 10}} key={row.a}>
                                            <StyledTableCell style={{minWidth: 10}} component="th" scope="row" align="center">
                                                {row.a}
                                            </StyledTableCell>
                                            <StyledTableCell style={{minWidth: 10}} align="center">
                                            {row.b}   
                                            </StyledTableCell>
                                            <StyledTableCell style={{minWidth: 10}} align="center"> 
                                            
                                                    {row.c}
                                            </StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                        </TableBody>
                                 </Table>
                            </TableContainer>
                        </div>
                    </Popup>
                    </Box>
                </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>

                <br />
                
                <Accordion>
                    <AccordionSummary style={{backgroundColor: "#68c1a6"}}>
                        <Typography  style={{color: "White"}} variant="h6">Environmental Consequence</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={2}>
                           <Grid item xs={12} md={12}>
                              </Grid>
                        <Grid item xs={6}>
                                <p>
                                Estimated Fraction of Oil Production Loss Due to Leakage
                                </p>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Estimated Fraction of Oil Production Loss Due to Leakage"
                                    name={[
                                        'environmental_consequence',
                                        'estimated_fraction_of_oil_production_loss_due_to_leakage',
                                    ]}
                                    unit="%"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <p>
                                Estimated Fraction of Oil Production Loss Due to LeakageFixed Cost for Spill Clean-up (Includes, mobilization of clean-up personnel, regulatory costs, etc.)
                                </p>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Fixed Cost for Spill Clean-up"
                                    name={[
                                        'environmental_consequence',
                                        'fixed_cost_for_spill_cleanup',
                                    ]}
                                    unit="$"
                                    helperText="Includes, mobilization of clean-up personnel, regulatory costs, etc"
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <p>
                                Variable Cost for Spill Clean-up (based on the size of spill volume)</p>
                            </Grid>

                            <Grid item xs={6}>
                                <TextField
                                    label="Variable Cost for Spill Clean-up"
                                    name={[
                                        'environmental_consequence',
                                        'variable_cost_for_spill_cleanup',
                                    ]}
                                    unit="$/bbl"
                                    helperText="Based on the size of spill volume"
                                />
                            </Grid>


                            <Grid item xs={6}>
                                <p>
                                Oil Price
                                </p>
                            </Grid>

                            <Grid item xs={6}>
                                <TextField
                                    label="Oil Price"
                                    name={[
                                        'environmental_consequence',
                                        'oil_price',
                                    ]}
                                    unit="$/bbl"
                                />
                            </Grid>

                            <Grid item xs={6}>
                                Calculated Environmental Consequence 
                            </Grid>

                            <Grid item xs={6}>
                                 <Typography variant="h5">
                                    {calculated_environmental_consequence1}
                                </Typography>
                                {/* <TextField
                                    disabled
                                    label="Calculated Environmental Consequence"
                                    name={[
                                        'calculated_environmental_consequence',
                                    ]}
                                    unit="Barrels of Oil Equivalent (BOE)"
                                /> */}
                            </Grid>

                            <Grid item xs={4}>
                            </Grid>

                            <Grid item xs={4}>
                                <p></p>
                                Description
                             </Grid>
                            
                            <Grid item xs={4}>
                                <Popup trigger={
                                        <IconButton color="secondary" aria-label="add an alarm">
                                            <Info />
                                        </IconButton>
                                    }>
                                    <div >    
                                        <TableContainer component={Paper}>
                                            <Table className={classes.table} aria-label="customized table">
                                            <TableHead>
                                                    <TableRow>
                                                        <StyledTableCell style={{minWidth: 10}} align="center" >COF Ranking</StyledTableCell>
                                                        <StyledTableCell style={{minWidth: 10}} align="center" >Quantitative BOE</StyledTableCell>
                                                        <StyledTableCell style={{minWidth: 10}} align="center" >Description</StyledTableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {rows_env.map((row) => (
                                                        <StyledTableRow key={row.a}>
                                                        <StyledTableCell component="th" scope="row" align="center">
                                                            {row.a}
                                                        </StyledTableCell>
                                                        <StyledTableCell  align="center">{row.b}</StyledTableCell>
                                                        <StyledTableCell  align="center">{row.c}</StyledTableCell>
                                                        </StyledTableRow>
                                                    ))}
                                                    </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </div>
                                </Popup>
                                    Category
                            </Grid>

                            <Grid item xs={4}>
                                <p></p>
                                Environmental Consequence
                            </Grid>

                            <Grid item xs={4}>
                            <TextField
                                    label="Free Text as per Client Risk Matrix"
                                    name= {['environmental_consequence_description']}
                                    multiline
                                />
                            </Grid>

                            <Grid item xs={4}>

                            <TextField
                                    label="Environmental Consequence Category"
                                    helperText="Entry only Between A,B,C,D and E"
                                    name={[
                                        'environmental_consequence_category',
                                    ]}
                                />

                            </Grid>

                        </Grid>
                    </AccordionDetails>
                </Accordion>
            
                <br />

                <Accordion>
                    <AccordionSummary style={{backgroundColor: "#68c1a6"}}>
                        <Typography style={{color: "White"}} variant="h6">Economic Impact Consequence</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={2}>
                              <Grid item xs={12} md={12}>
                                </Grid>
                        <Grid item xs={6}>
                                <p>
                                Gas Price
                                </p>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Gas Price"
                                    name={[
                                        'economic_impact_consequence',
                                        'gas_price',
                                    ]}
                                    unit="$/mscf"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <p>
                                Discount Rate for Interrupted Production                               
                                </p>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Discount Rate for Interrupted Production"
                                    name={[
                                        'economic_impact_consequence',
                                        'discount_date_for_interrupted_production',
                                    ]}
                                    unit="%"
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <p>
                                Fraction of Remaining Production Loss
                                </p>
                         </Grid>

                            <Grid item xs={6}>
                                <TextField
                                    label="Fraction of Remaining Production Loss"
                                    name={[
                                        'economic_impact_consequence',
                                        'fraction_of_remaining_production_loss',
                                    ]}
                                    unit="%"
                                />
                            </Grid>


                            <Grid item xs={6}>
                                <p>
                                Platform Replacement Cost
                                </p>
                            </Grid>

                            <Grid item xs={6}>
                                <TextField
                                    label="Platform Replacement Cost"
                                    name={[
                                        'economic_impact_consequence',
                                        'platform_replacement_cost',
                                    ]}
                                    unit="$"
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <p>
                                Platform Replacement Time
                                </p>
                            </Grid>

                            <Grid item xs={6}>
                                <TextField
                                    label="Platform Replacement Time"
                                    name={[
                                        'economic_impact_consequence',
                                        'platform_replacement_time',
                                    ]}
                                    unit="Days"
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <p>
                                Calculated Economic Impact Consequence
                                </p>
                            </Grid>

                            <Grid item xs={6}>
                                <Typography variant="body1">
                                    { calculated_economic_impact_consequence }
                                </Typography>
                            </Grid>

                            <Grid item xs={6}>
                                <p>
                                Calculated Economic Impact Consequence (Based on Remaining Service Life)
                                </p>
                            </Grid>

                            <Grid item xs={6}>
                                <Typography variant="body1">
                                    { calculate_economic_impact_remaining_life_services }
                                </Typography>
                            </Grid>

                            <Grid item xs={6}>
                                <p>
                                Structure Replacement Decision                                
                                </p>
                            </Grid>

                            <Grid item xs={6}>
                             <Typography variant="body1">
                                    { structure_replacement_decision1 }
                                </Typography>
                            </Grid>

                            <Grid item xs={4}>
                            </Grid>

                            <Grid item xs={4}>
                                <p>Description</p>
                            </Grid>

                            <Grid item xs={4}>
                            <Popup trigger={
                        <IconButton color="secondary" aria-label="add an alarm">
                        <Info />
                        </IconButton>
                    }>
                        <div >    

                            <TableContainer component={Paper}>
                                 <Table className={classes.table} aria-label="customized table">
                                 <TableHead>
                                        <TableRow>
                                            <StyledTableCell style={{minWidth: 10}} align="center" >COF Ranking</StyledTableCell>
                                            <StyledTableCell style={{minWidth: 10}} align="center" >Quantitative US$ Million</StyledTableCell>
                                            <StyledTableCell style={{minWidth: 10}} align="center" >Description</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows_eco.map((row) => (
                                            <StyledTableRow key={row.a}>
                                                <StyledTableCell component="th" scope="row" align="center">{row.a}</StyledTableCell>
                                                <StyledTableCell  align="center">{row.b}</StyledTableCell>
                                                <StyledTableCell  align="center">{row.c}</StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                        </TableBody>
                                 </Table>
                            </TableContainer>
                        </div>
                    </Popup>
                                Category
                            </Grid>

                            <Grid item xs={4}>
                                <p></p>
                                <p>Economic Consequence </p>
                            </Grid>

                            <Grid item xs={4}>
                            <TextField
                                    label="Free Text as per Client Risk Matrix"
                                    name={[
                                        'economic_consequence_description',
                                    ]}
                                    multiline
                                />
                            </Grid>

                            <Grid item xs={4}>

                            <TextField
                                    label="Economic Consequence Category"
                                    helperText="Entry only A,B,C,D and E"
                                    name={[
                                        'economic_consequence_category',
                                        // 'economic_consequence_description',
                                    ]}
                                />
                            </Grid>


                        </Grid>
                    </AccordionDetails>
                </Accordion>

                <br />

                <Accordion>
                    <AccordionSummary style={{backgroundColor: "#68c1a6"}}>
                        <Typography style={{color: "White"}} variant="h6" >Final Consequence Level</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={2}>
                              <Grid item xs={12} md={12}>
                             </Grid>
                        <Grid item xs={6}>
                                <p>
                                Life-Safety Consequence Category
                                </p>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="h5">
                                    {platformMannedStatus?.ranking ?? 'Unknown'}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <p>
                                Environmental Consequence Category                              
                                </p>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="h5">
                                    {environmental_consequence_category}
                                </Typography>
                                {/* <TextField
                                    label="Environmental Consequence Category"
                                    name={[
                                        'environmental_consequence_category',
                                    ]}
                                /> */}
                            </Grid>

                            <Grid item xs={6}>
                                <p>
                                Economic Consequence Category
                                </p>
                         </Grid>

                            <Grid item xs={6}>
                            <Typography variant="h5">
                                    {economic_consequence_category}
                                </Typography>
                            </Grid>


                            <Grid item xs={6}>
                                <p>
                                Final Consequence Category
                                </p>
                            </Grid>

                            <Grid item xs={6}>
                                <Typography variant="h5">
                                    {final_consequence_category}
                                </Typography>
                            </Grid>


                        </Grid>
                    </AccordionDetails>
                </Accordion>

                <br />

                <Accordion>
                    <AccordionSummary style={{backgroundColor: "#68c1a6"}}>
                        <Typography style={{color: "White"}} variant="h6" >Risk Evaluation</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={1}>  
                            <Grid item xs={12}></Grid>
                            <Grid item xs={6}>
                                <p>
                                Likelihood of Failure Category
                                </p>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    disabled
                                    label="Likelihood of Failure Category"
                                    name={[
                                        'lof_ranking',
                                    ]}
                                    
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <p>
                                Final Consequence Category                             
                                </p>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    disabled
                                    label="Final Consequence Category"
                                    name={[
                                        'final_consequence_category',
                                    ]}
                                    
                                />
                            </Grid> 
                            <Grid item xs={6}>
                                <p>
                                Risk Ranking
                                </p>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography style={{backgroundColor:red, textAlign:"center", color: "white", fontWeight:"bold", padding: "8px"}} variant="h5">
                                    {risk_ranking}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}></Grid>
                        </Grid>  
                         
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <div style={{marginTop: '3rem'}}>
                                <table className={graph.table_head}>
                                <tbody>
                                    <tr>
                                        <td rowSpan={5} className={graph.table+ " " +graph.x_design}>LIKELIHOOD OF FAILURE</td>
                                        <td className={graph.y_axis} id="">5</td>
                                        <td className={graph.table+ " " +graph.yellow} style={{borderTop: '2px solid black'}}>{graphMarking === '5A' ? 'M' : ''}</td>
                                        <td className={graph.table+ " " +graph.orange} style={{borderTop: '2px solid black'}}>{graphMarking === '5B' ? 'H' : ''}</td>
                                        <td className={graph.table+ " " +graph.orange} style={{borderTop: '2px solid black'}}>{graphMarking === '5C' ? 'H' : ''}</td>
                                        <td className={graph.table+ " " +graph.red} style={{borderTop: '2px solid black'}}>{graphMarking === '5D' ? 'VH' : ''}</td>
                                        <td className={graph.table+ " " +graph.red} style={{borderTop: '2px solid black', borderRight: '2px solid black'}}>{graphMarking === '5E' ? 'VH' : ''}</td>
                                    </tr>
                                    <tr>
                                        <td className={graph.y_axis}>4</td>
                                        <td className={graph.table+ " " +graph.lightGreen}>{graphMarking === '4A' ? 'L' : ''}</td>
                                        <td className={graph.table+ " " +graph.yellow}>{graphMarking === '4B' ? 'M' : ''}</td>
                                        <td className={graph.table+ " " +graph.orange}>{graphMarking === '4C' ? 'H' : ''}</td>
                                        <td className={graph.table+ " " +graph.orange}>{graphMarking === '4D' ? 'H' : ''}</td>
                                        <td className={graph.table+ " " +graph.red} style={{borderRight: '2px solid black'}}>{graphMarking === '4E' ? 'VH' : ''}</td>
                                    </tr>
                                    <tr>
                                        <td className={graph.y_axis}>3</td>
                                        <td className={graph.table+ " " +graph.lightGreen}>{graphMarking === '3A' ? 'L' : ''}</td>
                                        <td className={graph.table+ " " +graph.lightGreen}>{graphMarking === '3B' ? 'L' : ''}</td>
                                        <td className={graph.table+ " " +graph.yellow}>{graphMarking === '3C' ? 'M' : ''}</td>
                                        <td className={graph.table+ " " +graph.orange}>{graphMarking === '3D' ? 'H' : ''}</td>
                                        <td className={graph.table+ " " +graph.orange} style={{borderRight: '2px solid black'}}>{graphMarking === '3E' ? 'H' : ''}</td>
                                    </tr>
                                    <tr>
                                        <td className={graph.y_axis}>2</td>
                                        <td className={graph.table+ " " +graph.darkGreen}>{graphMarking === '2A' ? 'VL' : ''}</td>
                                        <td className={graph.table+ " " +graph.lightGreen}>{graphMarking === '2B' ? 'L' : ''}</td>
                                        <td className={graph.table+ " " +graph.lightGreen}>{graphMarking === '2C' ? 'L' : ''}</td>
                                        <td className={graph.table+ " " +graph.yellow}>{graphMarking === '2D' ? 'M' : ''}</td>
                                        <td className={graph.table+ " " +graph.orange} style={{borderRight: '2px solid black'}}>{graphMarking === '2E' ? 'H' : ''}</td>
                                    </tr>
                                    <tr>
                                        <td className={graph.y_axis}>1</td>
                                        <td className={graph.table+ " " +graph.darkGreen} style={{borderBottom: '2px solid black'}}>{graphMarking === '1A' ? 'VL' : ''}</td>
                                        <td className={graph.table+ " " +graph.darkGreen} style={{borderBottom: '2px solid black'}}>{graphMarking === '1B' ? 'VL' : ''}</td>
                                        <td className={graph.table+ " " +graph.lightGreen} style={{borderBottom: '2px solid black'}}>{graphMarking === '1C' ? 'L' : ''}</td>
                                        <td className={graph.table+ " " +graph.lightGreen} style={{borderBottom: '2px solid black'}}>{graphMarking === '1D' ? 'L' : ''}</td>
                                        <td className={graph.table+ " " +graph.yellow} style={{borderRight: '2px solid black', borderBottom: '2px solid black'}}>{graphMarking === '1E' ? 'M' : ''}</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td className={graph.table}></td>
                                        <td className={graph.x_axis} id="">A</td>
                                        <td className={graph.x_axis} id="">B</td>
                                        <td className={graph.x_axis} id="">C</td>
                                        <td className={graph.x_axis} id="">D</td>
                                        <td className={graph.x_axis} id="">E</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={7} className={graph.table+ " " +graph.y_design}>CONSEQUENCE OF FAILURE</td>
                                    </tr>
                                    </tbody>
                                    </table>

                                </div>
                            </Grid>
                        </Grid> 
                    </AccordionDetails>
                </Accordion>

            </Box>
       
        </Box>
    );
}
