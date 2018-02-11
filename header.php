<?php
echo <<<END

<img id="offImg" src="img/off.bmp" height="15" width="15" class="model">
<img id="onImg" src="img/on.bmp" height="15" width="15" class="model">

<div class="nav_bar">
  <a href="index.php">Bogdan</a>
  <a href="my_works.php">My works</a>
  <a href="#interests">Interests</a>
  <a href="#about_me">About me</a>
  <a href="javascript:void(0);" id="hamburger" onclick="hamburger()">&#9776;</a>
</div>
<div id="clock" onclick="clock()">
  <canvas id="cl" width="100" height="75"></canvas>
</div>


END;
?>
