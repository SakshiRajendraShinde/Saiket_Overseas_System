const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

menuBtn.onclick = function(){
navLinks.classList.toggle("active");
};



document.getElementById("learnBtn").onclick = function(){
alert("Welcome! Thanks for exploring our landing page.");
};



document.getElementById("contactForm").addEventListener("submit",function(e){

e.preventDefault();

alert("Message sent successfully!");

this.reset();

});