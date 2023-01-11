import { gql } from 'apollo-boost';

export const STUDENT_PARTICIPATION = gql`
    query studentParticipation($StudentId: String!) {
        studentParticipation(studentId: $StudentId) {
            id
            event {
                id
                title
                points
                date
                quarter
                teacher {
                    firstName
                    lastName
                }
            }
            status
        }
    }
`;

export const EVENT_PARTICIPATION = gql`
    query eventParticipation($EventId: String!) {
        eventParticipation(eventId: $EventId) {
            id
            student {
                id
                firstName
                lastName
                email
            }
            status
        }
    }
`;

export const GET_EVENTS = gql`
    query schoolEvents($SchoolId: String!) {
        schoolEvents(schoolId: $SchoolId) {
            id
            title
            description
            points
            quarter
            teacher {
                id
                firstName
                lastName
            }
            date
            time
            createdAt
        }
    }
`;

export const GET_EVENT = gql`
    query event($EventId: String!) {
        event(eventId: $EventId) {
            id
            title
            quarter
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
    query teacher($TeacherId: String!) {
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
    query student($StudentId: String!) {
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
        }
    }
`;

export const TEACHER_EVENTS = gql`
    query teacherEvents($TeacherId: String!) {
        teacherEvents(teacherId: $TeacherId) {
            id
            title
            date
            createdAt
            points
            quarter
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
        }
    }
`;

export const SCHOOL_PRIZES = gql`
    query schoolPrizes($SchoolId: String!) {
        schoolPrizes(schoolId: $SchoolId) {
            id
            name
            description
            pointsRequired
        }
    }
`;

export const STUDENT_PRIZES = gql`
    query studentPrizes($StudentId: String!) {
        studentPrizes(studentId: $StudentId) {
            id
            name
            pointsRequired
        }
    }
`;
