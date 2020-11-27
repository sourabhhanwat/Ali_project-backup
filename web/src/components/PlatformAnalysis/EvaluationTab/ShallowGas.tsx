import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import ExpansionRow from '../ExpansionRow';

export default function ShallowGas() {
    const { watch } = useFormContext();

    let shallow_gas_effect_detected: string;

    if (watch('shallow_gas.shallow_gas_effect_detected')) {
        shallow_gas_effect_detected = 'Yes';
    } else {
        shallow_gas_effect_detected = 'No';
    }

    let shallow_gas_monitored: string;

    if (watch('shallow_gas.shallow_gas_monitored')) {
        shallow_gas_monitored = 'Yes';
    } else {
        shallow_gas_monitored = 'No';
    }

    return (
        <ExpansionRow
            title="Shallow Gas"
            score={watch('shallow_gas_score')}
            override={watch('reserve_strength_ratio_score.rsr_override')}
            headNoBorderBottom
        >
            <Box m={3}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant="subtitle2">
                            Shallow Gas Effect Detected?
                        </Typography>
                        <Typography variant="h5" gutterBottom>
                            {shallow_gas_effect_detected}
                        </Typography>

                        <Typography variant="subtitle2">
                            Shallow Gas Monitored?
                        </Typography>
                        <Typography variant="h5">
                            {shallow_gas_monitored}
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </ExpansionRow>
    );
}
