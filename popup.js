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

  $("#addContact").submit();

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
      message.innerText = "Email address in the current page:";
    }
    else{
    	message.innerText = "No email found.";
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

      temp = "<button class='addToLinkedIn' id='"+ i +"'>" + splitArray[0];
      newArray.push(temp);
    };

    var result = newArray.join('</button><br>');
    $("#linkedin_status").html(result);
  }


  

});

function onWindowLoad() {

  var message = document.querySelector('#message');
  
  

  chrome.tabs.executeScript(null, {
    file: "fetchlinkedin.js"
  }, function() {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    var btnElements = document.getElementsByClassName('addToLinkedIn');
    for (var i = btnElements.length; i--;) {
        btnElements[i].addEventListener("click", clicked);
          // alert("a");
    }
    
    if (chrome.runtime.lastError) {
      // message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
    }
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