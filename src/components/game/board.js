import Grid from "material-ui/Grid";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Filter } from "game_grid";

import Column from "./column";
import Link from "./link";
import {
  applyTicks,
  mountSimulation,
  playerLinks,
  simInit,
} from "../../utils/viz";

const { cIDs } = Filter;

// const { winner } = Game;

const getLinks = s => s.force(`players`).links();

const stateToProps = ({ game }) => {
  const simulation = simInit(game);

  return {
    game,
    simulation,
    cols: cIDs(game.nodes),
    links: getLinks(simulation),
    display: ref => ref && applyTicks(mountSimulation(ref)(simulation)),
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
      this.worker = new Worker(`/worker2.js`);
    }
  }

  componentWillReceiveProps({ game }) {
    const newLinks =
      playerLinks(game).length !== playerLinks(this.props.game).length;

    const {
      forceBox: { width, height },
    } = this.state;

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

      this.setState({ forceBox, mounted: !!forceBox }, this.showBoard);
    }
  }

  render() {
    let { cols, links } = this.props;

    this.worker.onmessage = ({ data }) => {
      links = data.links;
    };

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
  renderCountProp: `rCount`,
  withRef: true,
  areStatesEqual: ({ game }, { game: nextGame }) =>
    playerLinks(game).length === playerLinks(nextGame).length,
  areStatePropsEqual: ({ links }, { links: nextLinks }) =>
    links.length === nextLinks.length,
})(Board);
