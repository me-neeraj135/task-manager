/** @format */

import React from "react";
import Header from "./Header";
import Table from "./Table";
function App() {
  console.log(`app render`);
  return (
    <div>
      <h1 className="text-center text-sky-600 font-bold text-[2rem] capitalize  ">
        time tracker
      </h1>
      <Header />
      <Table />
    </div>
  );
}

export default App;
