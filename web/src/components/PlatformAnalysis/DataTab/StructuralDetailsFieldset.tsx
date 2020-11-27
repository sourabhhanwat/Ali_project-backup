import { Typography } from '@material-ui/core';
import { Accordion } from '@material-ui/core';
import { AccordionSummary } from '@material-ui/core';
import { AccordionDetails } from '@material-ui/core';

import Grid from '@material-ui/core/Grid';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';
import { useBracingTypeListContext } from '../../BracingTypeListProvider';
import Checkbox from '../../FormWidget/Checkbox';
import Select from '../../FormWidget/Select';
import TextField from '../../FormWidget/TextField';
import { useNumberOfLegsTypeListContext } from '../../NumberOfLegsTypeListProvider';

export default function StructuralDetailsFieldset() {
    const bracingTypeListSubject = useBracingTypeListContext();

    const numberOfLegsTypeListSubject = useNumberOfLegsTypeListContext();

    const content = React.useMemo(
        () => (
            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Select<BracingType>
                        label="Bracing Type"
                        name="bracing_type_id"
                        subject={bracingTypeListSubject}
                        toOption={(value) => value}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        name={['number_of_bays']}
                        label="Number of Bays"
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <Select<NumberOfLegsType>
                        label="Number of Legs"
                        name="number_of_legs_type_id"
                        subject={numberOfLegsTypeListSubject}
                        toOption={(value) => value}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        name={['number_of_main_piles']}
                        label="Number of Main Piles"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        name={['number_of_skirt_piles']}
                        label="Number of Skirt Piles"
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        name={[
                            'additional_appurtenance',
                            'number_of_design_conductors',
                        ]}
                        label="Number of Design Conductors"
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        name={[
                            'additional_appurtenance',
                            'number_of_additional_conductors',
                        ]}
                        label="Number of Additional Conductors"
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        name={[
                            'additional_appurtenance',
                            'number_of_design_risers',
                        ]}
                        label="Number of Design Risers"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        name={[
                            'additional_appurtenance',
                            'number_of_design_risers',
                        ]}
                        label="Number of Additional Risers"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        name={[
                            'additional_appurtenance',
                            'number_of_design_caissons',
                        ]}
                        label="Number of Design Caissons"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        name={[
                            'additional_appurtenance',
                            'number_of_additional_caissons',
                        ]}
                        label="Number of Additional Caissons"
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        name={[
                            'unprotected_appurtenances',
                            'number_of_unprotected_gas_riser',
                        ]}
                        label="Number of Unprotected Gas Riser"
                        nullable
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        name={[
                            'unprotected_appurtenances',
                            'number_of_unprotected_conductor',
                        ]}
                        label="Number of Unprotected Conductors"
                        nullable
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        name={['scour', 'design_scour_depth']}
                        label="Design Scour Depth"
                        unit="m"
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <Checkbox
                        name="fatigue_load.platform_with_conductor_guide_frame"
                        label="Platform with Conductor Guide Frame (CGF)"
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        name={['number_of_decks']}
                        label="Number of Decks"
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        name={['deck_weight']}
                        label="Deck Weight"
                        unit="mt"
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <Checkbox
                        name="leg_pile_grouting.pile_in_leg_installation"
                        label="Pile in Leg Installation?"
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <Checkbox
                        name="leg_pile_grouting.leg_to_pile_annulus_grouted"
                        label="Grouted Piles"
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        name={['pile_penetration_depth']}
                        label="Pile Penetration Depth"
                        unit="m"
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <Checkbox name="jacket_repaired" label="Jacket Repaired" />
                </Grid>

                <Grid item xs={12} md={6}>
                    <Checkbox name="deck_extension" label="Deck Extension" />
                </Grid>
            </Grid>
        ),
        [numberOfLegsTypeListSubject, bracingTypeListSubject]
    );

    return (
        <Accordion>
            <AccordionSummary style={{backgroundColor: "#02bfa6"}} expandIcon={<ExpandMoreIcon />}>
                <Typography style={{color: "White"}} variant="h6">Structural Details</Typography>
            </AccordionSummary>
            <AccordionDetails>{content}</AccordionDetails>
        </Accordion>
    );
}
