import React, { useState, useRef } from 'react';

import { Login, Register, RightSide } from '../components';

function Auth(props) {
  const [isLogginActive, setIsLoginActive] = useState(true);
  const rightSide = useRef(null);
  const continerRef = useRef(null);

  const current = isLogginActive ? "Register" : "Login";
  const currentActive = isLogginActive ? "login" : "register";

  const changeState = () => {
    if(isLogginActive) {
      rightSide.current.classList.remove("right");
      rightSide.current.classList.add("left");
    } else {
      rightSide.current.classList.remove("left");
      rightSide.current.classList.add("right");
    }
    setIsLoginActive(!isLogginActive);
  }

    return (
        <div className="login">
            <div className="container" ref={continerRef}>
                {isLogginActive && (
                    <Login {...props} containerRef={continerRef.current} />
                )}
                {!isLogginActive && (
                    <Register {...props} containerRef={continerRef.current} />
                )}
            </div>
            <RightSide
                current={current}
                currentActive={currentActive}
                containerRef={rightSide}
                onClick={changeState}
            />
        </div>

    );
}

export default Auth;