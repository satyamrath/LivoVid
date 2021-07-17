import { Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Watch from './components/Watch';

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/watch">
          <Watch />
        </Route>
      </Switch>
    </>
  );
}

export default App;
