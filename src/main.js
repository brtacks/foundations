const NUM_FOUNDATIONS = 6;

let tileSize = 15;
let tilesPerRow = 5;
let barPadding = 20;
let maxValue = 100;
let barWidth = tilesPerRow * tileSize + barPadding;

const colors = [
  '#8dd3c7',
  '#ffffb3',
  '#bebada',
  '#fb8072',
  '#80b1d3',
  '#fdb462',
];

const tilesPlaced = [];
for (let i = 0; i < NUM_FOUNDATIONS; i++)
  tilesPlaced.push(0);

const nextTilePosition = foundation => {
  const i = tilesPlaced[foundation];
  const { top, left, height } = document.getElementById('svg').getBoundingClientRect();
  return {
    x: left + (i % tilesPerRow) * tileSize,
    y: top + height + -(Math.floor(i / tilesPerRow) + 1) * tileSize,
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

const timedWords = ({ start, stop, words }) => {
  const inc = (stop - start) / words.length;

  return words.map((w, i) => ({
    text: w,
    offset: start + i * inc,
  }));
};

function updateWord(captionData, i) {
  const script = timedWords(captionData);
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
    const babyTile = d3.select(this)
      .append('div')
      .style('display', 'none')
      .classed('baby-tile', true)
      .transition()
        .delay(delay)
        .style('display', 'inline-block')
        .style('background-color', color);

    // move baby tile
    const { x, y } = nextTilePosition(foundation);
    console.log(d3.select(this).select('div'))
    d3.select(this)
      .select('div')
      .transition()
      .duration(1000)
        .style('left', x)
        .style('top', y);
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
  const chartWidth = NUM_FOUNDATIONS * barWidth;
  const chartHeight = maxValue / tilesPerRow * tileSize;

  const yScale = d3.scaleLinear().domain([0, maxValue]).range([chartHeight, 0]);
  const yAxis = d3.axisRight().scale(yScale).tickSize(chartWidth);

  d3.select('.y.axis').call(yAxis);

  // move to a resize listener?
  const { width, height } = document.getElementById('chart').getBoundingClientRect();
  d3.select('#chart-container svg')
    .style('min-width', width + 23)
    .style('min-height', height + 33);
}

const update = () => {
  updateCaptions();
  updateAxis();
  updateVideoHeight();
};

d3.csv('./data/bush-captions.csv').then(csv => {
  data = csv;
  initialize();
});

let focused = true;
const vid = document.getElementById('video');
document.addEventListener('visibilitychange', () => {
  focused = !focused;
  if (!focused) {
    vid.pause();
  } else if (!vid.ended) {
    vid.play();
  }
});

// TODO: fix initial video height
const updateVideoHeight = () => {
  const video = document.getElementById('video');
  const text = document.getElementById('text');
  video.style.height = text.offsetHeight + 'px';
};

window.addEventListener('resize', updateVideoHeight);

const begin = () => {
  d3.select('button#begin-graphic').remove();
  vid.play();

  update();
};
