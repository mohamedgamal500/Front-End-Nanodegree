/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */
// Create a document fragment to improve performance
const fragment = document.createDocumentFragment();
const navbarList = document.querySelector("#navbar__list");
const sections = document.querySelectorAll("section");
/**
 * End Global Variables
 * Start Helper Functions
 *
 */
function isInView(section) {
  const bounding = section.getBoundingClientRect();
  return (
    bounding.top >= -300 &&
    bounding.left >= -300 &&
    bounding.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    bounding.right <=
      (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav

function buildMenu() {
  sections.forEach(function (section) {
    let li = document.createElement("li");
    liID = section.getAttribute("id");
    liName = section.getAttribute("data-nav");
    li.innerHTML = `<a class ="menu__link" data-nav="${liID}">${liName} </a>`;
    fragment.appendChild(li);
  });
  navbarList.appendChild(fragment);
}

// Add class 'active' to section when near top of viewport

function setActive() {
  for (let section of sections) {
    nonActiveLinks = [];
    if (isInView(section)) {
      //console.log(isInView(section));
      // set active section
      section.classList.add("your-active-class");
      //  set active link
      activeLi = document.querySelector(`[data-nav=${section.id}]`);
      activeLi.classList.add("selected__link");
    } else {
      //console.log(isInView(section));
      // remove active class
      section.classList.remove("your-active-class");
      //filter non Active Links
      nonactiveLi = document.querySelector(`[data-nav=${section.id}]`);
      nonActiveLinks.push(nonactiveLi);
      // remove selected_link class from Active Links
      nonActiveLinks.forEach(function (nonActiveLink) {
        nonActiveLink.classList.remove("selected__link");
      });
    }
  }
}

function scrollToActive() {
  document.addEventListener("scroll", function () {
    setActive();
  });
}

// Scroll to anchor ID using scrollTO event
function scrollInClick() {
  //event.target >> returns the element that triggered the event.
  //The scrollIntoView()>> scrolls the specified element into the visible area of the browser window.
  navbarList.addEventListener("click", function (event) {
    //console.log(event.target.getAttribute("data-id"));
    const sectionID = event.target.getAttribute("data-nav"); // id of the section
    const clickedElemnt = document.getElementById(sectionID);
    //console.log(clickedElemnt);
    clickedElemnt.scrollIntoView({
      behavior: "smooth",
      inline: "start",
    });
  });
}
/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu
buildMenu();
// Scroll to section on link click
scrollInClick();
// Set sections as active
scrollToActive();
