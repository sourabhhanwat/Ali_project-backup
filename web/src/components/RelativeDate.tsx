import React from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

export default function RelativeDate({ date }: { date: Date }) {
    return <>Last updated {formatDistanceToNow(date)} ago</>;
}
