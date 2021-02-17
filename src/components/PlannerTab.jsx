import React from "react";
import { ReactSession } from "react-client-session";
import { useDispatch } from "react-redux";
import { getSessionByDate } from "../actions/session.actions";
import "../stylesheets/components/_plannerTab.scss";
import PropTypes from "prop-types";

const PlannerTab = ({ date }) => {
  const user = ReactSession.get("user");
  const dispatch = useDispatch();

  const getDay = () => {
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[date.getDay()];
    return day;
  };

  const handleTabChange = () => {
    dispatch(getSessionByDate(user.user_email, date));
  };

  return (
    <div className="pt" onClick={handleTabChange}>
      {getDay()}
    </div>
  );
};

PlannerTab.propTypes = {
  // the session object in the state
  date: PropTypes.object,
};

export default PlannerTab;
