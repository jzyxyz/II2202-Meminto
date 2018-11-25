btns.click(function(){
  $(this).toggleClass('btnActive');
})
//search 
$('#searchBtn').click(function(){
  eList.empty();
  eList.toggle();
  qInput.val('');
  inputSlide(qInput);
})
//sound

$('#soundBtn').click(function(){
  soundFlag = !soundFlag
})
//list
$('#listBtn').click(function(){
  mistakeList.empty();
  var arr = Array.from(mistakes);
  arr.forEach(function(el){
      var li = $('<li/>').text(el).appendTo(mistakeList);
  })
  mistakeList.fadeToggle();
})
mistakeList.on('click','li',function(){
  loadWord($(this).text());
})
  //query input
qInput.keyup(function(){
  var result = getEntry(qInput.val());
  if(result.length>0){
    eList.empty();
    if(result.length>5) result = result.slice(0,5);
    result.forEach(function(el){
      $('<li/>').text(el).appendTo(eList);
    })
  }else qInput.addClass('redBorder');
})

eList.on('mousedown','li',function(){
  loadWord($(this).text());
  eList.toggle();
})
eList.on('mouseenter','li',function(){
  switch(vocabulary[$(this).text()]){
    case articles[0]: $(this).addClass('mBg'); break;
    case articles[1]: $(this).addClass('nBg'); break;
    case articles[2]: $(this).addClass('fBg'); break;
    default: break;
  }
})
eList.on('mouseleave','li',function(){
  switch(vocabulary[$(this).text()]){
    case articles[0]: $(this).removeClass('mBg'); break;
    case articles[1]: $(this).removeClass('nBg'); break;
    case articles[2]: $(this).removeClass('fBg'); break;
    default: break;
  }
})
//PONS
// $('#expBtn').click(function(){
// })

//night mode

//collapse header and footer
$('#collapseBtn').click(function(){
  $('.hdnft').slideToggle();
})




