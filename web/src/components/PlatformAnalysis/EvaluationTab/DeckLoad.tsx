import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import Checkbox from '../../FormWidget/Checkbox';
import TextField from '../../FormWidget/TextField';
import ExpansionRow from '../ExpansionRow';

export default function DeckLoad() {
    const { watch } = useFormContext();

    return (
        <ExpansionRow
            title="Deck Load"
            score={watch('deck_load_score')}
            override={watch('reserve_strength_ratio_score.rsr_override')}
            headNoBorderBottom
        >
            <Box m={3}>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Checkbox
                            name="deck_load.original_topsides_design_load_known"
                            label="Original Topsides Design Load Known?"
                        />
                    </Grid>

                    <Hidden smDown>
                        <Grid item xs={12} md={8} />
                    </Hidden>

                    <Grid item xs={12} md={4}>
                        <TextField
                            name={['deck_load', 'increase_in_topsides_load']}
                            label="Percentage Increase In Topsides"
                            unit="%"
                            nullable
                        />
                    </Grid>

                    <Hidden smDown>
                        <Grid item xs={12} md={8} />
                    </Hidden>
                </Grid>
            </Box>
        </ExpansionRow>
    );
}
