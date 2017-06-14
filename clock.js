
$(document).ready(function(){
  $("#rs").hide();
  $("#stp").hide();
  
  // The sound alarm.
  var alT=$("#alarm")[0];
  
  // Session Timer in minutes.
  var smin=parseInt($("#sest").html());
  
  // Break Timer in minutes.
  var bmin=parseInt($("#brt").html());
  
  // Create a new tm object
  var m=new tm();
  
  // Display the current session timer.
  displayT(smin);
  m.setMin(parseInt($("#min").html()));

  // This function activates when the "Start Time"
  // button is pressed. Once pressed, the session
  // timer begins and then the break timer after
  // the session timer has ended. After each timer
  // has ended, a sound file will be played.
  $("#st").click(function(){
    $("#st").hide();
    $("#rs").show();
    $("#stp").show();
    var sc60= smin*60;
    var bsc60=bmin*60;
    sc60--;
    // Set the session timer every 1000ms (1sec).
    var ctr=setInterval(time,1000);
    m.setTime(true);
    
    // This function displays and refreshes the 
    // session timer every 1 second.
    function time(){
      // days
      var dy=Math.floor(sc60/24/3600);
      // hours left
      var hrl= Math.floor((sc60)-(dy*86400));
      // hours
      var hr=Math.floor(hrl/3600);
      // minutes left
      var minl=Math.floor((hrl)-(hr*3600));
      // minutes
      var min=Math.floor(minl/60);
      // remaining seconds
      var rmsec=sc60%60;
      
      // If rmsec is less than 10, rmsec gets a 
      // "0" string added.
      if(rmsec<10){
        rmsec="0"+rmsec;
      } // end of if
      
      // If sc60 is 86400 seconds, then 24 hours will
      // be displayed.
      if(sc60===86400){
         $("#time").html(24+":"+"0"+min+":"+rmsec);      
      } // end of if
      
      // Otherwise, display the session timer.
      else {
        $("#time").html(hr+":"+min+":"+rmsec);
      } // end of else
      
      // If sc6 is 0, then the ctr timer will be
      // cleared and a sound will be played. The
      // break timer is set for every 1 second.
      if(sc60===0){
        clearInterval(ctr);
        alT.play();
        $("#sebr").html("Break");
        m.setSbr(true);
        var bctr=setInterval(btime,1000);
      } // end of if
      
      // If the reset button is pressed, the ctr
      // timer is cleared and the start button
      // is displayed. The session timer will be
      // refreshed from the current length of the 
      // session time.
      else if(m.getReset()){
        clearInterval(ctr);
        sc60= smin*60;
        dy=Math.floor(sc60/24/3600);
        hrl= Math.floor((sc60)-(dy*86400));
        hr=Math.floor(hrl/3600);
        minl=Math.floor((hrl)-(hr*3600));
        min=Math.floor(minl/60);
        rmsec=sc60%60;
        
        // If rmsec is less than 10, rmsec gets a 
        // "0" string added.        
        if(rmsec<10){
          rmsec="0"+rmsec;
        } // end of if

        // If sc60 is 86400 seconds, then 24 hours will
        // be displayed.
        if(sc60===86400){
          $("#time").html(24+":"+"0"+min+":"+rmsec);      
        } // end of if

        // Otherwise, display the refreshed session 
        // timer.
        else {
          $("#time").html(hr+":"+min+":"+rmsec);
        } // end of else
        
        m.toggle(false);
        $("#str").html("Stop Time");
        $("#rs").hide();
        $("#stp").hide();
        m.reset(false);
        m.setTime(false);
        $("#st").show();
 
      } // end of else if
      
      // If the stop button is not pressed, then
      // sc60 decrements by 1.
      else if(!m.getToggle()){
        sc60--;
      } // end of else if
      
      // This function displays and refreshes the
      // break timer every 1000ms (1sec).
      function btime(){
        // days
        dy=Math.floor(bsc60/24/3600);
        // hours left
        hrl= Math.floor((bsc60)-(dy*86400));
        // hours
        hr=Math.floor(hrl/3600);
        // minutes left
        minl=Math.floor((hrl)-(hr*3600));
        // minutes
        min=Math.floor(minl/60);
        // remaining seconds
        rmsec=bsc60%60;

        // If rmsec is less than 10, rmsec gets a 
        // "0" string added.         
        if(rmsec<10){
          rmsec="0"+rmsec;
        } // end of if

        // If bsc60 is 86400 seconds, then 24 hours 
        // will be displayed.        
        if(bsc60===86400){
           $("#time").html(24+":"+"0"+min+":"+rmsec);      
        } // end of if
        
        // Otherwise, if the stop button is not 
        // pressed, then the current break time 
        // displays.
        else if(!m.getToggle()){
          $("#time").html(hr+":"+min+":"+rmsec);
        } // end of else if
        
        // Otherwise, if m.getTime() is false
        // and the stop button is pressed,
        // bsc60 gets bmin * 60.
        else if(m.getToggle()&&!m.getTime()){
          bsc60=bmin*60;
          bsc60--;
        } // end of else if
        
       // If bsc6 is 0, then the bctr timer will be
       // cleared and a sound will be played. 
        if(bsc60===0){
          clearInterval(bctr);
          $("#rs").hide();
          $("#stp").hide();
          $("#st").show();
          m.toggle(false);
          m.reset(false);
          m.setTime(false);
          m.setSbr(false);
          alT.play();
          $("#sebr").html("Session");
        } // end of if
        
        // If the reset button is pressed, the
        // break timer will be refreshed with the
        // new current length of the break timer.
        // The timer is also stopped.
        else if(m.getReset()){
          bsc60= bmin*60;
          dy=Math.floor(bsc60/24/3600);
          hrl= Math.floor((bsc60)-(dy*86400));
          hr=Math.floor(hrl/3600);
          minl=Math.floor((hrl)-(hr*3600));
          min=Math.floor(minl/60);
          rmsec=bsc60%60;
          
         // If rmsec is less than 10, rmsec gets a 
         // "0" string added.              
          if(rmsec<10){
            rmsec="0"+rmsec;
          } // end of if
  
          // If bsc60 is 86400 seconds, then 24 hours 
          // will be displayed.            
          if(bsc60===86400){
            $("#time").html(24+":"+"0"+min+":"+rmsec);      
          } // end of if
          
          // Otherwise, display the refreshed break
          // timer.
          else{
            $("#time").html(hr+":"+min+":"+rmsec);
          } // end of else

          m.reset(false);
          m.setTime(false);
          m.toggle(true);
          $("#str").html("Resume");

        } // end of else if
        
        // If the stop button is not pressed, then
        // bsc60 gets decremented by 1.
        else if(!m.getToggle()){
          bsc60--;
          m.setTime(true);
        } // end of else if
      } // end of btime function    
    } // end of time function
 
  }); // end of $("#st")

  // This function subtracts the session
  // length timer in mintues.
  $("#sm").click(function(){
    // If smin-m.getMin() is greater than 0, 
    // smin gets subtracted by m.getMin().
    if((smin-m.getMin())>0){
      smin = smin - m.getMin();
    } // end of if
    
    // Otherwise, smin gets 1.
    else {
      smin = 1;
    } // end of else
    $("#sest").html(smin);
    
    // Display the refreshed session timer if 
    // m.getTime() and m.getSbr are false.
    if(!m.getTime()){
      if(!m.getSbr()){
        displayT(smin);
      } // end of if
    } // end of if   

  }); // end of $("#sm") function
  
  // This function adds the session length timer
  // in minutes.
  $("#sp").click(function(){
    
    // If smin + m.getMin() is less than 1440, 
    // smin gets added by m.getMin().
    if((smin+m.getMin())<1440){
      smin += m.getMin();
    } // end of if
    
    // Otherwise, smin gets 1440.
    else {
      smin=1440;
    } // end of else
    
    $("#sest").html(smin);
    
    // Display the refreshed session timer if 
    // m.getTime() and m.getSbr are false.    
    if(!m.getTime()){
      if(!m.getSbr()){
        displayT(smin);
      } // end of if
    } // end of if

  }); // end of $("#sp") function
  
  // This function subtracts the break length
  // timer in minutes.
  $("#bm").click(function(){
    
    // If bmin-m.getMin() is greater than 0,
    // bmin gets subtracted by m.getMin().
    if((bmin-m.getMin())>0){
      bmin -= m.getMin();
    } // end of if
    
    // Otherwise, bmin gets 1.
    else {
      bmin = 1;
    } // end of else
    
    // If m.getTime() is false and m.getSbr() is
    // true, the refreshed break timer is displayed.
    if(!m.getTime()){
      if(m.getSbr()){
        displayT(bmin);
      } // end of if
    } // end of if
    $("#brt").html(bmin);
  }); // end of $("#bm") function
  
  // This function adds the break length timer
  // in minutes.
  $("#bp").click(function(){

    // If bmin + m.getMin() is less than 1440,
    // bmin gets added by m.getMin().
    if((bmin+m.getMin())<1440){
      bmin += m.getMin();
    } // end of if
    
    // Otherwie, bmin gets 1440.
    else {
      bmin=1440;
    } // end of else
    
    $("#brt").html(bmin);  
    
    // If m.getTime() is false and m.getSbr() is
    // true, the refreshed break timer is displayed.
    if(!m.getTime()){
      if(m.getSbr()){
        displayT(bmin);
      } // end of if
    } // end of if
   
  }); // end of $("#bp") function
  
  // This function changes the minutes to 
  // add or subtract to 1 minute.
  $("#1m").click(function(){
    m.setMin(1);
    $("#min").html(m.getMin());
  }); // end of $("#1m") function

  // This function changes the minutes to 
  // add or subtract to 2 minutes.  
  $("#2m").click(function(){
    m.setMin(2);
    $("#min").html(m.getMin());
  }); // end of $("#2m") function
  
  // This function changes the minutes to 
  // add or subtract to 5 minutes.    
  $("#5m").click(function(){
    m.setMin(5);
    $("#min").html(m.getMin());
    
  }); // end of $("#5m") function

  // This function changes the minutes to 
  // add or subtract to 10 minutes.    
  $("#10m").click(function(){
    m.setMin(10);
    $("#min").html(m.getMin());
    
  }); // end of $("#10m") function

  // This function changes the minutes to 
  // add or subtract to 20 minutes.    
  $("#20m").click(function(){
    m.setMin(20);
    $("#min").html(m.getMin());
  }); // end of $("#20m") function
 
  // This function changes the minutes to 
  // add or subtract to 50 minutes.    
  $("#50m").click(function(){
    m.setMin(50);
    $("#min").html(m.getMin());
  }); // end of  $("#50m") function
  
  // This function resets the session or break 
  // timer to the new current length.
  $("#rs").click(function(){
    // If reset is pressed, then m.reset()
    // is true.
    if(!m.getReset()){
      m.reset(true);
    } // end of if
    
    // Otherwise m.reset() is false.
    else{
      m.reset(false);
    } // end of else
  }); // end of $("#rs") function
  
  // This function stops or resumes the break or 
  // session timer.
  $("#stp").click(function(){
    // If the stop button is pressed, m.toggle() is
    // set to true.
    if(!m.getToggle()){
      m.toggle(true);
      $("#str").html("Resume");
    } // end of if 
    
    // Otherwise, m.toggle() is set to false.
    else {
      m.toggle(false);
      $("#str").html("Stop Time");
    } // end of else
  }); // end of $("#stp") function
  
  // This function displays the timer.
  function displayT(s){
    s=s*60;
    // days
    var dy=Math.floor(s/24/3600);
    // hours left
    var hrl= Math.floor((s)-(dy*86400));
    // hours
    var hr=Math.floor(hrl/3600);
    // minutes left
    var minl=Math.floor((hrl)-(hr*3600));
    // minutes
    var min=Math.floor(minl/60);
    // remaining seconds
    var rmsec=s%60; 
    
    // If rmsec is less than 10, rmsec gets added
    // with a "0" string.
    if(rmsec<10){
      rmsec="0"+rmsec;
    } // end of if
    
    // If s is 86400 seconds, then 24 hours will be
    // displayed
    if(s===86400){
      $("#time").html(24+":"+"0"+min+":"+rmsec);      
    } // end of if
    
    // Otherwise display the timer.
    else {
      $("#time").html(hr+":"+min+":"+rmsec);
    } // end of else
  } // end of displayT function
}); // end of $(document).ready

