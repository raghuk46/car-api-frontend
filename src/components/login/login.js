import React, { useState, useContext } from "react";

import authentication from "../../authentication.svg";
import { AuthContext } from "../../utils/AuthContext";

function Login(props) {
  const [message, setMessage] = useState();
  const [type, setType] = useState();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(AuthContext);
  const onSubmit = async () => {
    try {
      if (username === "" && password === "") {
        setType("error");
        setMessage("username & password cannot be null");
      } else {
        const authUser = await fetch("http://localhost:5000/login", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });
        const authResponse = await authUser.json();

        if (authResponse.token) {
          setUser(authResponse.token);
          // let`s store the token in session storage
          sessionStorage.setItem("token", authResponse.token);
          props.history.push("/");
        } else {
          setType("error");
          setMessage(authResponse.message);
        }
      }
    } catch (error) {
      console.log(error);
      setType("error");
      setMessage(error.message);
    }
  };

  return (
    <div className="base-container" ref={props.containerRef}>
      <div className="header">Login</div>
      <div className="content">
        <div className="image">
          <img src={authentication} alt="auth" />
        </div>
        {message !== "" && (
          <div
            style={{
              color: type === "error" ? "red" : "green",
              fontSize: 14,
              marginTop: 10,
            }}
          >
            {message}
          </div>
        )}
        <div className="form">
          <div className="form-group error">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              required
              name="username"
              placeholder="username"
              value={username || ""}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group error">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              required
              name="password"
              placeholder="password"
              value={password || ""}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="footer">
        <button type="button" className="btn" onClick={onSubmit}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
