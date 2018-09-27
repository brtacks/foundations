let data;

const initialize = () => data = data.filter(d => d.caption.length > 0);

const update = () => {
  const u = d3.select('div#text')
    .selectAll('span')
    .data(data);

  u.enter()
    .append('span')
    .html(d => d.caption + ' ');
}

d3.csv('./data/kerry-captions.csv').then(csv => {
  data = csv;
  initialize();

  update();
})
