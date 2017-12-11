import React, { Component } from "react"
import Grid from 'material-ui/Grid'
import Chart from './Chart'

class Main extends Component {
  render() {
    const prices = [{
      time: 100,
      price: 1000
    }, {
      time: 200,
      price: 2000
    }, {
      time: 600,
      price: 1000
    }];
    return (
      <main>
        <Grid container spacing={40}>
          <Grid item xs={12} md={6}>
            <Chart width={400} height={200} />
          </Grid>
        </Grid>
      </main>
    );
  }
}

export default Main
