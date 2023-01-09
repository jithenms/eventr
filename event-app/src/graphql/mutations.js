import { gql } from '@apollo/client';

export const CREATE_EVENT = gql`
    mutation createEvent($CreateEventInput: CreateEventInput!) {
        createEvent(createEventInput: $CreateEventInput) {
            id
        }
    }
`;

export const CREATE_STUDENT = gql`
    mutation createStudent($CreateStudentInput: CreateStudentInput!) {
        createStudent(createStudentInput: $CreateStudentInput) {
            id
            firstName
        }
    }
`;

export const CREATE_TEACHER = gql`
    mutation createTeacher($CreateTeacherInput: CreateTeacherInput!) {
        createTeacher(createTeacherInput: $CreateTeacherInput) {
            id
        }
    }
`;

export const JOIN_EVENT = gql`
    mutation joinEvent($EventId: String, $StudentId: String) {
        joinEvent(eventId: $EventId, studentId: $StudentId) {
            id
        }
    }
`;

export const LEAVE_EVENT = gql`
    mutation leaveEvent($EventId: String!, $StudentId: String!) {
        leaveEvent(eventId: $EventId, studentId: $StudentId) {
            id
        }
    }
`;

export const ACCEPT_USER = gql`
    mutation acceptEventRequest($EventId: String!, $StudentId: String!) {
        acceptEventRequest(eventId: $EventId, studentId: $StudentId) {
            id
            participations {
                id
                status
            }
        }
    }
`;