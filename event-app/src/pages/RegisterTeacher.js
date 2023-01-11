import { useMutation } from '@apollo/client';
import { MenuItem, Select } from '@mui/material';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { CREATE_TEACHER, CREATE_SCHOOL } from '../graphql/mutations';
import LoadingScreen from './LoadingScreen';

function RegisterTeacher() {
    const [old, setOld] = useState(false);

    const navigate = useNavigate();

    const { login } = useAuth();

    const initialValues = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        schoolCode: '',
        schoolName: '',
    };

    const validate = (values) => {
        let errors = {};
        if (!values.firstName) errors.firstName = 'First name is required.';
        if (!values.lastName) errors.lastName = 'Last name is required.';
        if (!values.email) errors.email = 'Email is required.';
        if (!values.password) errors.password = 'Password is required.';
        if (values.confirmPassword !== values.password)
            errors.confirmPassword = 'Passwords must match.';
        return errors;
    };

    const [createTeacher, { data, loading, error }] =
        useMutation(CREATE_TEACHER);

    const [createSchool, { sData, sLoading, sError }] =
        useMutation(CREATE_SCHOOL);

    if (data) navigate('/login');
    if (loading) return <LoadingScreen />;
    if (error) console.log(error);

    console.log(old);

    return (
        <div class="bg-[#F3F7F9] min-h-screen flex flex-col">
            <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="text-indigo-600 text-6xl font-poppins font-extrabold text-center">
                        eventr.
                    </h1>
                    <h1 class="mt-8 text-3xl text-center font-bold">
                        Register as teacher
                    </h1>
                    <Formik
                        initialValues={initialValues}
                        validate={validate}
                        onSubmit={(values) => {
                          // Upon successful form submission, the mutation is called, and the user is logged in and redirected to the homepage.
                          old
                            ? createTeacher({
                                variables: {
                                  CreateTeacherInput: {
                                    firstName: values.firstName,
                                    lastName: values.lastName,
                                    email: values.email,
                                    password: values.password,
                                    schoolCode: values.schoolCode,
                                  },
                                },
                              }).then(async (data) => {
                                try {
                                  await login(values?.email, values?.password);
                                  navigate("/");
                                } catch {
                                  console.log(error);
                                }
                              })
                            : createSchool({
                                variables: {
                                  CreateSchoolInput: {
                                    schoolName: values.schoolName,
                                  },
                                },
                              }).then(async (data) => {
                                console.log(data);
                                createTeacher({
                                  variables: {
                                    CreateTeacherInput: {
                                      firstName: values.firstName,
                                      lastName: values.lastName,
                                      email: values.email,
                                      password: values.password,
                                      schoolCode:
                                        data?.data?.createSchool?.code,
                                    },
                                  },
                                }).then(async (data) => {
                                  console.log(data);
                                  try {
                                    await login(
                                      values?.email,
                                      values?.password
                                    );
                                    navigate("/");
                                    // console.log(data);
                                  } catch {
                                    console.log(error);
                                  }
                                });
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
                              // includes a dropdown to switch between creating a new school and joining an existing one.
                              <form onSubmit={handleSubmit}>
                                <Select
                                  value={old}
                                  className="w-full mt-4"
                                  onChange={(e) => setOld(e.target.value)}
                                >
                                  <MenuItem value={false}>
                                    Create New School
                                  </MenuItem>
                                  <MenuItem value={true}>
                                    Join Existing School
                                  </MenuItem>
                                </Select>
                                {old ? (
                                  <input
                                    type="text"
                                    id="schoolCode"
                                    class="block border border-grey-ligh mt-4 w-full p-3 rounded outline-none"
                                    placeholder="School Code (For Existing School)"
                                    value={values.schoolCode}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  />
                                ) : (
                                  <input
                                    type="text"
                                    id="schoolName"
                                    class="block border border-grey-light mt-4 w-full p-3 rounded outline-none"
                                    placeholder="School Name (For New School)"
                                    value={values.schoolName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  />
                                )}
                                <input
                                  type="text"
                                  id="firstName"
                                  class="block border border-grey-light mt-4 w-full p-3 rounded outline-none"
                                  placeholder="First Name"
                                  value={values.firstName}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                                {errors.firstName && touched.firstName && (
                                  <span className="text-red-500 text-xs italic">
                                    {errors.firstName}
                                  </span>
                                )}

                                <input
                                  type="text"
                                  id="lastName"
                                  class="block border border-grey-light w-full p-3 rounded mt-4 outline-none"
                                  placeholder="Last Name"
                                  value={values.lastName}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                                {errors.lastName && touched.lastName && (
                                  <span className="text-red-500 text-xs italic">
                                    {errors.lastName}
                                  </span>
                                )}

                                <input
                                  type="email"
                                  id="email"
                                  class="block border border-grey-light w-full p-3 rounded mt-4 outline-none"
                                  placeholder="Email"
                                  autoComplete="email"
                                  required
                                  value={values.email}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                                {errors.email && touched.email && (
                                  <span className="text-red-500 text-xs italic">
                                    {errors.email}
                                  </span>
                                )}

                                <input
                                  type="password"
                                  id="password"
                                  autoComplete="email"
                                  required
                                  class="block border border-grey-light w-full p-3 rounded mt-4 outline-none"
                                  placeholder="Password"
                                  value={values.password}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                                {errors.password && touched.password && (
                                  <span className="text-red-500 text-xs italic">
                                    {errors.password}
                                  </span>
                                )}

                                <input
                                  type="password"
                                  id="confirmPassword"
                                  class="block border border-grey-light w-full p-3 rounded mt-4 outline-none"
                                  placeholder="Confirm Password"
                                  value={values.confirmPassword}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                                {errors.confirmPassword &&
                                  touched.confirmPassword && (
                                    <span className="text-red-500 text-xs italic">
                                      {errors.confirmPassword}
                                    </span>
                                  )}

                                <button
                                  type="submit"
                                  class="w-full bg-indigo-600 text-center py-3 mt-4 rounded bg-green text-white hover:bg-indigo-700 focus:outline-none my-1"
                                >
                                  Create Teacher Account
                                </button>
                              </form>
                            );
                        }}
                    </Formik>
                </div>

                <div class="text-grey-dark mt-6">
                    Already have an account?{' '}
                    <Link to="/login">
                        <span
                            class="no-underline border-b border-blue text-blue text-indigo-600"
                            href="../login/"
                        >
                            Log in here
                        </span>
                        .
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default RegisterTeacher;
