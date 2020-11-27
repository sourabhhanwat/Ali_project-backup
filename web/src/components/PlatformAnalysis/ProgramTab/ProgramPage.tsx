import { Typography } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Grid from '@material-ui/core/Grid';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';
import Checkbox from '../../FormWidget/Checkbox';
import TextField from '../../FormWidget/TextField';
import { usePlatformTypeListContext } from '../../PlatformTypeListProvider';
import DatePicker from '../../FormWidget/DatePicker';
import { platform } from 'os';
import { usePlatform } from '../../PlatformProvider';

export default function ProgramPage() {
    // var ButtonDesign = {

    //     backgroundColor: 'light blue',
    //     padding:    '15px 32px',
    //     margin: '4px 2px',
        
    // };
    var h3Design = {
        backgroundColor: 'light blue',

    };

    const platformTypeListSubject = usePlatformTypeListContext();

    // const { watch } = useFormContext();
    
    const content = React.useMemo(
        () => (
            <Grid container spacing={4}>
                <Grid item xs={12} md={12}>
                </Grid>
                <Grid item xs={3} md={3}>
                    <p>Platform Name</p> 
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['name']}
                        label="Platform Name"
                        disabled
                    />
                </Grid>
                
                <Grid item xs={3} md={3}>
                </Grid>  

                <Grid item xs={3} md={3}>
                    <h3>Other Works Details</h3>
                </Grid>

{/* ============================================== */}
                <Grid item xs={3} md={3}>
                    <p>Last Under Water Inspection Date</p> 
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['last_inspection','last_underwater_inspection_date']}
                        label="Inspection Date"
                        disabled
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                </Grid> 

                <Grid item xs={3} md={3}>
                    <Checkbox
                        label="Weld Monitoring"
                        name="weld_monitoring"
                    />
                </Grid>
{/* =================================================== */}
                <Grid item xs={3} md={3}>
                    <p>Platform Risk Ranking</p> 
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['risk_ranking']}
                        label="Platform Risk Rankinge"
                        disabled
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                </Grid> 

                <Grid item xs={3} md={3}>
                    <Checkbox
                        label="Marine Growth Cleaning"
                        name="Marine_Growth_Cleaning"
                    />
                </Grid>
{/* ================================================ */}

                <Grid item xs={3} md={3}>
                    <h3 style={h3Design}>Type of Survey Level</h3> 
                </Grid>

                <Grid item xs={3} md={3}>
                    <h3 style={h3Design}>Next Selected Inspection Interval (Years)</h3>
                </Grid>


                <Grid item xs={3} md={3}>
                    <h3 style={h3Design}>Next Inspection Date</h3>
                </Grid>

                <Grid item xs={3} md={3}>
                    <Checkbox
                        label="Debris Clearance"
                        name="Debris_Clearance"
                    />
                </Grid>
{/* =================================================== */}
                <Grid item xs={3} md={3}>
                    <p>Level I</p> 
                </Grid>

                <Grid item xs={3} md={3}>
                <TextField
                            name={['level_1_selected_inspection_interval_for_next_inspection']}
                            label="Inspection Interval"
                            disabled
                        />
                </Grid>

                <Grid item xs={3} md={3}>
                <DatePicker
                            label="Inspection Date"
                            name={['level_1_next_inspection_date']}
                            disabled
                            required
                        />
                </Grid>

                <Grid item xs={3} md={3}>
                    <Checkbox
                        label="Anode Confirmation"
                        name="MAnode_Confirmation"
                    />
                </Grid>
{/* ================================================ */}
                <Grid item xs={3} md={3}>
                    <p>Level II</p> 
                </Grid>

                <Grid item xs={3} md={3}>
                <TextField
                            name={['level_2_selected_inspection_interval_for_next_inspection']}
                            label="Inspection Interval"
                            disabled
                        />
                </Grid>

                <Grid item xs={3} md={3}>
                <DatePicker
                            label="Inspection Date"
                            name={['level_2_next_inspection_date']}
                            disabled
                            required
                        />
                </Grid>

                <Grid item xs={3} md={3}>
                    <Checkbox
                        label="Scour Repair"
                        name="Scour_Repair"
                    />
                </Grid>
{/* ===================================== */}
                <Grid item xs={3} md={3}>
                    <p>Level III</p> 
                </Grid>

                <Grid item xs={3} md={3}>
                <TextField
                            name={['level_3_selected_inspection_interval_for_next_inspection']}
                            label="Inspection Interval"
                            disabled
                        />
                </Grid>

                <Grid item xs={3} md={3}>
                <DatePicker
                            label="Inspection Date"
                            name={['level_3_next_inspection_date']}
                            disabled
                            required
                        />
                </Grid>

                <Grid item xs={3} md={3}>
                    <Checkbox
                        label="Corrosion Survey"
                        name="Corrosion_Survey"
                    />
                </Grid>
{/* ===================================== */}
                <Grid item xs={3} md={3}>
                </Grid> 

                <Grid item xs={3} md={3}>
                </Grid> 

                <Grid item xs={3} md={3}>
                </Grid> 

                <Grid item xs={3} md={3}>
                    <Checkbox
                        label="Other"
                        name="other"
                    />
                </Grid>
{/* ================================================ */}
                <Grid item xs={3} md={3}>
                    <h3 style={h3Design}>Survey Details</h3> 
                </Grid>

                <Grid item xs={3} md={3}>
                </Grid>

                 <Grid item xs={3} md={3}>
                </Grid>  

                <Grid item xs={3} md={3}>
                </Grid> 
{/* ================================================ */}

                <Grid item xs={3} md={3}>
                    <h3 style={h3Design}>API Level I Survey - Routine Above-water Inspection</h3> 
                </Grid>

                <Grid item xs={3} md={3}>
                    <h3 style={h3Design}>Method</h3>
                </Grid>


                <Grid item xs={3} md={3}>
                    <h3 style={h3Design}>Scope of Survey</h3>
                </Grid>

                <Grid item xs={3} md={3}>
                </Grid> 
{/* =================================================== */}
                <Grid item xs={3} md={3}>
                    <p>Above-water Visual</p> 
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['method']}
                        label="Method"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['Scope of Survey']}
                        label="Scope"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                </Grid> 
{/* =================================================== */}
                <Grid item xs={3} md={3}>
                    <p>Coating Survey</p> 
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['method']}
                        label="Method"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['Scope of Survey']}
                        label="Scope"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                </Grid> 
{/* ===================================== */}

                <Grid item xs={3} md={3}>
                    <p>Underwater CP Survey</p> 
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['method']}
                        label="Method"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['Scope of Survey']}
                        label="Scope"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                </Grid> 
{/* ===================================== */}

                <Grid item xs={3} md={3}>
                    <p>Appurtenance and Personnel Safety Devices Surveys</p> 
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['method']}
                        label="Method"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['Scope of Survey']}
                        label="Scope"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                </Grid> 
{/* ===================================== */}

                <Grid item xs={3} md={3}>
                    <p>Deck Elevation Survey</p> 
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['method']}
                        label="Method"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['Scope of Survey']}
                        label="Scope"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                </Grid> 
{/* ===================================== */}

                <Grid item xs={3} md={3}>
                    <p>Supplemental Surveys (NDT, material sampling, wall thickness measurements, etc)</p> 
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['method']}
                        label="Method"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['Scope of Survey']}
                        label="Scope"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                </Grid> 
{/* ===================================== */}

                <Grid item xs={3} md={3}>
                    <h3 style={h3Design}>API Level II Survey -Underwater Inspection</h3> 
                </Grid>

                <Grid item xs={3} md={3}>
                    <h3 style={h3Design}>Method</h3>
                </Grid>


                <Grid item xs={3} md={3}>
                    <h3 style={h3Design}>Scope of Survey</h3>
                </Grid>

                <Grid item xs={3} md={3}>
                </Grid> 
{/* =================================================== */}
                <Grid item xs={3} md={3}>
                    <p>General Visual (Dents, Cracks, Abrasions, Bows, Severed, Holes, Gouges, Missing, Other)</p> 
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['method']}
                        label="Method"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['Scope of Survey']}
                        label="Scope"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                </Grid> 
{/* =================================================== */}
                <Grid item xs={3} md={3}>
                    <p>Debris</p> 
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['method']}
                        label="Method"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['Scope of Survey']}
                        label="Scope"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                </Grid> 
{/* ===================================== */}

                <Grid item xs={3} md={3}>
                    <p>Marine growth Thickness</p> 
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['method']}
                        label="Method"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['Scope of Survey']}
                        label="Scope"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                </Grid> 
{/* ===================================== */}

                <Grid item xs={3} md={3}>
                    <p>Scour Depth</p> 
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['method']}
                        label="Method"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['Scope of Survey']}
                        label="Scope"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                </Grid> 
{/* ===================================== */}

                <Grid item xs={3} md={3}>
                    <p>Anodes</p> 
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['method']}
                        label="Method"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['Scope of Survey']}
                        label="Scope"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                </Grid> 
{/* ===================================== */}

                <Grid item xs={3} md={3}>
                    <p>Cathodic potential</p> 
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['method']}
                        label="Method"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['Scope of Survey']}
                        label="Scope"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                </Grid> 
{/* ===================================== */}

                <Grid item xs={3} md={3}>
                    <p>Risers</p> 
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['method']}
                        label="Method"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['Scope of Survey']}
                        label="Scope"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                </Grid> 
{/* ===================================== */}

                <Grid item xs={3} md={3}>
                    <p>J-Tube</p> 
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['method']}
                        label="Method"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['Scope of Survey']}
                        label="Scope"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                </Grid> 
{/* ===================================== */}

                <Grid item xs={3} md={3}>
                    <p>Caissons</p> 
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['method']}
                        label="Method"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['Scope of Survey']}
                        label="Scope"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                </Grid> 
{/* ===================================== */}

                <Grid item xs={3} md={3}>
                    <p>Conductor</p> 
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['method']}
                        label="Method"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['Scope of Survey']}
                        label="Scope"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                </Grid> 
{/* ===================================== */}

                <Grid item xs={3} md={3}>
                    <h3 style={h3Design}>API Level III Survey -Underwater Inspection</h3> 
                </Grid>

                <Grid item xs={3} md={3}>
                    <h3 style={h3Design}>Method</h3>
                </Grid>


                <Grid item xs={3} md={3}>
                    <h3 style={h3Design}>Scope of Survey</h3>
                </Grid>

                <Grid item xs={3} md={3}>
                </Grid> 
{/* =================================================== */}
                <Grid item xs={3} md={3}>
                    <p>Visual Corrosion Survey</p> 
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['method']}
                        label="Method"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['Scope of Survey']}
                        label="Scope"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                </Grid> 
{/* =================================================== */}
                <Grid item xs={3} md={3}>
                    <p>Flooded member detection or member close visual inspection</p> 
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['method']}
                        label="Method"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['Scope of Survey']}
                        label="Scope"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                </Grid> 
{/* ===================================== */}

                <Grid item xs={3} md={3}>
                    <p>Weld/joint close visual inspection</p> 
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['method']}
                        label="Method"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['Scope of Survey']}
                        label="Scope"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                </Grid> 
{/* ===================================== */}

                <Grid item xs={3} md={3}>
                    <h3 style={h3Design}>API Level IV Survey -Underwater Inspection</h3> 
                </Grid>

                <Grid item xs={3} md={3}>
                    <h3 style={h3Design}>Method</h3>
                </Grid>


                <Grid item xs={3} md={3}>
                    <h3 style={h3Design}>Scope of Survey</h3>
                </Grid>

                <Grid item xs={3} md={3}>
                </Grid> 
{/* =================================================== */}
                <Grid item xs={3} md={3}>
                    <p>Weld/joint NDT</p> 
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['method']}
                        label="Method"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['Scope of Survey']}
                        label="Scope"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                </Grid> 
{/* =================================================== */}
                <Grid item xs={3} md={3}>
                    <p>Wall UT</p> 
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['method']}
                        label="Method"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        name={['Scope of Survey']}
                        label="Scope"
                    />
                </Grid>

                <Grid item xs={3} md={3}>
                </Grid> 
{/* ===================================== */}

                {/* <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                    </Grid> 
                    <Grid item xs={12} md={6}>
                        <button style={ButtonDesign} type="submit"><b>SAVE</b></button>
                    </Grid>
                </Grid> */}

            </Grid>
  
        ),
        [platformTypeListSubject]
    );

    return (
        <Accordion defaultExpanded>
            <AccordionSummary style={{backgroundColor: "#02bfa6"}} expandIcon={<ExpandMoreIcon />}>
                <Typography style={{color: "White"}} variant="h6">General Details</Typography>
            </AccordionSummary>
            <AccordionDetails>{content}</AccordionDetails>
        </Accordion>
    );
}
