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

  setTimeout(
    () =>
      d3.select(this)
        .selectAll('span')
        .style('color', '#')
    )

  if (captionData.foundation > -1 && script.length > 0) {
    setTimeout(
      () => {
        const caption = d3.select(this) // TODO: LIGHTBLUE HIGHLILGHTING
        d3
          .select(this)
          .append('div')
          .classed('baby-tile', true)
          .transition()
          .duration(350)
          .style('background-color', 'red')
          .style('tranform', 'translate(2px, -4x)')
          .merge(u)
          .transition()
          .style('color', 'lightblue');
      },
      script[script.length - 1].offset,
    );
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
