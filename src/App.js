import { Fragment } from 'react';

import Navbar from './components/Navbar';
import Card from './components/Card';

import './App.css';

function App() {
  return (
    <Fragment>
      <nav className='static'>
        <Navbar />
      </nav>
      <div className="public-items">
        <Card />
      </div>
    </Fragment>
  );
}

export default App;
