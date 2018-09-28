const colors = [
  '#8dd3c7',
  '#ffffb3',
  '#bebada',
  '#fb8072',
  '#80b1d3',
  '#fdb462',
];

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


    d3.select(this)
      .selectAll('span')
      .transition()
      .delay(delay)
      .style('color', color);

    d3.select(this)
      .selectAll('div')
      .data([0]) // better way?
      .enter()
      .append('div')
      .style('display', 'none')
      .classed('baby-tile', true)
      .transition()
      .delay(delay)
      .style('display', 'inline-block')
      .style('background-color', color);
  }

  u.exit().remove();
};

const update = () => {
  const u = d3.select('div#text')
    .selectAll('span')
    .data(data);

  u.enter()
    .append('span')
    .each(updateWord);

  u.exit().remove();
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

const updateVideoHeight = () => {
  const video = document.getElementById('video');
  const text = document.getElementById('text');
  video.style.height = text.offsetHeight + 'px';
}

window.addEventListener('resize', updateVideoHeight);

const begin = () => {
  d3.select('button#begin-graphic').remove();
  vid.play();

  update();
  updateVideoHeight();
};
