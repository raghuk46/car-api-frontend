import React, { useContext, useState, useRef, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

import { AuthContext } from "../../utils/AuthContext";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const ParkCar = () => {
  const classes = useStyles();
  const [slots, setSlots] = useState();
  const authContext = useRef(useContext(AuthContext));

  useEffect(() => {
    const getAvaialableSlots = async () => {
      const response = await fetch("http://localhost:5000/getFreeSlots", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authContext.current.user}`,
        },
      });
      const result = await response.json();
      if (result) {
        setSlots(result.freeSlots);
      }
    };
    getAvaialableSlots();
  }, [authContext]);

  return (
    <Paper>
      <form className={classes.root} noValidate autoComplete="off">
        <div>
          <TextField
            required
            id="outlined-required"
            label="CarPlateNo"
            defaultValue="wkx 9999"
            variant="outlined"
          />
          <TextField
            required
            id="outlined-required"
            label="color"
            defaultValue="red"
            variant="outlined"
          />
          <TextField
            required
            id="outlined-required"
            label="type"
            defaultValue="sedan"
            variant="outlined"
          />
        </div>
      </form>
    </Paper>
  );
};

export default ParkCar;
