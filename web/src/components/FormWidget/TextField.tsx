import { FormHelperText } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import InputAdornment from '@material-ui/core/InputAdornment';
import MTextField, { TextFieldProps } from '@material-ui/core/TextField';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

function OverrideTextField({ value, ...rest }: TextFieldProps) {
    return <MTextField value={value ?? ''} {...rest} />;
}

export default function TextField({
    label,
    name,
    disabled,
    helperText,
    multiline,
    nullable,
    required,
    unit,
    size,
}: {
    name: string[];
    label: string;
    required?: boolean;
    helperText?: string;
    disabled?: boolean;
    unit?: string;
    multiline?: boolean;
    nullable?: boolean;
    size?: 'small' | 'medium';
}) {
    const { errors } = useFormContext();

    const error = name.reduce((acc, curr) => acc?.[curr], errors);

    const inputName = name.join('.');

    const ref = React.useRef<any>();

    return (
        <>
            <Box display="flex">
                <Controller
                    as={
                        <OverrideTextField
                            inputRef={ref}
                            fullWidth
                            variant="outlined"
                            label={label}
                            required={required}
                            helperText={helperText}
                            error={!!error}
                            disabled={disabled}
                            InputProps={{
                                endAdornment: unit && (
                                    <InputAdornment position="end">
                                        {unit}
                                    </InputAdornment>
                                ),
                            }}
                            multiline={multiline}
                            rowsMax={4}
                            rows={4}
                            size={size}
                        />
                    }
                    name={inputName}
                    onChange={([event]) => event.target.value}
                    onFocus={() => ref.current.focus()}
                />
            </Box>
            {nullable && (
                <FormHelperText>If not known keep blank</FormHelperText>
            )}
            {error?.message && (
                <FormHelperText error>{error?.message}</FormHelperText>
            )}
        </>
    );
}
