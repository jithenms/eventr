import { useQuery } from '@apollo/client';
import React from 'react';
import { useParams } from 'react-router-dom';
import StudentRequest from '../components/your-events/StudentRequest';

import { EVENT_PARTICIPATION, GET_EVENT } from '../graphql/queries';

function StudentRequests() {
  // uses the useParams hook to extract the id from the URL parameters
  let { id } = useParams();
  
  // query is used to fetch the event data using the event ID as a variable. The fetch policy is set to 'network-only' to always fetch the latest data from the server.
  const getEvent = useQuery(GET_EVENT, {
    fetchPolicy: "network-only",
    variables: {
      EventId: id,
    },
  });

  // query is used to fetch all event participations using the event ID as a variable.
  const getParticipations = useQuery(EVENT_PARTICIPATION, {
    variables: {
      EventId: id,
    },
  });

  return (
    <div className="flex justify-center h-screen">
      <div className="w-9/12">
        <div className="flex flex-col items-center">
          <h4 className="text-3xl mt-6">
            Requests for {getEvent.data?.event?.title}
          </h4>
          <p className="mt-2 text-gray-700 mb-4 text-center">
            Below are students who have signed up for the event. They will be
            awarded points if they attended the event. Otherwise, the event will
            be removed from their history.
          </p>
        </div>
        {/* The StudentRequest component is displayed in two separate sections: one for students who have requested to join the event, and one for students who have been accepted to the event. */}
        <div className="flex items-start justify-between mt-8">
          <div className="bg-white flex flex-col items-center border rounded-lg px-4 py-4">
            {/* The 'Student Requests' section displays students that have signed up for the event, however, the event will be removed from their history if they do not attend. */}
            <h2 className="text-xl">Student Requests</h2>
            {/* 
                The StudentRequest component is rendered for each participation that has a status of 'JOINED' for the 'Student Requests' 
                section and for each participation that has a status of 'ACCEPTED' for the 'Students Accepted' section. 
            */}
            {getParticipations?.data?.eventParticipation?.map(
              (participation) => {
                if (participation.status === "JOINED")
                  return (
                    <StudentRequest
                      // component takes the participation data, event ID, and an 'accepted' boolean as props.
                      participation={participation}
                      eventId={id}
                    />
                  );
              }
            )}
          </div>
          {/* The 'Accepted' section displays students that have been approved and will be awarded points if they attended the event. */}
          <div className="bg-white flex flex-col items-center border rounded-lg px-4 py-4">
            <p>Students Accepted</p>
            {getParticipations?.data?.eventParticipation?.map(
              (participation) => {
                if (participation.status === "ACCEPTED")
                  return (
                    <StudentRequest
                      participation={participation}
                      eventId={id}
                      accepted={true}
                    />
                  );
              }
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentRequests;
