import { useQuery } from '@apollo/client';
import { TableCell, TableRow } from '@mui/material';
import React from 'react';
import { GET_EVENT } from '../../graphql/queries';

// takes in a "participation" prop which is an object containing information about the event and the user's participation in it
function UpcomingEventCard(props) {
  const { participation } = props;

  // function checks the status of the participation and returns a message based on the status: "Pending..." for "JOINED" and "Attended" for "ACCEPTED"
  function checkStatus() {
    if (participation?.status == "JOINED") {
      return <p className="text-lg">Pending...</p>;
    } else if (participation?.status == "ACCEPTED") {
      return <p className="text-lg text-indigo-600 ">Attended</p>;
    }
  }

  return (
    // React Fragment containing the table row with the event information and the status of the user's participation in the event.
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        {/* information about the event such as title, date, teacher, points and status of the event which is joined or accepted. */}
        <TableCell component="th" scope="row">
          {participation?.event?.title}
        </TableCell>
        <TableCell>{participation?.event?.date?.substring(0, 10)}</TableCell>
        <TableCell>
          {participation?.event?.teacher?.firstName}{" "}
          {participation?.event?.teacher?.lastName}
        </TableCell>
        <TableCell>{participation?.event?.points}</TableCell>
        <TableCell align="right">{checkStatus()}</TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default UpcomingEventCard;
