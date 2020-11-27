import React from 'react';
import format from 'date-fns/format';
import isValid from 'date-fns/isValid';

export default function IsoDate({
    date,
    pattern,
    emptyValue,
}: {
    date?: Date | null;
    pattern: string;
    emptyValue?: React.ReactNode;
}) {
    return <>{isValid(date) ? format(date as Date, pattern) : emptyValue}</>;
}
