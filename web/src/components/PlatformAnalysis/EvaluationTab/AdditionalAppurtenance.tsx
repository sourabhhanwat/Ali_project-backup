import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import ExpansionRow from '../ExpansionRow';
import Box from '@material-ui/core/Box';

export default function AdditionalAppurtenance() {
    const { watch } = useFormContext();
    return (
        <ExpansionRow
            title="Additional Appurtenance"
            score={watch('additional_appurtenance_score')}
            override={watch('reserve_strength_ratio_score.rsr_override')}
            headNoBorderBottom
        >
            <Box m={3}>
                <Typography variant="subtitle2">
                    Number of Design Risers
                </Typography>
                <Typography variant="h5" gutterBottom>
                    {watch('additional_appurtenance.number_of_design_risers')}
                </Typography>

                <Typography variant="subtitle2">
                    Number of Design Caissons
                </Typography>
                <Typography variant="h5" gutterBottom>
                    {watch('additional_appurtenance.number_of_design_caissons')}
                </Typography>

                <Typography variant="subtitle2">
                    Number of Design Conductors
                </Typography>
                <Typography variant="h5" gutterBottom>
                    {watch(
                        'additional_appurtenance.number_of_design_conductors'
                    )}
                </Typography>

                <Typography variant="subtitle2">
                    Number of Additional Risers
                </Typography>
                <Typography variant="h5" gutterBottom>
                    {watch(
                        'additional_appurtenance.number_of_additional_risers'
                    )}
                </Typography>

                <Typography variant="subtitle2">
                    Number of Additional Caissons
                </Typography>
                <Typography variant="h5" gutterBottom>
                    {watch(
                        'additional_appurtenance.number_of_additional_caissons'
                    )}
                </Typography>

                <Typography variant="subtitle2">
                    Number of Additional Conductors
                </Typography>
                <Typography variant="h5">
                    {watch(
                        'additional_appurtenance.number_of_additional_conductors'
                    )}
                </Typography>
            </Box>
        </ExpansionRow>
    );
}
