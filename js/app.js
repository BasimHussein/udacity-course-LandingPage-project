/**
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

/**
 * Define Global Variables
 */
// this is a collection of the sections on the page, initially contains 4 sections
let sectionCollection = document.getElementsByClassName("pageSection");

// this is the number of sections in the page, initially =4
let numOfSec = sectionCollection.length;

// this ia an unordered list contains list items
let navBar = document.getElementById("navbar__list");

// this is an array of list items of the options in the navbar
let navChildren = Array.from(navBar.children);

// this is a div works as a container for all the section elements in the page
let content = document.getElementById("content");

// this is a button that goes to the top of the page whwn clicked
let up = document.getElementById("up");

// this is a button that adds an extra section to the already 4 existing ones every time it gets clicked
let add = document.getElementById("add");

// this is a button that removes the extra added sections when clicked one at a time, needs the sections to be 5 or more to work
let remove = document.getElementById("remove");

// this is a flag to figure out which section is active at the time initially doesn't get assigned a value
let activeSection;

// this to keep track of last scroll position
let oldScrollTop = 0;

// this is an header element
let pageHeader = document.getElementById("page__header");

// this is a flag to determine wether the cursor is touching the navbar or not
let touchingNav = 0;
/**
 * End Global Variables
 *
 *
 * Start Functions
 */
/* this is a function that populate the items in the navbar using the sections in the page, initially four sections */
function populateNav() {
  navBar.innerHTML = "";
  for (let i = 0; i < numOfSec; i++) {
    let listItem = document.createElement("li");
    listItem.setAttribute("href", sectionCollection[i].id);
    listItem.innerHTML = `<a class="menu__link">${sectionCollection[
      i
    ].getAttribute("data-nav")}</a>`;
    navBar.appendChild(listItem);
  }
  // this line to make the items in the navbar when clicked scroll to the wanted section
  clickable();
}

////////////////////////////
/* this is a function to scroll to anchor ID using scrollIntoView */
function clickable() {
  navChildren = Array.from(navBar.children);
  for (let i = 0; i < navChildren.length; i++) {
    navChildren[i].addEventListener("click", function (event) {
      // Prevent the default anchor click behavior
      event.preventDefault();

      // Get the target section from the href attribute

      let targetId = navChildren[i].getAttribute("href");
      let targetSection = document.getElementById(targetId);

      // Scroll to the target section smoothly
      targetSection.scrollIntoView({
        behavior: "smooth",
      });
    });
  }
}

////////////////////////

/* this is a function to add a section to the already 4 sections in the page. The section will have an h2 with the appropriate number in the heading and will have a place holder text */
function addSection() {
  let extraSection = document.createElement("section");

  extraSection.setAttribute("id", "section" + (numOfSec + 1));
  extraSection.setAttribute("data-nav", "section " + (numOfSec + 1));
  extraSection.setAttribute("class", "pageSection");
  extraSection.innerHTML = `<div class="landing__container">
          <h2>Section ${numOfSec + 1}</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra
            dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex.
            Phasellus
            imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget
            bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet
            elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed
            leo
            nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie
            semper in tellus. Sed congue et odio sed euismod.</p>

          <p>Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel
            luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur
            porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.</p>
        </div>`;

  content.appendChild(extraSection);
  /* we need to change the number of sections and repopulate the navbar every time we change the structure of the page */
  numOfSec++;
  populateNav();
}

/////////////////////////////

/* this ia afunction to remove one section from the page. The number of sections needs to be 5 or more in order for the function to work */
function removeSection() {
  if (numOfSec > 4) {
    content.removeChild(content.lastChild);
    /* we need to change the number of sections and repopulate the navbar every time we change the structure of the page */
    numOfSec--;
    populateNav();
  }
}

///////////////////////////

/* this is a function to add class active to a section when near top of viewport and to the correspondent navbar item */
function makeActive() {
  for (let i = 0; i < numOfSec; i++) {
    /* getBoundingClientRect() method is used to return an object containing information about an element one of them is the y position */
    let rectangle = sectionCollection[i].getBoundingClientRect();
    /* I am comparing the y position of the section to the top quarter of the inner height of the window, this ratio based just on trial across different screen sizes */
    if (rectangle.y < window.innerHeight / 4) {
      sectionCollection[i].classList.add("your-active-class");

      activeSection = i;
    } else {
      sectionCollection[i].classList.remove("your-active-class");
    }
  }
  /* this part is used to add an active state to the navigation items when a section is in the viewport */
  navChildren = Array.from(navBar.children);
  for (let i = 0; i < numOfSec; i++) {
    if (i === activeSection) {
      navChildren[i].firstChild.classList.add("menu__link-active");
    } else {
      navChildren[i].firstChild.classList.remove("menu__link-active");
    }
  }
  /* this part ia to troubleshoot some problems that appeared while testing the project to prevent the first item in the navbar being active if the first section is not active */
  if (!sectionCollection[0].classList.contains("your-active-class")) {
    navChildren[0].firstChild.classList.remove("menu__link-active");
  }
}
/**
 * End Functions
 *
 *
 * Begin Events
 */

/* this is an event listener to add class active to a section when near top of viewport */
window.addEventListener("scroll", makeActive);

////////////////////////////////////

/* this part is to add an event listener to the page header to keep track if the cursor entered the navbar area */
/* I used arrow function syntax as a practice to what shown in the course material but i like the redability if the regular function syntax*/
pageHeader.addEventListener("mouseenter", () => {
  touchingNav = 1;
  pageHeader.classList.remove("hidden");
});

////////////////////////////////////

/* this part is to add an event listener to the page header to keep track if the cursor left the navbar area */
/* I used arrow function syntax as a practice to what shown in the course material but i like the redability if the regular function syntax*/
pageHeader.addEventListener("mouseleave", () => {
  touchingNav = 0;
});

///////////////////////////////////

/* this event listener listens to the scroll action if we scroll down the navbar will disappear after one second, if we scroll up the navbar will appear */
window.addEventListener("scroll", function () {
  let newScroll = document.documentElement.scrollTop;
  if (newScroll > oldScrollTop) {
    // scrolling down
    /* this is a time out of 1 second*/
    setTimeout(() => {
      if (!touchingNav) {
        // this is to add hidden class
        pageHeader.classList.add("hidden");
      }
    }, 1000);
  } else {
    // scrolling up
    // this is to remove hidden class
    pageHeader.classList.remove("hidden");
  }
  oldScrollTop = newScroll;
});

//////////////////////////////

/* this is an event listener to the up button when clicked the page scrolls smoothly to the top */
up.addEventListener("click", function () {
  let target = document.getElementById("mainHeading");
  // Scroll to the target section smoothly
  target.scrollIntoView({
    behavior: "smooth",
  });
});

//////////////////////////////

/*this is an event listener to the add button when clicked it adds another section to the page and another item gets added to the navbar */
add.addEventListener("click", addSection);

/////////////////////////////

/*this is an event listener to the remove button when clicked it removes another section from the page and another item gets removed from the navbar, the minimum number of sections in the page is four */
remove.addEventListener("click", removeSection);

/////////////////////////////

/*
 * End events
 *
 *
 * Start building the page
 */

// this line to build the nav bar
populateNav();

// this line to scroll to section on link click
clickable();
