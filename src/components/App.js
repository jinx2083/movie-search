import React, { useState, useEffect} from 'react';
import axios from 'axios'

import SearchBar from './SearchBar'

const App = ()  => {

  const [movieResults, setMoviesResults] = useState([])
  const [searchTerm, setSearchTerm] = useState('rambo')
  const [loading, setLoading] = useState(false)
  const [totalResults, setTotalResults] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [moviesPerPage, setMoviesPerPage] = useState(20) 
  
  
  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      console.log("handle submit called")
      setLoading(true)
      debugger
      const res = await axios.get(`http://www.omdbapi.com/?apikey=${[process.env.REACT_APP_APIKEY]}&s=${searchTerm}&type=movie&page=${currentPage}`)
      setMoviesResults(res.data.Search)
      setTotalResults(res.data.totalResults)
    } catch (e) {
      console.warn("something wrong happened", e)
    } finally {
      setLoading(false)
    }    
  }

  const handleChange = (e) => {
    setSearchTerm(e.target.value)
  }

  return (
    <div className="App">
      <h1>The Shoppies</h1>
      <SearchBar handleSubmit={handleSubmit} handleChange={handleChange} />
    </div>
  );
}

export default App;
