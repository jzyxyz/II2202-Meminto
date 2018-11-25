

var expJSON;
var mistakes = new Set();
var word = $('#word');
var gInput = $('.gender');

var qInput = $('#queryInput');
var mistakeList = $('#mistakeList ul');
var hint = $('#hint');
var btns =$('.btn');

var eList = $('#entryList');
var defaultColor;
var nightColor = '';

var toolBgc = ["white","lightgray"];
var au1 = document.getElementById('au1')
var au2 = document.getElementById('au2')
var au3 = document.getElementById('au3')
var { langcfg, colorArr } = config
var { name, number, articles}  = langcfg 
var vocabulary = name == "de" ? de_voc : name == "sv" ? sv_voc : fr_voc

$(document).ready(function(){
  gInput.eq(0).focus();
  defaultColor = word.css('color') 
})

gInput.blur(function(){
   $(this).removeClass('on');
})
gInput.focus(function(){
  $(this).addClass('on');
})
gInput.keyup(function(event){
    if (event.keyCode >= 65 && event.keyCode <= 90){
      var letter = String.fromCharCode(event.keyCode).toLowerCase();
      $(this).text(letter);
      //input[$(this).index()] = letter;
      if ($(this).index() === 2) {
          check();
      }else $(this).next().focus();
    } else switch(event.keyCode){
      case 38:  //left arrow37 up arrow38 right arrow	39 down arrow	40
      case 37:
        $(this).prev().focus();  
        break;
      case 39:
      case 40:
        $(this).next().focus();
        break;
      case 13: //enter
      case 8:  //backspace
      case 32: //space
        clearInput($(this));
        break;
      case 27: $(this).blur(); break;
      case 49: fillInput(articles[0]); break;
      case 50: fillInput(articles[1]); break;
      case 51: if(articles[2] != undefined ) {
        fillInput(articles[2]); break;
      }
      case 112: break;
      default: break;
      }
  })

function check(){
  var str = gInput.eq(0).text() + gInput.eq(1).text() + gInput.eq(2).text().trim();
  if(str == vocabulary[word.text()]){
    switch(str){
        case articles[0]:
        colorize(colorArr[0]);
        au1.play()
        break;
        case articles[1]:
        colorize(colorArr[1]);
        au2.play()
        break;
        case articles[2]:
        colorize(colorArr[2]);
        au3.play()
        break;
    }
    console.log(`${word.text()},true`)
  } 
  else
  {
    hint.fadeIn(function(){
        hint.delay(300).fadeOut();
        gInput.eq(1).focus();
    })
    mistakes.add(word.text());
    console.log(`${word.text()},false`)
    gInput.each(function(){ $(this).text("\u00a0") })
  }
}

function loadWord() {
    clearInput(gInput);
    if(arguments.length == 0){
      $('#word').css('color', defaultColor).text(randomPropertyName(vocabulary)).fadeIn();
    } else $('#word').css('color', defaultColor).text(arguments[0]).fadeIn();
    gInput.eq(0).focus();
}

function clearInput(item){
  item.text('\u00a0\u00a0');
}

function fillInput(str){
   for(var i=0;i<str.length;i++){
       gInput.eq(i).text(str.charAt(i));
   }
   var time = setTimeout(check(),200);
}

function colorize(color){
    word.css('color',color).delay(300).fadeOut(function(){
        loadWord();
    })
}

function getEntry(query){
  var arr = new Array();
  var exp = new RegExp(query,'gim');
  for(var i in vocabulary){
    if(exp.test(i)) arr.push(i)
  }
  return arr;
}

function inputSlide(el){
  el.animate({
    width:'toggle'
  },300,function(){
    el.focus();
  });
}


