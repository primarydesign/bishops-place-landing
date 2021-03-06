<?php

if (isset($_POST)) {

	$name = $_POST['name'];
	$phone = $_POST['phone'];
	$email = $_POST['email'];
	$month = $_POST['movein'];
	$atype = $_POST['apttype'];
	$commt = $_POST['comments'];

	$atype = join(' ', $atype);
	$clearance = 0;

	//Validate Requireds
	$reqs = Array($name, $phone, $email, $atype);
	foreach( $reqs as $r ) {
		$clearance += (required($r)) ? 0 : 1;}
	//Validate Email
	$clearance += (email($email)) ? 0 : 1;

	if ($month == "") $month = "Not Sure";

	//Check Validation & Send Email
	if ($clearance !== 0) {
	/* submission invalidation */

		/* error-handling */
		echo "failure:validation";

	} else {
	/* submission clear */

		// $address = "contact@liveatbishopsplace.com";
		$address = "mitchell@primarydesign.com";
		$subject = "User Email Submission";
		$message = "Visitor contact information:\n";
		$message .= "Name: " . $name . "\n";
		$message .= "Phone: " . $phone . "\n";
		$message .= "Email: " . $email . "\n";
		$message .= "Type: " . $atype . "\n";
		$message .= "Move-In: " . $month . "\n";
		$message .= "Comments:\n" . $commt . "\n";

		if( mail($address, $subject, $message) ) {
			echo "success";
		} else {
			echo "failure:mailing";
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
