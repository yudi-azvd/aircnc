import React from 'react';
import './App.css';

import logo from './assests/logo.svg'

function App() {
  return (
    <div className="container">
      <img src={logo} alt="aircnc"/>

      <div className="content">
        <p>ofereça <strong>spots</strong> para programadores e 
        encontre <strong>talentos</strong> sua empresa! </p>
      </div>


      <form action="">
        <label htmlFor="email">EMAIL *</label>
        <input 
          type="email" 
          id="email"
          placeholder="seu melhor email"
        />
        <button>Entrar</button>
      </form>



    </div>
  );
}

export default App;
