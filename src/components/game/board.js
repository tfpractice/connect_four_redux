import * as d3 from 'd3';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Filter } from 'game_grid';
import { withState } from 'recompose';
import Grid from 'material-ui/Grid';
import { Game } from 'connect_four_functional';

// import * as name from '../../../public/worker';
import Alert from './alert';
import Link from './link';
import Column from './column';
import {
  applyTicks,
  linkForces,
  mountSimulation,
  refBox,
  simInit,
} from '../../utils/viz';

const { cIDs, byCol } = Filter;

const { winner } = Game;

const stateToProps = ({ game }) => {
  const simulation = simInit(game);
  const links = simulation.force('players').links();

  return {
    links,
    simulation,
    game,
    nodes: simulation.nodes(),
    cols: cIDs(game.nodes),
  };
};

class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: 0,
      mounted: false,
      forceBox: null,
      simulation: props.simulation,
    };
    this.setRef = this.setRef.bind(this);
    this.showBoard = this.showBoard.bind(this);
  }
  componentDidMount() {
    const { forceBox, mounted, simulation: lSim } = this.state;
    const { simulation: sim } = this.props;

    if (mounted) {
      this.worker.postMessage(applyTicks(mountSimulation(forceBox)(sim)));
    }
  }
  componentWillMount() {
    if (window.Worker) {
      // ler MyWorker=
      console.log('window worker exists');
      this.worker = new Worker('/worker2.js');

      // this.worker.onmessage = m => this.setState({ data: m.data });

      console.log('this.worker', this.worker);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const newLinks = nextProps.links.length !== this.props.links.length;

    return newLinks || nextState.data;
  }

  componentDidUpdate(prevProps, prevState) {
    this.showBoard();
  }

  showBoard() {
    const { forceBox, mounted, simulation: lSim } = this.state;
    const { simulation: sim, game } = this.props;

    console.log('forceBox', forceBox);

    // const { width, height } = forceBox;

    if (mounted && forceBox) {
      // const next = applyTicks(mountSimulation(forceBox)(sim));

      this.worker.postMessage({ game, forceBox: { ...forceBox }});
    }
  }
  update(num = 0) {
    this.worker.postMessage(num);
  }

  setRef(forceBox) {
    if (forceBox) {
      console.log(
        'forceBox.getBoundingClientRect()',
        forceBox.getBoundingClientRect()
      );
      this.setState((prevState, props) => ({
        forceBox: forceBox.getBoundingClientRect(),
        mounted: !!forceBox,
        simulation: applyTicks(
          mountSimulation(forceBox.getBoundingClientRect())(
            linkForces(props.game)(props.simulation)
          )
        ),
      }));
    }
  }

  render() {
    const { game, cols, links } = this.props;

    console.log('this.worker', this.worker);

    const { data } = this.state;

    console.log('this.state.data', this.state.data);

    this.showBoard();

    return (
      <Grid container justify="center" className="board">
        <Grid item xs={10} className="boardGrid">
          <button onClick={() => this.worker.postMessage(null)}> Up </button>
          <p>
            {data}
          </p>
          <svg
            ref={this.setRef}
            viewBox="-5,-5,70,60"
            preserveAspectRatio="xMidYMid"
            className="boardVis"
          >
            {cols.map(id => <Column key={id} id={id} />)}
            {links.map(link => <Link link={link} key={link.index} />)}
          </svg>
        </Grid>
      </Grid>
    );
  }
}

export default connect(stateToProps)(Board);
