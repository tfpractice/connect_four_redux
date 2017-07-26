import * as d3 from 'd3';
import {
  applyTicks,
  linkForces,
  mountSimulation,
  simInit,
} from '../src/utils/viz';

onmessage = function({ data }) {
  const simulation = mountSimulation(data.forceBox)(simInit(data.game));
  const links = simulation.force('players').links();

  simulation.on('tick.worker', (a, ...rest) => {
    postMessage({ links, nodes: simulation.nodes() });
  });
};
