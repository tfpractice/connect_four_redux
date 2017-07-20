import * as d3 from 'd3';
import { Filter, } from 'game_grid';
import { cIDs, } from './links';

const { byCol, } = Filter;

export const nodeSelect = nArr =>
  d3.select('.boardVis')
    .selectAll('.colGroup')
    .data(cIDs(nArr))
    .selectAll('.nodeCircle')
    .data(byCol(nArr));

// .attr('cx', d => d.column * 10)
// .attr('cy', d => d.row * 10);
      
export const linkSelect = links => d3.selectAll('.linkLine').data(links);

export const updateNodes = (domNodes = d3.selectAll('.nodeCircle')) => sim =>
  domNodes

    .attr('cx', sim.force('x').x())
    .attr('cy', sim.force('y').y());
    
// .attr('cx', sim.force('col').x())
// .attr('cy', sim.force('row').y());

// sim.force('col2X').x()
// sim.force('row2Y').y()
// 
//     .attr('x1', d => sim.force('col2X').x()(d.source))
//     .attr('y1', d => sim.force('row2Y').y()(d.source))    
    
export const updateLinks = (domLinks = d3.selectAll('.linkLine')) => sim =>
  domLinks

    .attr('x1', d => sim.force('x').x()(d.source))
    .attr('y1', d => sim.force('y').y()(d.source))
    .attr('x2', d => sim.force('x').x()(d.target))
    .attr('y2', d => sim.force('y').y()(d.target));
    
// .attr('x1', d => sim.force('col2X').x()(d.source))
// .attr('y1', d => sim.force('row2Y').y()(d.source))
// .attr('x2', d => sim.force('col2X').x()(d.target))
// .attr('y2', d => sim.force('row2Y').y()(d.target));

// 
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
