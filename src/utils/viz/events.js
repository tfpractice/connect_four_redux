import * as d3 from 'd3';
import { setContainer, } from './scales';
import { linkSelect, nodeSelect, updateLinks, updateNodes, updateSim, updateSimLinks, updateSimNodes, } from './selections';

export const dragStarted = sim => (d) => {
  if (!d3.event.active) sim.alphaTarget(0.3);

  // .restart();
  d.fx = d.x;
  d.fy = d.y;
};

export const dragged = sim => (d) => {
  d.fx = d3.event.sourceEvent.x;
  d.fy = d3.event.sourceEvent.y;
};

export const dragEnded = sim => (d) => {
  if (!d3.event.active) sim.alphaTarget(0.3).restart();
  d.fx = null; d.x = sim.force('col2X').x()(d);
  d.fy = null; d.y = sim.force('row2Y').y()(d);
};

export const dragNodes = nodes => (sim) => {
  nodeSelect(nodes)
    .attr('cx', sim.force('col2X').x())
    .attr('cy', sim.force('row2Y').y())
    .call(setContainer(d3.drag())
      .on('start', dragStarted(sim))
      .on('drag', dragged(sim))
      .on('end', dragEnded(sim)));
  
  return sim;
};

export const tickLinks = links => sim =>
  sim.on('tick.link', updateLinks(linkSelect(links)));
export const tickNodes = nodes => sim => sim
  .on('tick.node', updateNodes(nodeSelect(nodes)));

export const ticked = sim =>
  sim.on('tick', updateSim(sim));

export const simTickNode = nodes => sim =>
  sim.on('tick.node', updateSimNodes(sim.nodes())(sim));

export const simTickLink = links => sim =>
  sim.on('tick.player', updateSimLinks(links)(sim));
