/* ----- NAVIGATION BAR FUNCTION ----- */
function myMenuFunction(){
    let menuBtn = document.getElementById("myNavMenu");

    if(menuBtn.className === "nav-menu"){
      menuBtn.className += " responsive";
    } else {
      menuBtn.className = "nav-menu";
    }
  }

/* ----- ADD SHADOW ON NAVIGATION BAR WHILE SCROLLING ----- */
  window.onscroll = function() {headerShadow()};

  function headerShadow() {
    const navHeader =document.getElementById("header");

    if (document.body.scrollTop > 50 || document.documentElement.scrollTop >  50) {

      navHeader.style.boxShadow = "0 1px 6px rgba(0, 0, 0, 0.1)";
      navHeader.style.height = "70px";
      navHeader.style.lineHeight = "70px";

    } else {

      navHeader.style.boxShadow = "none";
      navHeader.style.height = "90px";
      navHeader.style.lineHeight = "90px";

    }
  }


/* ----- TYPING EFFECT ----- */
 let typingEffect = new Typed(".typedText",{
    strings : ["IT Specialist", "Developer", "Tech Enthusiast"],
    loop : true,
    typeSpeed : 90, 
    backSpeed : 80,
    backDelay : 200
 })


/* ----- ## -- SCROLL REVEAL ANIMATION -- ## ----- */
 const sr = ScrollReveal({
        origin: 'top',
        distance: '80px',
        duration: 2000,
        reset: true     
 })

/* -- HOME -- */
sr.reveal('.featured-text-card',{})
sr.reveal('.featured-name',{delay: 100})
sr.reveal('.featured-text-info',{delay: 200})
sr.reveal('.featured-text-btn',{delay: 200})
sr.reveal('.social_icons',{delay: 200})
sr.reveal('.featured-image',{delay: 300})


/* -- PROJECT BOX -- */
sr.reveal('.project-box',{interval: 200})

/* -- HEADINGS -- */
sr.reveal('.top-header',{})

/* ----- ## -- SCROLL REVEAL LEFT_RIGHT ANIMATION -- ## ----- */

/* -- ABOUT INFO & CONTACT INFO -- */
const srLeft = ScrollReveal({
  origin: 'left',
  distance: '80px',
  duration: 2000,
  reset: true
})

srLeft.reveal('.about-info',{delay: 100})
srLeft.reveal('.contact-info',{delay: 100})

/* -- ABOUT SKILLS & FORM BOX -- */
const srRight = ScrollReveal({
  origin: 'right',
  distance: '80px',
  duration: 2000,
  reset: true
})

srRight.reveal('.skills-box',{delay: 100})
srRight.reveal('.form-control',{delay: 100})

/* ----- CHANGE ACTIVE LINK ----- */

const sections = document.querySelectorAll('section[id]')

function scrollActive() {
  const scrollY = window.scrollY;

  sections.forEach(current =>{
    const sectionHeight = current.offsetHeight,
        sectionTop = current.offsetTop - 50,
      sectionId = current.getAttribute('id')

    if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) { 

        document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.add('active-link')

    }  else {

      document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.remove('active-link')

    }
  })
}

window.addEventListener('scroll', scrollActive)

/* ----- POP-UP OVERLAY ----- */

// Function to show the pop-up
function showPopup(title, message) {
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalMessage').textContent = message;
  document.getElementById('modalOverlay').style.display = 'flex';
  setTimeout(() => {
    document.getElementById('modalContent').classList.add('show');
  }, 10);
}

// Function to hide the pop-up
function hidePopup() {
  document.getElementById('modalContent').classList.remove('show');
  setTimeout(() => {
    document.getElementById('modalOverlay').style.display = 'none';
  }, 300);
}

// This hides the pop-up if the user clicks the dark background
document.getElementById('modalOverlay').addEventListener('click', (event) => {
  if (event.target === document.getElementById('modalOverlay')) {
    hidePopup();
  }
});

/* ----- POP-UP FORM SUCCESS ----- */

const contactForm = document.getElementById('contactForm');
const modalOverlay = document.getElementById('modalOverlay');
const modalContent = document.getElementById('modalContent');
const modalTitle = document.getElementById('modalTitle');
const modalMessage = document.getElementById('modalMessage');

// Function to show the pop-up
function showPopup(title, message) {
  modalTitle.textContent = title;
  modalMessage.textContent = message;
  modalOverlay.style.display = 'flex';
  setTimeout(() => {
    modalContent.classList.add('show');
  }, 10);
}

// Function to hide the pop-up
function hidePopup() {
  modalContent.classList.remove('show');
  setTimeout(() => {
    modalOverlay.style.display = 'none';
  }, 300);
}

// Listen for the form submission
contactForm.addEventListener('submit', (event) => {
// Prevent the form from submitting normally
event.preventDefault();

// Here you would typically send the form data to a server
// For now, we'll just show the success message.

// Get form data (optional, but good practice)
const name = document.getElementById('name').value;
const email = document.getElementById('email').value;
const message = document.getElementById('message').value;

// Display a success message in the pop-up
showPopup('Success!', 'Thank you for your message, ' + name + '! We will get back to you shortly.');

// Clear the form fields after submission
contactForm.reset();
});

// Hide the pop-up if the user clicks the dark background
modalOverlay.addEventListener('click', (event) => {
  if (event.target === modalOverlay) {
    hidePopup();
  }
});