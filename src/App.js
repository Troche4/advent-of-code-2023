import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Day1 } from './Day1';
import { Day2 } from './Day2';
import { Day3 } from './Day3';
import { Day4 } from './Day4';
import { Day5 } from './Day5';
import { Day6 } from './Day6';

function App() {
  let pages = [<Day1/>, <Day2/>, <Day3/>, <Day4/>, <Day5/>, <Day6/>];
  return <Router>
    <Switch>
      {pages.map((page, index) => {
        return <Route path={`/${index+1}`}>{page}</Route>
      })}
    </Switch>
  </Router>
}

export default App;
