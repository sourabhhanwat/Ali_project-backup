import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import MSelect from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import { Controller } from 'react-hook-form';
import Subject from '../../modules/Subject';

export type Option = {
    id: number;
    name: string;
};

function InnerSelect({
    value,
    loading,
    label,
    options,
    ...rest
}: {
    value?: string | null;
    loading?: boolean;
    label?: string;
    options?: Option[];
    onChange: (...args: any[]) => any;
    onFocus: (...args: any[]) => any;
    onBlur: (...args: any[]) => any;
}) {
    if (loading) {
        return (
            <TextField
                variant="outlined"
                label={label}
                fullWidth
                InputProps={{
                    endAdornment: <CircularProgress />,
                }}
            />
        );
    }

    return (
        <FormControl fullWidth variant="outlined">
            <InputLabel>{label}</InputLabel>
            <MSelect value={value ?? ''} label={label} {...rest}>
                {options?.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                        {option.name}
                    </MenuItem>
                ))}
            </MSelect>
        </FormControl>
    );
}

export default function Select<T>({
    subject,
    name,
    label,
    toOption,
}: {
    label: string;
    toOption: (value: T) => Option;
    subject: Subject<T[] | null>;
    name: string;
}) {
    const [isPending, setIsPending] = React.useState<boolean>(true);
    const [options, setOptions] = React.useState<Option[]>([]);

    const handleOptions = React.useCallback(
        (state: State<T[] | null>) => {
            setOptions(state.value?.map(toOption) ?? []);
            setIsPending(state.isPending ?? true);
        },
        [toOption]
    );

    React.useEffect(() => {
        subject.attach(handleOptions);
        return () => subject.detach(handleOptions);
    }, [subject, handleOptions]);

    return (
        <Controller
            name={name}
            as={InnerSelect}
            label={label}
            loading={isPending}
            options={options}
        />
    );
}
