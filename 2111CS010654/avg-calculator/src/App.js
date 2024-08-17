import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [numbers, setNumbers] = useState([]);
  const [average, setAverage] = useState(0);
  const [prevNumbers, setPrevNumbers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Base URL for the microservice
  const baseUrl = 'http://localhost:3000/numbers/';

  // Function to fetch numbers of the specified type
  const fetchNumbers = async (type) => {
    setLoading(true);
    setError('');
    try {
      // Make API call to the Flask backend
      const response = await axios.get({
        "url":"http://20.244.56.144/test/auth"
    });
      const data = response.data;

      // Update states with the fetched data
      setPrevNumbers(data.windowPrevState);
      setNumbers(data.windowCurrState);
      setAverage(data.avg);
    } catch (err) {
      setError('Failed to fetch data from the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Average Calculator Microservice</h1>

      <div style={styles.buttonContainer}>
        <button onClick={() => fetchNumbers('p')}>Prime Numbers</button>
        <button onClick={() => fetchNumbers('f')}>Fibonacci Numbers</button>
        <button onClick={() => fetchNumbers('e')}>Even Numbers</button>
        <button onClick={() => fetchNumbers('r')}>Random Numbers</button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <div>
          <h2>Previous Numbers:</h2>
          <p>{prevNumbers.join(', ') || 'No previous numbers yet'}</p>

          <h2>Current Numbers:</h2>
          <p>{numbers.join(', ') || 'No numbers yet'}</p>

          <h3>Average: {average}</h3>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '20px',
  },
};

export default App;