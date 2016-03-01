<?php
		$user_name = $_POST['username'];
		$pw = $_POST['password'];
		

		$db_connect = mysql_connect('localhost','hbtagenc_gotcha','hbt1234567','hbtagenc_gotcha_application');
		if(!$db_connect){
			echo "<div style='color:red'>Error: Unable to connect database</div>";
		}
		mysql_select_db('hbtagenc_gotcha_application');

		$query = "SELECT * FROM users WHERE email='". $user_name ."'";
		$retval = mysql_query($query, $db_connect);
		$pw_from_db = "";
		$name_of_user = "";
		while ($row = mysql_fetch_array($retval)) {
		    $pw_from_db = $row["password"];
		    $name_of_user = $row["name"];
		}


		if(! $retval ) {
	      die('Could not enter data: ' . mysql_error());
	   	}
	   	else{
			if(password_verify ( $pw , $pw_from_db ) == TRUE){
				echo $name_of_user;
			}
			else{
				// echo "DB PASS: " . $pw_from_db . " this pass:" . $pw;
				echo "error";
			}
	   	}
 
		mysql_close($db_connect);
		// echo "From php: username=>" .$user_name. " password=>" .$pw;
?>