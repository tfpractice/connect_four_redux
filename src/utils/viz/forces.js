import * as d3 from 'd3';
import { getBox, } from './scales';
import { boardLinks, userLinks, } from './links';
import { gameX, gameY, } from './selections';

export const nodeInit = game => d3.forceSimulation(game.nodes);

export const manyBody = sim => sim.force('charge', d3.forceManyBody());

export const fCenter = sim =>
  sim.force('center', d3.forceCenter(getBox('.boardVis').height / 2, getBox('.boardVis').height / 2));

export const fLink = links => sim => sim.force('link',
  d3.forceLink(links).id((d, i) => d.id)
);

export const xForce = sim => sim.force('x', d3.forceX(({ x, }) => gameX(x)));
export const yForce = sim => sim.force('y', d3.forceY(({ y, }) => gameY(y)));

export const boardForce = game => sim => sim.force('board',
  d3.forceLink(boardLinks(game)).id((d, i) => d.id)
);

export const playerForce = game => sim => sim.force('players',
  d3.forceLink(userLinks(game)).id((d, i) => d.id)
);
