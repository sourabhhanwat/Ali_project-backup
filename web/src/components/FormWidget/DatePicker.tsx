import Box from '@material-ui/core/Box';
import FormHelperText from '@material-ui/core/FormHelperText';
import TodayIcon from '@material-ui/icons/Today';
import {
    KeyboardDatePicker,
    KeyboardDatePickerProps,
} from '@material-ui/pickers';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

function InnerDatePicker({
    value,
    onChange,
    ...rest
}: Omit<KeyboardDatePickerProps, 'value' | 'onChange'> & {
    value?: Date | null;
    onChange?: (date: Date | null) => any;
}) {
    return (
        <KeyboardDatePicker
            value={value}
            onChange={(date) => onChange?.(date)}
            {...rest}
        />
    );
}

export default function DatePicker({
    name,
    label,
    required,
    disabled,
    helperText,
}: {
    name: string[];
    label: string;
    required?: boolean;
    disabled?: boolean;
    helperText?: string;
}) {
    const { errors } = useFormContext();

    const error = name.reduce((acc, curr) => acc?.[curr], errors);

    const inputName = name.join('.');

    return (
        <>
            <Box display="flex">
                <Controller
                    name={inputName}
                    as={
                        <InnerDatePicker
                            variant="inline"
                            inputVariant="outlined"
                            fullWidth
                            format="dd/MM/yyyy"
                            label={label}
                            autoOk
                            InputProps={{
                                endAdornment: <TodayIcon />,
                            }}
                            required={required}
                            disabled={disabled}
                            error={!!error}
                            helperText={helperText}
                        />
                    }
                    onChange={([date]) => date}
                />
            </Box>
            {!required && (
                <FormHelperText>If not known keep blank</FormHelperText>
            )}
            {error?.message && (
                <FormHelperText error>{error?.message}</FormHelperText>
            )}
        </>
    );
}
