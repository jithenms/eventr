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
import React, { useState } from 'react';
import PastRow from './PastRow';
import { useQuery } from '@apollo/client';
import { STUDENT_PARTICIPATION } from '../../graphql/queries';

function Row(props) {
  // destructures props from component into 'user', 'timeframe', 'ranking', 'handleClick', 'hide'
  const { user, timeframe, ranking, handleClick, hide } = props;

  // uses the useState hook to keep track of the open state
  const [open, setOpen] = useState(false);

  const { data, error, loading } = useQuery(STUDENT_PARTICIPATION, {
    variables: {
      StudentId: user?.id,
    },
  });

  return (
    data?.studentParticipation && (
      <React.Fragment>
        {/* displays data such as ranking, user's name, grade, number of events attended, point based on the timeframe, and give award button */}
        <TableRow id={user?.id} sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell>
            {/* allows the user to expand the row to see the events attended by clicking on the icon */}
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
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
          <TableCell>{data?.studentParticipation?.length}</TableCell>
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
          {/* if the 'hide' prop is false the give award button is displayed
           */}
          {!hide && (
            <TableCell align="right">
              <button
                onClick={() => handleClick(user)}
                className="bg-indigo-600 text-center py-2 px-4 rounded text-white hover:bg-indigo-700 focus:outline-none"
              >
                Give Award
              </button>
            </TableCell>
          )}
        </TableRow>
        <TableRow>
          <TableCell
            style={{
              paddingBottom: 0,
              paddingTop: 0,
            }}
            colSpan={7}
          >
            {/* Collapse component allows to show or hide the events attended */}
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Events Attended
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <b>Event</b>
                      </TableCell>
                      <TableCell>
                        <b>Points</b>
                      </TableCell>
                      <TableCell>
                        <b>Quarter</b>
                      </TableCell>
                      <TableCell align="right">
                        <b>Date</b>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody className="w-full">
                    {data?.studentParticipation?.map((participation) => {
                      if (participation?.status == "ACCEPTED") {
                        return <PastRow participation={participation} />;
                      }
                    })}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    )
  );
}

export default Row;
