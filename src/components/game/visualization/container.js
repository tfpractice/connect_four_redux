/* eslint-disable */
import { connect } from 'react-redux';
import Visualization from './component';
import * as d3 from 'd3';
import * as Funcs from './funcs';
import C4Func, { Board as C4Board } from 'connect_four_functional';

const { Traversals, Utils } = C4Func;
const { colGraph, omniGraph, rowGraph, posGraph, negGraph } = Traversals;
const { Node: { sameCol, samePlayer } } = C4Func;
const { next, nodes: gNodes, neighbors: nabes } = C4Board;
const { playerGraph, fromElements } = C4Board;
const { color, scaleY, scaleX, cIDs, graphLinks, playerLinks } = Funcs;
const { Commands: { flatten } } = Utils;

const updateLinks = (domLinks = d3.selectAll('.link')) => () => {
  domLinks
    .attr('stroke', (d => color(d.source.player)))
    .attr('stroke-width', 1)
    .attr('x1', ({ source: { x } }) => x)
    .attr('y1', ({ source: { y } }) => y)
    .attr('x2', ({ target: { x } }) => x)
    .attr('y2', ({ target: { y } }) => y);
};

const updateNodes = (domNodes = d3.selectAll('.nodeCircle')) => () => {
  domNodes
    .attr('cx', (({ x }) => x))
    .attr('cy', (({ y }) => y));
};

const dStart = (sim) => (d) => {
  if (!d3.event.active) sim.alphaTarget(.1).restart();
  d.fx = d.x;
  d.fy = d.y;
};

const dEnd = (sim) => (d) => {
  if (!d3.event.active) sim.alphaTarget(.1);
  d.fx = null;
  d.fy = null;
};

function dragged(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}

const nodeSelect = (nArr) =>
  d3.select('.boardVis')
  .selectAll('.column')
  .data(cIDs(nArr))
  .select('.colGroup')
  .selectAll('.node')
  .data(column => nArr.filter(sameCol({ column })))
  .select('.nodeCircle')
  .attr('r', 15)
  .attr('fill', (d => color(d.player)))
  .attr('opacity', 0.4);

const linkSelect = (links) => d3.selectAll('.link').data(links);
const pLinks = (nodes) => ({ id: player }) =>
  graphLinks(omniGraph(fromElements(...nodes.filter(samePlayer({ player })))));

const mapStateToProps = ({ players }, { nodes }) => {
  const myGrid = omniGraph(fromElements(...nodes));
  // const links = players.map(playerLinks(myGrid)).reduce(flatten, []);
  // console.log('links', links);
  const links = players.map(pLinks(nodes)).reduce(flatten, []);
  const omniLinks = graphLinks(myGrid);
  const myForce = d3.forceSimulation(nodes)
    .force('charge', d3.forceManyBody())
    .force('link', d3.forceLink(omniLinks).distance(60).id(({ id }) => id))
    .force('center', d3.forceCenter(960 / 2, 500 / 2))
    // .force('x', d3.forceX())
    // .force('y', d3.forceY())
    .on('tick.n', updateNodes(nodeSelect(nodes)))
    .on('tick.l', updateLinks(linkSelect(links)));

  nodeSelect(nodes).call(d3.drag()
    .on('start', dStart(myForce))
    .on('drag', dragged)
    .on('end', dEnd(myForce)));

  return ({ links });
};

export default connect(mapStateToProps)(Visualization);
