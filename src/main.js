let data;

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
  // {start, stop, words}
  const numWords = words.length;

  const inc = (stop - start) / numWords;

  return words.map((w, i) => ({
    text: w,
    delay: start + i * inc,
  }))

};

function updateWord(captionData, i) {
  console.log(timedWords(captionData))
  const u = d3.select(this)
    .selectAll('span')
    .data(timedWords(captionData));

  u.enter()
    .append('span')
    .style('color', 'hsla(0, 0%, 100%, .86)')
    .html(timedWord => timedWord.text + ' ')
    .transition()
    .delay(timedWord => timedWord.delay)
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
