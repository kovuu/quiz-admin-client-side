import React from 'react';
import {Route, Switch, BrowserRouter} from 'react-router-dom'
import './App.css';
import TestEditor from './containers/TestEditor';
import TestsList from "./containers/TestsList";
import MenuBar from "./components/MenuBar/MenuBar";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <MenuBar />
            <Switch>
                <Route path='/edit/:id' component={TestEditor} />
                <Route path='/' component={TestsList} exact/>
            </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
