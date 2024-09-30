import React, { Component } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import {Route,Routes} from 'react-router-dom';

export class App extends Component {
  pageSize= 9;
  constructor(props) {
    super(props);
    
    this.state = {
      mode: 'light',
      text: 'Enable Dark Mode'
    };
  }

  toggleMode = () => {
    if (this.state.mode === 'light') {
      this.setState({
        mode: 'dark',
        text: 'Enable Light Mode'
      });
      document.body.style.backgroundColor = '#042743';
    } else {
      this.setState({
        mode: 'light',
        text: 'Enable Dark Mode'
      });
      document.body.style.backgroundColor = 'white';
    }
  };

  render() {
    return (
      <>
        <Navbar title="NewsMonkey" mode={this.state.mode} text={this.state.text} toggleMode={this.toggleMode} />
      
<Routes>

  <Route exact path="/" element={<News key="general" pageSize={this.pageSize} mode={this.state.mode} country="us" category="general" />} />

  <Route exact path="/business" element={<News key="business" pageSize={this.pageSize} mode={this.state.mode} country="us" category="business" />} />

  <Route exact path="/entertainment" element={<News key="entertainment" pageSize={this.pageSize} mode={this.state.mode} country="us" category="entertainment" />} />

  <Route exact path="/health" element={<News key="health" pageSize={this.pageSize} mode={this.state.mode} country="us" category="health" />} />

  <Route exact path="/science" element={<News key="science" pageSize={this.pageSize} mode={this.state.mode} country="us" category="science" />} />

  <Route exact path="/sports" element={<News key="sports" pageSize={this.pageSize} mode={this.state.mode} country="us" category="sports" />} />

  <Route exact path="/technology" element={<News key="technology" pageSize={this.pageSize} mode={this.state.mode} country="us" category="technology" />} />
  
</Routes>

      </>
    );
  }
}

export default App;
