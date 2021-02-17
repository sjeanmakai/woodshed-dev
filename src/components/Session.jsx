import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactSession } from "react-client-session";
import { getSessionByDate } from "../actions/session.actions";
import { updateSession } from "../actions/session.actions";
import "../stylesheets/components/_session.scss";
import PropTypes from "prop-types";

const Session = ({ data }) => {
  const user = ReactSession.get("user");
  const dispatch = useDispatch();

  const sbd = useSelector((state) => state.sessionReducer.user_session_by_date);

  const initialState = {
    sessionDate: new Date(data.sessionDate),
    formattedDate: new Date(data.sessionDate).toLocaleDateString("en-US"),
    objectives: {
      rep1: data.objectives.rep1,
      rep2: data.objectives.rep2,
      rep3: data.objectives.rep3,
      goal1: data.objectives.goal1,
      goal2: data.objectives.goal2,
      goal3: data.objectives.goal3,
      goal4: data.objectives.goal4,
      goal5: data.objectives.goal5,
    },
    notes: data.notes,
    hours: data.hours,
    minutes: data.minutes,
  };

  const updatedState = {
    sessionDate: new Date(data.sessionDate),
    formattedDate: new Date(data.sessionDate).toLocaleDateString("en-US"),
    objectives: {
      rep1: data.objectives.rep1,
      rep2: data.objectives.rep2,
      rep3: data.objectives.rep3,
      goal1: data.objectives.goal1,
      goal2: data.objectives.goal2,
      goal3: data.objectives.goal3,
      goal4: data.objectives.goal4,
      goal5: data.objectives.goal5,
    },
    notes: sbd ? sbd[0].notes : data.notes,
    hours: data.hours,
    minutes: data.minutes,
  };

  const [
    { sessionDate, formattedDate, objectives, notes, hours, minutes },
    setState,
  ] = useState(initialState);

  // clears the state for all objects
  const clearState = () => {
    setState({ ...initialState });
  };

  const hourOptions = () => {
    var arr = [];

    for (let i = 0; i <= 12; i++) {
      if (i < 10) {
        arr.push(
          <option key={i} value={i}>
            0{i} hours
          </option>
        );
      } else {
        arr.push(
          <option key={i} value={i}>
            {i} hours
          </option>
        );
      }
    }

    return arr;
  };

  const minuteOptions = () => {
    var arr = [];

    for (let i = 0; i <= 60; i++) {
      arr.push(
        <option key={i} value={i}>
          {i} minutes
        </option>
      );
    }

    return arr;
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    if (name === "notes" || name === "hours" || name === "minutes") {
      setState((prevState) => ({ ...prevState, [name]: value }));
    } else {
      setState((prevState) => ({
        objectives: { ...prevState.objectives, [name]: value },
      }));
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    if (objectives.rep1 !== "" && objectives.goal1 !== "") {
      // verify we have a date, some repertoire and goals..
      dispatch(updateSession(sessionDate, objectives, notes, hours, minutes));
    }
  };

  return (
    <div className="session-wrapper">
      <div className="date-wrapper">
        <label>Session Date</label>
        <input
          name="date"
          value={formattedDate}
          className="add-item-input"
          autocomplete="off"
          readOnly={true}
        />
      </div>

      <div className="grid-wrapper">
        <div className="column-1">
          <div className="rep-wrapper">
            <label>Repertoire</label>
            {Object.keys(data.objectives).map((item, i) => (
              <div>
                {item.includes("rep") && (
                  <input
                    key={i}
                    name={`${item}`}
                    value={objectives[item]}
                    onChange={handleChange}
                    className="add-item-input"
                    autocomplete="off"
                  />
                )}
              </div>
            ))}
          </div>
          <div className="practice-time">
            <label>Practice duration</label>
            <div>
              <select
                className="select-time"
                size="2"
                name="hours"
                value={hours}
                onChange={handleChange}
              >
                {hourOptions()}
              </select>
              <select
                className="select-time"
                size="2"
                name="minutes"
                value={minutes}
                onChange={handleChange}
              >
                {minuteOptions()}
              </select>
            </div>
          </div>
        </div>
        <div className="column-2">
          <div className="goal">
            <label>Goals</label>
            {Object.keys(data.objectives).map((item, i) => (
              <div>
                {item.includes("goal") && (
                  <input
                    key={i}
                    name={`${item}`}
                    value={objectives[item]}
                    onChange={handleChange}
                    className="add-item-input"
                    autocomplete="off"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="column-3">
          <div className="notes">
            <label>Notes</label>
            <textarea
              placeholder="ex. learned how to play the A section"
              name="notes"
              form="usrform"
              value={notes}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="btn-wrapper">
        <button onClick={handleUpdate} className="update-btn">
          UPDATE
        </button>
      </div>
    </div>
  );
};

Session.propTypes = {
  // the session object in the state
  data: PropTypes.object,
};

export default Session;
