import React, { Component, } from 'react';
import * as d3 from 'd3';
import Column from './column';
import { connect, } from 'react-redux';
import { Filter, } from 'game_grid';
import Visualization from './visualization';
import Grid from 'material-ui/Grid';
import { colorMap, mountRefSimulation, mountSimulation, playerLinks, refSimulation, simInit, } from '../../utils/viz';

const { cIDs, } = Filter;
const stateToProps = ({ game, }) => {
  const simulation = simInit(game);

  const links = simulation.force('players').links(playerLinks(game)).links();

  return {
    links,
    simulation,
    game,
    nodes: game.nodes,
    cols: cIDs(game.nodes),
    colIDs: [ ...new Set(game.nodes.map(n => n.column)), ],
  };
};

class Board extends Component {
  constructor(props) {
    super(props);

    this.setRef = this.setRef.bind(this);
    this.showBoard = this.showBoard.bind(this);
  }

  // componentDidMount() {
  //   // d3.select('.boardVis')
  //   //   .append('g')
  //   //   .classed('linkVis', true)
  //   //   .selectAll('g')
  //   //   .classed('linkGroup', true)
  //   //   .data(this.props.links)
  //   //   .append('line')
  //   //   .classed('linkLine', true);
  //   // this.showBoard();
  // }

  // Component

  // shouldComponentUpdate(nextProps) {
  //   return true;
  // 
  //   // return nextProps.links !== this.props.links;
  // }
  showBoard() {
    this.mountRef && mountRefSimulation(this.mountRef)(this.props.game)(this.props.simulation);
  }

  setRef(ref1) {
    this.mountRef = ref1;

    mountRefSimulation(this.mountRef)(this.props.game)(this.props.simulation);
  }
  
  render() {
    const { nodes, actions, game, cols, links, colIDs, active, simulation, winner, } = this.props;
    const element = null;

    // simulation.restart();

    // this.showBoard();
    return (
      <Grid container justify="center" className="board">
        <Grid item xs={10} className="boardGrid">
          <svg ref={this.setRef} viewBox="0,0,120,120" className="boardVis" >
            <Visualization links={links} simulation={simulation}/>
            {cols.map(id => <Column key={id} id={id} />) }
            
          </svg>
        </Grid>
      </Grid>
    );
  }
}

//         <svg height="700" width="700" ref={showLinks} viewBox="0,0,100,100" className="boardVis">

const PureBoard = ({ nodes, actions, game, links, colIDs, active, simulation, winner, }) => {
  const showLinks = ref => ref && mountRefSimulation(ref)(game)(simulation);

  return (
    <Grid container justify="center" className="board">
      <Grid item xs={10} className="boardGrid">
        <canvas height="700" width="700" ref={showLinks} viewBox="0,0,100,100" className="boardVis">
          {/* <canvas height="700" width="700"> */}

          {/* </canvas> */}
          <Visualization links={links} simulation={simulation}/>

          {colIDs.map(id => <Column key={id} id={id} />) }

        </canvas>
        {/* </svg> */}
      </Grid>
    </Grid>
  );
};

export default connect(stateToProps)(PureBoard);
