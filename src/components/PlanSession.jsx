import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactSession } from "react-client-session";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../stylesheets/pages/_planSession.scss";
import { createSession } from "../actions/session.actions";
import Alert from "./Alert";

const PlanSession = () => {
  const user = ReactSession.get("user");

  const dispatch = useDispatch();
  const alert = useSelector((state) => state.alertReducer);
  const creatingDailyGoals = useSelector(
    (state) => state.sessionReducer.creatingDailyGoals
  );

  const initialState = {
    submitted: false,
    sessionDate: new Date(),
    objectives: {
      rep1: "",
      rep2: "",
      rep3: "",
      goal1: "",
      goal2: "",
      goal3: "",
      goal4: "",
      goal5: "",
    },
  };

  const [{ submitted, sessionDate, objectives }, setState] = useState(
    initialState
  );

  // clears the state for all objects
  const clearState = () => {
    setState({ ...initialState });
  };

  const handleDate = (date) => {
    setState((prevState) => ({ ...prevState, sessionDate: date }));
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setState((prevState) => ({
      objectives: { ...prevState.objectives, [name]: value },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setState((prevState) => ({ ...prevState, submitted: true }));
    // verify we have a date, some repertoire and goals..
    if (sessionDate && objectives.goal1 !== "" && objectives.rep1 !== "") {
      dispatch(
        createSession(
          sessionDate,
          new Date(), // timestamp of creation
          user.user_email,
          objectives
        )
      ).then(() => {
        clearState();
      });
    }
  };

  return (
    <div className="cs-wrapper">
      <div className="cs-alert">
        {alert.message && <Alert type={alert.type} message={alert.message} />}
      </div>
      <div className="create-session-wrapper">
        {user.user_id ? (
          <div className="cs-form-container">
            <form className="cs-form" name="form" onSubmit={handleSubmit}>
              <div className="cs-form-flex">
                <div className="cs-form-column1">
                  <div className="cs-date-input">
                    <label>Session Date</label>
                    <DatePicker
                      selected={sessionDate}
                      onChange={(date) => handleDate(date)}
                    />
                  </div>
                  {submitted && !sessionDate && (
                    <div className="cs-help-block-date">
                      Session date is required
                    </div>
                  )}

                  <div className="goal-wrapper">
                    <label>
                      Goals <span>(at least one required)</span>
                    </label>
                    <div className="cs-text-input1">
                      <input
                        name="goal1"
                        value={objectives.goal1}
                        onChange={handleChange}
                        className="add-item-input"
                        autocomplete="off"
                      />
                    </div>
                    <div className="cs-text-input">
                      <input
                        name="goal2"
                        value={objectives.goal2}
                        onChange={handleChange}
                        className="add-item-input"
                        autocomplete="off"
                      />
                    </div>
                    <div className="cs-text-input">
                      <input
                        name="goal3"
                        value={objectives.goal3}
                        onChange={handleChange}
                        className="add-item-input"
                        autocomplete="off"
                      />
                    </div>
                    <div className="cs-text-input">
                      <input
                        name="goal4"
                        value={objectives.goal4}
                        onChange={handleChange}
                        className="add-item-input"
                        autocomplete="off"
                      />
                    </div>
                    <div className="cs-text-input">
                      <input
                        name="goal5"
                        value={objectives.goal5}
                        onChange={handleChange}
                        className="add-item-input"
                        autocomplete="off"
                      />
                    </div>
                  </div>
                </div>
                <div class="vl"></div>
                <div className="cs-form-column2">
                  <div className="repertoire-wrapper">
                    <label>
                      Repertoire <span>(at least one required)</span>{" "}
                    </label>
                    <div className="cs-text-input1">
                      <input
                        name="rep1"
                        value={objectives.rep1}
                        onChange={handleChange}
                        className="add-item-input"
                        autocomplete="off"
                      />
                    </div>
                    <div className="cs-text-input">
                      <input
                        name="rep2"
                        value={objectives.rep2}
                        onChange={handleChange}
                        className="add-item-input"
                        autocomplete="off"
                      />
                    </div>
                    <div className="cs-text-input">
                      <input
                        name="rep3"
                        value={objectives.rep3}
                        onChange={handleChange}
                        className="add-item-input"
                        autocomplete="off"
                      />
                    </div>
                    {submitted && objectives.rep1 === "" && (
                      <div className="cs-help-block">
                        At least one goal and repertoire item required.
                      </div>
                    )}
                    {submitted && objectives.goal1 === "" && (
                      <div className="cs-help-block">
                        At least one goal and repertoire item required.
                      </div>
                    )}
                    <button className="cs-btn">
                      {creatingDailyGoals ? "Saving daily goals.." : "SAVE"}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        ) : (
          <div className="login-message">
            <div>
              Hmmm..it seems you are no longer logged in, click below to login
              again
            </div>
            <a href="/login">Login</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlanSession;
