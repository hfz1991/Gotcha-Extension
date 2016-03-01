<pre>
	<?php
		$fn = $_POST['firstname'];
		$ln = $_POST['lastname'];
		$position = $_POST['position'];
		$company = $_POST['company'];
		$email = $_POST['email'];
		$phone = $_POST['phone'];
		$activity = $_POST['activity'];
		$status = "open";
		$imgURL = $_POST['imgURL'];
		$assignedby = $_POST['username'];

		// if(!isset($_POST['submit'])){
		// 	echo 'Error: not through submit button';
		// 	die();
		// }

		$db_connect = mysql_connect('localhost','hbtagenc_gotcha','hbt1234567','hbtagenc_gotcha_application');
		if(!$db_connect){
			echo "<div style='color:red'>Error: Unable to connect database</div>";
		}

		$query = "INSERT INTO customers (firstname,lastname,position,company,status,email,phone,activity,imgURL,addby) VALUES ('$fn', '$ln','$position','$company', '$status','$email','$phone', '$activity', '$imgURL', '$assignedby')";

		mysql_select_db('hbtagenc_gotcha_application');
		$retval = mysql_query($query, $db_connect);

		if(! $retval ) {
	      die('Could not enter data: ' . mysql_error());
	   	}
	   	else{
			echo "<div style='color:green'>Success! Contact has been added into Gotcha Backend System.</div>";
	   	}
 
		mysql_close($db_connect);

	?>
</pre>
