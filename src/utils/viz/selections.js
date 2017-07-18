import * as d3 from 'd3';
import { boardLinks, cIDs, graphLinks, playerLinks, userLinks, } from './links';
import { Compare, Filter, Node as GdNode, Grid, } from 'game_grid';
import { boardScaleX, boardScaleY, getBox, selectorScaleX, selectorScaleY,
  setContainer,} from './scales';

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

export const linkSelect = links =>
  d3.select('.boardVis')
    .selectAll('.linkLine')
    .data(links)

    // .append('line')
    // .classed('linkLine', true)
    .attr('stroke-width', '1');

export const updateNodes = (domNodes = d3.selectAll('.nodeCircle')) => sim =>
  domNodes
    // .attr('r', 2)
    .attr('cx', sim.force('x').x())
    .attr('cy', sim.force('y').y())
  ;

export const updateLinks = (domLinks = d3.selectAll('.linkLine')) => (sim) => {
  const a = 0;

  // console.log('sim', sim.force('players').links().length);
  
  return domLinks

    // .append('line')
    // .classed('linkLine', true)
    .attr('x1', (d) => {
      console.log(sim.force('x').x()(d.source));
      
      return sim.force('x').x()(d.source);
    })
    .attr('y1', (d) => {
      console.log(sim.force('y').y()(d.source));
      
      return sim.force('y').y()(d.source);
    })
    .attr('x2', (d) => {
      console.log(sim.force('x').x()(d.target));
      
      return sim.force('x').x()(d.target);
    })
    .attr('y2', (d) => {
      console.log(sim.force('y').y()(d.target));
      
      return sim.force('y').y()(d.target);
    })
    .attr('stroke', '#fff');
};

export const updateSim = sim => () => {
  // console.log('sim.force().links()', sim.force('board').links().length);
  // console.log('sim.force().links()', sim.force('players').links().length);
  updateNodes(nodeSelect(sim.nodes()))(sim);
  updateLinks()(sim);
};

export const updateSimNodes = nodes => sim => () => {
  updateNodes(nodeSelect(nodes))(sim);
};

export const updateSimLinks = links => sim => () => {
  // console.log('linkss', links);
const a =0
  // console.log('updateSimLinks', sim.force('players').links());
  updateLinks(linkSelect(links))(sim);
};
