import { gql } from 'apollo-boost';

export const GET_EVENTS = gql`
    query schoolEvents($SchoolId: String) {
        schoolEvents(schoolId: $SchoolId) {
            id
            title
            description
            points
            quarter
            teacher {
                firstName
                lastName
            }
            date
            time
            participations {
                id
                status
                studentId
            }
            createdAt
        }
    }
`;

export const GET_EVENT = gql`
    query event($EventId: String) {
        event(eventId: $EventId) {
            id
            title
            quarter
            participations {
                id
                studentId
                status
                eventId
            }
            date
            teacher {
                firstName
                lastName
            }
            points
        }
    }
`;

export const GET_TEACHER = gql`
    query teacher($TeacherId: String) {
        teacher(teacherId: $TeacherId) {
            id
            firstName
            lastName
            email
            school {
                id
                name
                code
            }
        }
    }
`;

export const GET_STUDENT = gql`
    query student($StudentId: String) {
        student(studentId: $StudentId) {
            id
            firstName
            lastName
            email
            grade
            points
            q1points
            q2points
            q3points
            q4points
            school {
                id
                name
                code
            }
            participations {
                id
                status
                eventId
                studentId
            }
        }
    }
`;

export const GET_EVENTS_BY_STUDENT = gql`
    query getStudent($AuthId: String) {
        getStudent(authId: $AuthId) {
            firstName
            lastName
            grade
            joinedEvents {
                id
                title
                date
                teacher {
                    firstName
                    lastName
                }
                points
            }
            requestedEvents {
                id
                title
                date
                teacher {
                    firstName
                    lastName
                }
                points
            }
        }
    }
`;

export const TEACHER_EVENTS = gql`
    query teacherEvents($TeacherId: String) {
        teacherEvents(teacherId: $TeacherId) {
            id
            title
            date
            createdAt
            points
            quarter
            participations {
                id
                status
                studentId
            }
        }
    }
`;

export const GET_LEADERBOARD = gql`
    query leaderboard($SchoolId: String!, $Quarter: Int!) {
        leaderboard(schoolId: $SchoolId, quarter: $Quarter) {
            id
            grade
            firstName
            lastName
            points
            q1points
            q2points
            q3points
            q4points
            participations {
                id
                status
                studentId
                eventId
            }
        }
    }
`;
