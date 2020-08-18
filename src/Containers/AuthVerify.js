import { useContext, useEffect, useRef } from "react";

import { AuthContext } from "../utils/AuthContext";

function AuthVerify(props) {
  const { history } = props;
  const authContext = useRef(useContext(AuthContext));

  useEffect(() => {
    const checkUser = async () => {
      try {
        const token = sessionStorage.getItem("token");
        console.log("************* token ***********", token);
        if (token) {
          authContext.current.setUser(token);
          history.push("/app");
        } else {
          history.push("/auth");
        }
      } catch (error) {
        history.push("auth");
      }
    };
    checkUser();
  }, [authContext, history]);

  return null;
}

export default AuthVerify;
