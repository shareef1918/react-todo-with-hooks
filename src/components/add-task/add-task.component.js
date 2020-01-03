import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import * as actionCreator from "../../store/actions/actions";

import "./add-task.css";

function AddTask() {
  const dispatch = useDispatch();
  const apiInProgress = useSelector(state => state.loading);
  const handleNewModal = () => {
    dispatch(actionCreator.updateModal());
  };
  return (
    <>
      <Button
        variant="primary"
        onClick={handleNewModal}
        id="add_button"
        disabled={apiInProgress}
      >
        +
      </Button>
    </>
  );
}

export default AddTask;
