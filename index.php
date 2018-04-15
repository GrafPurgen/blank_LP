<!doctype html>

<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport"
		      content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
		<meta http-equiv="X-UA-Compatible" content="ie=edge">
		<title>Document</title>
		<script>
            window.addEventListener('DOMContentLoaded', function() {
                NProgress.start();
            }, true);
            window.addEventListener('load', function() {
                NProgress.done();

                $('#loader').fadeOut('fast', function () {
                    $('#loader').remove();
                    $('.wrapper').fadeIn('fast');
                });
            });
		</script>
    </head>

	<body>
		<div id="loader">
			Loading...
		</div>
		<div class="wrapper">
			<header>

			</header>

			<main>

			</main>

			<footer>

			</footer>

		</div>

	</body>

</html>

<script src="assets/scripts.js"></script>

<link rel="stylesheet" href="assets/style.css">

<!--<script src="js/jquery-modal-video.min.js"></script>-->
<body>
