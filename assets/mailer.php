<?php

  if ($_SERVER["REQUEST_METHOD"] == "POST") {

      $name = $_POST["fname"];
      $email = $_POST["sname"];
      $phone = $_POST["email"];
      $adress = $_POST["adress"];
      $page = $_POST["page"];


      $to      = 'info@ges.co.il';
      //$to      = 'shefyla@gmail.com';
      $subject = 'פנייה חדשה באתר מאת '.$name;

      $email_content = "שם: ".$_POST["fname"]."\n";
      $email_content .= "שם משפחה: ".$_POST["sname"]."\n";
      $email_content .= "מייל: ".$_POST["email"]."\n";
      $email_content .= "חברה: ".$_POST["company"]."\n";
      $email_content .= "תוכן: ".$_POST["message"]."\n\n";

      if($_POST["applications"])
        $email_content .= "applications: ".$_POST["applications"]."\n";

      if($_POST["water-source"])
        $email_content .= "water-source: ".$_POST["water-source"]."\n";


      $headers = 'From: '.$email. "\r\n" .
                  'Reply-To:'.$email . "\r\n" .
                  'X-Mailer: PHP/' . phpversion();

      if (mail($to, $subject, $email_content, $headers)) {

          http_response_code(200);
          echo "<p>Your massage was sent. Thank you.</p>";

      } else {

          http_response_code(500);
          echo "Error";
      }

  } else {
      http_response_code(403);
      echo "Error";
  }