// Create a class tm that has its own getMin,
// setMin, toggle, getToggle, setSbr, getSbr,
// setTime, and getTime classes.
var tm = function(){
  var t, bool, reset;
  var sbr=false;
  var ontime=false;
  
  // This function gets the minutes that will
  // add or subtract the session or break length.
  this.getMin=function(){
   return t; 
  };
  
  // This function changes the minutes that will
  // add or subrract the session or break length.
  this.setMin=function(v){
   t=v;
   return t;
  };
  
  // This function sets the stop or resume buttom.
  this.toggle=function(b){
    bool=b;
    return bool;
  };
  
  // This function returns the Boolean value of the
  // stop or resume button.
  this.getToggle=function(){
    return bool;
  };
  
  // This function sets the reset button in
  // Boolean.
  this.reset=function(b){
    reset=b;
    return reset;
  };
  
  // This function returns the Boolean value of
  // the reset button.
  this.getReset=function(){
    return reset;
  };
  
  // This sets sbr in Boolean value.
  this.setSbr=function(d){
    sbr=d;
    return sbr;
  };
  
  // This returns sbr in Boolean value. False
  // is for session while true is for break.
  this.getSbr=function(){
    return sbr;
  };
  
  // This changes ontime in Boolean value.
  this.setTime=function(tm){
    ontime=tm;
    return ontime;
  };
  
  // This returns ontime's Boolean value to
  // indicate if the timer is on or off. 
  this.getTime=function(){
    return ontime;
  };
}; // end of tm function