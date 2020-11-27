import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import ExpansionRow from '../ExpansionRow';

export default function FatigueLoad() {
    const { watch } = useFormContext();

    let platform_with_conductor_guide_frame: string;

    if (watch('fatigue_load.platform_with_conductor_guide_frame')) {
        platform_with_conductor_guide_frame = 'Yes';
    } else {
        platform_with_conductor_guide_frame = 'No';
    }

    return (
        <ExpansionRow
            title="Fatigue Load"
            score={watch('fatigue_load_score')}
            headNoBorderBottom
        >
            <Box m={3}>
                <Typography variant="subtitle2">Water Depth</Typography>
                <Typography variant="h5" gutterBottom>
                    {watch('fatigue_load.water_depth')} m
                </Typography>

                <Typography variant="subtitle2" gutterBottom>
                    Platform With Conductor Guide Frame (CGF)
                </Typography>
                <Typography variant="h5">
                    {platform_with_conductor_guide_frame}
                </Typography>
            </Box>
        </ExpansionRow>
    );
}
