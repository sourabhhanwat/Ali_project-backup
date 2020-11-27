import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import ExpansionRow from '../ExpansionRow';

export default function UnprotectedAppurtenances() {
    const { watch } = useFormContext();

    let number_of_unprotected_gas_riser = watch(
        'unprotected_appurtenances.number_of_unprotected_gas_riser'
    );

    if (number_of_unprotected_gas_riser == null) {
        number_of_unprotected_gas_riser = 'None';
    }

    let number_of_unprotected_conductor = watch(
        'unprotected_appurtenances.number_of_unprotected_conductor'
    );

    if (number_of_unprotected_conductor == null) {
        number_of_unprotected_conductor = 'None';
    }

    return (
        <ExpansionRow
            title="Unprotected Appurtenances"
            score={watch('unprotected_appurtenances_score')}
            headNoBorderBottom
        >
            <Box m={3}>
                <Grid container>
                    <Grid item xs={12} md={10}>
                        <Typography variant="subtitle2">
                            Number of Unprotected Gas Riser
                        </Typography>
                        <Typography variant="h5" gutterBottom>
                            {number_of_unprotected_gas_riser}
                        </Typography>

                        <Typography variant="subtitle2">
                            Number of Unprotected Conductor
                        </Typography>
                        <Typography variant="h5">
                            {number_of_unprotected_conductor}
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </ExpansionRow>
    );
}
