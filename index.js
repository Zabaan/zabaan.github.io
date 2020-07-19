$.get('scripts/languages.csv', function(data) {
  data.split("\n").forEach(function(lang){
    $('#main_div').append('<li class="list-group-item" onclick="langclicked(\''+lang+'\')"><h3>'
              + lang + '</h3></li>')
  });
});

function langclicked(l) {
   window.open("lang.html?lang="+l);
}
