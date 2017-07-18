import * as d3 from 'd3';
import { setContainer, } from './scales';
import { linkSelect, nodeSelect, updateLinks, updateNodes, updateSim, updateSimLinks, updateSimNodes, } from './selections';
import { gameX, gameY, } from './scales';

export const dragStarted = sim => (d) => {
  if (!d3.event.active) sim.alphaTarget(0.3).restart();
  d.fx = d.x;

  // = sim.force('x').x()(d);
  d.fy = d.y;

  //  = sim.force('y').y()(d);
  
  // updateLinks(linkSelect(sim.force('players').links()))(sim);
};

export const dragged = sim => (d) => {
  d.fx = d3.event.sourceEvent.x;

  // sim.force('x').x()(d3.event.sourceEvent);
  d.fy = d3.event.sourceEvent.y;

  // sim.force('y').y()(d3.event.sourceEvent);
};

export const dragEnded = sim => (d) => {
  if (!d3.event.active) sim.alphaTarget(0);
  d.fx = d.column;
  d.fy = d.row;
};

export const dragNodes = nodes => (sim) => {
  const drag = nodeSelect(nodes)
    .call(setContainer(d3.drag())
      .on('start', dragStarted(sim))
      .on('drag', dragged(sim))
      .on('end', dragEnded(sim)));

  return sim;
};

export const tickLinks = links => (sim) => {
  console.log('tickLinkslinks', links);
  
  console.log('sim.force(\'players\'', sim.force('players').links());
  return sim
    .on('tick', updateLinks(linkSelect(links)));
};
export const tickNodes = nodes => sim => sim
  .on('tick.node', updateNodes(nodeSelect(nodes)));

export const ticked = sim => sim.on('tick', updateSim(sim));

export const simTickNode = nodes => sim =>
  sim.on('tick.node', updateSimNodes(sim.nodes())(sim));

export const simTickLink = links => (sim) => {
  // console.log('simTickLink ', links);
  // 
  // console.log('simTickLink sim.force(\'players\'', sim.force('players').links());
  const a = 0;
  
  return sim.on('tick.link', updateSimLinks(links)(sim));
};
