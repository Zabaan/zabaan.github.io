$.get('scripts/languages.csv', function(data) {
  data.split("\n").forEach(function(l){
    ls = l.split('\t')
    lang = ls[0]
    topics = ls[1]
    $('#main_div')
    .append('<li class="list-group-item" onclick="langclicked(\''+lang+'\')"><h3>'
              + lang + '</h3></li>')
  });
});

function langclicked(l) {
   window.open("lang.html?lang="+l+"&topics="+topics);
}
