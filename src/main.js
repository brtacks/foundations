let data;

const update = () => {
  const u = d3.select('div#text')
        .selectAll('')
}

d3.csv('./data/kerry-captions.csv').then(csv => {
  data = csv;

  update();
})
