import { useQuery } from '@apollo/client';
import { TableCell, TableRow } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { EVENT_PARTICIPATION } from '../../graphql/queries';

function TeacherEventCard(props) {
    const { data } = useQuery(EVENT_PARTICIPATION, {
        variables: {
            EventId: props?.event?.id,
        },
    });

    function getJoined() {
        let counter = 0;
        data?.eventParticipation.map((participation) => {
            if (participation.status == 'JOINED') {
                counter++;
            }
        });
        return counter;
    }

    function getAccepted() {
        let counter = 0;
        data?.eventParticipation.map((participation) => {
            if (participation.status == 'ACCEPTED') {
                counter++;
            }
        });
        return counter;
    }

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell component="th" scope="row">
                    {props.event?.title}
                </TableCell>
                <TableCell>{props.event?.date.substring(0, 10)}</TableCell>
                <TableCell>{getJoined()}</TableCell>
                <TableCell>{getAccepted()}</TableCell>
                <TableCell align="right">
                    <Link to={`/requests/${props?.event?.id}`}>
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
