import {
  boardForce,
  col2X,
  colForce,
  collide,
  manyBody,
  nodeInit,
  playerForce,
  refCenter,
  row2Y,
  rowForce,
  xBand,
  xRefForce,
  yBand,
  yRefForce,
} from './forces';
import { dragNodes, simTickLink, simTickNode } from './events';

export const simInit = game =>
  [ nodeInit, manyBody, playerForce(game), boardForce(game), collide ].reduce(
    (sim, fn) => fn(sim),
    game
  );

export const linkForces = game => sim =>
  [ playerForce(game) ].reduce((s, fn) => fn(s), sim);

export const applyTicks = sim =>
  [
    simTickNode(sim.nodes()),
    simTickLink(sim.force('players').links()),
    dragNodes(sim.nodes()),
  ].reduce((a, fn) => fn(a), sim);

export const applyTicks2 = links => sim =>
  [
    simTickNode(sim.nodes()),
    simTickLink(sim.force('players').links(links).links()),
    dragNodes(sim.nodes()),
  ].reduce((a, fn) => fn(a), sim);
export const resetLinks = links => sim =>
  simTickLink(sim.force('players').links())(sim);

export const mountSimulation = ref => sim =>
  [
    refCenter(ref),
    xRefForce(ref),
    yRefForce(ref),

    // colForce(ref),
    // rowForce(ref),
    xBand(ref),
    yBand(ref),

    // col2X(ref),
    // row2Y(ref),
  ].reduce((s, fn) => fn(s), sim);
