import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Row from '../components/leaderboard/Row';
import { GET_LEADERBOARD, SCHOOL_PRIZES } from '../graphql/queries';
import { GIVE_PRIZE } from "../graphql/mutations"
import { useQuery, useMutation } from '@apollo/client';
import { MenuItem, Select } from '@mui/material';
import Popup from 'reactjs-popup';
import '../styles/PopupStyle.css';
import { useAuth } from '../auth/AuthContext';

// leaderboard shows all students' points, ranking and their name sorted by their grade and the given timeframe.
function Leaderboard() {
    const [timeframe, setTimeframe] = useState(0);
    const [sortOption, setSortOption] = useState('all');
    const [randomPrize, setRandomPrize] = useState('old');
    const [prize, setPrize] = useState();
    const [random, setRandom] = useState({});
    const [open, setOpen] = useState(false);
    const [prizeOpen, setPrizeOpen] = useState(false);
    const [reason, setReason] = useState('random');

    const { profile, role } = useAuth();

    const schoolPrizes = useQuery(SCHOOL_PRIZES, {
        variables: {
            SchoolId: profile?.school?.id
        }
    })

    const [givePrize] = useMutation(GIVE_PRIZE)

    function handleGivePrize() {
        givePrize({
            variables: {
                PrizeId: prize,
                StudentId: prizeOpen?.id
            }
        }).then((data) => {
            console.log(data);
            setPrizeOpen(false);
        });   
    }

    function handleGiveRandom() {
        givePrize({
            variables: {
                PrizeId: randomPrize,
                StudentId: random?.id
            }
        }).then((data) => {
            console.log(data);
            setOpen(false);
        });
    }

    function handleGetRandom() {
        const randomRowIndex = Math.floor(
            Math.random() * data?.leaderboard?.length,
        );
        const randomId = data?.leaderboard[randomRowIndex].id;
        const row = document.getElementById(randomId);
        const ranking = row.getElementsByTagName('th')[0].innerText;
        setRandom({
            ...data?.leaderboard[randomRowIndex],
            ranking,
        });
        console.log(random);
        setOpen(true);
    }

    const listRows = () => {
        var counter = 0;
        return data?.leaderboard?.map((user) => {
            counter++;
            if (user?.grade == sortOption || sortOption == 'all')
                return (
                    <Row
                        user={user}
                        timeframe={timeframe}
                        ranking={counter}
                        handleClick={handleClick}
                    />
                );
        });
    };

    const { error, data } = useQuery(GET_LEADERBOARD, {
        fetchPolicy: 'cache-and-network',
        variables: {
            SchoolId: profile?.school?.id,
            Quarter: timeframe,
        },
    });
    if (error) console.log(error);
    if (data) console.log(data);

    const getFunction = (timeframe) => {
        if (timeframe == 0) return '(all time)';
        else return `(Q${timeframe})`;
    };

    function handleClick(user) {
        setPrizeOpen(user);
        // if prizeOpen has a user, open the popup - if prizeOpen
    }

    return (
      <div className="flex flex-col h-screen items-center">
        {open && (
          <div className="absolute z-20 bg-white mt-32 py-8 px-4 rounded-lg flex flex-col items-center">
            <h3 className="text-2xl">Random Winner:</h3>
            <TableContainer className="bg-white border rounded-lg mt-8">
              {/* lists the data retrieved from the GET_LEADERBOARD query, filtered by the timeframe, sortOption and grade. */}
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell />
                    {/* shows the prize winner and when was the prize given. */}
                    <TableCell>
                      <p className="text-indigo-600">
                        <b>Ranking</b>
                      </p>
                    </TableCell>
                    <TableCell>
                      <p className="text-indigo-600">
                        <b>Name</b>
                      </p>
                    </TableCell>
                    <TableCell>
                      <p className="text-indigo-600">
                        <b>Grade</b>
                      </p>
                    </TableCell>
                    <TableCell>
                      <p className="text-indigo-600">
                        <b>Events Attended</b>
                      </p>
                    </TableCell>
                    <TableCell align="right">
                      <p className="text-indigo-600">
                        <b>Points {getFunction(timeframe)}</b>
                      </p>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <Row
                    user={random}
                    timeframe={timeframe}
                    ranking={random?.ranking}
                    hide={true}
                  />
                </TableBody>
              </Table>
            </TableContainer>
            <div className="flex items-center gap-8 mt-4">
              <Select
                value={randomPrize}
                defaultValue={'old'}
                onChange={(e) => setRandomPrize(e.target.value)}
              >
                <MenuItem value={'old'} disabled>Choose Prize Type</MenuItem>
                {schoolPrizes?.data?.schoolPrizes.map((prize) => (
                  <MenuItem value={prize?.id}>{prize?.name}</MenuItem>
                ))}
              </Select>
              <button onClick={handleGiveRandom} className="bg-indigo-600 text-center py-2 px-4 rounded text-white hover:bg-indigo-700 focus:outline-none">
                Give Prize
              </button>
            </div>
            <div className="flex items-center gap-8 mt-1">
              <button
                onClick={handleGetRandom}
                className="bg-indigo-600 text-center py-2 px-4 rounded text-white hover:bg-indigo-700 focus:outline-none"
              >
                Choose New Random
              </button>
              <button
                class="close-btn text-center py-2 px-4 rounded border text-black hover:bg-gray-200 focus:outline-none"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
        {(open || prizeOpen) && (
          <div className="absolute z-10 w-screen h-screen bg-black opacity-50" />
        )}
        {prizeOpen && (
          <div className="absolute z-20 bg-white mt-32 py-8 px-4 rounded-lg flex flex-col items-center">
            <h3 className="text-2xl font-bold">
              Award Prize to {prizeOpen?.firstName} {prizeOpen?.lastName}
            </h3>
            <div className="mt-8 flex">
              <div className="flex flex-col items-center">
                <Select
                  value={prize}
                  className=""
                  defaultValue={'old'}
                  onChange={(e) => setPrize(e.target.value)}
                >
                    <MenuItem value={'old'} disabled >Type of Prize</MenuItem>
                    {schoolPrizes?.data?.schoolPrizes.map((prize) => (
                    <MenuItem value={prize?.id}>{prize?.name}</MenuItem>
                    ))}
                </Select>
              </div>
            </div>
            <div className="flex items-center mt-4 gap-8">
              <button onClick={handleGivePrize} className="bg-indigo-600 text-center py-2 px-4 rounded text-white hover:bg-indigo-700 focus:outline-none">
                Give Prize
              </button>
              <button
                className="text-center py-2 px-4 rounded text-black hover:bg-gray-200 border focus:outline-none"
                onClick={() => setPrizeOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
        <h3 class="mt-12 text-3xl sm:text-4xl leading-normal tracking-tight text-gray-900">
          Student Leaderboard
        </h3>
        <div className="w-11/12 mt-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start gap-8 w-full">
              <div className="flex items-center gap-2">
                <p>Timeframe:</p>
                <Select
                  value={timeframe}
                  onChange={(e) => setTimeframe(e.target.value)}
                >
                  <MenuItem value={0}>All time</MenuItem>
                  <MenuItem value={1}>Quarter 1</MenuItem>
                  <MenuItem value={2}>Quarter 2</MenuItem>
                  <MenuItem value={3}>Quarter 3</MenuItem>
                  <MenuItem value={4}>Quarter 4</MenuItem>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <p>Grade:</p>
                <Select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <MenuItem value={"all"}>All Grades</MenuItem>
                  <MenuItem value={9}>Grade 9</MenuItem>
                  <MenuItem value={10}>Grade 10</MenuItem>
                  <MenuItem value={11}>Grade 11</MenuItem>
                  <MenuItem value={12}>Grade 12</MenuItem>
                </Select>
              </div>
            </div>
            {role === "teacher" && (
              <button
                onClick={handleGetRandom}
                className="bg-indigo-600 flex-shrink-0 text-center py-4 px-8 rounded text-white hover:bg-indigo-700 focus:outline-none"
              >
                Generate Random Winner
              </button>
            )}
          </div>
          <TableContainer className="bg-white border rounded-lg mt-8">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>
                    <p className="text-indigo-600">
                      <b>Ranking</b>
                    </p>
                  </TableCell>
                  <TableCell>
                    <p className="text-indigo-600">
                      <b>Name</b>
                    </p>
                  </TableCell>
                  <TableCell>
                    <p className="text-indigo-600">
                      <b>Grade</b>
                    </p>
                  </TableCell>
                  <TableCell>
                    <p className="text-indigo-600">
                      <b>Events Attended</b>
                    </p>
                  </TableCell>
                  <TableCell align="right">
                    <p className="text-indigo-600">
                      <b>Points {getFunction(timeframe)}</b>
                    </p>
                  </TableCell>
                  <TableCell align="right">
                    <p className="text-indigo-600">
                      <b>Give Award</b>
                    </p>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{listRows()}</TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    );
}

export default Leaderboard;
