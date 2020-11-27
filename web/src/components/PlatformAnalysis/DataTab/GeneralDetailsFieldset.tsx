import { Typography } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';
import Checkbox from '../../FormWidget/Checkbox';
import DatePicker from '../../FormWidget/DatePicker';
import Select from '../../FormWidget/Select';
import TextField from '../../FormWidget/TextField';
import { usePlatformTypeListContext } from '../../PlatformTypeListProvider';

export default function GeneralDetailsFieldset() {
    const platformTypeListSubject = usePlatformTypeListContext();

    // console.log("data");
    // console.log(props);

    const content = React.useMemo(
        () => (
           
            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField name={['name']} label="Name" required />
                </Grid>

                <Hidden smDown>
                    <Grid item xs={12} md={6} />
                </Hidden>

                <Grid item xs={12} md={6}>
                    <TextField
                        name={['description']}
                        label="Description"
                        multiline
                    />
                </Grid>

                <Hidden smDown>
                    <Grid item xs={12} md={6} />
                </Hidden>

                <Grid item xs={12} md={6}>
                    <TextField name={['field_name']} label="Field Name" />
                </Grid>

                <Grid item xs={12} md={6}>
                    <Select<PlatformType>
                        label="Platform Type"
                        name="environmental_consequence.platform_type_id"
                        subject={platformTypeListSubject}
                        toOption={(value) => value}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <DatePicker
                        label="RBUI Assessment Date"
                        name={['rbui_assessment_date']}
                        required
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <Checkbox label="Manned?" name="manned" />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        name={['distance_to_shore']}
                        label="Distance to Shore"
                        unit="km"
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        name={['distance_to_shipping_lane']}
                        label="Distance to Shipping Lane"
                        unit="km"
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        name={['api_seismic_zone']}
                        label="API Seismic Zone"
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <DatePicker label="Designed Date" name={['design_date']} />
                </Grid>

                <Grid item xs={12} md={6}>
                    <DatePicker
                        label="Platform Installation Date"
                        name={['platform_installation_date']}
                        required
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        name={['corrosion', 'platform_design_life']}
                        label="Platform Design Life"
                        unit="years"
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        name={['fatigue_load', 'water_depth']}
                        label="Water Depth"
                        unit="m"
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        nullable
                        name={[
                            'deck_elevation_wave_in_deck',
                            'cellar_deck_height',
                        ]}
                        label="Cellar Deck Height"
                        unit="m"
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        name={[
                            'reserve_strength_ratio_score',
                            'reserve_strength_ratio',
                        ]}
                        label="Reserve Strength"
                        required
                    />
                </Grid>
            </Grid>
        ),
        [platformTypeListSubject]
    );

    return (
        <Accordion defaultExpanded>
            <AccordionSummary style={{backgroundColor: "#02bfa6" }} expandIcon={<ExpandMoreIcon />}>
                <Typography style={{color: "White"}} variant="h6">General Details</Typography>
            </AccordionSummary>
            <AccordionDetails>{content}</AccordionDetails>
        </Accordion>
    );
}
