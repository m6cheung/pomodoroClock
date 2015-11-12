//setTimeout() - run some code in the future
//clearTimeout() - cancels setTimeout
$(document).ready(function() {
  $('.setSession').val('25');
  $('.setBreak').val('5');
  var time = Number($('.setSession').val()) * 60;
  var breakTime = Number($('.setBreak').val()) * 60;
  var t;
  var b;
  var timerOn = false;
  var breakPause = false;
  var $timer = $("#time");
  var session = document.getElementById("timeSession");
  console.log(Number($('.setBreak').val()));
  
  $('.breakPlus').on('click', function() {
    if(session.innerHTML === 'Break') {
      stop();
    }
    $('.setBreak').val(Number($('.setBreak').val()) + 1);
    $('.setBreak').html($('.setBreak').val());
    if(session.innerHTML === "Break") {
      $timer.html($('.setBreak').val() + ':00');
      if(Number($('.setBreak').val()) < 10) {
        $timer.html('0' + Number($('.setBreak').val()) + ":00");
      }
    }
    breakTime = Number($('.setBreak').val()) * 60;
  });
  
  $('.breakMinus').on('click', function() {
    if(session.innerHTML === 'Break') {
      stop();
    }
    $('.setBreak').val(Number($('.setBreak').val()) - 1);
    if(Number($('.setBreak').val()) < 1) {
      $('.setBreak').val(Number($('.setBreak').val()) + 1);
    }
    $('.setBreak').html($('.setBreak').val());
    if(session.innerHTML === "Break") {
      $timer.html($('.setBreak').val() + ':00');
      if(Number($('.setBreak').val()) < 10) {
        $timer.html('0' + Number($('.setBreak').val()) + ":00");
      }
    }
    breakTime = Number($('.setBreak').val()) * 60;
  });
  
  $('.sessionPlus').on('click', function() {
    if(session.innerHTML === 'Session') {
      stop();
    }
    $('.setSession').val(Number($('.setSession').val()) + 1);
    $('.setSession').html($('.setSession').val());
    if(session.innerHTML === "Session") {
      $timer.html($('.setSession').val() + ':00');
      if(Number($('.setSession').val()) < 10) {
        $timer.html('0' + Number($('.setSession').val()) + ":00");
      }
    }
    time = Number($('.setSession').val()) * 60;
  });
  
  $('.sessionMinus').on('click', function() {
    if(session.innerHTML === 'Session') {
      stop();
    }
    $('.setSession').val(Number($('.setSession').val()) - 1);
    if(Number($('.setSession').val()) < 1) {
      $('.setSession').val(Number($('.setSession').val()) + 1);
    }
    $('.setSession').html($('.setSession').val());
    if(session.innerHTML === "Session") {
      $timer.html($('.setSession').val() + ':00');
      if(Number($('.setSession').val()) < 10) {
        $timer.html('0' + Number($('.setSession').val()) + ":00");
      }
    }
    time = Number($('.setSession').val()) * 60;
  });
  
  var min;
  var sec;
  var minB;
  var secB;

  $("#start").on("click", start);
  $("#pause").on("click", stop);
  $("#reset").on("click", reset);

  function start() {
    if(!timerOn) {
      timerOn = true;
      countDown();
    } else if(breakPause) {
        breakPause = false;
        breakCountDown();
    }
  }

  function countDown() {
    session.innerHTML = "Session";
    min = Math.floor(time/60);
    sec = time % 60;
    time--;
    $timer.html(min +":" + sec);
    if(min < 10 && sec >= 10) {
      $timer.html("0" + min + ":" + sec);
      sec--
    } else if(min < 10 && sec < 10) {
      $timer.html("0" + min + ":0" + sec);
      sec--;
    } else if(sec >= 10) {
      sec--;
    } else {
      $timer.html(min + ":0" + sec);
      sec--;
    }
    t = setTimeout(countDown, 1000);
      if(time === -2) {
        playAlarm();
        loop();
        time = Number($('.setSession').val()) * 60
        breakCountDown();
      }
	  console.log(time);
  }

  function breakCountDown() {
    session.innerHTML = "Break";
    minB = Math.floor(breakTime/60);
    secB = breakTime % 60;
    breakTime--;
    $timer.html(minB + ":" + secB);
     if(minB < 10 && secB >= 10) {
      $timer.html("0" + minB + ":" + secB);
      secB--
    } else if(minB < 10 && secB < 10) {
      $timer.html("0" + minB + ":0" + secB);
      secB--;
    } else if(secB >= 10) {
      secB--;
    } else {
      $timer.html(minB + ":0" + secB);
      secB--;
    }
    b = setTimeout(breakCountDown, 1000);
    if(breakTime === -2) {
      playAlarm()
      loop();
      breakTime = Number($('.setBreak').val()) * 60;
      countDown();
    }
	console.log(breakTime);
  }

  function loop() {
    clearTimeout(t);
    clearTimeout(b);
  }

  function stop() {
    if(session.innerHTML === "Break") {
		if(breakPause === false) {
			breakTime++;
		}
      breakPause = true;
	  console.log(breakTime);
      clearTimeout(b);
    } else if(session.innerHTML === "Session") {
		if(timerOn === true) {
			time++;
		}
      timerOn = false;
	  console.log(time);
      clearTimeout(t);
    }

  }

  function reset() {
    timerOn = false;
    breakPause = false;
    clearTimeout(t);
    clearTimeout(b);
    if(Number($('.setSession').val()) < 10) {
      $timer.html('0' + Number($('.setSession').val()) + ':00');
    } else {
    $timer.html(Number($('.setSession').val()) + ':00');
    }
    session.innerHTML = "Session";
    breakTime = Number($('.setBreak').val()) * 60;
    time = Number($('.setSession').val()) * 60
  }

  function playAlarm() {
    var $audio = $("<audio />", {
      autoplay: "autoplay"
    });
    var source = $("<source >", {
      src: 'http://www.myinstants.com/media/sounds/portal2buzzer.mp3'
    });

    $audio.append(source);
    $("body").append($audio);

    setTimeout(function() {
      $($audio).remove()
    }, 1000)
  }
});
