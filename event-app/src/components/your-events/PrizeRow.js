import { TableCell, TableRow } from '@mui/material';
import React from 'react';

function UpcomingEventCard(props) {
    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell component="th" scope="row">
                    Homework Pass
                </TableCell>
                <TableCell>Randomly Selected</TableCell>
                <TableCell>
                    {/* {props.event?.teacher?.firstName}{' '} */}
                    {/* {props.event?.teacher?.lastName} */}
                    {/* John Doe */}
                </TableCell>
                <TableCell>3</TableCell>
                <TableCell align="right">01/06/2022</TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default UpcomingEventCard;
