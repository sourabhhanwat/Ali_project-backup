import MCheckbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import React from 'react';
import { Controller } from 'react-hook-form';

export default function Checkbox({
    label,
    name,
}: {
    label: string;
    name: string;
}) {
    return (
        <FormControlLabel
            label={label}
            control={
                <Controller
                    as={MCheckbox}
                    name={name}
                    valueName="checked"
                    defaultValue={false}
                />
            }
        />
    );
}
