import React from 'react'
import { Container } from 'reactstrap'

const SearchBar = (props) => {
    return (
        <Container>
            <div className="row">
                <section className="">
                    <form action="" onSubmit={props.handleSubmit}>
                    <div className="input-field">
                    <label> Movie Title</label>
                    <input placeholder="Search" type="text" onChange={props.handleChange}></input>
                    </div>
                    </form>
                </section>
            </div>
        </Container>
    )
}

export default SearchBar
