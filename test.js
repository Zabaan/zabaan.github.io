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
this.file = getUrlParameter("file");
this.lang = getUrlParameter("lang");
this.topics = getUrlParameter("topics")

topics.split(",").forEach(function(t){$('#SelectTopic').append('<option><a href="#">' + t + '</a></option>')});
for(var i=1;i<=25;i++) $('#SelectLevel').append('<option><a href="#">' + i + '</a></option>');
for(var i=1;i<=1000;i++) $('#SelectSentence').append('<option><a href="#">' + i + '</a></option>');

var cnt;
function load_corpus(lang) {
  // this.lang = lang;
  topic = $( "#SelectTopic option:selected" ).text();
  level = $( "#SelectLevel option:selected" ).text();
  cnt = parseInt($("#SelectSentence option:selected").text());
  if(this.lang == "Persian") $("#sentence").css("direction","rtl").css("font-family","Amiri")
  else $("#sentence").css("direction","ltr").css("font-family","Old Standard TT");

  this.mydata = [];
  this.words = [];
  // if(localStorage[lang+zabancntstr]) cnt = localStorage.getItem(lang+zabancntstr);
  // else cnt = 1;
  ll = parseInt(level)*200;
  resll = ""
  if(ll < 1000) resll += "0" + ll;
  else  resll += "" + ll;
  fname = 'data/' + file + "/" + file + "_" + topic + "/" + file + "_" + topic + "_sentences_" + resll +  ".csv";
  $.get(fname, function(data) {
    tmpdata = data.split('\n');
    tmpdata.forEach(function(t){
      tt = t.split('\t');
      if(tt.length <= 3) return;
      a = tt[1];
      b = tt[3];

      if(!a.includes(b)) b = b.substr(0,1).toUpperCase() + b.substr(1);
      // c = "<span id='editor' contenteditable='true' style='text-decoration: underline;' myval='" + b
      // + "'>---</span>";
      c = "<input placeholder='";
      for(var i=0;i<b.length;i++) c += "-";
      c +="' autofocus id='editor' style='width:" + b.length +"ch' ";
      c += "myval=\"" + b + "\" ";
      c += "onkeyup='oneditorchange(\"" + b+ "\")'></input>";
      a = a.replace(b, c);
      this.mydata.push(a);
    });
    $('#sentence').html(mydata[cnt]);
    $('#sentence').focus();

  }, 'text');
}

function nextSentence() {
  cnt++;
  $("#SelectSentence").val(""+cnt);
  $('#sentence').html(this.mydata[cnt]);
  localStorage.setItem(this.lang+zabancntstr, cnt);
}

function previousSentence() {
  if(cnt <= 1) return;
  cnt--;
  $("#SelectSentence").val(""+cnt);
  $('#sentence').html(this.mydata[cnt]);
  localStorage.setItem(this.lang+zabancntstr, cnt);
}

function hint() {
  t = $('#editor').val();
  val = $('#editor').attr('myval');
  $('#editor').val(val);
 //  if(t == m)  {
 //  $('#editor').css('color','green');
 //  $("#editor").attr('disabled','disabled');
 //  nextSentence();
 //  $("#editor").focus();
 // }
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
  $('#sentence').html(this.mydata[cnt]);
  localStorage.setItem(this.lang+zabancntstr, cnt);
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

// $('#editor').on('DOMSubtreeModified',function(){
function oneditorchange(m) {
  t = $('#editor').val();
  if(t == m)  {
  $('#editor').css('color','green');
  $("#editor").attr('disabled','disabled');
  nextSentence();
  $("#editor").focus();
}
  // if(t.length > 3 && t.includes('-')) t.replace('-',' ');
  // if(t.length < 3 )
}
