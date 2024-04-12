// eslint-disable-next-line no-unused-vars
import React, { useRef } from 'react';
import { Form } from 'react-bootstrap'
import './index.css'

const App = () => {
  // set the search input to a useRef hook
  const searchInput = useRef(null);

  // handle search function
  const handleSearch =(event) => {
    event.preventDefault()
    console.log(searchInput.current.value)
  }

  return (
  <div className='container'>
    <h1 className='title'>Image Search</h1>
    <div className="search-section">
      <Form onSubmit={handleSearch}>
        <Form.Control type='search' placeholder='Type something to search...' className='search-input' ref={searchInput}
        />
      </Form>
    </div>

    <div className="filters">
      <div>Nature</div>
      <div>Birds</div>
      <div>Cats</div>
      <div>Shoes</div>
    </div>
  </div>
  )
};

export default App