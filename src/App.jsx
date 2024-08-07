/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars

// import necessary packages for application
import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Form, Button } from 'react-bootstrap'
import './index.css'

// store data in variables
const API_URL = 'https://api.unsplash.com/search/photos';
const IMAGES_PER_PAGE = 30;

const App = () => {
  // set the search input to a useRef hook
  const searchInput = useRef(null);

  // states to handle data change in application
  const [images, setImages] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  // fetch image function
  const fetchImages = useCallback(async () => {
    try {
      if (searchInput.current.value){
        setErrorMsg('');
        setLoading(true);
        const { data } = await axios.get(
          `${API_URL}?query=${searchInput.current.value}&page=${page}&per_pages=${IMAGES_PER_PAGE}&client_id=${import.meta.env.VITE_API_KEY}`
        );
        console.log('data', data)
        setImages(data.results)
        setTotalPages(30)
        setLoading(false)
      }
    } catch (error) {
      setErrorMsg('Error fetching images. Try again later.');
      console.log(error)
      setLoading(false)
    }
  }, [page])

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  // resert search function 
  const resetSearch = () =>{
    setPage(1)
    fetchImages()
  }

  // handle search function to get what the user entered in search bar
  const handleSearch =(event) => {
    event.preventDefault()
    console.log(searchInput.current.value)
    resetSearch()
  }

  // handle selection  function
  const handleSelection = (selection) => {
    searchInput.current.value = selection
    resetSearch()
  }

  console.log(`page number ${page}`)
  return (
  // Image search container
  <div className='container'>
    <h1 className='title'>Image Search</h1>

    {/* {search input container} */}
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

    {/* loading text */}
    {loading ? (<p className='loading'>Loading...</p>
    ) : (
      <>
        <div className="images">
          {images.map((image) => (
              <img
                key={image.id}
                src={image.urls.small}
                alt={image.alt_description}
                className='image'
              />
            ))}
        </div>

        <div className="buttons">
          {/* display previous if page is greater than 1 and next if page is less than total pages, meaning next will never show on the last page and previous will never show on the first page */}
          {page > 1 && <Button onClick={() => setPage(page - 1)}>Previous Page</Button>}
          {page < totalPages && <Button onClick={() => setPage(page + 1)}>Next Page</Button>}
        </div>
      </>
    )}
  </div>
  )
};

export default App