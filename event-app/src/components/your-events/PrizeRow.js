import { TableCell, TableRow } from '@mui/material';
import React from 'react';

function UpcomingEventCard(props) {
    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell component="th" scope="row">
                    {props?.prize?.name}
                </TableCell>
                <TableCell align='center'>{props?.prize?.pointsRequired} points</TableCell>
                <TableCell align="right">{props?.prize?.createdAt?.substring(0,10)}</TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default UpcomingEventCard;
