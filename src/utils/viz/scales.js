import * as d3 from 'd3';
import { Board, Game, Node, } from 'connect_four_functional';
import { flattenBin as flatten, spread, } from 'fenugreek-collections';

export const refBox = ref => ref.getBoundingClientRect();

export const getBox = sel => refBox(d3.select(sel).node());
  
export const selWidth = sel => getBox(sel).width;

export const selHeight = sel => getBox(sel).height;

export const boardScaleX = base => box => d3.scaleLinear()
  .domain([ 0, box.width * 0.9, ])
  .range([ 0, 100, ]);

export const boardScaleY = base => box => d3.scaleLinear()
  .domain([ 0, box.height * 0.9, ])
  .range([ 0, 100, ]);

export const selectorScaleX = function(sel) {
  return data => d3.scaleLinear()
    .domain([ 0, getBox(sel).width * 0.9, ])
    .range(d3.extent(data.map(d => d.column)));
};

export const selectorScaleY = function(sel) {
  console.log('this', this);
  return data => d3.scaleLinear()
    .domain([ 0, getBox(sel).height * 0.9, ])
    .range(d3.extent(data.map(d => d.row)));
};

export const dataScaleX = data => d3.scaleLinear()
  .domain(d3.extent(data.map(d => d.x)))
  .range([ 0, 100, ]);

export const dataScaleY = data => d3.scaleLinear()
  .domain(d3.extent(data.map(d => d.y)))
  .range([ 0, 100, ]);

export const color = d3.scaleOrdinal()
  .domain([ null, 0, 1, ])
  .range([ '#fff', '#F44336', '#000000', ]);

export const pColor = players => d3.scaleOrdinal()
  .domain([ null, ...d3.extent(players.map(p => p.id)), ])
  .range([ '#fff', '#ff0000', '#000000', ]);

export const colorMap = (def = '#fff') => players =>
  new Map(players.map(p => [ p.id, pColor(players)(p.id), ]))
    .set(null, def).set(undefined, def).set('', def);

const pExtent = players => d3.extent(players.map(p => p.id));
const exIdx = players => p => pExtent(players).indexOf(p.id);
const compareIDX = players => (a, b) => exIdx(players)(a) - exIdx(players)(b);

export const pSort = players => [ ...players, ].sort(compareIDX(players));

export const pColorDomain = players => d3.scaleOrdinal()
  .domain([ null, ...d3.extent(players.map(p => p.id)), ]);

export const pColorRange = players =>
  (range = [ '#fff', '#ff0000', '#000000', ]) =>
    pColorDomain(players).range(range);

export const setContainer = (drag = d3.drag()) => {
  const d = drag.container(d3.select('.boardVis').node());
  
  return drag;
};
export const refScaleX = ref => d3.scaleLinear()
  .domain([ 0, refBox(ref).width * 0.9, ])
  .range([ 5, 95, ]);
  
export const refScaleY = ref => d3.scaleLinear()
  .domain([ 0, refBox(ref).height * 0.9, ])
  .range([ 5, 95, ]);
  
export const colScale = ref => d3.scaleLinear()
  .domain([ 0, refBox(ref).width * 0.9, ])
  .range([ 10, 80, ]);
    
export const rowScale = ref => d3.scaleLinear()
  .domain([ 0, refBox(ref).height * 0.9, ])
  .range([ 10, 70, ]);
    
export const gameX = x => (x);
export const gameY = y => (y);

// export const gameX = sim=> dataScaleX(sim.nodes());
// export const gameY = sim=> dataScaleY(sim.nodes());
// 
// export const gameX = x => boardScaleX()(getBox('.boardGrid'))(x);
// export const gameY = y => boardScaleY()(getBox('.boardGrid'))(y);
