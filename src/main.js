const colors = [
  '#fbb4ae',
  '#b3cde3',
  '#ccebc5',
  '#decbe4',
  '#fed9a6',
  '#ffffcc',
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
    .style('color', '#fff');

  const { foundation } = captionData;
  if (foundation > -1 && script.length > 0) {
    const delay = script[script.length - 1 ].offset;
    const color = colors[foundation];
    d3.select(this)
      .transition()
      .delay(delay)
      .style('color', color);

    d3.select(this)
      .selectAll('div')
      .data([0])
      .enter()
      .append('div')
      .style('display', 'none')
      .classed('baby-tile', true)
      .transition()
      .delay(delay)
      .duration(350)
      .style('display', 'inline-block')
      .style('background-color', color)
      .style('tranform', 'translate(2px, -4x)');
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

d3.csv('./data/kerry-captions.csv').then(csv => {
  data = csv;
  initialize();
});

const begin = () => {
  d3.select('button#begin-graphic').remove();
  const vid = document.getElementById('video')
  vid.play();
  update();
};
