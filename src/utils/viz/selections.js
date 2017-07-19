import * as d3 from 'd3';
import { Filter, } from 'game_grid';
import { cIDs, } from './links';

const { byCol, } = Filter;

export const generalLink = (lArr) => {
  let link = d3.select('.boardVis')
    .select('.linkVis')
    .selectAll('.linkGroup')
    .data(lArr, (d, i) => {
      console.log('d', d);
      return i;
    });

  // 
  link = link.exit().remove();

  link = link.enter()
    .append('line').classed('linkLine', true)
    .merge(link);
  return link;
};
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
  d3.select('.linkVis')
    
    .selectAll('g')
    .classed('linkGroup', true)
    .data(links)
    .append('g')
    .classed('linkGroup', true)
    .select()

    .append('line')
    .classed('linkLine', true);
      
export const linkSelect = (links) => {
  let link = d3.select('.boardVis')
    .select('.linkVis')
    .selectAll('.linkGroup')
    .data(links);
  
  // link = link.exit().remove();

  // 
  link = link.enter()
    .append('g')
    .classed('linkGroup', true)
    .append('line')
    .classed('linkLine', true)
    .merge(link);
  link = link.select('.linkLine');
  return link;
};

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
    .attr('y2', d => sim.force('y').y()(d.target))
    .attr('stroke', '#fff')
    .attr('stroke-width', 0.2);
};

export const updateSim = sim => () => {
  updateNodes(nodeSelect(sim.nodes()))(sim);
  updateLinks()(sim);
};

export const updateSimNodes = nodes => sim => () => updateNodes(nodeSelect(nodes))(sim);

export const updateSimLinks = links => sim => () => {
  const a = 0;

  // console.log('updateSimLinkslinks', links);
  // console.log('updateLinks', sim.force('players').links());
  return updateLinks(linkSelect(links))(sim);
};
