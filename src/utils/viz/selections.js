import * as d3 from 'd3';
import { Filter } from 'game_grid';

import { cIDs } from './links';

const { byCol } = Filter;

export const nodeSelect = nArr =>
  d3
    .select('.boardVis')
    .selectAll('.colGroup')
    .data(cIDs(nArr))
    .selectAll('.nodeCircle')
    .data(byCol(nArr));

export const linkSelect = links => d3.selectAll('.linkLine').data(links);

export const updateNodes = (domNodes = d3.selectAll('.nodeCircle')) => sim =>
  domNodes.attr('cx', sim.force('x').x()).attr('cy', sim.force('y').y());

export const updateLinks = (domLinks = d3.selectAll('.linkLine')) => sim =>
  domLinks
    .attr('x1', d => sim.force('x').x()(d.source))
    .attr('y1', d => sim.force('y').y()(d.source))
    .attr('x2', d => sim.force('x').x()(d.target))
    .attr('y2', d => sim.force('y').y()(d.target));

export const updateSimNodes = nodes => sim => () =>
  updateNodes(nodeSelect(nodes))(sim);
export const updateSimLinks = links => sim => () =>
  updateLinks(linkSelect(links))(sim);

export const updateSim = sim => () => {
  updateNodes(nodeSelect(sim.nodes()))(sim);
  updateLinks()(sim);
};
