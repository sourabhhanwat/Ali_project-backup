import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import Checkbox from '../../FormWidget/Checkbox';
import TextField from '../../FormWidget/TextField';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default function StructuralDetailsFieldset() {
    const content = React.useMemo(
        () => (
            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        name={[
                            'environmental_consequence',
                            'daily_oil_production',
                        ]}
                        label="Daily Oil Production"
                        helperText="If there is no oil production, input value '0'"
                        // unit="bbl"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        name={[
                            'economic_impact_consequence',
                            'daily_gas_production',
                        ]}
                        label="Daily Gas Production"
                        helperText="If there is no gas production, input value '0'"
                        // unit="mscf"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Checkbox
                        name="shallow_gas.shallow_gas_effect_detected"
                        label="Shallow Gas Effect Detected?"
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <Checkbox name="crane" label="Crane" />
                </Grid>

                <Grid item xs={12} md={6}>
                    <Checkbox name="helideck" label="Helideck" />
                </Grid>

                <Grid item xs={12} md={6}>
                    <Checkbox name="boatlanding" label="Boatlanding" />
                </Grid>
            </Grid>
        ),
        []
    );

    return (
        <Accordion>
            <AccordionSummary style={{backgroundColor: "#02bfa6"}} expandIcon={<ExpandMoreIcon />}>
                <Typography style={{color: "White"}} variant="h6">Operational Details</Typography>
            </AccordionSummary>
            <AccordionDetails>{content}</AccordionDetails>
        </Accordion>
    );
}
