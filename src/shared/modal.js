import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Form, Col, Button, Table } from "react-bootstrap";
import * as actionCreator from "../store/actions/actions";
import { Formik } from "formik";
import * as Yup from "yup";

const schema = Yup.object().shape({
  title: Yup.string().required(),
  description: Yup.string()
    .max(150)
    .required(),
  priority: Yup.string().required(),
  dueDate: Yup.string().required()
});

function ModalWindow() {
  let initialValues = {
    title: "",
    description: "",
    priority: "",
    dueDate: ""
  };
  const isFormEdited = useSelector(state => state.isFormEdited);
  let showModal = useSelector(state => state.showModal);
  let isViewItem = useSelector(state => state.isViewItem);
  const dispatch = useDispatch();
  const formData = useSelector(state => state.editedFormData);
  const handleClose = () => {
    dispatch(actionCreator.updateModal());
    if (isFormEdited) {
      dispatch(actionCreator.updateFormEdit());
    }
    if (isViewItem) {
      dispatch(actionCreator.updateViewItem());
    }
  };
  if (isFormEdited) {
    initialValues = {
      id: formData.id,
      title: formData.title,
      description: formData.description,
      priority: formData.priority,
      dueDate: formData.dueDate,
      createdAt: formData.createdAt,
      currentState: formData.currentState
    };
  }
  return (
    <Fragment>
      <Modal show={showModal} onHide={handleClose} size="lg">
        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            if (isFormEdited) {
              dispatch(
                actionCreator.updateTodo({
                  id: initialValues.id,
                  title: values.title,
                  description: values.description,
                  currentState: initialValues.currentState,
                  createdAt: initialValues.createdAt,
                  dueDate: values.dueDate,
                  priority: values.priority
                })
              );
            } else {
              dispatch(
                actionCreator.addTodoAsync({
                  id: Math.random(),
                  title: values.title,
                  description: values.description,
                  currentState: 2,
                  createdAt: new Date()
                    .toJSON()
                    .slice(0, 10)
                    .replace(/-/g, "-"),
                  dueDate: values.dueDate,
                  priority: values.priority
                })
              );
            }
            dispatch(actionCreator.updateModal());
          }}
        >
          {props => {
            const {
              values,
              errors,
              isSubmitting,
              handleChange,
              handleSubmit
            } = props;
            return (
              <Fragment>
                {isViewItem ? (
                  <div>
                    <Modal.Header closeButton>
                      <Modal.Title>TODO List Item</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Table>
                        <tbody>
                          <tr>
                            <td>Title</td>
                            <td>{formData.title}</td>
                          </tr>
                          <tr>
                            <td>Description</td>
                            <td>{formData.description}</td>
                          </tr>
                          <tr>
                            <td>Priority</td>
                            <td>{formData.priority}</td>
                          </tr>
                          <tr>
                            <td>Created On</td>
                            <td>{formData.createdAt}</td>
                          </tr>
                          <tr>
                            <td>Due Date</td>
                            <td>{formData.dueDate}</td>
                          </tr>
                        </tbody>
                      </Table>
                    </Modal.Body>
                  </div>
                ) : (
                  <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                      <Modal.Title>
                        {isFormEdited ? "Edit TODO List" : "Add TODO List"}
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form.Group controlId="control1">
                        <Form.Label>Summary</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder=""
                          name="title"
                          onChange={handleChange}
                          value={values.title}
                          isInvalid={!!errors.title}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.title}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group controlId="control2">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows="3"
                          name="description"
                          onChange={handleChange}
                          value={values.description}
                          isInvalid={!!errors.description}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.description}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Row>
                        <Form.Group as={Col} controlId="taskPriority">
                          <Form.Label>Priority</Form.Label>
                          <Form.Control
                            as="select"
                            name="priority"
                            onChange={handleChange}
                            value={values.priority}
                            isInvalid={!!errors.priority}
                          >
                            <option value="">None</option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                          </Form.Control>
                          <Form.Control.Feedback type="invalid">
                            {errors.priority}
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} controlId="taskDueDate">
                          <Form.Label>Due Date</Form.Label>
                          <Form.Control
                            type="date"
                            name="dueDate"
                            min={new Date()
                              .toJSON()
                              .slice(0, 10)
                              .replace(/-/g, "-")}
                            onChange={handleChange}
                            value={values.dueDate}
                            isInvalid={!!errors.dueDate}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.dueDate}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Form.Row>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button type="submit" disabled={isSubmitting}>
                        {isFormEdited ? "Update Changes" : "Save Changes"}
                      </Button>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                    </Modal.Footer>
                  </form>
                )}
              </Fragment>
            );
          }}
        </Formik>
      </Modal>
    </Fragment>
  );
}

export default ModalWindow;
