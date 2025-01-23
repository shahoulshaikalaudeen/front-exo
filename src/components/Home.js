import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Bienvenue sur l'application</h1>
      <Link to="/register">
        <button>S'inscrire</button>
      </Link>
    </div>
  );
};

export default Home;
