import React, { Component, } from 'react';
import * as d3 from 'd3';
import Column from './column';
import { connect, } from 'react-redux';
import Visualization from './visualization';
import Grid from 'material-ui/Grid';
import { colorMap, mountRefSimulation, mountSimulation, refSimulation, simInit, userLinks, } from '../../utils/viz';

const stateToProps = ({ game, }) => {
  const simulation = simInit(game);

  const links = simulation.force('players').links(userLinks(game)).links();
  const omniLinks = simulation.force('board').links();

  return {
    links,
    simulation,
    game,
    nodes: game.nodes,
    cMap: colorMap()(game.players),
    colIDs: [ ...new Set(game.nodes.map(n => n.column)), ],
  };
};

class Board extends Component {
  constructor(props) {
    super(props);

    this.setRef = this.setRef.bind(this);
    this.showBoard = this.showBoard.bind(this);
  }
  componentDidMount() {
    // d3.select('.boardVis')
    //   .append('g')
    //   .classed('linkVis', true)
    //   .selectAll('g')
    //   .classed('linkGroup', true)
    //   .data(this.props.links)
    //   .append('line')
    //   .classed('linkLine', true);
    this.showBoard();
  }

  // Component

  shouldComponentUpdate(nextProps) {
    return nextProps.links !== this.props.links;
  }
  showBoard() {
    this.mountRef && mountRefSimulation(this.mountRef)(this.props.game)(this.props.simulation);
  }

  setRef(ref1) {
    this.mountRef = ref1;

    // mountRefSimulation(this.mountRef)(this.props.game)(this.props.simulation);
  }
  
  render() {
    const { nodes, actions, game, links, colIDs, active, simulation, winner, } = this.props;
    const element = null;

    // this.showBoard();
    return (
      <Grid container justify="center" className="board">
        <Grid item xs={10} className="boardGrid">
          <svg ref={this.setRef} viewBox="0,0,100,100" className="boardVis" >
            <Visualization links={links} onMount={this.showBoard} simulation={simulation}/>
            {colIDs.map(id => <Column key={id} id={id} />) }

          </svg>
        </Grid>
      </Grid>
    );
  }
}

const PureBoard = ({ nodes, actions, game, links, colIDs, active, simulation, winner, }) => {
  const element = null;
  const ref = d3.select('.boardVis').node();

  const ms = ref && mountRefSimulation(ref)(game)(simulation);

  return (
    <Grid container justify="center" className="board">
      <Grid item xs={10} className="boardGrid">
        <svg viewBox="0,0,100,100" className="boardVis">
          <Visualization links={links} simulation={simulation}/>

          {colIDs.map(id => <Column key={id} id={id} />) }

        </svg>
      </Grid>
    </Grid>
  );
};

export default connect(stateToProps)(Board);
