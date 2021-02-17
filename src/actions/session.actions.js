import { history } from "../helpers/history.js";
import { planAlertActions } from "../actions/plan_alert.actions";
import { updateAlertActions } from "../actions/update_alert.actions";
import { deleteAlertActions } from "../actions/delete_alert.actions";
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
} from "../helpers/types.js";
import axios from "axios";
import "regenerator-runtime/runtime";

export const createSession = (
  sessionDate,
  sessionCreated,
  author_id,
  objectives
) => async (dispatch) => {
  try {
    dispatch(
      request({
        sessionDate,
        sessionCreated,
        author_id,
        objectives,
      })
    );

    const res = await axios.post("http://localhost:8000/sessions", {
      sessionDate: sessionDate,
      sessionCreated: sessionCreated,
      author_id: author_id,
      objectives: objectives,
    });
    dispatch(success(res.data));
    dispatch(
      planAlertActions.success("You have successfully created your session!")
    );
    setTimeout(() => {
      dispatch(planAlertActions.clear());
    }, 3000);
    setTimeout(() => {
      history.push("/manageSessions");
    }, 3000);
  } catch (err) {
    dispatch(error("Session could not be created"));
    dispatch(
      planAlertActions.error("Hmm..couldn't save. Check if a session exists already")
    );
    setTimeout(() => {
      dispatch(planAlertActions.clear());
    }, 3000);
  }

  function request(payload) {
    return { type: CREATE_SESSION, payload };
  }
  function success(payload) {
    return { type: CREATE_SESSION_SUCCESS, payload };
  }
  function error() {
    return { type: CREATE_SESSION_ERROR };
  }
};

export const updateSession = (
  sessionDate,
  objectives,
  notes,
  hours,
  minutes
) => async (dispatch) => {
  try {
    dispatch(
      request({
        objectives,
        notes,
        hours,
        minutes,
      })
    );

    const res = await axios.put(
      `http://localhost:8000/sessions/:${sessionDate}`,
      {
        objectives: objectives,
        notes: notes,
        hours: hours,
        minutes: minutes,
      }
    );
    dispatch(success(res.data));
    dispatch(
      updateAlertActions.success("You have successfully updated your session!")
    );
    setTimeout(() => {
      dispatch(updateAlertActions.clear());
    }, 2000);
  } catch (err) {
    console.log("ERR", err);
    dispatch(error("Session could not be updated"));
    dispatch(
      updateAlertActions.error("There was a problem updating the session.")
    );
    setTimeout(() => {
      dispatch(updateAlertActions.clear());
    }, 2000);
  }

  function request(payload) {
    return { type: UPDATE_SESSION, payload };
  }
  function success(payload) {
    return { type: UPDATE_SESSION_SUCCESS, payload };
  }
  function error() {
    return { type: UPDATE_SESSION_ERROR };
  }
};

export const deleteSession = (
  sessionDate
) => async (dispatch) => {
  try {
    dispatch(
      request({
        sessionDate
      })
    );

    const res = await axios.put(
      `http://localhost:8000/sessions/:${sessionDate}`
    );
    dispatch(success(res.data));
    dispatch(
      deleteAlertActions.success("You have successfully deleted your session!")
    );
    setTimeout(() => {
      dispatch(deleteAlertActions.clear());
    }, 2000);
  } catch (err) {
    dispatch(error("Session could not be deleted"));
    dispatch(
      deleteAlertActions.error("There was a problem deleting the session.")
    );
    setTimeout(() => {
      dispatch(deleteAlertActions.clear());
    }, 2000);
  }

  function request(payload) {
    return { type: DELETE_SESSION, payload };
  }
  function success(payload) {
    return { type: DELETE_SESSION_SUCCESS, payload };
  }
  function error() {
    return { type: DELETE_SESSION_ERROR };
  }
};

export const getSessionsForUser = (author_id, start_date, end_date) => async (
  dispatch
) => {
  try {
    dispatch(request({ author_id, start_date, end_date }));

    const res = await axios.get(
      `http://localhost:8000/sessions/:${author_id}/:${start_date}/:${end_date}`
    );

    dispatch(success(res.data));
  } catch (err) {
    dispatch(failure("Sessions could not be found for this user"));
  }

  function request(payload) {
    return { type: GET_SESSIONS, payload };
  }
  function success(payload) {
    return { type: GET_SESSIONS_SUCCESS, payload };
  }
  function failure(error) {
    return { type: GET_SESSIONS_ERROR, error };
  }
};

export const getSessionByDate = (author_id, start_date) => async (dispatch) => {
  try {
    dispatch(request({ author_id, start_date }));

    const res = await axios.get(
      `http://localhost:8000/sessions/:${author_id}/:${start_date}`
    );

    dispatch(success(res.data));
  } catch (err) {
    dispatch(failure("Session could not be found for this user on that date"));
  }

  function request(payload) {
    return { type: GET_SESSION_BY_DATE, payload };
  }
  function success(payload) {
    return { type: GET_SESSION_BY_DATE_SUCCESS, payload };
  }
  function failure(error) {
    return { type: GET_SESSION_BY_DATE_ERROR, error };
  }
};
