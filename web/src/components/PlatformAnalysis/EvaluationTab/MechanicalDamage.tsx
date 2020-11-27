import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import ExpansionRow from '../ExpansionRow';

export default function MechanicalDamage() {
    const { watch } = useFormContext();

    let number_of_damaged_members = watch(
        'mechanical_damage.number_of_damaged_members'
    );

    if (!number_of_damaged_members) {
        number_of_damaged_members = 'None';
    }

    return (
        <ExpansionRow
            title="Mechanical Damage"
            score={watch('mechanical_damage_score')}
            override={watch('reserve_strength_ratio_score.rsr_override')}
            headNoBorderBottom
        >
            <Box m={3}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="subtitle2">
                            Number of Damaged Members
                        </Typography>
                        <Typography variant="h5">
                            {number_of_damaged_members}
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </ExpansionRow>
    );
}
