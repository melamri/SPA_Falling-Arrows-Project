<?php
error_reporting(E_ALL);
require 'phpmailer/PHPMailerAutoload.php';

function died($error) {
	// your error code can go here
	echo "We are very sorry, but there were error(s) found with the form you submitted. ";
	echo "These errors appear below.<br /><br />";
	echo $error."<br /><br />";
	echo "Please go back and fix these errors.<br /><br />";
	die();
}

// validation expected data exists
if(!isset($_POST['name']) ||
	!isset($_POST['email']) ||
	!isset($_POST['tel']) ||       
	!isset($_POST['message'])) {
	died('We are sorry, but there appears to be a problem with the form you submitted.');       
}

$piece = $_POST['piece'];
$name = $_POST['name']; // required
$email_from = $_POST['email']; // required   
$tel = $_POST['tel']; // required
$message = $_POST['message']; // required

$error_message = "";
$email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';
if(!preg_match($email_exp,$email_from)) {
	$error_message .= 'The Email Address you entered does not appear to be valid.<br />';
}
	$string_exp = "/^[A-Za-z\s.'-]+$/";
if(!preg_match($string_exp,$name)) {
	$error_message .= 'The Name you entered does not appear to be valid.<br />';
}
if(strlen($tel) < 9) {
	$error_message .= 'The Phone Number you entered does not appear to be valid.<br />';
}
if(strlen($error_message) > 0) {
	died($error_message);
}

function clean_string($string) {
	$bad = array("content-type","bcc:","to:","cc:","href");
	return str_replace($bad,"",$string);
}

$email_message  = "Reservation details<br /><br />";
$email_message .= "Piece: ".clean_string($piece)."<br />";
$email_message .= "Name: ".clean_string($name)."<br />";
$email_message .= "Email: ".clean_string($email_from)."<br />";   
$email_message .= "Phone Number : ".clean_string($tel)."<br />";
$email_message .= "Message : ".clean_string($message)."<br /><br />";


$mail = new PHPMailer(true);

//$mail->SMTPDebug = 2;                               // Enable verbose debug output

//$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'localhost';  // Specify main and backup SMTP servers
//$mail->SMTPAuth = true;                               // Enable SMTP authentication
//$mail->Username = 'email address';   // SMTP username
//$mail->Password = 'password';                     // SMTP password
//$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
//$mail->Port = 465;                                    // TCP port to connect to

//$mail->setFrom('fallingarrowsproject@gmail.com', 'FAP');
$mail->addAddress('email address', 'Falling Arrows Project');     // Add a recipient

$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Art Reservation Form';
$mail->Body    = $email_message;

if(!$mail->send()) {
    echo 'Message could not be sent.';
    echo 'Mailer Error: ' . $mail->ErrorInfo;
} else {
    echo 'Message has been sent';
}
sleep(6);
echo "<meta http-equiv='refresh' content=\"0; url=http://fallingarrowsproject.com/#artwork\">";
?>