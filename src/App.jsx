/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import axios from 'axios';
import React, { useRef } from 'react';
import { Form } from 'react-bootstrap'
import './index.css'

const API_URL = 'https://api.unsplash.com/search/photos';
const IMAGES_PER_PAGE = 20;

const App = () => {
  // set the search input to a useRef hook
  const searchInput = useRef(null);

  // fetch image function
  const fetchImages = async () => {
    try {
      const { data } = await axios.get(
        `${API_URL}?query=${searchInput.current.value}&page=1&per_pages=${IMAGES_PER_PAGE}&client_id=${import.meta.env.VITE_API_KEY}`
      );
      console.log('data', data)
    } catch (error) {
      console.log(error)
    }
  }

  // handle search function
  const handleSearch =(event) => {
    event.preventDefault()
    console.log(searchInput.current.value)
  }

  // handle selection  function
  const handleSelection = (selection) => searchInput.current.value = selection

  return (
  <div className='container'>
    <h1 className='title'>Image Search</h1>
    <div className="search-section">
      <Form onSubmit={handleSearch}>
        <Form.Control type='search' placeholder='Type something to search...' className='search-input' ref={searchInput}
        />
      </Form>
    </div>

    {/* handle selection */}
    <div className="filters">
      <div onClick={() => handleSelection('nature')}>Nature</div>
      <div onClick={() => handleSelection('birds')}>Birds</div>
      <div onClick={() => handleSelection('cats')}>Cats</div>
      <div onClick={() => handleSelection('shoes')}>Shoes</div>
    </div>
  </div>
  )
};

export default App