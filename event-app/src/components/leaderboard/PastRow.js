import { TableCell, TableRow } from '@mui/material';
import React from 'react';

function PastRow(props) {
    const { participation } = props;

    return (
        <TableRow key={participation?.event?.id}>
            <TableCell component="th" scope="row">
                {participation?.event?.title}
            </TableCell>
            <TableCell>{participation?.event?.points}</TableCell>
            <TableCell>{participation?.event?.quarter}</TableCell>
            <TableCell align="right">
                {participation?.event?.date?.substring(0, 10)}
            </TableCell>
        </TableRow>
    );
}

export default PastRow;
