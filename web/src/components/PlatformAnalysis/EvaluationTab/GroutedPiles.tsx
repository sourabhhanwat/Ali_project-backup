import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import ExpansionRow from '../ExpansionRow';

export default function GroutedPiles() {
    const { watch } = useFormContext();

    let pile_in_leg_installation: string;

    if (watch('leg_pile_grouting.pile_in_leg_installation')) {
        pile_in_leg_installation = 'Yes';
    } else {
        pile_in_leg_installation = 'No';
    }

    let leg_to_pile_annulus_grouted: string;

    if (watch('leg_pile_grouting.leg_to_pile_annulus_grouted')) {
        leg_to_pile_annulus_grouted = 'Yes';
    } else {
        leg_to_pile_annulus_grouted = 'No';
    }

    return (
        <ExpansionRow
            title="Grouted Piles"
            score={watch('leg_pile_grouting_score')}
            override={watch('reserve_strength_ratio_score.rsr_override')}
            headNoBorderBottom
        >
            <Box m={3}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant="subtitle2">
                            Pile in Leg Installation?
                        </Typography>
                        <Typography variant="h5" gutterBottom>
                            {leg_to_pile_annulus_grouted}
                        </Typography>

                        <Typography variant="subtitle2">
                            Leg to Pile Annulus Grouted?
                        </Typography>
                        <Typography variant="h5">
                            {pile_in_leg_installation}
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </ExpansionRow>
    );
}
