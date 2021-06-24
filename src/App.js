import './App.css';
import Login from './components/Login/index';
import Register from './components/Register';
import MainPage from './components/MainPage';
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={"/"} component={Login} />
        <Route path={"/login"} component={Login} />
        <Route path={"/register"} component={Register} />
        <Route path={"/check"} component={MainPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
