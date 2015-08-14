<?php

if (isset($_POST)) {

	$fname = $_POST['firstName'];
	$lname = $_POST['lastName'];
	$email = $_POST['email'];
	$clearance = 0;

	//Validate Requireds
	$reqs = Array($fname, $lname, $email);
	foreach( $reqs as $r ) {
		$clearance += (required($r)) ? 0 : 1;}
	//Validate Email
	$clearance += (email($email)) ? 0 : 1;

	//Check Validation & Send Email
	if ($clearance !== 0) {
	/* submission invalidation */

		/* error-handling */

	} else {
	/* submission clear */

		$address = "mitchell@primarydesign.com";
		$subject = "User Email Submission";
		$message = "Visitor contact information:";
		$message += "Name: " . $fname . $lname . "\n";
		$message += "Email: " . $email . "\n";

		if( mail($address, $subject, $message) ) {
			echo "success:\n$address\n$subject\n$message";
		} else {
			echo "failure:\n$address\n$subject\n$message";
		}

	}/**(submission)**/
}
//GENERAL GLOBAL DECLARATIONS
function required($x) {
	if ($x !== "") return true;
	else return false;
}
function email($x) {
	$rgx = '/[a-zA-Z0-9_.+-]+@[a-zA-Z0-9]+([.][a-zA-Z]+)+$/';
	$val = preg_match($rgx,$x);
	return ($val === 1) ? true : false;
}
function phone($x) {
	$rgx = '/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/';
	$val = preg_match($rgx,$x);
	return ($val === 1) ? true : false;
}

?>
