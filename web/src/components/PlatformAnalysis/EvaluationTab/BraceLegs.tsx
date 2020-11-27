import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import Subject from '../../../modules/Subject';
import { useBracingTypeListContext } from '../../BracingTypeListProvider';
import { useNumberOfLegsTypeListContext } from '../../NumberOfLegsTypeListProvider';
import ExpansionRow from '../ExpansionRow';

function useOptions<T extends { id: number; name: string }>({
    subject,
    field,
}: {
    subject: Subject<T[] | null>;
    field: string;
}) {
    const [list, setList] = React.useState<T[] | null>();

    const handleList = React.useCallback((state: State<T[] | null>) => {
        setList(state.value);
    }, []);

    React.useEffect(() => {
        subject.attach(handleList);
        return () => subject.detach(handleList);
    }, [subject, handleList]);

    const { watch } = useFormContext();

    const id = watch(field);

    const name = React.useMemo(() => {
        return list?.find((option) => option.id === id)?.name;
    }, [id, list]);

    return name;
}

export default function BraceLegs() {
    const numberOfLegsTypeName = useOptions({
        subject: useNumberOfLegsTypeListContext() as any,
        field: 'number_of_legs_type_id',
    });

    const bracingTypeName = useOptions({
        subject: useBracingTypeListContext() as any,
        field: 'bracing_type_id',
    });

    const { watch } = useFormContext();

    return (
        <ExpansionRow
            title="Brace/Legs"
            score={watch('platform_legs_and_bracing_score')}
            override={watch('reserve_strength_ratio_score.rsr_override')}
            headNoBorderBottom
        >
            <Box m={3}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant="subtitle2">
                            Determine Number of Legs
                        </Typography>
                        <Typography variant="h5" gutterBottom>
                            {numberOfLegsTypeName}
                        </Typography>

                        <Typography variant="subtitle2">
                            Determine Bracing Type
                        </Typography>
                        <Typography variant="h5">{bracingTypeName}</Typography>
                    </Grid>
                </Grid>
            </Box>
        </ExpansionRow>
    );
}
