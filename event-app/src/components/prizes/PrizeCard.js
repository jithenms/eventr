import React, { useEffect, useState } from 'react';
import { useAuth } from '../../auth/AuthContext';
import { useMutation, useQuery } from '@apollo/client';
import { REDEEM_PRIZE } from '../../graphql/mutations';
import { GET_STUDENT } from '../../graphql/queries';

function PrizeCard(props) {
    const { profile, role } = useAuth();

    const [redeemPrize] = useMutation(REDEEM_PRIZE);

    const handleRedeem = () => {
        if (student?.data?.student?.points > props?.points) {
            redeemPrize({
                variables: {
                    PrizeId: props?.id,
                    StudentId: profile?.id,
                },
                refetchQueries: ['schoolPrizes'],
            });
        } else {
            console.log('not enough points');
        }
    };

    const student = useQuery(GET_STUDENT, {
        fetchPolicy: 'network-only',
        variables: {
            StudentId: profile?.id,
        },
    });

    return (
        <div className="flex flex-col items-center bg-white rounded-lg px-4 py-6 border">
            <h2 className="text-xl font-bold">{props.title}</h2>
            <p className="text-lg">{props.points} Points</p>
            <p className="text-gray-600 my-4">{props.description}</p>
            {role === 'student' && (
                <button
                    className={
                        student?.data?.student?.points > props?.points
                            ? 'bg-indigo-600 text-center py-2 px-4 rounded text-white hover:bg-indigo-700 focus:outline-none'
                            : 'bg-indigo-400 cursor-not-allowed text-center py-2 px-4 rounded text-white focus:outline-none'
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
