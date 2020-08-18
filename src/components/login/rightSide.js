import React from 'react';

function RightSide(props) {
    const { current } = props;
    return (
      <div
        className="right-side"
        ref={props.containerRef}
        onClick={props.onClick}
      >
        <div className="inner-container">
          <div className="text">{current}</div>
        </div>
      </div>
    );
}

export default RightSide;