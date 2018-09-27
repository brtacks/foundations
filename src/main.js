let data;

const initialize = () => 
  data = data
    .filter(d => d.caption.length > 0)
    .map(({ start, stop, foundation, caption }) => ({
      start,
      stop,
      foundation,
      caption,
      words: caption.split(' '),
    }));

const timedWords = ({ start, stop, words }) => {
  // {start, stop, words}
  const numWords = words.length;

  const inc = (start - stop) / (numWords + 1);

};

function updateWord(captionData, i) {
  const u = d3.select(this)
    .selectAll('span')
    .data(timedWords(captionData));

  u.enter()
    .append('span')
    .style('color', 'hsla(0, 0%, 100%, .86)')
    .html(timedWord => timedWord.text + ' ')
    .transition()
    .delay(timedWord => captionData.start + timedWord.delay)
    .style('color', '#000');

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

  update();
});
