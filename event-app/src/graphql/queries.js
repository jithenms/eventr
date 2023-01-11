import { gql } from 'apollo-boost';

/*
    Queries are the primary way to retrieve data from the database 
    and retrieve the data in the format that we want
*/

// retrieves participation data for a specific student, including information about the event and the student's participation status.
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

// retrieves participation data for a specific event, including information about the students participating and their participation status.
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

// retrieves a list of events for a specific school, including information about the event, the teacher hosting it, and the date and time of the event.
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

// retrieves information about a specific event, including the title, quarter, date, teacher, and points.
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

// retrieves information about a specific teacher including their name, email, school, and other relevant information.
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

// retrieves information about a specific student including their name, email, school, and other relevant information.
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

// retrieves a list of events hosted by a specific teacher at a particular school
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

// retrieves a list of students in a specific school and their points for a specific quarter.
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

// retrieves a list of prizes available to students for a specific school including information about the prize's name, description, and points required to redeem it.
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

// retrieves a list of prizes a specific student has redeemed including information about the prize's name, description, and points required to redeem it.
export const STUDENT_PRIZES = gql`
    query studentPrizes($StudentId: String!) {
        studentPrizes(studentId: $StudentId) {
            id
            name
            pointsRequired
            createdAt
        }
    }
`;
