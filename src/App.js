import React, { Fragment } from "react";
import "./App.css";
import AddTask from "./components/add-task/add-task.component";
import TaskList from "./components/task-list/task-list.component";
import Search from "./components/search/search.component";

function App() {
  return (
    <div id="main_div">
      <Fragment>
        <Search />
        <TaskList />
        <AddTask />
      </Fragment>
    </div>
  );
}

export default App;
