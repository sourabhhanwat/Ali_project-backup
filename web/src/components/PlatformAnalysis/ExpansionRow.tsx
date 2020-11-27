import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import React, { PropsWithChildren } from 'react';
import Chip from '@material-ui/core/Chip';

const useContentStyles = makeStyles({
    root: {
        padding: 0,
        // @ts-ignore
        borderBottom: ({ noBorderBottom }: { noBorderBottom?: boolean }) =>
            noBorderBottom && 'unset',
    },
});

const useHeadStyles = makeStyles({
    root: {
        // @ts-ignore
        borderBottom: ({ noBorderBottom }: { noBorderBottom?: boolean }) =>
            noBorderBottom && 'unset',
    },
});

export default function ExpansionRow({
    title,
    children,
    score,
    headNoBorderBottom,
    contentNoBorderBottom,
    override,
}: PropsWithChildren<{
    title: string;
    score: number;
    headNoBorderBottom?: boolean;
    contentNoBorderBottom?: boolean;
    override?: boolean;
}>) {
    const [open, setOpen] = React.useState(false);

    const contentClasses = useContentStyles({
        noBorderBottom: contentNoBorderBottom,
    });

    const headClasses = useHeadStyles({
        noBorderBottom: headNoBorderBottom,
    });

    return (
        <>
            <TableRow>
                <TableCell classes={headClasses}>
                    <IconButton
                        size="small"
                        onClick={() => setOpen((open) => !open)}
                    >
                        {open ? (
                            <KeyboardArrowUpIcon />
                        ) : (
                            <KeyboardArrowDownIcon />
                        )}
                    </IconButton>
                </TableCell>
                <TableCell classes={headClasses} align="left" scope="row">
                    {title}
                </TableCell>
                <TableCell classes={headClasses}>
                    {override && (
                        <Chip
                            color="primary"
                            label="override"
                            size="small"
                            variant="outlined"
                        />
                    )}
                </TableCell>
                <TableCell classes={headClasses}>{score}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell classes={contentClasses} colSpan={4}>
                    <Collapse in={open}>{children}</Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}
