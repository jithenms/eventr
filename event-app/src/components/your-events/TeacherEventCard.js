import { TableCell, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function TeacherEventCard(props) {
    const [joined, setJoined] = useState(0);
    const [accepted, setAccepted] = useState(0);

    console.log(props.event);

    useEffect(() => {
        let joinCounter = 0;
        let acceptCounter = 0;
        for (var i = 0; i < props?.event?.participations.length; i++) {
            if (props?.event?.participations[i]?.status === 'JOINED') {
                joinCounter++;
            } else if (props?.event?.participations[i]?.status === 'ACCEPTED') {
                acceptCounter++;
            }
        }
        setJoined(joinCounter);
        setAccepted(acceptCounter);
    }, []);

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell component="th" scope="row">
                    {props.event?.title}
                </TableCell>
                <TableCell>{props.event?.date.substring(0, 10)}</TableCell>
                <TableCell>{joined}</TableCell>
                <TableCell>{accepted}</TableCell>
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
