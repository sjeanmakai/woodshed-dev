import {
  CREATE_SESSION,
  CREATE_SESSION_SUCCESS,
  CREATE_SESSION_ERROR,
  UPDATE_SESSION,
  UPDATE_SESSION_SUCCESS,
  UPDATE_SESSION_ERROR,
  DELETE_SESSION,
  DELETE_SESSION_SUCCESS,
  DELETE_SESSION_ERROR,
  GET_SESSIONS,
  GET_SESSIONS_SUCCESS,
  GET_SESSIONS_ERROR,
  GET_SESSION_BY_DATE,
  GET_SESSION_BY_DATE_SUCCESS,
  GET_SESSION_BY_DATE_ERROR,
} from "../helpers/types";

export function sessionReducer(state = {}, action) {
  switch (action.type) {
    case CREATE_SESSION:
      return {
        ...state,
        creatingSession: false,
        session_payload: action.payload,
      };
    case CREATE_SESSION_SUCCESS:
      return {
        ...state,
        createdSession: true,
        added_session: action.payload,
      };
    case CREATE_SESSION_ERROR:
      return {
        ...state,
        error: "There was an error creating the session.",
      };
    case UPDATE_SESSION:
      return {
        ...state,
        updatingSession: false,
        session_payload: action.payload,
      };
    case UPDATE_SESSION_SUCCESS:
      return {
        ...state,
        updatedSession: true,
        updated_session: action.payload,
      };
    case UPDATE_SESSION_ERROR:
      return {
        ...state,
        error: "There was an error updating the session.",
      };
    case DELETE_SESSION:
      return {
        ...state,
        deletingSession: false,
        delete_payload: action.payload,
      };
    case DELETE_SESSION_SUCCESS:
      return {
        ...state,
        deletedSession: true,
        deleted_session: action.payload,
      };
    case DELETE_SESSION_ERROR:
      return {
        ...state,
        error: "There was an error deleting the session.",
      };
    case GET_SESSIONS:
      return {
        ...state,
        loadingSessions: false,
      };
    case GET_SESSIONS_SUCCESS:
      return {
        ...state,
        users_sessions: action.payload,
        loadedSessions: true,
      };
    case GET_SESSIONS_ERROR:
      return {
        ...state,
        error: "There was an error getting session for the user.",
      };
    case GET_SESSION_BY_DATE:
      return {
        ...state,
        loadingSession: false,
      };
    case GET_SESSION_BY_DATE_SUCCESS:
      return {
        ...state,
        user_session_by_date: action.payload,
        loadedSession: true,
      };
    case GET_SESSION_BY_DATE_ERROR:
      return {
        ...state,
        error: "There was an error getting session for the user by this date.",
      };
    default:
      return state;
  }
}
