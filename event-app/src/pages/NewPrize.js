import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_PRIZE } from '../graphql/mutations';
import { useAuth } from '../auth/AuthContext';
import { TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function NewPrize() {
  const { profile } = useAuth();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [pointsRequired, setPoints] = useState();

  const navigate = useNavigate();

  // function is used to ensure that the pointsRequired input never goes below 1
  function handleNumChange(num) {
    if (num < 1) setPoints(1);
    else setPoints(num);
  }

  // function redirects the user to the prizes page
  function handleCancel() {
    navigate("/prizes");
  }

  const [createPrize, { data, loading, error }] = useMutation(CREATE_PRIZE);

  // function is used to handle the form submission and creates a new prize using the provided data and the user's schoolId
  const handleSubmit = () => {
    createPrize({
      variables: {
        CreatePrizeInput: {
          name,
          description,
          pointsRequired,
          schoolId: profile?.school?.id,
        },
      },
      refetchQueries: ["schoolPrizes"],
    }).then(navigate("/prizes"));
  };

  if (error) console.log(error);
  if (data) console.log(data);

  return (
    <div className="flex justify-center h-screen">
      <div className="flex-col gap-8 w-6/12">
        <div className="w-full flex flex-col items-center p-5">
          <div className="text-center mb-16 mt-4">
            <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900 font-poppins">
              Create a new <span className="text-indigo-600">Prize</span>
            </h3>
          </div>
          <div className="flex flex-col w-9/12 gap-4">
            {/* uses Material-UI's TextField component for styling the input fields. */}
            <TextField
              value={name}
              onChange={(e) => setName(e.target.value)}
              variant="outlined"
              required
              fullWidth
              label="Prize Name"
            />
            <TextField
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              variant="outlined"
              required
              fullWidth
              multiline
              rows={4}
              label="Prize Description"
            />
            <div className="flex items-center justify-between ">
              <TextField
                value={pointsRequired}
                onChange={(e) => handleNumChange(e.target.value)}
                variant="outlined"
                type="number"
                required
                label="Prize Point Value"
              />
              <button
                className="close-btn text-center py-4 px-6 rounded border text-black hover:bg-gray-200 focus:outline-none"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="shadow font-normal bg-indigo-600 hover:bg-indigo-800 focus:shadow-outline focus:outline-none text-white py-4 px-6 rounded"
                onClick={handleSubmit}
              >
                Create Prize
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewPrize;
