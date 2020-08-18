import React, { useContext, useState, useRef, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { DirectionsCar } from "@material-ui/icons";

import { AuthContext } from "../../utils/AuthContext";

const useStyles = makeStyles((theme) => ({
  paper: {
    height: 120,
    width: 100,
  },
}));

const TotalSlots = () => {
  const classes = useStyles();
  const [slots, setSlots] = useState();
  const authContext = useRef(useContext(AuthContext));

  useEffect(() => {
    const getAvaialableSlots = async () => {
      const response = await fetch("http://localhost:5000/slots", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authContext.current.user}`,
        },
      });
      const result = await response.json();
      if (result) {
        setSlots(result.totalSlots);
      }
    };
    getAvaialableSlots();
  }, [authContext]);

  return (
    <Paper className={classes.paper} rounded>
      <div style={{ flex: 1 }}>
        <span style={{ fontSize: 14, fontWeight: "500" }}>Total Slots</span>
        <DirectionsCar style={{ fontSize: 40 }} />
        <div style={{ fontSize: 24 }}>{slots}</div>
      </div>
    </Paper>
  );
};

export default TotalSlots;
