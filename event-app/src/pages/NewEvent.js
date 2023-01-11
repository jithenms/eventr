import React, { useState } from 'react';
import { BsPlus } from 'react-icons/bs';
import { Formik } from 'formik';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CREATE_EVENT } from '../graphql/mutations';
import { useAuth } from '../auth/AuthContext';

function NewEvent() {
    const { profile } = useAuth();
    const navigate = useNavigate();

    const [meridiem, setMeridiem] = useState('PM');
    const [quarter, setQuarter] = useState(1);

    const [createEvent, { data, loading, error }] = useMutation(CREATE_EVENT);

    if (data) navigate('/');
    if (loading) return <p>Loading...</p>;
    if (error) console.log(error);

    console.log(quarter);

    const initialValues = {
        title: '',
        description: '',
        date: '',
        time: '05:00',
        points: 1,
    };

    const validate = (values) => {
        let errors = {};
        if (!values.title) errors.title = 'Title is required.';
        if (!values.description)
            errors.description = 'Description is required.';
        if (!values.date) errors.date = 'Date is required.';
        if (!values.time) errors.time = 'Time is required.';
        if (!values.points) errors.points = 'Point value is required.';
        // console.log(errors);
        return errors;
    };

    return (
        <div className="flex justify-center h-screen">
            <div className="w-7/12">
                <div className="w-full mx-auto p-5">
                    <div className="text-center mb-16 mt-4">
                        <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900 font-poppins">
                            Create a new{' '}
                            <span className="text-indigo-600">Event</span>
                        </h3>
                    </div>

                    <Formik
                        initialValues={initialValues}
                        validate={validate}
                        onSubmit={(values) => {
                            // same shape as initial values
                            console.log('submitted');
                            createEvent({
                                variables: {
                                    CreateEventInput: {
                                        schoolId: profile?.school?.id,
                                        teacherId: profile?.id,
                                        title: values.title,
                                        description: values.description,
                                        date: values.date,
                                        time: moment(
                                            `${values.time} ${meridiem}`,
                                            ['hh:mm A'],
                                        ).format('HH:mm'),
                                        points: values.points,
                                        quarter: quarter,
                                    },
                                },
                            });
                        }}
                    >
                        {(formik) => {
                            const {
                                values,
                                handleChange,
                                handleSubmit,
                                errors,
                                touched,
                                handleBlur,
                            } = formik;
                            return (
                                <form onSubmit={handleSubmit}>
                                    <div className="flex flex-wrap -mx-3 mb-4">
                                        <div className="w-full px-3">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                                Event Title
                                            </label>
                                            <input
                                                name="title"
                                                id="title"
                                                className={
                                                    errors.title &&
                                                    touched.title
                                                        ? 'appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-[#fafafa]'
                                                        : 'appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-[#fafafa]'
                                                }
                                                placeholder="Freshman Orientation Volunteering Opportunity"
                                                value={values.title}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {errors.title && touched.title && (
                                                <span className="text-red-500 text-xs italic">
                                                    {errors.title}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap -mx-3 mb-4">
                                        <div className="w-full px-3">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                                Event Description
                                            </label>
                                            <textarea
                                                name="description"
                                                id="description"
                                                rows={10}
                                                className={
                                                    errors.description &&
                                                    touched.description
                                                        ? 'appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-[#fafafa]'
                                                        : 'appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-[#fafafa]'
                                                }
                                                value={values.description}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                placeholder="This event is about..."
                                            />
                                            {errors.description &&
                                                touched.description && (
                                                    <span className="text-red-500 text-xs italic">
                                                        {errors.description}
                                                    </span>
                                                )}
                                        </div>
                                    </div>
                                    <div className="w-full mb-4">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                            Event Date, Time, and Points
                                        </label>
                                        <div className="flex items-center justify-between w-full gap-12">
                                            {/* date */}
                                            <div className="flex flex-col w-full">
                                                <input
                                                    name="date"
                                                    id="date"
                                                    value={values.date}
                                                    type="date"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className="outline-none rounded-lg bg-gray-200 px-4 py-2 "
                                                />
                                                {errors.date &&
                                                    touched.date && (
                                                        <span className="text-red-500 text-xs italic">
                                                            {errors.date}
                                                        </span>
                                                    )}
                                            </div>
                                            {/* time */}
                                            <div className="flex flex-col">
                                                <div className="bg-gray-200 flex rounded-lg">
                                                    <input
                                                        id="time"
                                                        name="time"
                                                        type="text"
                                                        value={values.time}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        className="outline-none rounded-lg border w-24 py-2 px-5 bg-gray-200"
                                                        pattern="(1[012]|0[1-9]):[0-5][0-9]"
                                                        title="Please enter in an HH:mm format."
                                                    />
                                                    <select
                                                        id="zone"
                                                        value={meridiem}
                                                        onChange={(e) =>
                                                            setMeridiem(
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="border py-2 rounded-lg outline-none bg-gray-200"
                                                    >
                                                        <option defaultValue="PM">
                                                            PM
                                                        </option>
                                                        <option value="AM">
                                                            AM
                                                        </option>
                                                    </select>
                                                </div>
                                                {errors.time &&
                                                    touched.time && (
                                                        <span className="text-red-500 text-xs italic">
                                                            {errors.time}
                                                        </span>
                                                    )}
                                            </div>
                                            <div className="flex flex-col w-full">
                                                <div className="flex items-center bg-gray-200 rounded-lg">
                                                    <input
                                                        name="points"
                                                        id="points"
                                                        type="number"
                                                        value={values.points}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        className="outline-none rounded-lg bg-gray-200 pl-4 py-2 w-16"
                                                    />
                                                    <p>points</p>
                                                </div>
                                                {errors.points &&
                                                    touched.points && (
                                                        <span className="text-red-500 text-xs italic">
                                                            {errors.points}
                                                        </span>
                                                    )}
                                            </div>
                                            <div>
                                                <select
                                                    id="zone"
                                                    value={quarter}
                                                    onChange={(e) =>
                                                        setQuarter(
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="border py-2 rounded-lg outline-none bg-gray-200"
                                                >
                                                    <option defaultValue={1}>
                                                        Quarter 1
                                                    </option>
                                                    <option value={2}>
                                                        Quarter 2
                                                    </option>
                                                    <option value={3}>
                                                        Quarter 3
                                                    </option>
                                                    <option value={4}>
                                                        Quarter 4
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-end mt-8 w-full">
                                        <button
                                            className="shadow bg-indigo-600 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded"
                                            type="submit"
                                        >
                                            Create Event
                                        </button>
                                    </div>
                                </form>
                            );
                        }}
                    </Formik>
                </div>
            </div>
        </div>
    );
}

export default NewEvent;
