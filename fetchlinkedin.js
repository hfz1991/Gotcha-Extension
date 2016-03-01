function fetchLinkedIn(document_root){

	// var result = $('.main-headline').map(function (){ return $(this).text(); }).get().join(',');
    var resultCount = document.querySelectorAll(".people .main-headline").length;
    // var titleCount = document.querySelectorAll(".snippet dd .title").length;
    console.log("count:" + resultCount);
    var nameArray = [];
    var finalArray = [];
    var indexArray = [];

    //Get name
    for (var i = 0; i < resultCount; i++) {
        var name = document.querySelectorAll(".people .main-headline")[i].textContent;
        if(name != "LinkedIn Member"){
            nameArray.push(name);
            indexArray.push(i);
        }
    };
    console.log("count:"+ nameArray.length + "content:"+ nameArray);
    
    var count = nameArray.length;
    //Get job info
    // var actuallyCount = document.querySelectorAll(".people .snippet dd .title").length;
    // var titleArray = [];
    // for (var i = 0; i < actuallyCount; i++) {
    //     var title = document.querySelectorAll(".people .snippet dd .title")[i].textContent;

    //     titleArray.push(title);
    // };
    // console.log("count:"+ actuallyCount + "content:"+ titleArray);

    //Get image
    var imgArray = [];
    for (var i = 0; i < count; i++) {
        var targetIndex = indexArray[i];
        var url = document.querySelectorAll(".people .result-image img")[targetIndex].getAttribute("src")
        imgArray.push(url);
    };

    //Get Title
    var titleArray = [];
    for (var i = 0; i < count; i++) {
        var targetIndex = indexArray[i];
        var title = document.querySelectorAll(".people .bd .description")[targetIndex].textContent;

        titleArray.push(title);
    };
    console.log("count:"+ count + "content:"+ titleArray);

    //Get connection
    // var connectionArray = [];
    // for (var i = 0; i < count; i++) {
    //     var targetIndex = indexArray[i];
    //     var title = document.querySelectorAll(".people .bd .related-wrapper")[targetIndex].textContent;
    // }


    // Process the final string
    for (var i = 0; i < count; i++) {
    	var tempName = nameArray[i];
    	var splitArray = titleArray[i].split(" at ");
    	var tempPosition = splitArray[0];
        if(!splitArray[1]){
            console.log("Try search name - company name...");
            splitArray = titleArray[i].split(" - ");
            if(!splitArray[1]){
                splitArray = titleArray[i].split(" @ ");
                if(!splitArray[1]){
                    console.log(tempName + "has no company info");
                    splitArray[1] = "";
                }
            }
            else{
                tempPosition = splitArray[0];
            }
        }
    	var tempCompany = splitArray[1];
    	var tempImageURL = imgArray[i];
        console.log("imgURL: " + tempImageURL);
    	var tempString = tempName+"###"+tempPosition+"###"+tempCompany+"###"+tempImageURL;
    	finalArray.push(tempString);
    };

    return finalArray;
}

chrome.runtime.sendMessage({
    action: "getLinkedIn",
    source: fetchLinkedIn(document)
});