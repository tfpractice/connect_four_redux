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
  resetLinks,
  simInit,
} from '../../utils/viz';

const { cIDs, byCol } = Filter;

const { winner } = Game;
const stateToProps = ({ game, ...rest }, own) => {
  const simulation = simInit(game);
  const links = simulation.force('players').links();

  return {
    links,
    simulation,
    game,
    display: ref => ref && applyTicks(mountSimulation(ref)(simulation)),
    cols: cIDs(game.nodes),

    // restart: ref => applyTicks(mountSimulation(ref)(simulation.restart())),
    // repeat: l => resetLinks(l)(simulation),
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

  componentWillReceiveProps({ game }) {
    const newLinks =
      playerLinks(game).length !== playerLinks(this.props.game).length;

    const { forceBox: { width, height }, mounted } = this.state;

    this.worker.postMessage({ game, forceBox: { width, height }});
  }

  componentDidUpdate(prevProps, prevState) {
    const { forceBox: { width, height }} = this.state;

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

      this.setState({ forceBox, mounted: !!forceBox }, this.showBoard);
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
  renderCountProp: 'rCount',
  withRef: true,
  areStatesEqual: ({ game }, { game: nextGame }) =>
    playerLinks(game).length === playerLinks(nextGame).length,
  areStatePropsEqual: ({ links }, { links: nextLinks }) =>
    links.length === nextLinks.length,
})(Board);
