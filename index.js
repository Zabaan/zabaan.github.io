
this.zabancntstr = 'zabancnt';
this.mydata = [];
this.lang = "";
var cnt;
function load_corpus(lang) {
  this.lang = lang;
  if(lang == "Persian") $("#sentence").css("direction","rtl").css("font-family","Amiri")
  else $("#sentence").css("direction","ltr").css("font-family","Old Standard TT");

  this.mydata = [];
  if(localStorage[lang+zabancntstr]) cnt = localStorage.getItem(lang+zabancntstr);
  else cnt = 1;
  $.get('data/' + lang + ".csv", function(data) {
    tmpdata = data.split('\n');
    tmpdata.forEach(function(t){this.mydata.push(t.split('\t')[1]);});
    $('#sentence').text(mydata[cnt]);
    cnt++;
  }, 'text');
}

function nextSentence() {
  cnt++;
  $('#sentence').text(this.mydata[cnt]);
  localStorage.setItem(this.lang+zabancntstr, cnt);
}

function previousSentence() {
  if(cnt <= 1) return;
  cnt--;
  $('#sentence').text(this.mydata[cnt]);
  localStorage.setItem(this.lang+zabancntstr, cnt);
}

function tagSentence() {

}

function drop() {
  text = $( "#langselect option:selected" ).text();
  load_corpus(text);
}


load_corpus("German_Germany");

document.addEventListener('keydown', function(event) {
    if (event.keyCode == 37) {
        previousSentence();
    }
    else if (event.keyCode == 39) {
        nextSentence();
    }
}, true);

document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

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
