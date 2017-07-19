import * as d3 from 'd3';
import { setContainer, } from './scales';
import { linkSelect, nodeSelect, updateLinks, updateNodes, updateSim, updateSimLinks, updateSimNodes, } from './selections';
import { gameX, gameY, getBox, refBox, } from './scales';
import { playerLinks, } from './links';

export const dragStarted = sim => (d) => {
  if (!d3.event.active) sim.alphaTarget(0.3).restart();
  d.fx = d.x;

  d.fy = d.y;
};

export const dragged = sim => (d) => {
  d.fx = d3.event.sourceEvent.x;

  d.fy = d3.event.sourceEvent.y;
};

export const dragEnded = sim => (d) => {
  if (!d3.event.active) sim.alphaTarget(0.3);
  d.fx = null; // sim.force('col').x()(d);
  d.fy = null; // sim.force('row').y()(d);
};

export const dragStartedC = sim => (d) => {
  console.log('d3.event.subject', d3.event.subject);
  if (!d3.event.active) sim.alphaTarget(0.3).restart();
  d3.event.subject.fx = d3.event.subject.x;
  d3.event.subject.fy = d3.event.subject.y;
};

export const draggedC = sim => (d) => {
  d3.event.subject.fx = d3.event.sourceEvent.x;
  d3.event.subject.fy = d3.event.sourceEvent.y;
};

export const dragEndedC = sim => (d) => {
  if (!d3.event.active) sim.alphaTarget(0.3);
  d3.event.subject.fx = null;
  d3.event.subject.fy = null;
};

export const dragNodes = nodes => (sim) => {
  const drag = nodeSelect(nodes)
    .call(setContainer(d3.drag())
      .on('start', dragStarted(sim))
      .on('drag', dragged(sim))
      .on('end', dragEnded(sim)));

  // const canvas = d3.select('canvas');
  // 
  // canvas.call(d3.drag()
  //   .container(canvas)
  //   .subject(dragsubject)
  //   .on('start', dragStarted(sim))
  //   .on('drag', dragged(sim))
  //   .on('end', dragEnded(sim)));

  return sim;
};
export const canvasDrag = ref => (sim) => {
  const canvas = ref;

  //  d3.select('canvas');
  nodeSelect(sim.nodes())
    .call(setContainer(d3.drag())
      .on('start', dragStarted(sim))
      .on('drag', dragged(sim))
      .on('end', dragEnded(sim)));
      
  d3.select(canvas)
    .call(d3.drag()
      .container(canvas)
      .subject(dragsubject(ref)(sim))
      .on('start', dragStartedC(sim))
      .on('drag', draggedC(sim))
      .on('end', dragEndedC(sim)));
  return sim;
};

export const tickLinks = links => sim =>
  sim.on('tick', updateLinks(linkSelect(links)));
export const tickNodes = nodes => sim => sim
  .on('tick.node', updateNodes(nodeSelect(nodes)));

export const ticked = sim =>
  sim.on('tick', updateSim(sim));

export const simTickNode = nodes => (sim) => {
  sim.on('tick.node', updateSimNodes(sim.nodes())(sim));
    
  return sim;
};
export const simTickLink = links => (sim) => {
  const a = 0;
  
  sim.on('tick.link', updateSimLinks(links)(sim));

  return sim;
};

function dragsubject(ref) {
  return sim => () => sim.find(d3.event.x - ref.width / 2, d3.event.y - ref.height / 2);
}

// d3.event.x - width / 2, d3.event.y - height / 2)

export const gameTick = ref => game => (sim) => {
  console.log('ref', ref);
  
  const showCanvas = ref => (sim) => {
    const canvas = ref;

    //  d3.select('canvas');

    //  document.querySelector("canvas"),
    const context = canvas.getContext('2d');

    // const context = d3.select('canvas');
    const width = getBox('canvas').width;
    const height = getBox('canvas').height;

    context.clearRect(0, 0, width, height);
    context.save();
    context.translate(width / 2, height / 2);

    context.beginPath();
    playerLinks(game).forEach(drawLink);
    context.strokeStyle = '#aaa';
    context.stroke();

    context.beginPath();
    sim.nodes().forEach(drawNode);
    context.fill();
    context.strokeStyle = '#fff';
    context.stroke();

    context.restore();

    function drawLink(d) {
      console.log('d', d);
      context.moveTo(d.source.x, d.source.y);
      context.lineTo(d.target.x, d.target.y);
    }

    function drawNode(d) {
      console.log('d', d);
      context.moveTo(d.x + 3, d.y);
      context.arc(d.x, d.y, 3, 0, 2 * Math.PI);
    }
  };

  sim.on('tick.node', updateSimNodes(sim.nodes())(sim));
  sim.on('tick', showCanvas(ref)(sim));

  // sim.on('tick.link', showCanvas(ref)(sim));

  sim.on('tick.player', updateSimLinks(playerLinks(game))(sim));

  return sim;
};
