import { Fragment, useState } from 'react';

import Navbar from './components/Navbar';
import Card from './components/Card';

import './App.css';

function App() {

  const [newPublic, setNewPublic] = useState({});

  const changeNewPublic = (e) =>{
    setNewPublic(e);
  }


  return (
    <Fragment>
      <nav className='static'>
        <Navbar setNewPublic={(e)=>changeNewPublic(e)}/>
      </nav>
      <div className="public-items">
        <Card newPublic={newPublic}/>
      </div>
    </Fragment>
  );
}

export default App;
