import { gql } from '@apollo/client';

export const GIVE_PRIZE = gql`
    mutation givePrize($PrizeId: String!, $StudentId: String!) {
        givePrize(prizeId: $PrizeId, studentId:$StudentId){
            id
        }
    }
`;

/*
A mutation is used to make changes to the data stored on the server. 
These changes can include creating new data, modifying existing data, or deleting data.
*/

// creates an event and returns the id of the created event
export const CREATE_EVENT = gql`
    mutation createEvent($CreateEventInput: CreateEventInput!) {
        createEvent(createEventInput: $CreateEventInput) {
            id
        }
    }
`;

// creates a student and returns the id and first name of the created student
export const CREATE_STUDENT = gql`
    mutation createStudent($CreateStudentInput: CreateStudentInput!) {
        createStudent(createStudentInput: $CreateStudentInput) {
            id
            firstName
        }
    }
`;

// creates a school and returns the id and code of the created school
export const CREATE_SCHOOL = gql`
    mutation createSchool($CreateSchoolInput: CreateSchoolInput!) {
        createSchool(createSchoolInput: $CreateSchoolInput) {
            id
            code
        }
    }
`;

// creates a teacher and returns the id of the created teacher
export const CREATE_TEACHER = gql`
    mutation createTeacher($CreateTeacherInput: CreateTeacherInput!) {
        createTeacher(createTeacherInput: $CreateTeacherInput) {
            id
        }
    }
`;

// joins a student to an event and returns the id of the event
export const JOIN_EVENT = gql`
    mutation joinEvent($EventId: String, $StudentId: String) {
        joinEvent(eventId: $EventId, studentId: $StudentId) {
            id
        }
    }
`;

// allows a student to leave an event and returns the id of the event
export const LEAVE_EVENT = gql`
    mutation leaveEvent($EventId: String!, $StudentId: String!) {
        leaveEvent(eventId: $EventId, studentId: $StudentId) {
            id
        }
    }
`;

// accepts a student's request to join an event and returns the id of the event
export const ACCEPT_USER = gql`
    mutation acceptEventRequest($EventId: String!, $StudentId: String!) {
        acceptEventRequest(eventId: $EventId, studentId: $StudentId) {
            id
        }
    }
`;

// creates a prize and returns the id, name, and points required of the prize
export const CREATE_PRIZE = gql`
    mutation createPrize($CreatePrizeInput: CreatePrizeInput!) {
        createPrize(createPrizeInput: $CreatePrizeInput) {
            id
            name
            pointsRequired
        }
    }
`;

// allows a student to redeem a prize and returns the id, name, and points required of the prize.
export const REDEEM_PRIZE = gql`
    mutation redeemPrize($PrizeId: String!, $StudentId: String!) {
        redeemPrize(prizeId: $PrizeId, studentId: $StudentId) {
            id
            name
            pointsRequired
        }
    }
`;
