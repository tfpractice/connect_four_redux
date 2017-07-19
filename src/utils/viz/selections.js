import * as d3 from 'd3';
import { Filter, } from 'game_grid';
import { cIDs, } from './links';

const { byCol, } = Filter;

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

export const linkSelect2 = links =>
  d3.select('.boardVis')
    
    .selectAll('g')
    .classed('linkGroup', true)
    .data(links)
    .append('g')
    .classed('linkGroup', true)
    .select()

    .append('line')
    .classed('linkLine', true);
      
export const linkSelect = links => d3.selectAll('.linkLine').data(links)

;

export const updateNodes = (domNodes = d3.selectAll('.nodeCircle')) => (sim) => {
  domNodes
    .attr('cx', sim.force('x').x())
    .attr('cy', sim.force('y').y());
};
export const updateLinks = (domLinks = d3.selectAll('.linkLine')) => (sim) => {
  const a = 0;

  return domLinks
  
    .attr('x1', d => sim.force('x').x()(d.source))
    .attr('y1', d => sim.force('y').y()(d.source))
    .attr('x2', d => sim.force('x').x()(d.target))
    .attr('y2', d => sim.force('y').y()(d.target));
};

export const updateSim = sim => () => {
  updateNodes(nodeSelect(sim.nodes()))(sim);
  updateLinks()(sim);
};

export const updateSimNodes = nodes => sim => () =>
  updateNodes(nodeSelect(nodes))(sim);

export const updateSimLinks = links => sim => () => {
  const a = 0;

  return updateLinks(linkSelect(links))(sim);
};
