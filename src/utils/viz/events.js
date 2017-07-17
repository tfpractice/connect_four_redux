import * as d3 from 'd3';
import { setContainer, } from './scales';
import { linkSelect, nodeSelect, updateLinks, updateNodes, updateSim, updateSimLinks, updateSimNodes, } from './selections';

export const dragStarted = sim => (d) => {
  if (!d3.event.active) sim.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;

  // updateLinks(linkSelect(sim.force('players').links()))(sim);
};

export const dragged = sim => (d) => {
  d.fx = d3.event.sourceEvent.x;
  d.fy = d3.event.sourceEvent.y;
  updateLinks(linkSelect(sim.force('players').links()))(sim);
};

export const dragEnded = sim => (d) => {
  if (!d3.event.active) sim.alphaTarget(0);
  d.fx = null;
  d.fy = null;
};

export const dragNodes = nodes => sim => nodeSelect(nodes)
  .call(setContainer(d3.drag())
    .on('start', dragStarted(sim))
    .on('drag', dragged(sim))
    .on('end', dragEnded(sim)));

export const tickLinks = links => sim => sim
  .on('tick', updateLinks(linkSelect(links)));

export const tickNodes = nodes => sim => sim
  .on('tick.node', updateNodes(nodeSelect(nodes)));

export const ticked = sim => sim.on('tick', updateSim(sim));

export const simTickNode = nodes => sim =>
  sim.on('tick.node', updateSimNodes(sim.nodes())(sim));

export const simTickLink = links => (sim) => {
  // console.log('links', links);
  const a = 0;

  return sim.on('tick.link', updateSimLinks(links)(sim));
};
