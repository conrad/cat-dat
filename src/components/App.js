import React from "react"
import Main from './Main'
import { MuiThemeProvider } from 'material-ui/styles';

import {
  HashRouter,
  Route
} from 'react-router-dom';

require("../theme/index.css")

export default class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <HashRouter>
          <div>
            <Route exact path="/" component={Main} />
          </div>
        </HashRouter>
      </MuiThemeProvider>
    );
  }
}