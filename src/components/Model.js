/** @format */

import React from "react";

export default function Model(props) {
  const { children, handleShowModel } = props;

  return (
    <div
      className="absolute left-0 right-0 bottom-0 top-0 bg-slate-400 bg-opacity-50 flex justify-center items-center"
      onClick={handleShowModel}
    >
      {" "}
      {children}
    </div>
  );
}
