const FOUNDATIONS = [
  'Care',
  'Fairness',
  'Loyalty',
  'Authority',
  'Sanctity',
  'Liberty',
];

let tileSize = 15;
let tilesPerRow = 5;
let barPadding = 20;
let maxValue = 100;
let barWidth = tilesPerRow * tileSize + barPadding;

const colors = [
  '#66c2a5',
  '#fc8d62',
  '#8da0cb',
  '#e78ac3',
  '#a6d854',
  '#ffd92f',
];

const tilesPlaced = new Array(FOUNDATIONS.length).fill(0);

const nextTilePosition = foundation => {
  const i = tilesPlaced[foundation];
  const { top, left, height } = document.getElementById('chart').getBoundingClientRect();
  tilesPlaced[foundation]++;

  const customAestheticAdjust = { left: -60, top: -23 };
  const customAestheticAdjustY = -5;
  return {
    x: foundation * barWidth + left + (i % tilesPerRow) * tileSize + customAestheticAdjust.left,
    y: top + height - tileSize * (Math.floor(i / tilesPerRow) + 1) + customAestheticAdjust.top - document.getElementById('video-container').getBoundingClientRect().top,
  };
};

const initialize = () => 
  data = data
    .filter(d => d.caption.length > 0)
    .map(({ start, stop, foundation, caption }) => ({
      start: +start * 1000,
      stop: +stop * 1000,
      foundation: +foundation,
      caption,
      words: caption.split(' '),
    }));

const timeWords = ({ start, stop, words }) => {
  const inc = (stop - start) / words.length;

  return words.map((w, i) => ({
    text: w,
    offset: start + i * inc,
  }));
};

function updateWord(captionData, i) {
  const script = timeWords(captionData);
  // a script contains an offset (in seconds) to indicate when a word is spoken

  const u = d3.select(this)
    .selectAll('span')
    .data(script);

  u.enter()
    .append('span')
    .style('color', 'hsla(0, 0%, 100%, .4)')
    .html(word => word.text + ' ')
    .transition()
      .delay(word => word.offset)
      .style('color', 'rgba(255, 255, 255, .92)');

  const { foundation } = captionData;

  if (foundation > -1 && script.length > 0) {
    const delay = script[script.length - 1 ].offset;
    const color = colors[foundation];

    // highlight text color according to foundation
    d3.select(this)
      .selectAll('span')
      .transition()
        .delay(delay)
        .style('color', color);

    // create baby tile
    const { x, y } = nextTilePosition(foundation);
    const babyTile = d3.select(this)
      .append('div')
      .style('display', 'none')
      .classed('baby-tile', true)
      .transition()
        .delay(delay)
        .style('display', 'inline-block')
        .style('background-color', color)
      .transition()
        .duration(800)
        .style('left', x + 'px')
        .style('top', y + 'px')
        .style('border-radius', 0)
        .style('border', '0.4px solid white')
        .style('width', tileSize + 'px')
        .style('height', tileSize + 'px');
  }

  u.exit().remove();
};

const updateCaptions = () => {
  const u = d3.select('div#text')
    .selectAll('span')
    .data(data);

  u.enter()
    .append('span')
    .each(updateWord);

  u.exit().remove();
};

const updateAxis = () => {
  const chartWidth = FOUNDATIONS.length * barWidth;
  const chartHeight = maxValue / tilesPerRow * tileSize;

  const yScale = d3.scaleLinear().domain([0, maxValue]).range([chartHeight, 0]);
  const yAxis = d3.axisRight().scale(yScale).tickSize(chartWidth);
  d3.select('.y.axis').call(yAxis);

  const xScale = d3.scaleLinear().domain([0, FOUNDATIONS.length]).range([0, chartWidth])
  const xAxis = d3.axisBottom()
    .scale(xScale)
    .ticks(FOUNDATIONS.length, 's')
    .tickFormat(d => FOUNDATIONS[d]);
  d3.select('.x.axis')
    .attr('transform', `translate(0, ${chartHeight})`)
    .call(xAxis);

  // move to a resize listener?
  const { width, height } = document.getElementById('chart').getBoundingClientRect();
  d3.select('#svg')
    .style('min-width', width + 23)
    .style('min-height', height + 42);
};

const getTiles = num => {
  const tiles = [];

  for (let i = 0; i < num; i++) {
    tiles.push({
      x: (i % tilesPerRow) * tileSize,
      y: -(Math.floor(i / tilesPerRow) + 1) * tileSize,
    });
  }

  return tiles;
};

function updateBar(d, i) {
  const tiles = getTiles(d);
  const u = d3.select(this)
    .attr('transform', `translate(${i * barWidth}, 300)`)
    .selectAll('rect')
    .data(tiles);

  u.enter()
    .append('rect')
    .style('opacity', 0)
    .style('stroke', 'white')
    .style('shape-rendering', 'crispEdges')
    .merge(u)
    .attr('x', d => d.x)
    .attr('y', d => d.y)
    .attr('width', tileSize)
    .attr('height', tileSize);

  u.exit().remove();    
}

const updateBars = () => {
  const u = d3.select('g.bars')
    .selectAll('g')
    .data([10,10,10,10,10,10]);

  u.enter()
    .append('g')
    .merge(u)
    .style('fill', (d, i) => colors[i % colors.length])
    .each(updateBar);
};

const update = () => {
  updateAxis();
  // updateBars();
  updateCaptions();

  /* very bad solution to unknown problem */
  // updateVideoHeight();
  const video = document.getElementById('video');
  const text = document.getElementById('text');
  let oldTextHeight = text.getBoundingClientRect().height;
  const heightSetter = setInterval(() => {
    const { height } = text.getBoundingClientRect();
    video.style.height = height + 'px';
    if (height != oldTextHeight) {
      clearInterval(heightSetter);
    }
  }, 1);
};

d3.csv('./data/bush-captions.csv').then(csv => {
  data = csv;
  initialize();
});

let focused = true;
let begun = false;
const vid = document.getElementById('video');
document.addEventListener('visibilitychange', () => {
  focused = !focused;
  if (!focused) {
    vid.pause();
  } else if (!vid.ended && begun) {
    vid.play();
  }
});

// TODO: fix initial video height
const updateVideoHeight = () => {
  const video = document.getElementById('video');
  const text = document.getElementById('text');
  const { height } = text.getBoundingClientRect();
  video.style.height = height + 'px';
};

window.addEventListener('resize', updateVideoHeight);

const begin = () => {
  d3.select('button#begin-graphic').remove();
  vid.play();
  begun = true;

  update();
};


