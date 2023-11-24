import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Day1 } from './Day1';
import { Day2 } from './Day2';

function App() {
  let pages = [<Day1/>, <Day2/>];
  return <Router>
    <Switch>
      {pages.map((page, index) => {
        return <Route path={`/${index+1}`}>{page}</Route>
      })}
    </Switch>
  </Router>
}

export default App;
