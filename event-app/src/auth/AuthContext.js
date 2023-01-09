import React, { useContext, useState } from 'react';
import { auth } from './firebase';
import { useEffect } from 'react';
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';
import { useLazyQuery } from '@apollo/client';
import { GET_STUDENT, GET_TEACHER } from '../graphql/queries';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [profile, setProfile] = useState();
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState();

    const [student, { studentLoading, studentError, studentData }] =
        useLazyQuery(GET_STUDENT, {
            fetchPolicy: 'network-only',
        });

    const [teacher, { teacherLoading, teacherError, teacherData }] =
        useLazyQuery(GET_TEACHER, {
            fetchPolicy: 'network-only',
        });

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function logout() {
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log(user);
            setCurrentUser(user);
            user?.getIdTokenResult().then((idTokenResult) => {
                setRole(idTokenResult?.claims?.role);
                if (idTokenResult?.claims?.role === 'student') {
                    student({
                        variables: {
                            StudentId: user?.uid,
                        },
                    }).then((data) => {
                        console.log(data);
                        setProfile(data?.data?.student);
                    });
                } else if (idTokenResult?.claims?.role === 'teacher') {
                    teacher({
                        variables: {
                            TeacherId: user?.uid,
                        },
                    }).then((data) => {
                        console.log(data?.data?.teacher);
                        setProfile(data?.data?.teacher);
                    });
                }
            });
            setLoading(false);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const value = {
        currentUser,
        role,
        profile,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
