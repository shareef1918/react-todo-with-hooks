import React, { Fragment } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import * as actionCreator from "../../store/actions/actions";
import "./search.css";
import $ from "jquery";
import config from '../../config.json';

function Search() {
  const dispatch = useDispatch();
  const searchList = event => {
    const searchContent = event.target.value;
    dispatch(actionCreator.searchList(searchContent));
    $(".groupBy").val('');
    if (searchContent) {
      var regEx = new RegExp(searchContent, "i");
      $(".match").each(function() {
        let text = $(this).text();
        const index = text.search(regEx);
        $(this).html(
          $(this)
            .text()
            .replace(
              regEx,
              "<span class='text'>" +
                text.substr(index, searchContent.length) +
                "</span>"
            )
        );
      });
    } else {
      $(".match").each(function() {
        $(this).html(
          $(this)
            .text()
            .replace("<span class='text'>", "")
        );
        $(this).html(
          $(this)
            .text()
            .replace("</span>", "")
        );
      });
    }
  };

  const groupByList = event => {
    const groupBy = event.target.value;
    dispatch(actionCreator.groupByEnable(groupBy));
  }

  return (
    <Fragment>
      <div>
        <Form>
          <Form.Group as={Row} controlId="formPlaintextPassword">
            <Col sm="3">
              <Form.Control
                type="text"
                placeholder="Search Text"
                name="search"
                onKeyUp={event => searchList(event)}
              />
            </Col>
            <Col sm="3">
              <Form.Group as={Col} controlId="taskPriority">
                <Form.Control
                  as="select"
                  name="groupby"
                  className="groupBy"
                  onChange={event=>groupByList(event)}
                >
                  <option value="">Group By</option>
                  {config.groupByOptions.map((item)=>{
                    return (item.allow_group_by?<option value={item.value} key={item.value}>{item.title}</option>:'')
                  })}
                </Form.Control>
              </Form.Group>
            </Col>
          </Form.Group>
        </Form>
      </div>
    </Fragment>
  );
}

export default Search;
