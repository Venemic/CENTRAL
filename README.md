<style>
* {box-sizing: border-box}
body {font-family: Verdana, sans-serif; margin:0}
.mySlides {display: none}
img {vertical-align: middle;}

/* Slideshow container */
.slideshow-container {
  max-width: 1000px;
  position: relative;
  margin: auto;
}

/* Next & previous buttons */
.prev, .next {
  cursor: pointer;
  position: absolute;
  top: 50%;
  width: auto;
  padding: 16px;
  margin-top: -22px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  transition: 0.6s ease;
  border-radius: 0 3px 3px 0;
  user-select: none;
}

/* Position the "next button" to the right */
.next {
  right: 0;
  border-radius: 3px 0 0 3px;
}

/* On hover, add a black background color with a little bit see-through */
.prev:hover, .next:hover {
  background-color: rgba(0,0,0,0.8);
}

/* Caption text */
.text {
  color: #f2f2f2;
  font-size: 15px;
  padding: 8px 12px;
  position: absolute;
  bottom: 8px;
  width: 100%;
  text-align: center;
}

/* Number text (1/3 etc) */
.numbertext {
  color: #f2f2f2;
  font-size: 12px;
  padding: 8px 12px;
  position: absolute;
  top: 0;
}

/* The dots/bullets/indicators */
.dot {
  cursor: pointer;
  height: 15px;
  width: 15px;
  margin: 0 2px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  transition: background-color 0.6s ease;
}

.active, .dot:hover {
  background-color: #717171;
}

/* Fading animation */
.fade {
  -webkit-animation-name: fade;
  -webkit-animation-duration: 1.5s;
  animation-name: fade;
  animation-duration: 1.5s;
}

@-webkit-keyframes fade {
  from {opacity: .4} 
  to {opacity: 1}
}

@keyframes fade {
  from {opacity: .4} 
  to {opacity: 1}
}

/* On smaller screens, decrease text size */
@media only screen and (max-width: 300px) {
  .prev, .next,.text {font-size: 11px}
}
</style>
# CENTRAL

A WEB BASED FACIAL ATTENDANCE APPLICATION.

## Description

𝐂𝐞𝐧𝐭𝐫𝐚𝐥, a facial recognition-based attendance taking web application which keeps a record of attendance and classes for every student and prevents third-party entries. It also gives a super easy managing dashboard to the faculty and requires less maintenance.
This web application can cover organizations other than from the education field because it only requires two kinds of users: - 𝐚 𝐇𝐞𝐚𝐝 𝐩𝐞𝐫𝐬𝐨𝐧 (which manages and monitors employees working under him) and 𝐚𝐧 𝐄𝐦𝐩𝐥𝐨𝐲𝐞𝐞 𝐩𝐞𝐫𝐬𝐨𝐧 (which works under the head person). To make an automatic record of attendance of meetings and make meetings for future use, this application can be very handy in daily online meetings/classes.
Main 𝐨𝐛𝐣𝐞𝐜𝐭𝐢𝐯𝐞 of this software is to decrease the managing efforts, make everything automatic and to make online meetings more secure.
We chose a proactive approach to testing so that the testing of individual module was done simultaneously with the deployment. This method helped us to check the individual module for a better implementation of the project.

## Getting Started

## Salient Features

- Easy and simple

- Secure 

- Fast and responsive 

## Tech Stack

- HTML, CSS, Js, Bootstrap

- Face min.js API (Realtime web image/video recogniton)

- Firebase Storage, Authentication and Realtime Database.

### Installing

* You can download this project from the current git repository and run this project on your local host server.
* You can make a pull request if you have any new idea to make it more professional looking site.

### Executing program

* How to run the program. 
   **1.** &ensp; Download our git repository and open in any IDE/Code-Editor like:- Pycharm / Vs code, make sure you are opening the folder as a root folder.&ensp;  
   **2.** Open the index.html using live server on your local host device.&ensp;  
   **3.** Register as a **Student** or a **Teacher** and start using the service.  

## Author

Contributors names and contact info

ex. Shivam Singh (https://www.linkedin.com/in/singhshivam-007/)

## Version History

* 0.1
    * Initial Release

## Screenshots
<div class="slideshow-container">

<div class="mySlides fade">
  <div class="numbertext">1 / 3</div>
  <img src="img_nature_wide.jpg" style="width:100%">
  <div class="text">Caption Text</div>
</div>

<div class="mySlides fade">
  <div class="numbertext">2 / 3</div>
  <img src="img_snow_wide.jpg" style="width:100%">
  <div class="text">Caption Two</div>
</div>

<div class="mySlides fade">
  <div class="numbertext">3 / 3</div>
  <img src="img_mountains_wide.jpg" style="width:100%">
  <div class="text">Caption Three</div>
</div>

<a class="prev" onclick="plusSlides(-1)">&#10094;</a>
<a class="next" onclick="plusSlides(1)">&#10095;</a>

</div>
<br>

<div style="text-align:center">
  <span class="dot" onclick="currentSlide(1)"></span> 
  <span class="dot" onclick="currentSlide(2)"></span> 
  <span class="dot" onclick="currentSlide(3)"></span> 
</div>

<div id="slider">
  <img src="Screenshots/Home.png" alt="alt text 1">
  <img src="Screenshots/Login.png" alt="alt text 2">
  <img src="Screenshots/Register.png" alt="alt text 3">
  <img src="Screenshots/Forget Password.png" alt="alt text 4">
</div>

## Walkthrough Video and Website link
- Website Link : <a href="https://venemic.github.io/CENTRAL/" target="_blank">Site is active!</a>
- Youtube Demo : <a href="">Soon</a>
- <script>
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}
</script>
