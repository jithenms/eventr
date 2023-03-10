import { TableCell, TableRow } from '@mui/material';
import React from 'react';

function PastRow(props) {
    const { participation } = props;

    return (
      // displays data from the 'participation' prop, such as title, points, quarter, date and substring date to show only the date and not the time
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
