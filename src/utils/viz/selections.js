import * as d3 from 'd3';
import { Filter, } from 'game_grid';
import { cIDs, } from './links';

// import { boardScaleX, boardScaleY, getBox, selectorScaleX, selectorScaleY,
//   setContainer, } from './scales';

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

// export const rawLinks = (links) => {
//   console.log('links', links);
//   return d3.select('.boardVis')
//     .selectAll('line')
//     .data(links)
//     .append('line')
//     .classed('linkLine', true)
//     .attr('stroke-width', '1');
// };
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
      
export const linkSelect = links =>
  d3.select('.boardVis')
    .select('.linkVis')
    .selectAll('.linkGroup')
    .data(links)

  // .append('line')
  // .classed('linkLine', true);

    .select('.linkLine');

// .attr('stroke', '#FFF');

// .selectAll('.linkGroup')

// .selectAll('.linkLine');

export const updateNodes = (domNodes = d3.selectAll('.nodeCircle')) => (sim) => {
  domNodes

    // .attr('r', 2)
    .attr('cx', sim.force('x').x())
    .attr('cy', sim.force('y').y());
};
export const updateLinks = (domLinks = d3.selectAll('.linkLine')) => (sim) => {
  const a = 0;
  
  // const l2 = d3.select('.boardVis')
  //   .append('g')
  //   .classed('linkVis', true)
  //   .selectAll('g')
  //         
  //   .classed('linkGroup', true)
  //   .data(sim.force('players').links())
  //   .append('line')
  //   .classed('linkLine', true);

  // console.log('domLinks.select(\'.linkLine\')', domLinks.select('.linkLine').nodes());
  // d3.select(domLinks);
  //  domLinks
  // l2;

  // console.log('sim', sim.force('players').links().length);
  return domLinks
  
    .attr('x1', d => sim.force('x').x()(d.source))
    .attr('y1', d => sim.force('y').y()(d.source))
    .attr('x2', d => sim.force('x').x()(d.target))
    .attr('y2', d => sim.force('y').y()(d.target))
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
  const a = 0;

  updateLinks(linkSelect(links))(sim);
};
