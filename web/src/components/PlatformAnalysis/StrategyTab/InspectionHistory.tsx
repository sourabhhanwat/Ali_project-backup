import { Typography } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Grid from '@material-ui/core/Grid';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';
import TextField from '../../FormWidget/TextField';
import { usePlatformTypeListContext } from '../../PlatformTypeListProvider';

export default function InspectionHistory() {
    const platformTypeListSubject = usePlatformTypeListContext();

    const content = React.useMemo(
        () => (
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
        ),
        [platformTypeListSubject]
    );

    return (
        <Accordion defaultExpanded>
            <AccordionSummary style={{backgroundColor: "#02bfa6" }} expandIcon={<ExpandMoreIcon />}>
                <Typography  style={{color: "White"}} variant="h6">Inspection History</Typography>
            </AccordionSummary>
            <AccordionDetails>{content}</AccordionDetails>
        </Accordion>
    );
}
