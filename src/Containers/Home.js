import React, { useContext, useEffect, useRef, useState } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import { AuthContext } from "../utils/AuthContext";

import banner from "../profile_pic.svg";
import FreeSlots from "../components/parkinglot/FreeSlots";
import TotalSlots from "../components/parkinglot/TotalSlots";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

function Home(props) {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const authContext = useRef(useContext(AuthContext));
  useEffect(() => {
    const getUserInfo = async () => {
      const response = await fetch("http://localhost:5000/userInfo", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authContext.current.user}`,
        },
      });
      const result = await response.json();
      if (result.userData) {
        setUsername(result.userData.username);
      }
    };
    getUserInfo();
  }, [authContext]);

  if (!authContext.current.user) {
    props.history.push("/");
    return null;
  }

  const logout = async () => {
    authContext.current.setUser("");
    props.history.push("/auth");
  };

  return (
    <div className={classes.root}>
      <Container maxWidth="sm">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={2}>
              <Grid key="freeslots" item>
                <FreeSlots />
              </Grid>
              <Grid key="totalSlots" item>
                <TotalSlots />
              </Grid>
            </Grid>
            <Grid container justify="center" spacing={3}>
              <div className="card">
                <img src={banner} width="100" height="100" alt="auth" />
                <h4>username: {username}</h4>

                <p>
                  <button
                    style={{
                      backgroundColor: "#F9A826",
                      padding: 8,
                      color: "#fff",
                      width: "40%",
                    }}
                    onClick={logout}
                  >
                    Sign Out
                  </button>
                </p>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Home;
