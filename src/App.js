import React, { Component } from 'react';
//import './App.css';
import Login from './Login'
import Dashboard from './Dashboard'
import { BrowserRouter, Switch, Route } from 'react-router-dom';


class App extends Component {

  // async postData() {
  //   try {
  //     let result = await fetch('https://dev.teledirectasia.com:3092/login', {
  //       method: 'POST',
  //       mode: 'no-cors',
  //       headers: {
  //         'Accept': 'application/json',
  //         'Content-type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         name: 'CL',
  //         apiKey: 'ffe4ff147777f2eb'
  //       })
  //     });
  //     console.log(result);

  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  render() {
    return (
      <div className="App" >

        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/dashboard" component={Dashboard} />
          </Switch>
        </BrowserRouter>

      </div>
    );
  }
}

export default App;
