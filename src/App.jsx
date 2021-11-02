import { Switch, Route } from 'react-router-dom';
import GlobalStyles from './components/GlobalStyles';
import Calendar from './pages/Calendar';

const App = () => {
  return (
    <>
      <GlobalStyles />
      <Switch>
        <Route exact path='/' component={Calendar} />
      </Switch>
    </>
  );
};

export default App;
