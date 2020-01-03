import React from "react";
import { Table, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";
import * as actionCreator from "../store/actions/actions";

function GroupByTable() {
  const listData = useSelector(state => state.todos);
  const dispatch = useDispatch();
  const currentSelection = Number(useSelector(state => state.currentSelection));
  const onDeleteTodo = id => {
    const accept = window.confirm("Do you want to delete this task?");
    if (accept) {
      dispatch(actionCreator.deleteTodo(id));
    }
  };
  const getEditTodo = id => {
    const seletedItem = listData.filter(item => item.id === id);
    dispatch(actionCreator.updateModal());
    dispatch(actionCreator.formEdited(seletedItem[0]));
  };
  const viewTodoItem = id => {
    dispatch(actionCreator.updateModal());
    dispatch(actionCreator.updateViewItem(id));
  };
  const updateStatus = (id, status) => {
    dispatch(actionCreator.updateItemStatus(id, status));
  };
  const sortList = field => {
    dispatch(actionCreator.sortList(field));
  };
  const records = listData.filter(item => {
    if (currentSelection) {
      return item.currentState === currentSelection;
    } else {
      return item;
    }
  });
  return (
    <div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th
              onClick={() => {
                sortList("title");
              }}
            >
              Summary
            </th>
            <th
              onClick={() => {
                sortList("priority");
              }}
            >
              Priority
            </th>
            <th
              onClick={() => {
                sortList("createdAt");
              }}
            >
              Created On
            </th>
            <th
              onClick={() => {
                sortList("dueDate");
              }}
            >
              Due Date
            </th>
            <th colSpan="3" className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        {records.map(item => {
          return (
            <tbody key={item.title}>
              <tr key={item.title}>
                <td colSpan="7">{item.title.toUpperCase()}</td>
              </tr>
              {item.rows.map(row => {
                return (
                    <tr
                      key={row.id}
                      className={row.currentState === 1 ? "opened" : ""}
                    >
                      <td
                        onClick={() => viewTodoItem(row.id)}
                        className="table-row match"
                      >
                        {row.title}
                      </td>
                      <td className="match">{row.priority}</td>
                      <td className="match">{row.createdAt}</td>
                      <td className="match">{row.dueDate}</td>
                      <td className="text-center">
                        <FontAwesomeIcon
                          icon="edit"
                          title="Edit"
                          onClick={() => getEditTodo(row.id)}
                        />
                      </td>
                      <td className="text-center">
                        <div onClick={() => onDeleteTodo(row.id)}>
                          <FontAwesomeIcon icon="trash" title="Delete" />
                        </div>
                      </td>
                      <td className="text-center">
                        {row.currentState > 1 ? (
                          <Button
                            variant="primary"
                            onClick={() => {
                              updateStatus(row.id, row.currentState);
                            }}
                          >
                            Done
                          </Button>
                        ) : (
                          <Button
                            variant="danger"
                            onClick={() => {
                              updateStatus(row.id, row.currentState);
                            }}
                          >
                            Re-Open
                          </Button>
                        )}
                      </td>
                    </tr>
                );
              })}
            </tbody>
          );
        })}
      </Table>
    </div>
  );
}

export default GroupByTable;
