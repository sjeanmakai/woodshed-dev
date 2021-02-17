import React, { useEffect, useState } from "react";
import Session from "./Session";
import { useDispatch, useSelector } from "react-redux";
import { ReactSession } from "react-client-session";
import { getSessionsForUser } from "../actions/session.actions";
import PlannerTab from "./PlannerTab";
import "../stylesheets/pages/_manageSessions.scss";
import Alert from "./Alert";

const ManageSessions = () => {
  const user = ReactSession.get("user");
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.alertReducer);

  const users_sessions = useSelector(
    (state) => state.sessionReducer.users_sessions
  );

  const sortedSessions = users_sessions
    ? users_sessions
        .slice()
        .sort((a, b) => new Date(a.sessionDate) - new Date(b.sessionDate))
    : [];

  const user_session_by_date = useSelector(
    (state) => state.sessionReducer.user_session_by_date
  );

  const initialState = {
    startDate: new Date(),
    endDate: new Date(),
  };

  const [{ startDate, endDate }, setState] = useState(initialState);

  // clears the state for all objects
  const clearState = () => {
    setState({ ...initialState });
  };

  useEffect(() => {
    const obj = rangeWeek(new Date().toLocaleDateString("en-US"));
    // set current weeks start and end date
    setState({ startDate: new Date(obj.start), endDate: new Date(obj.end) });
    dispatch(getSessionsForUser(user.user_email, obj.start, obj.end));
  }, [dispatch]); // only run the dispatch on first render..

  // get start and finish date of current week
  const rangeWeek = (dateStr) => {
    if (!dateStr) dateStr = new Date().getTime();
    var dt = new Date(dateStr);
    dt = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());
    dt = new Date(
      dt.getTime() -
        (dt.getDay() > 0
          ? (dt.getDay() - 1) * 1000 * 60 * 60 * 24
          : 6 * 1000 * 60 * 60 * 24)
    );
    return {
      start: dt,
      end: new Date(dt.getTime() + 1000 * 60 * 60 * 24 * 7 - 1),
    };
  };

  // handle the week toggle
  const handleBackBtn = () => {
    const obj = rangeWeek(
      new Date(startDate - 7 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US")
    );
    setState({ startDate: new Date(obj.start), endDate: new Date(obj.end) }); // set start date to new choice
    dispatch(getSessionsForUser(user.user_email, obj.start, obj.end));
  };

  // handle the week toggle
  const handleForwardBtn = () => {
    const obj = rangeWeek(
      new Date(startDate + 7 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US")
    );
    setState({ startDate: new Date(obj.start), endDate: new Date(obj.end) });
    dispatch(getSessionsForUser(user.user_email, obj.start, obj.end));
  };

  return (
    <div className="mng-wrapper">
      <div className="mng-alert">
        {alert.message && <Alert type={alert.type} message={alert.message} />}
      </div>
      <div className="sessions-wrapper">
        {user.user_id ? (
          <div>
            <div className="week-text">
              Week of {startDate.toLocaleDateString("en-US")} -{" "}
              {endDate.toLocaleDateString("en-US")}
            </div>
            <div className="week-btns">
              <button onClick={handleBackBtn}>{"<<"}</button>
              <button onClick={handleForwardBtn}>{">>"}</button>
            </div>
            <nav>
              {sortedSessions &&
                sortedSessions.length > 0 &&
                sortedSessions.map((session, i) => (
                  <PlannerTab key={i} date={new Date(session.sessionDate)} />
                ))}
            </nav>
            {users_sessions && users_sessions.length > 0 ? (
              users_sessions.map((session, i) => (
                <div>
                  {/** show the first session before we make call by date */}
                  {!user_session_by_date && i === 0 && (
                    <Session key={i} data={session} />
                  )}
                  {user_session_by_date &&
                    session.sessionDate ===
                      user_session_by_date[0].sessionDate && (
                      <Session key={i} data={session} />
                    )}
                </div>
              ))
            ) : (
              <div className="sessions-message">
                <div>no sessions created for this week</div>
                <a href="/planSession">plan a session</a>
              </div>
            )}
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

export default ManageSessions;
