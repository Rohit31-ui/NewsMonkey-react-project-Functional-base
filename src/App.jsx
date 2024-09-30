import React, { useState } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import {Route,Routes} from 'react-router-dom';

const App = () => {
  const [mode,setMode] = useState('light');
  const [text,setText] = useState('Enable Dark Mode');
  
 const pageSize= 9;


const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      setText('Enable Light Mode')
     document.body.style.backgroundColor = '#042743';
    } else {
      setMode('light')
      setText('Enable Dark Mode')
      document.body.style.backgroundColor = 'white';
    }
  };

 
    return (
      <>
      <div className='mb-4'>

        <Navbar title="NewsMonkey" mode={mode} text={text} toggleMode={toggleMode} />
      </div>
      
<Routes>

  <Route exact path="/" element={<News key="general" pageSize={pageSize} mode={mode} country="us" category="general" />} />

  <Route exact path="/business" element={<News key="business" pageSize={pageSize} mode={mode} country="us" category="business" />} />

  <Route exact path="/entertainment" element={<News key="entertainment" pageSize={pageSize} mode={mode} country="us" category="entertainment" />} />

  <Route exact path="/health" element={<News key="health" pageSize={pageSize} mode={mode} country="us" category="health" />} />

  <Route exact path="/science" element={<News key="science" pageSize={pageSize} mode={mode} country="us" category="science" />} />

  <Route exact path="/sports" element={<News key="sports" pageSize={pageSize} mode={mode} country="us" category="sports" />} />

  <Route exact path="/technology" element={<News key="technology" pageSize={pageSize} mode={mode} country="us" category="technology" />} />
  
</Routes>

      </>
    );
  
}

export default App;
