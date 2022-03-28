import React from "react";

const Error = (props) => {
  return (
    <div>
      <div className="alert alert-danger" role="alert">
        {props.message}
      </div>
    </div>
  );
};

export default Error;
