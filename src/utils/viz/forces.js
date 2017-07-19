import * as d3 from 'd3';
import { getBox, } from './scales';
import { boardLinks, playerLinks, userLinks, } from './links';
import { colScale, gameX, gameY, refBox, refScaleX, refScaleY, rowScale, } from './scales';

export const nodeInit = game => d3.forceSimulation(game.nodes);

export const manyBody = sim => sim.force('charge', d3.forceManyBody());

export const fCenter = sim =>
  sim.force('center', d3.forceCenter(50, 50));
  
export const collide = sim =>
  sim.force('collide', d3.forceCollide(25).strength(0.9));
  
export const xForce = sim => sim.force('x', d3.forceX(({ x, }) => gameX(x)));
export const yForce = sim => sim.force('y', d3.forceY(({ y, }) => gameY(y)));

export const fLink = links => sim => sim.force('link',
  d3.forceLink(links).id((d, i) => d.id)
);

export const delta = a => b => a - b;
export const deltaX = ({ x: x0, }) => ({ x: x1, }) => delta(x0)(x1);
export const deltaY = ({ y: y0, }) => ({ y: y1, }) => delta(y0)(y1);
export const linkDelta = ({ source, target, }) =>
  [ deltaX(source)(target), deltaY(source)(target), ];
  
export const boardForce = game => (sim) => {
  const a = 0;

  return sim.force('board',
    d3.forceLink(boardLinks(game)).id((d, i) => d.id)
  );
};

export const playerForce = game => (sim) => {
  const a = 0;

  return sim.force('players',
    d3.forceLink(playerLinks(game)).id((d, i) => d.id)
  );
};

export const refCenter = ref => sim => sim.force('center', d3.forceCenter(refBox(ref).width / 2, refBox(ref).height / 2));
export const xRefForce = ref => sim => sim.force('x', d3.forceX(d => refScaleX(ref)(d.x)));
export const yRefForce = ref => sim => sim.force('y', d3.forceY(d => refScaleY(ref)(d.y)));
export const colForce = ref => sim => sim.force('col', d3.forceX(d => colScale(ref)(d.x)));
export const rowForce = ref => sim => sim.force('row', d3.forceY(d => rowScale(ref)(d.y)));
