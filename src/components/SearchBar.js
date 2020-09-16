import React from "react";
import { Container, Row, Col, InputGroup, FormControl } from "react-bootstrap";
import { ReactComponent as SearchIcon } from "../images/search-icon.svg";

const SearchBar = (props) => {
  return (
    <Container>
      <Row>
        <Col>Movie title</Col>
      </Row>
      <form action="" onSubmit={props.handleSubmit}>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">
              <SearchIcon></SearchIcon>
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            onSubmit={props.handleSubmit}
            onChange={(event) => props.handleChange(event)}
            placeholder="Search"
          />
        </InputGroup>
      </form>
    </Container>
  );
};

export default SearchBar;
