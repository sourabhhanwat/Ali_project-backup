import Box from '@material-ui/core/Box';
import React from 'react';
import { Typography } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Grid from '@material-ui/core/Grid';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '../../FormWidget/TextField';
import { usePlatformTypeListContext } from '../../PlatformTypeListProvider';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useFormContext } from 'react-hook-form';
import { styled} from '@material-ui/core';



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

const graphStyles = makeStyles({
    table: {
        border: '1.6px solid white',
        fontSize: 26,
        textAlign: 'center',
        color: 'black',
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

  

export default function StrategyTab({ hidden }: { hidden?: boolean }) {
    var paragraphDesign = {
        backgroundColor: '',
        padding: '.8rem',
        color: 'Black',

    };
    const platformTypeListSubject = usePlatformTypeListContext();

    const graph = graphStyles();

    const { watch } = useFormContext();
    const risk_ranking = watch(
        'risk_ranking'
    );

    console.log("I AM RISK ==>" ,risk_ranking);

    let red = (risk_ranking === 'H') ?  '#FFC000' : (risk_ranking === 'VH') ?  '#FF0000' : (risk_ranking === 'M') ?  '#FFFF00' : (risk_ranking === 'L') ?  '#92D050' : '#00B050';
    let risk = (risk_ranking === 'H') ?  'High (H)' : (risk_ranking === 'VH') ?  'Very High (VH)' : (risk_ranking === 'M') ?  'Medium (M)' : (risk_ranking === 'L') ?  'Low (L)' : 'Very Low (VL)';

   
    const final_consequence_category = watch(
        'final_consequence_category'
    );

    const lof_ranking = watch('lof_ranking');
 
    const risk_year = watch('risk_based_underwater_inspection_interval');
    console.log("Ranking i am==>", lof_ranking, risk_year);
    
    let graphMarking :any;
    graphMarking= lof_ranking + final_consequence_category;
    
    console.log("GRAPH RANKING ==>" ,graphMarking)

    return(
        <Box hidden={hidden}>
                <p></p>
                <Accordion defaultExpanded>
                    <AccordionSummary style={{backgroundColor: "#02bfa6" }} expandIcon={<ExpandMoreIcon />}>
                        <Typography style={{color: "White"}} variant="h6">Inspection History</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <h3>Type of Survey Level</h3> 
                        </Grid> 

                        <Grid item xs={12} md={6}>
                            <h3>Data of Last Inspection </h3> 
                        </Grid> 

                        <Grid item xs={12} md={6}>
                            <p>Level I</p> 
                        </Grid> 

                        <Grid item xs={12} md={6}>
                            <TextField
                                name={['level_1_last_inspection_date']}
                                label="YYYY-MM-DD"
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <p>Level II</p> 
                        </Grid> 

                        <Grid item xs={12} md={6}>
                            <TextField
                                name={['level_2_last_inspection_date']}
                                label="YYYY-MM-DD"
                                
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <p>Level III</p> 
                        </Grid> 

                        <Grid item xs={12} md={6}>
                            <TextField
                                name={['level_3_last_inspection_date']}
                                label="YYYY-MM-DD"
                            />
                        </Grid>

                        </Grid>

                    </AccordionDetails>
                </Accordion>
                <br />

                {/* ----------------------------------------- */}
                
                <Accordion defaultExpanded>
                    <AccordionSummary style={{backgroundColor: "#02bfa6" }} expandIcon={<ExpandMoreIcon />}>
                        <Typography style={{color: "White"}} variant="h6">Next Inspection Date</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={2}>

                            <Typography style={{marginTop: '1rem', fontWeight: 'bold', fontSize: '1.2rem'}}>Inspection Interval Based on Risk Level</Typography>

{/* ======================================================= */}
            <Accordion>
                    <AccordionDetails> 
                        <Grid container spacing={1}>  
                            <Grid item xs={12}></Grid>
                            <Grid item xs={6}>
                                    <p>
                                    Platform Risk Level
                                    </p>
                            </Grid>
                            <Grid item xs={6}>
                                <div style={{backgroundColor: red, height:"50px"}}>
                                        <Typography style={{color: "Black",textAlign:"center" ,padding:"1rem"}}>{risk_ranking}</Typography>
                                    </div>
                            </Grid>
                            <Grid item xs={6}>
                                <p>
                                    Risk Based Underwater Inspection Interval (Years)
                                    </p>
                            </Grid>
                            <Grid item xs={6}>
                                     <TextField
                                        label="Risk Based Underwater Inspection Interval (Years)"
                                        name={[
                                            'risk_based_underwater_inspection_interval',
                                        ]}
                                        disabled
                                    />
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
                                        <td className={graph.table+ " " +graph.yellow} style={{borderTop: '2px solid black'}}>{graphMarking === '5A' ? risk_year : ''}</td>
                                        <td className={graph.table+ " " +graph.orange} style={{borderTop: '2px solid black'}}>{graphMarking === '5B' ? risk_year : ''}</td>
                                        <td className={graph.table+ " " +graph.orange} style={{borderTop: '2px solid black'}}>{graphMarking === '5C' ? risk_year : ''}</td>
                                        <td className={graph.table+ " " +graph.red} style={{borderTop: '2px solid black'}}>{graphMarking === '5D' ? risk_year : ''}</td>
                                        <td className={graph.table+ " " +graph.red} style={{borderTop: '2px solid black', borderRight: '2px solid black'}}>{graphMarking === '5E' ? risk_year : ''}</td>
                                    </tr>
                                    <tr>
                                        <td className={graph.y_axis}>4</td>
                                        <td className={graph.table+ " " +graph.lightGreen}>{graphMarking === '4A' ? risk_year : ''}</td>
                                        <td className={graph.table+ " " +graph.yellow}>{graphMarking === '4B' ? risk_year : ''}</td>
                                        <td className={graph.table+ " " +graph.orange}>{graphMarking === '4C' ? risk_year : ''}</td>
                                        <td className={graph.table+ " " +graph.orange}>{graphMarking === '4D' ? risk_year : ''}</td>
                                        <td className={graph.table+ " " +graph.red} style={{borderRight: '2px solid black'}}>{graphMarking === '4E' ? risk_year : ''}</td>
                                    </tr>
                                    <tr>
                                        <td className={graph.y_axis}>3</td>
                                        <td className={graph.table+ " " +graph.lightGreen}>{graphMarking === '3A' ? risk_year : ''}</td>
                                        <td className={graph.table+ " " +graph.lightGreen}>{graphMarking === '3B' ? risk_year : ''}</td>
                                        <td className={graph.table+ " " +graph.yellow}>{graphMarking === '3C' ? risk_year : ''}</td>
                                        <td className={graph.table+ " " +graph.orange}>{graphMarking === '3D' ? risk_year : ''}</td>
                                        <td className={graph.table+ " " +graph.orange} style={{borderRight: '2px solid black'}}>{graphMarking === '3E' ? risk_year : ''}</td>
                                    </tr>
                                    <tr>
                                        <td className={graph.y_axis}>2</td>
                                        <td className={graph.table+ " " +graph.darkGreen}>{graphMarking === '2A' ? risk_year : ''}</td>
                                        <td className={graph.table+ " " +graph.lightGreen}>{graphMarking === '2B' ? risk_year : ''}</td>
                                        <td className={graph.table+ " " +graph.lightGreen}>{graphMarking === '2C' ? risk_year : ''}</td>
                                        <td className={graph.table+ " " +graph.yellow}>{graphMarking === '2D' ? risk_year : ''}</td>
                                        <td className={graph.table+ " " +graph.orange} style={{borderRight: '2px solid black'}}>{graphMarking === '2E' ? risk_year : ''}</td>
                                    </tr>
                                    <tr>
                                        <td className={graph.y_axis}>1</td>
                                        <td className={graph.table+ " " +graph.darkGreen} style={{borderBottom: '2px solid black'}}>{graphMarking === '1A' ? risk_year : ''}</td>
                                        <td className={graph.table+ " " +graph.darkGreen} style={{borderBottom: '2px solid black'}}>{graphMarking === '1B' ? risk_year : ''}</td>
                                        <td className={graph.table+ " " +graph.lightGreen} style={{borderBottom: '2px solid black'}}>{graphMarking === '1C' ? risk_year : ''}</td>
                                        <td className={graph.table+ " " +graph.lightGreen} style={{borderBottom: '2px solid black'}}>{graphMarking === '1D' ? risk_year : ''}</td>
                                        <td className={graph.table+ " " +graph.yellow} style={{borderRight: '2px solid black', borderBottom: '2px solid black'}}>{graphMarking === '1E' ? risk_year : ''}</td>
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

{/* ======================================================= */}
                    <Grid item xs={12}>
                            <p></p>
                            <Typography  variant="h6">Inspection Interval based on Exposure Category</Typography>
                            <p></p>
                    </Grid>
            <Accordion> 
                    <AccordionDetails>  
                            
                            {/* </AccordionSummary>
                            <AccordionDetails> */}
                            <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <p>Exposure Category Level</p> 
                            </Grid> 

                            <Grid item xs={12} md={6}>
                                <TextField
                                    name={['exposure_category_level']}
                                    label="Level"
                                    disabled
                                    nullable
                                />
                                {/* <Typography variant="subtitle2">
                                {'exposure_category_level'}                                
                                </Typography> */}
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <p>Type of Survey Level</p> 
                            </Grid> 

                            <Grid item xs={12} md={6}>
                                <p>Inspection Interval (Years)</p> 
                            </Grid> 

                            <Grid item xs={12} md={6}>
                                <p>Level I</p> 
                            </Grid> 

                            <Grid item xs={12} md={6}>
                                <TextField
                                    name={['exposure_category_level_1']}
                                    label="Level I"
                                    disabled
                                />
                            </Grid>         

                            <Grid item xs={12} md={6}>
                                <p>Level II</p> 
                            </Grid> 

                            <Grid item xs={12} md={6}>
                                <TextField
                                    name={['exposure_category_level_2']}
                                    label="Level II"
                                    disabled
                                />
                                {/* <Typography variant="subtitle2">
                                {'exposure_category_level_2'}                                
                                </Typography> */}
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <p>Level III</p> 
                            </Grid> 

                            <Grid item xs={12} md={6}>
                                <TextField
                                    name={['exposure_category_level_3']}
                                    label="Level III"
                                    disabled
                                />
                                {/* <Typography variant="subtitle2">
                                {exposure_category_level_3}                                
                                </Typography> */}
                            </Grid>
                            </Grid> 

                        </AccordionDetails>
                </Accordion>
                            {/* ================================================================= */}
{/* ================================================= */}
                           
                <Grid item xs={12}>
                    <p></p>
                    <Typography  variant="h6">Selected Next Inspection Interval and Inspection Date</Typography>
                    <p></p>
                </Grid> 
                    <Accordion>
                        <AccordionDetails>
                            <Grid container spacing={3}>
                            <Grid item xs={12}>
                            </Grid> 
                            <Grid item xs={6} md={3}>
                            <p>Type of Survey Level</p> 
                            </Grid> 

                            <Grid item xs={6} md={4}>
                            <p>Next Selected Inspection Interval (Years)</p> 
                            </Grid> 

                            <Grid item xs={6} md={4}>
                            <p>Next Inspection Date</p> 
                            </Grid>

                            <Grid item xs={6} md={3}>
                            <p>Level I</p> 
                            </Grid> 

                            <Grid item xs={6} md={4}>
                            <TextField
                                name={['level_1_selected_inspection_interval_for_next_inspection']}
                                label="Inspection Interval"
                            />
                            </Grid>

                            <Grid item xs={6} md={4}>
                            <TextField
                                label="Inspection Date"
                                name={['level_1_next_inspection_date']}
                                // disabled
                                // required
                            />
                            </Grid>        

                            <Grid item xs={6} md={3}>
                            <p>Level II</p> 
                            </Grid> 

                            <Grid item xs={6} md={4}>
                            <TextField
                                name={['level_2_selected_inspection_interval_for_next_inspection']}
                                label="Inspection Interval"
                            />
                            </Grid>

                            <Grid item xs={6} md={4}>
                            <TextField
                            label="Inspection Date"
                            name={['level_2_next_inspection_date']}
                            // disabled
                            // required
                            /> 
                            </Grid>

                            <Grid item xs={6} md={3}>
                            <p>Level III</p> 
                            </Grid> 

                            <Grid item xs={6} md={4}>
                            <TextField
                                name={['level_3_selected_inspection_interval_for_next_inspection']}
                                label="Inspection Interval"
                            />
                            </Grid>

                            <Grid item xs={6} md={4}>
                            <TextField
                            label="Inspection Date"
                            name={['level_3_next_inspection_date']}
                            // disabled
                            // required
                            />
                            </Grid>

                            </Grid>
                        </AccordionDetails>
                </Accordion>    
            </Grid>

        </AccordionDetails>
    </Accordion>
            </Box>
    );
}