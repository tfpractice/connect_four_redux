import * as d3 from "d3";
import { Node } from "connect_four_functional";
import { spread } from "fenugreek-collections";

import { boardLinks, playerLinks } from "./links";
import {
  boxScaleX,
  boxScaleY,
  colBoxBand,
  colScaleBox,
  rowBoxBand,
  rowScaleBox,
} from "./scales";

const linkHas = ({ id }) => ({ source: s, target: t }) =>
  t.id === id || s.id == id;

const getLinks = links => node => links.filter(linkHas(node));

const simPLinks = sim => sim.force(`players`).links();

const isBeside = a => b => Math.abs(a - b) < 2;

const nCount = ({ column: c, row: r }) => {
  const cNabes = d3.range(7).filter(isBeside(c)).length;

  const rNabes = d3.range(6).filter(isBeside(r)).length;

  return cNabes * rNabes - 1;
};

export const nodeInit = game =>
  d3.forceSimulation(spread(game.nodes).map(Node.copy)).alpha(0.8);

export const manyBody = sim => sim.force(`charge`, d3.forceManyBody());

export const collide = sim =>
  sim.force(`collide`, d3.forceCollide(d => nCount(d)).strength(0.01));

export const delta = a => b => a - b;

export const deltaX = ({ x: x0 }) => ({ x: x1 }) => delta(x0)(x1);

export const deltaY = ({ y: y0 }) => ({ y: y1 }) => delta(y0)(y1);

export const deltaCol = ({ column: x0 }) => ({ column: x1 }) => delta(x0)(x1);

export const deltaRow = ({ row: y0 }) => ({ row: y1 }) => delta(y0)(y1);

export const boardDelta = ({ source, target }) => [
  deltaCol(source)(target),
  deltaRow(source)(target),
];

export const linkDelta = ({ source, target }) => [
  deltaX(source)(target),
  deltaY(source)(target),
];

export const boardForce = game => sim => {
  const dist = link => 10 * Math.hypot(...boardDelta(link));

  const { players } = game;

  const nodes = sim.nodes();

  return sim.force(
    `board`,
    d3
      .forceLink(boardLinks({ players, nodes }))
      .strength(0.02)
      .id(d => d.id)
      .distance(dist)
  );
};

export const playerForce = game => sim => {
  const dist = link => Math.hypot(...linkDelta(link));

  const { players } = game;

  const nodes = sim.nodes();

  return sim.force(
    `players`,
    d3
      .forceLink(playerLinks({ players, nodes }))
      .id(d => d.id)
      .strength(0.03)
      .distance(dist)
      .iterations(2)
  );
};

export const refCenter = ref => sim =>
  sim.force(
    `center`,
    d3.forceCenter(0.9 * ref.width / 2, 0.9 * ref.height / 2)
  );

export const xRefForce = ref => sim =>
  sim.force(`x`, d3.forceX(d => boxScaleX(ref)(d.x)));

export const yRefForce = ref => sim =>
  sim.force(`y`, d3.forceY(d => boxScaleY(ref)(d.y)));

export const xBand = ref => sim =>
  sim.force(`xBand`, d3.forceX(d => colBoxBand(ref)(d.column)).strength(0.3));

export const yBand = ref => sim =>
  sim.force(`yBand`, d3.forceY(d => rowBoxBand(ref)(d.row)).strength(0.3));

export const col2X = ref => sim =>
  sim.force(`col2X`, d3.forceX(d => boxScaleX(ref).invert(d.column)));

export const row2Y = ref => sim =>
  sim.force(`row2Y`, d3.forceY(d => boxScaleY(ref).invert(d.row)));

export const colForce = ref => sim =>
  sim.force(`col`, d3.forceX(d => colScaleBox(ref)(d.x)));

export const rowForce = ref => sim =>
  sim.force(`row`, d3.forceY(d => rowScaleBox(ref)(d.y)));
