import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import styled from "styled-components";

import SearchBar from "./SearchBar";

const App = () => {
  const [movieResults, setMoviesResults] = useState([]);
  const [nominations, setNominations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("rambo");
  const [loading, setLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.get(
        `http://www.omdbapi.com/?apikey=${[
          process.env.REACT_APP_APIKEY,
        ]}&s=${searchTerm}&type=movie&page=${currentPage}`
      );
      setMoviesResults(res.data.Search);
      setTotalResults(res.data.totalResults);
    } catch (e) {
      console.warn("something wrong happened", e);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleNomination = (title, year) => {
    setNominations([...nominations, { Title: title, Year: year }]);
  };

  const handleRemoveNomination = (title, year) => {
    setNominations(
      nominations.filter((movie) => {
        return movie.Title !== [title] && movie.Year !== year;
      })
    );
  };

  return (
    <div className="App">
      <Container>
        <Row>
          <h1>The Shoppies</h1>
        </Row>
        <Row>
          <SearchBar handleSubmit={handleSubmit} handleChange={handleChange} />
        </Row>
        <Row>
          <Col>
            {nominations.length == 5 ? (
              <Banner variant="success">You have selected 5 nominations</Banner>
            ) : (
              <Banner variant="light">{` `}</Banner>
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            {`Results for "${searchTerm}"`}
            <ul>
              {movieResults.map((movie, index) => {
                const title = movie.Title;
                const year = movie.Year;
                let btnDisabled = nominations.length === 5 ? true : false;

                if (
                  nominations.some(
                    (movie) => movie.Title === title && movie.Year === year
                  )
                ) {
                  btnDisabled = true;
                }
                return (
                  <li key={index}>
                    {`${title} (${year}) `}
                    <Button
                      onClick={() => handleNomination(title, year)}
                      disabled={btnDisabled}
                    >
                      Nominate
                    </Button>
                  </li>
                );
              })}
            </ul>
          </Col>

          <Col>
            Nominations
            <ul>
              {nominations.map((movie, index) => {
                const title = movie.Title;
                const year = movie.Year;
                return (
                  <li key={index}>
                    {`${title} (${year}) `}
                    <Button
                      onClick={() => handleRemoveNomination(title, year)}
                      disabled={false}
                    >
                      Remove
                    </Button>
                  </li>
                );
              })}
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;

const Banner = styled(Alert)`
  width: 100%;
`;
