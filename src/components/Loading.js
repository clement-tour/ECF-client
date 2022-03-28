import React, { useState } from "react";
//import { css } from "@emotion/react";
import RingLoader from "react-spinners/RingLoader";

const Loading = () => {
  return (
    <div className="sweet-loading text-center " style={{ marginTop: "150px" }}>
      <RingLoader
        speedMultiplier="2"
        color={"#256395"}
        loading={true}
        css=""
        size={200}
      />
    </div>
  );
};

export default Loading;
