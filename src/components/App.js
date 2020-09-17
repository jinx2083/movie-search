import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Button, Alert, Spinner } from "react-bootstrap";
import styled from "styled-components";

import SearchBar from "./SearchBar";

const App = () => {
  const [movieResults, setMoviesResults] = useState([]);
  const [nominations, setNominations] = useState([]);
  const [input, setInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // TODO: implement pagination of movie results
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  // fetches results from OMDb for input when user presses enter
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSearchTerm(input);
    setError(null);
    try {
      setLoading(true);
      const res = await axios.get(
        `https://www.omdbapi.com/?apikey=${[
          process.env.REACT_APP_APIKEY,
        ]}&s=${input}&type=movie&page=${currentPage}`
      );
      if (res.data.Error) {
        setError(res.data.Error);
      } else {
        setMoviesResults(res.data.Search);
        setTotalResults(res.data.totalResults);
      }
    } catch (e) {
      console.warn("Something wrong happened", e);
    } finally {
      setLoading(false);
    }
  };

  // saves the input as user is typing
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  // saves given movie to nominations list
  const handleNomination = (title, year) => {
    setNominations([...nominations, { Title: title, Year: year }]);
  };

  // removes given movie from nominations list
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
          <Col>
            <Header>The Shoppies </Header>
          </Col>
        </Row>
      </Container>
      <Container>
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
            {/* Movie search results display */}
            <h5>{`Results for "${searchTerm}"`}</h5>
            {loading ? (
              <Spinner color="primary" />
            ) : error ? (
              <Alert variant="danger">{error}</Alert>
            ) : (
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
                    <Movies key={index}>
                      {`${title} (${year}) `}
                      <Button
                        onClick={() => handleNomination(title, year)}
                        disabled={btnDisabled}
                      >
                        Nominate
                      </Button>
                    </Movies>
                  );
                })}
              </ul>
            )}
          </Col>

          {/* Nominations list display */}
          <Col>
            <h5>Nominations</h5>
            <ul>
              {nominations.map((movie, index) => {
                const title = movie.Title;
                const year = movie.Year;
                return (
                  <Movies key={index}>
                    {`${title} (${year}) `}
                    <Button
                      onClick={() => handleRemoveNomination(title, year)}
                      disabled={false}
                    >
                      Remove
                    </Button>
                  </Movies>
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

const Header = styled.h2`
  margin-top: 40px;
  margin-bottom: 15px;
`;

const Movies = styled.li`
  margin-bottom: 10px;
`;
