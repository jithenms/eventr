import { useQuery } from '@apollo/client';
import { TableCell, TableRow } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { EVENT_PARTICIPATION } from '../../graphql/queries';

function TeacherEventCard(props) {
  // useQuery hook is used to retrieve data from the EVENT_PARTICIPATION query with the EventId passed in as a variable
  const { data } = useQuery(EVENT_PARTICIPATION, {
    variables: {
      EventId: props?.event?.id,
    },
  });

  // function iterates through the eventParticipation data and increments a counter for each instance where the participation status is "JOINED"
  function getJoined() {
    let counter = 0;
    data?.eventParticipation.map((participation) => {
      if (participation.status == "JOINED") {
        counter++;
      }
    });
    return counter;
  }

  //  function iterates through the eventParticipation data and increments a counter for each instance where the participation status is "ACCEPTED"
  function getAccepted() {
    let counter = 0;
    data?.eventParticipation.map((participation) => {
      if (participation.status == "ACCEPTED") {
        counter++;
      }
    });
    return counter;
  }

  return (
    // React Fragment containing the table row with the event information and the view student list button.
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell component="th" scope="row">
          {props.event?.title}
        </TableCell>
        <TableCell>{props.event?.date.substring(0, 10)}</TableCell>
        <TableCell>{getJoined()}</TableCell>
        <TableCell>{getAccepted()}</TableCell>
        <TableCell align="right">
          <Link to={`/requests/${props?.event?.id}`}>
            {/* allows the user to view the student list for the event */}
            <button className="bg-indigo-600 text-center py-2 px-4 rounded text-white hover:bg-indigo-700 focus:outline-none">
              View Student List
            </button>
          </Link>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default TeacherEventCard;
