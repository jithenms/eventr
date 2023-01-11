import React, { useEffect, useState } from 'react';
import { useAuth } from '../../auth/AuthContext';
import { useMutation, useQuery } from '@apollo/client';
import { REDEEM_PRIZE } from '../../graphql/mutations';
import { GET_STUDENT } from '../../graphql/queries';

function PrizeCard(props) {
  const { profile, role } = useAuth();

  // uses the useMutation hook to call the redeemPrize mutation to redeem a prize
  const [redeemPrize] = useMutation(REDEEM_PRIZE);

  // function checks if the student has enough points to redeem the prize and refetch the school prizes
  const handleRedeem = () => {
    if (student?.data?.student?.points > props?.points) {
      redeemPrize({
        variables: {
          PrizeId: props?.id,
          StudentId: profile?.id,
        },
        refetchQueries: ["schoolPrizes", "student"],
      });
    }
  };

  // uses the useQuery hook to get data from the GET_STUDENT query and it's passed with variables
  const student = useQuery(GET_STUDENT, {
    fetchPolicy: "network-only",
    variables: {
      StudentId: profile?.id,
    },
  });

  return (
    <div className="flex flex-col items-center bg-white rounded-lg px-4 py-6 border">
      {/* displays data such as title, points, and description */}
      <h2 className="text-xl font-bold">{props.title}</h2>
      <p className="text-lg">{props.points} Points</p>
      <p className="text-gray-600 my-4">{props.description}</p>
      {/* allows students to redeem the prize */}
      {role === "student" && (
        <button
          // if student points are enough the button class changes to 'bg-indigo-600' and when enough point the button is disabled 'bg-indigo-400 cursor-not-allowed'
          className={
            student?.data?.student?.points > props?.points
              ? "bg-indigo-600 text-center py-2 px-4 rounded text-white hover:bg-indigo-700 focus:outline-none"
              : "bg-indigo-400 cursor-not-allowed text-center py-2 px-4 rounded text-white focus:outline-none"
          }
          onClick={handleRedeem}
        >
          Redeem
        </button>
      )}
    </div>
  );
}

export default PrizeCard;
