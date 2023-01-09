import {
    Box,
    Collapse,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import React from 'react';

function Row(props) {
    const { user, timeframe, ranking, handleClick } = props;
    const [open, setOpen] = React.useState(false);

    console.log(user);

    return (
        <React.Fragment>
            <TableRow id={user?.id} sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? (
                            <KeyboardArrowUpIcon />
                        ) : (
                            <KeyboardArrowDownIcon />
                        )}
                    </IconButton>
                </TableCell>

                <TableCell component="th" scope="row">
                    {/* {row.ranking} */}
                    {ranking}
                </TableCell>
                <TableCell>
                    {user?.firstName} {user?.lastName}
                </TableCell>
                <TableCell>{user?.grade}</TableCell>
                <TableCell>{user?.participations?.length}</TableCell>
                {timeframe == 0 ? (
                    <TableCell align="right">{user?.points}</TableCell>
                ) : timeframe == 1 ? (
                    <TableCell align="right">{user?.q1points}</TableCell>
                ) : timeframe == 2 ? (
                    <TableCell align="right">{user?.q2points}</TableCell>
                ) : timeframe == 3 ? (
                    <TableCell align="right">{user?.q3points}</TableCell>
                ) : (
                    <TableCell align="right">{user?.q4points}</TableCell>
                )}
                <TableCell align="right">
                    <button
                        onClick={() => handleClick(user)}
                        className="bg-indigo-600 text-center py-2 px-4 rounded text-white hover:bg-indigo-700 focus:outline-none"
                    >
                        Give Award
                    </button>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}
                >
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography
                                variant="h6"
                                gutterBottom
                                component="div"
                            >
                                Events Attended
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <b>Date</b>
                                        </TableCell>
                                        <TableCell>
                                            <b>Event</b>
                                        </TableCell>
                                        <TableCell>
                                            <b>Points</b>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {/* {user?.joinedEvents.map((event) => ( */}
                                    <TableRow
                                    // key={event?.date?.substring(0, 10)}
                                    >
                                        <TableCell component="th" scope="row">
                                            {/* {event?.date?.substring(0, 10)} */}
                                            2023-01-15
                                        </TableCell>
                                        <TableCell>title</TableCell>
                                        <TableCell>points</TableCell>
                                    </TableRow>
                                    // {/* ))} */}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default Row;
