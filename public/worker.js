import * as d3 from "d3";

import {
  applyTicks,
  linkForces,
  mountSimulation,
  simInit,
} from "../src/utils/viz";

onmessage = function({ data }) {
  const simulation = mountSimulation(data.forceBox)(simInit(data.game));

  const links = simulation.force(`players`).links();

  console.log(`messages`);

  // postMessage({ links, nodes: simulation.nodes() });
  //
  //

  simulation.on(`tick.worker`, () => {
    postMessage({ links, nodes: simulation.nodes() });
  });
};
