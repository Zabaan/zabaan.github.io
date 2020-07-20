$.get('scripts/languages.csv', function(data) {
  data.split("\n").forEach(function(l){
    $('#main_div')
    .append('<li class="list-group-item" onclick="langclicked(\''+l.trim()+'\')"><h3>'
              + l.split('\t')[2].trim() + '</h3></li>')
  });
});

function langclicked(l) {
   ls = l.trim().split('\t');
   window.open("lang.html?lang="+ls[2]+"&topics="+ls[1]+"&file="+ls[0]);
}
