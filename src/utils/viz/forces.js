import * as d3 from 'd3';
import { spread, } from 'fenugreek-collections';
import { boardLinks, playerLinks, userLinks, } from './links';
import { colBand, colScale, gameX, gameY, getBox, refBox, refScaleX,
  refScaleY, rowBand, rowScale, } from './scales';
import { Node, } from 'connect_four_functional';

const linkHas = ({ id, }) => ({ source: s, target: t, }) => t.id === id || s.id == id;
const getLinks = links => node => links.filter(linkHas(node));
const simPLinks = sim => sim.force('players').links();
const isBeside = a => b => Math.abs(a - b) < 2;

const nCount = ({ column: c, row: r, }) => {
  const cNabes = d3.range(7).filter(isBeside(c)).length;
  const rNabes = d3.range(6).filter(isBeside(r)).length;
  
  return (cNabes * rNabes) - 1;

  // .concat(d3.range(6).filter(isBeside(r))).length;
};

export const nodeInit = game =>
  d3.forceSimulation(spread(game.nodes).map(Node.copy));

export const manyBody = sim => sim.force('charge', d3.forceManyBody()

  // .distanceMin(40)
  
);

export const collide = sim =>
  sim.force('collide', d3.forceCollide(d => nCount(d)).strength(0.1));

export const delta = a => b => a - b;

export const deltaX = ({ x: x0, }) => ({ x: x1, }) => delta(x0)(x1);
export const deltaY = ({ y: y0, }) => ({ y: y1, }) => delta(y0)(y1);

export const deltaCol = ({ column: x0, }) => ({ column: x1, }) => delta(x0)(x1);
export const deltaRow = ({ row: y0, }) => ({ row: y1, }) => delta(y0)(y1);

export const boardDelta = ({ source, target, }) =>
  [ deltaCol(source)(target), deltaRow(source)(target), ];

export const linkDelta = ({ source, target, }) =>
  [ deltaX(source)(target), deltaY(source)(target), ];

export const boardForce = game => (sim) => {
  const dist = link => 10 * Math.hypot(...boardDelta(link));
  const { players, } = game;
  const nodes = sim.nodes();

  return sim.force('board',
    d3.forceLink(boardLinks({ players, nodes, }))
      .strength(0.2).id(d => d.id)
      .distance(dist)

  );
};

export const playerForce = game => (sim) => {
  const dist = link => Math.hypot(...linkDelta(link));
  const { players, } = game;
  const nodes = sim.nodes();

  return sim.force('players',
    d3.forceLink(playerLinks({ players, nodes, })).id(d => d.id).distance(dist)
      .iterations(2)

  );
};

export const refCenter = ref => sim =>
  sim.force('center',
    d3.forceCenter(0.9 * (refBox(ref).width) / 2, 0.9 * (refBox(ref).height) / 2)
  );
    
export const xRefForce = ref => sim =>
  sim.force('x', d3.forceX(d => refScaleX(ref)(d.x)));

export const yRefForce = ref => sim =>
  sim.force('y', d3.forceY(d => refScaleY(ref)(d.y)));

export const xBand = ref => sim =>
  sim.force('xBand', d3.forceX(d => colBand(ref)(d.column)).strength(0.6));

export const yBand = ref => sim =>
  sim.force('yBand', d3.forceY(d => rowBand(ref)(d.row)).strength(0.6));
  
export const col2X = ref => sim =>
  sim.force('col2X', d3.forceX(d => refScaleX(ref).invert(d.column)));

export const row2Y = ref => sim =>
  sim.force('row2Y', d3.forceY(d => refScaleY(ref).invert(d.row)));

export const colForce = ref => sim =>
  sim.force('col', d3.forceX(d => colScale(ref)(d.x)));

export const rowForce = ref => sim =>
  sim.force('row', d3.forceY(d => rowScale(ref)(d.y)));
