function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};

this.zabancntstr = 'zabancnt';
this.mydata = [];
this.mydataids = [];
this.file = getUrlParameter("file");
this.lang = getUrlParameter("lang");
this.topics = getUrlParameter("topics")

topics.split(",").forEach(function(t){$('#SelectTopic').append('<option><a href="#">' + t + '</a></option>')});
for(var i=1;i<=25;i++) $('#SelectLevel').append('<option><a href="#">' + i + '</a></option>');

var cnt;
function load_corpus(lang) {
  // this.lang = lang;
  topic = $( "#SelectTopic option:selected" ).text();
  level = $( "#SelectLevel option:selected" ).text();
  cnt = parseInt($("#SelectSentence option:selected").text());
  if(this.lang == "Persian" || this.lang == "Arabic (MSA)" || this.lang == "Urdu") $("#sentence").css("direction","rtl").css("font-family","Amiri")
  else $("#sentence").css("direction","ltr").css("font-family","Old Standard TT");

  this.mydata = [];
  this.mydataids = [];
  this.words = [];
  // if(localStorage[lang+zabancntstr]) cnt = localStorage.getItem(lang+zabancntstr);
  // else cnt = 1;
  ll = parseInt(level)*200;
  resll = ""
  if(ll < 1000) resll += "0" + ll;
  else  resll += "" + ll;
  fname = 'data/' + file + "/" + file + "_" + topic + "/" + file + "_" + topic + "_sentences_" + resll +  ".csv";
  var NumOfSentences = 0;
  $.get(fname, function(data) {
    tmpdata = data.split('\n');
    tmpdata.forEach(function(t){
      tt = t.split('\t');
      if(tt.length <= 3) return;
      if(tt[2] != 'Y') return;
      a = tt[1];
      b = tt[3];
      d = b.substr(0,1).toUpperCase() + b.substr(1);
      re1 = new RegExp('(?<=[.,\/#!$%\^&\*;:\{\}=-_`~() ]|^]|^)' + b + '(?=[.,\/#!$%\^&\*;:\{\}=-_`~() ]|^]|$)','g');
      re2 = new RegExp('(?<=[.,\/#!$%\^&\*;:\{\}=-_`~() ]|^]|^)' + d + '(?=[.,\/#!$%\^&\*;:\{\}=-_`~() ]|^]|$)','g');
      a = a.replace(re1, "<b id='select'>" + b + "</b>");
      a = a.replace(re2, "<b id='select'>" + d + "</b>");
      // else
      // {a = a.replace(re, "<b id='select'>" + b + "</b>");}
      this.mydata.push(a);
      this.mydataids.push(tt[8]);
      NumOfSentences++;
    });
    cnt = 1;
    $('#sentence').html(mydata[cnt-1]);
    $('#sentence').attr("SentenceID",mydataids[cnt-1]);
    $('#SelectSentence').empty();
    for(var i=1;i<=NumOfSentences;i++) $('#SelectSentence').append('<option><a href="#">' + i + '</a></option>');
  }, 'text');
}

function nextSentence() {
  cnt++;
  $("#SelectSentence").val(""+cnt);
  $('#sentence').html(this.mydata[cnt-1]);
  $('#sentence').attr("SentenceID",this.mydataids[cnt-1]);
  localStorage.setItem(this.lang+zabancntstr, cnt);
}

function previousSentence() {
  if(cnt <= 1) return;
  cnt--;
  $("#SelectSentence").val(""+cnt);
  $('#sentence').html(this.mydata[cnt-1]);
  $('#sentence').attr("SentenceID",this.mydataids[cnt-1]);
  localStorage.setItem(this.lang+zabancntstr, cnt);
}

function tagSentence() {
  LevelNumber = $("#SelectLevel").val();
  SentenceNumber = $("#SelectSentence").val();
  tagged = localStorage.getItem(this.lang+"tagged");
  val = $('#sentence').text();
  attr = $('#sentence').attr("SentenceID");
  if(tagged ==  null) localStorage.setItem(this.lang+"tagged", attr + "\t" + LevelNumber + "\t" + this.lang
              + "\t"+ val);
  else localStorage.setItem(this.lang+"tagged", tagged+ "\n"+ attr + "\t" + LevelNumber + "\t" + this.lang
              + "\t"+ val);
}


function DownloadSentence() {
  LevelNumber = $("#SelectLevel").val();
  SentenceNumber = $("#SelectSentence").val();
  val = $('#sentence').text();
  attr = $('#sentence').attr("SentenceID");
  // var tagged = localStorage.getItem(this.lang+"tagged").split("\n");
  var content = "ID\tLevel\tLang\tSentence\n"+attr+"\t"+LevelNumber+"\t"+this.lang+"\t"+val+"\n";
  MapLevelToSentences = {};
  var filename = "Zabaan_"+attr+"_"+LevelNumber+".csv";
  var blob = new Blob([content], {type: "text/plain;charset=utf-8"});
  saveAs(blob, filename);
}


function getSentence() {
  var tagged = localStorage.getItem(this.lang+"tagged").split("\n");
  var content = "ID\tLevel\tLang\tSentence\n";
  MapLevelToSentences = {};
  unified = new Set();
  for(var i=0;i < tagged.length;i++) unified.add(tagged[i]);
  for(var u of unified) {
    content = content+u+"\n";
  }
  var filename = this.lang+"Tagged.csv";
  var blob = new Blob([content], {type: "text/plain;charset=utf-8"});
  saveAs(blob, filename);
}

function SelectTopic() {
  text = $( "#SelectTopic option:selected" ).text();
  load_corpus();
}

function SelectLevel() {
  text = $( "#SelectLevel option:selected" ).text();
  load_corpus();
}

function SelectSentence() {
  text = $( "#SelectSentence option:selected" ).text();
  cnt = parseInt(text);
  $('#sentence').html(this.mydata[cnt-1]);
  $('#sentence').attr("SentenceID",this.mydataids[cnt-1]);
  localStorage.setItem(this.lang + zabancntstr, cnt);
}


function ClearTags() {
  localStorage.removeItem(this.lang+"tagged",'');
}

load_corpus();

document.addEventListener('keydown', function(event) {
    if (event.keyCode == 37) {
        previousSentence();
    }
    else if (event.keyCode == 39) {
        nextSentence();
    }
}, true);

//document.addEventListener('touchstart', handleTouchStart, false);
//document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;
var yDown = null;

function getTouches(evt) {
  return evt.touches ||             // browser API
         evt.originalEvent.touches; // jQuery
}

function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
};

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            nextSentence();
        } else {
            previousSentence();
        }
    } else {
        if ( yDiff > 0 ) {
            /* up swipe */
        } else {
            /* down swipe */
        }
    }
    /* reset values */
    xDown = null;
    yDown = null;
};
