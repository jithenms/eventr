import { useQuery } from '@apollo/client';
import { TableCell, TableRow } from '@mui/material';
import React from 'react';
import { GET_EVENT } from '../../graphql/queries';

function UpcomingEventCard(props) {
    const { participation } = props;

    const { loading, error, data } = useQuery(GET_EVENT, {
        fetchPolicy: 'network-only',
        variables: {
            EventId: participation?.eventId,
        },
    });

    if (data) console.log(data?.event);

    function checkStatus() {
        if (participation?.status == 'JOINED') {
            return <p className="text-lg">Pending...</p>;
        } else if (participation?.status == 'ACCEPTED') {
            return <p className="text-lg text-indigo-600 ">Attended</p>;
        }
    }

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell component="th" scope="row">
                    {data?.event?.title}
                </TableCell>
                <TableCell>{data?.event?.date?.substring(0, 10)}</TableCell>
                <TableCell>
                    {data?.event?.teacher?.firstName}{' '}
                    {data?.event?.teacher?.lastName}
                </TableCell>
                <TableCell>{data?.event?.points}</TableCell>
                <TableCell align="right">{checkStatus()}</TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default UpcomingEventCard;
