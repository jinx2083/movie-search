import React from 'react'
import { Container, Row, Col  } from 'react-bootstrap';

const SearchBar = (props) => {
    return (
        <Container>
            <Row>
                <Col>
                    <form action="" onSubmit={props.handleSubmit}>
                    <label> Movie Title</label>
                    <input placeholder="Search" type="text" onChange={props.handleChange} size={100}></input>
                    </form>
                    </Col>
            </Row>
        </Container>
    )
}

export default SearchBar
