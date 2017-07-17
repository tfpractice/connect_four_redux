import * as d3 from 'd3';
import { boardLinks, cIDs, graphLinks, playerLinks, userLinks, } from './links';
import { Compare, Filter, Node as GdNode, Grid, } from 'game_grid';
import { boardScaleX, boardScaleY, getBox, selectorScaleX, selectorScaleY,
  setContainer, } from './scales';

const { byCol, } = Filter;

export const gameX = x => boardScaleX()(getBox('.boardVis'))(x);
export const gameY = y => boardScaleY()(getBox('.boardVis'))(y);

export const nodeSelect = nArr =>
  d3.select('.boardVis')
    .selectAll('.column')
    .data(cIDs(nArr))
    .select('.colGroup')
    .selectAll('.node')
    .data(byCol(nArr))
    .select('.nodeCircle')
    .attr('opacity', 0.4)
;

export const linkSelect = links =>
  d3.select('.boardVis')
    .selectAll('.linkLine')
    .data(links)
    .append('line')
    .classed('linkLine', true);

export const updateNodes = (domNodes = d3.selectAll('.nodeCircle')) => (arg) => {
  domNodes
    .attr('r', 1)
    .attr('cx', (({ x, }) => gameX(x)))
    .attr('cy', (({ y, }) => gameY(y)));
};

export const updateLinks = (domLinks = d3.selectAll('.linkLine')) => () => {
  domLinks
    .attr('x1', d => gameX(d.source.x))
    .attr('y1', d => gameY(d.source.y))
    .attr('x2', d => gameX(d.target.x))
    .attr('y2', d => gameY(d.target.y))
    .attr('stroke', '#fff');
};

export const updateSim = sim => () => {
  updateNodes(nodeSelect(sim.nodes()))();
  updateLinks(linkSelect(sim.force('players').links()))();
};
