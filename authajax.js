$(document).ready(function(){
	$(".login_btn").click(function(){
		var user_name = $("#username").val();
		var pw = $("#password").val();
		var post_data = "username=" + username + "password=" + pw;


		$.post('http://hbtagency.com.au/gotcha/api/auth.php',{username:user_name,password:pw},function(data){
            console.log(data);
            if(data!="error"){
            	window.location.replace("popup.html");
            	chrome.browserAction.setPopup({
			        popup: "popup.html"
			    });
			    localStorage.setItem('login_username', user_name);
			    localStorage.setItem('name_of_user', data);
            }
            else{
            	$(".login_status").text("Login Failed. Please check username and password combination.");
            	$(".login_status").css("display","block");
            }
	    });
	});
});