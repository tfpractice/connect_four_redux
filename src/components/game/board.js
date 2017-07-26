import * as d3 from 'd3';
import React, { Component } from 'react';
import { connect, connectAdvanced } from 'react-redux';
import { Filter } from 'game_grid';
import { withState } from 'recompose';
import Grid from 'material-ui/Grid';
import { Game } from 'connect_four_functional';

import Alert from './alert';
import Link from './link';
import Column from './column';
import {
  applyTicks,
  applyTicks2,
  linkForces,
  mountSimulation,
  playerLinks,
  refBox,
  simInit,
} from '../../utils/viz';

const { cIDs, byCol } = Filter;

const { winner } = Game;

const stateToProps = ({ game }, own) => {
  const simulation = simInit(game);
  const links = simulation.force('players').links();
  const prev = {
    links,
    simulation,
    game,
    display: ref => ref && applyTicks(mountSimulation(ref)(simulation)),
    cols: cIDs(game.nodes),
  };

  console.log('own', own);
  return ({ game: nextGame, ...args }, ...o2) => {
    console.log('args', args);
    console.log('o2', o2);
    const simulation2 = simInit(nextGame);
    const links2 = simulation2.force('players').links();
    const diffLinks = playerLinks(game).length !== playerLinks(nextGame).length;

    const next = {
      ...prev,
      links: links2,
      simulation: simulation2,
      game: nextGame,
      display: ref => ref && applyTicks(mountSimulation(ref)(simulation2)),
    };

    console.log('playerLinks(game).length', playerLinks(game).length);
    console.log('playerLinks(nextGame).length', playerLinks(nextGame).length);
    console.log('diffLinks', diffLinks);

    return diffLinks ? next : prev;
  };
};

class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mounted: false,
      forceBox: null,
    };
    this.setRef = this.setRef.bind(this);
    this.showBoard = this.showBoard.bind(this);
  }
  componentWillMount() {
    if (window.Worker) {
      this.worker = new Worker('/worker2.js');
    }
  }

  // shouldComponentUpdate(nextProps) {
  //   return (
  //     playerLinks(nextProps.game).length !== playerLinks(this.props.game).length
  //   );
  // }
  componentWillReceiveProps({ game }) {
    const newLinks =
      playerLinks(game).length !== playerLinks(this.props.game).length;

    const { forceBox: { width, height }, mounted } = this.state;

    newLinks && this.worker.postMessage({ game, forceBox: { width, height }});
  }

  componentDidUpdate(prevProps, prevState) {
    this.showBoard();
  }

  showBoard() {
    const { forceBox, mounted } = this.state;

    if (mounted) {
      this.props.display(forceBox);
    }
  }

  setRef(ref) {
    if (ref) {
      const forceBox = ref.getBoundingClientRect();

      this.setState(
        (prevState, props) => ({
          forceBox,
          mounted: !!forceBox,
        }),
        this.showBoard
      );
    }
  }

  render() {
    const { cols, links } = this.props;

    return (
      <Grid container justify="center" className="board">
        <Grid item xs={10} className="boardGrid">
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

export default connect(stateToProps, null, null, {
  renderCountProp: 'numRenders',
  withRef: true,
  areStatesEqual: ({ game }, { game: nextGame }) =>
    playerLinks(game).length !== playerLinks(nextGame).length,
  areStatePropsEqual: ({ links }, { links: nextLinks }) =>
    links.length === nextLinks.length,
})(Board);
