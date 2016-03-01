// Author: Charles He
  var rawArray = [];



function clicked() {
  console.log(rawArray);
  console.log(this.id);
  var currRecord = rawArray[this.id];
  var splitArray = currRecord.split("###");
  var nameSplitArray = splitArray[0].split(" ");

  $("#form_firstname").val(escape(nameSplitArray[0]));
  $("#form_lastname").val(escape(nameSplitArray[1]));
  $("#form_position").val(escape(splitArray[1]));
  $("#form_company").val(escape(splitArray[2]));
  $("#form_img").val(splitArray[3]);
  $("#form_name_of_user").val(localStorage.getItem('name_of_user'));

  $("#addContact").submit();

}

function logout(){
  window.location.replace("auth.html");
      chrome.browserAction.setPopup({
      popup: "auth.html"
  });
  localStorage.setItem('login_username', '');
  localStorage.setItem('name_of_user', '');
}

function sendEmailListener(){
  $("#linkedin").click(function(){
    
	});
};


function renderStatus(statusText) {
  document.getElementById('linkedin_status').textContent = statusText;
}

chrome.runtime.onMessage.addListener(function(request, sender) {

  if (request.action == "getSource") {
  	var emails = extractEmails(request.source);
  	
    if(emails){
    	var duplicationProcessString = remove_duplicates(emails);
    	var result = duplicationProcessString.join('\n');
    	$('#email').html(result);
      // message.innerText = "Email address in the current page:";
    }
    else{
    	// message.innerText = "No email found.";
    }
  }
  else if(request.action == "getLinkedIn"){
    rawArray = request.source;

    var resultArray = rawArray;
    var newArray = [];
    for (var i = 0; i < resultArray.length; i++) {
      var temp = resultArray[i];
      var splitArray = temp.split("###");
      var nameSplitArray = splitArray[0].split(" ");

      temp = "<div class='result_cell' style='background-color:#fafafb' ><img src='http://hbtagency.com.au/gotcha/public/img/point.png' class='inline-block'/><div class='name_div inline-block'>"+ splitArray[0] +"</div><div class='position'>"+ splitArray[1] + "</div><div class='company'> " + splitArray[2] +"</div><button class='addToLinkedIn' id='"+ i +"'>Add";
      newArray.push(temp);
    };

    var result = newArray.join('</button></div><hr>');
    console.log(localStorage.getItem('name_of_user'));
    $("#greeting").html(greeting());
    $("#name_of_user").html(localStorage.getItem('name_of_user'));
    $("#linkedin_status").html(result);
  }
});

function greeting(){
  var today = new Date()
  var curHr = today.getHours();

  if(curHr<12){
        return("Good Morning!");
  }else if(curHr<18){
        return("Good Afternoon!");
  }else{
        return("Good Evening!");
  }
}

function onWindowLoad() {

  var message = document.querySelector('#message');
  

  chrome.tabs.executeScript(null, { file: "jquery-2.2.1.min.js" }, function() {
      chrome.tabs.executeScript(null, {
        file: "fetchlinkedin.js"
      }, function() {
        // Add listener to button in order to submit form
        var btnElements = document.getElementsByClassName('addToLinkedIn');
        for (var i = btnElements.length; i--;) {
            btnElements[i].addEventListener("click", clicked);
              // alert("a");
        }
        
        var logout_btn = document.getElementsByClassName('logout');
        for (var i = logout_btn.length; i--;) {
            logout_btn[i].addEventListener("click", logout);
              // alert("a");
        }


        if (chrome.runtime.lastError) {
          // message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
        }
      });
  });
  

  chrome.tabs.executeScript(null, {
    file: "getPagesSource.js"
  }, function() {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.runtime.lastError) {
      // message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
    }
  });

}

window.onload = onWindowLoad;

function extractEmails (text)
{
    return text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.((?!jpg|png)[a-zA-Z]+))/gi);
}

function remove_duplicates(objectsArray) {
    var usedObjects = {};

    for (var i=objectsArray.length - 1;i>=0;i--) {
        var so = JSON.stringify(objectsArray[i]);

        if (usedObjects[so]) {
            objectsArray.splice(i, 1);

        } else {
            usedObjects[so] = true;          
        }
    }

    return objectsArray;

}