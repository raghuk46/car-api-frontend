import React, { useState } from "react";
import authentication from "../../authentication.svg";

import { API_URL } from "../../constants";

function Register(props) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [message, setMessage] = useState();
  const [type, setType] = useState();

  const onSubmit = async () => {
    try {
      const registerRes = await fetch(`${API_URL}/register`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const registerResponse = await registerRes.json();

      if (registerResponse.statusCode === 201) {
        setType("success");
        setMessage(registerResponse.message);
      } else if (registerResponse.statusCode === 200) {
        setType("error");
        setMessage(registerResponse.message);
      } else {
        setType("error");
        setMessage("UserName / Password can`t be null");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="base-container" ref={props.containerRef}>
      <div className="header">Register</div>
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
          <div className="form-group">
            <label htmlFor="username">Email</label>
            <input
              type="text"
              name="username"
              placeholder="username"
              value={username || ""}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="password"
              value={password || ""}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="footer">
        <button type="button" className="btn" onClick={() => onSubmit()}>
          Register
        </button>
      </div>
    </div>
  );
}

export default Register;
