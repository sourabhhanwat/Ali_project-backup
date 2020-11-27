import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import React from 'react';
import RelativeDate from './RelativeDate';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Link } from '@reach/router';
import { styled } from '@material-ui/core';

const MemoTableRowSkeleton = React.memo(function ({
    columnCount,
}: {
    columnCount: number;
}) {
    return (
        <>
            {[...Array(3).keys()].map((index) => (
                <TableRow key={index}>
                    {[...Array(columnCount).keys()].map((index) => (
                        <TableCell key={index}>
                            <Skeleton variant="text" />
                        </TableCell>
                    ))}
                </TableRow>
            ))}
        </>
    );
});

export function SkeletonResourceCard({ headers }: { headers: string[] }) {
    return (
        <Paper>
            <Toolbar>
                <Box>
                    <Box clone fontWeight={800}>
                        <Typography variant="body1">
                            <Skeleton variant="text" />
                        </Typography>
                    </Box>
                    <Typography variant="caption" noWrap>
                        <Skeleton variant="text" />
                    </Typography>
                </Box>
            </Toolbar>
            <Divider />
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {headers.map((header) => (
                                <Box key={header} clone fontWeight={800}>
                                    <TableCell>{header}</TableCell>
                                </Box>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <MemoTableRowSkeleton columnCount={headers.length} />
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}

export type Header<T> = {
    key: keyof T;
    label: string;
    transform?: (value: any) => string;
};

const StyledLink = styled(Link)({
    textDecoration: 'none',
});

export default function ResourceCard<T>({
    isPending,
    title,
    caption,
    resources,
    getKey,
    headers,
    updatedAt,
    link,
}: {
    isPending?: boolean;
    title: string;
    caption: string;
    updatedAt: Date;
    resources?: T[] | null;
    headers: Array<Header<T>>;
    getKey: (resource: T) => string;
    link: string;
}) {
    return (
        <Paper>
            <Tooltip title={caption}>
                <Box clone justifyContent="space-between">
                    <Toolbar>
                        <Box>
                            <Box clone fontWeight={800}>
                                <Typography variant="body1">{title}</Typography>
                            </Box>
                            <Typography variant="caption">
                                <RelativeDate date={updatedAt} />
                            </Typography>
                        </Box>
                        <StyledLink to={link}>
                            <Box clone fontWeight={800}>
                                <Button color="primary">
                                    View <ChevronRightIcon />
                                </Button>
                            </Box>
                        </StyledLink>
                    </Toolbar>
                </Box>
            </Tooltip>
            <Divider />
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {headers.map((header) => (
                                <Box key={header.label} clone fontWeight={800}>
                                    <TableCell>{header.label}</TableCell>
                                </Box>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {resources?.map((resource) => (
                            <TableRow key={getKey(resource)}>
                                {headers.map((header) => (
                                    <TableCell key={header.label}>
                                        {header.transform
                                            ? header.transform(
                                                  resource[header.key]
                                              )
                                            : resource[header.key]}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                        {isPending && (
                            <MemoTableRowSkeleton
                                columnCount={headers.length}
                            />
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}
