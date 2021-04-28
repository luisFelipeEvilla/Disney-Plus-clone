import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import './App.css';
import Home from './components/Home';

function App() {
  return (
    <div className="App">
      <Router>
        <Header></Header>
         <Switch>
           <Route exact path='/'>
              <Login />
           </Route>
           <Route path="/home">
             <Home/>
           </Route>
         </Switch>
      </Router>
    </div>
  );
}

export default App;
