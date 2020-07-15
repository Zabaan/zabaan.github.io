$.get('scripts/languages.csv', function(data) {
  data.split("\n").forEach(function(lang){
    $('#main_div').append('<div class="col-sm-2" style="border:solid 1px" onclick="langclicked(\''+lang+'\')"><h3>'
              + lang + '</h3></div>')
  });
});

function langclicked(l) {
   window.open("lang.html?lang="+l);
}
