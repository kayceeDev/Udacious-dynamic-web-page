/** TODO: Build the navigation bar using JavaScript **/
const ul = document.getElementById("navbar__list");
const sections = document.querySelectorAll("section");
const commentForm = document.getElementById("commentForm");
const commentsSection = document.querySelector(".comments-section");
console.log(commentsSection)

function buildNav(childrenLi, parentUl) {
  childrenLi.forEach((navItem, index) => {
    const li = document.createElement("li");
    const itemTextContent = navItem.dataset.nav;
    const linkElement = document.createElement("a");
    linkElement.classList.add("menu__link")
    linkElement.href = `#${navItem.id}`;
    linkElement.textContent = itemTextContent;
    if (index == 0) {
      linkElement.classList.add("active");
    }
    li.appendChild(linkElement);
    parentUl.appendChild(li);
  });
  addActive(ul);
}


function addActive(ul) {
  // Add click event listener to the navigation list
  ul.addEventListener("click", (event) => {
    if (event.target.tagName === "A") {
      event.preventDefault();
      // Get the target section ID from the href attribute
      const targetSectionId = event.target.getAttribute("href");
      // Add the active class to the clicked navigation element
      event.target.classList.add("active");
      // Remove active class from other navigation elements
      const navLinks = ul.querySelectorAll("a");
      navLinks.forEach((link) => {
        if (link !== event.target) {
          link.classList.remove("active");
        }
      });

      /** TODO: Add smooth scrolling **/
      const targetSection = document.querySelector(targetSectionId);
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  });
}

const handleCommentSubmit = (event)=>{
  event.preventDefault(); // Prevent form submission

  // Retrieve form field values
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const commentInput = document.getElementById("comment");

  // Retrieve form field values
  const nameValue = nameInput.value.trim();
  const emailValue = emailInput.value.trim();
  const commentValue = commentInput.value.trim();

  // Validate form fields
  if (nameValue === "") {
    showError(nameInput, "Name is required");
  } else {
    showSuccess(nameInput);
  }

  if (emailValue === "") {
    showError(emailInput, "Email is required");
  } else if (!isValidEmail(emailValue)) {
    showError(emailInput, "Please enter a valid email address");
  } else {
    showSuccess(emailInput);
  }

  if (commentValue === "") {
    showError(commentInput, "Comment is required");
  } else {
    showSuccess(commentInput);
  }

  // If all fields are valid, submit the form
  if (
    nameValue !== "" &&
    emailValue !== "" &&
    isValidEmail(emailValue) &&
    commentValue !== ""
  ) {
    // Submit the form
    const comment = document.createElement("div");
    comment.classList.add("comment-container")
    let namePara = document.createElement("p");
    namePara.textContent = nameValue;
    let emailPara = document.createElement("p");
    emailPara.textContent = emailValue;
    let commentPara = document.createElement("p");
    commentPara.textContent = commentValue;
    comment.append(namePara, emailPara, commentPara)
    commentsSection.appendChild(comment);
    nameInput.value = "";
    emailInput.value = "";
    commentInput.value = "";
  }

}

// Function to show error message
function showError(input, message) {
  const formControl = input.parentElement;
  const errorElement = formControl.querySelector(".error-message");

  // Add error message and class
  errorElement.innerText = message;
  formControl.classList.add("error");
}

// Function to show success state
function showSuccess(input) {
  const formControl = input.parentElement;

  // Remove error class
  formControl.classList.remove("error");
}

// Function to validate email format
function isValidEmail(email) {
  // Basic email validation using regular expression
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

const toggleActiveSection = () => {
  sections.forEach((section) => {
    const [top, bottom] = returnPosition(section);
    const isActiveCheck = isActive(top,bottom);
    toggleState(isActiveCheck,section);
    const viewportHeight = window.innerHeight * 0.2;
    if (bottom <= 1 || top >= viewportHeight) {
      section.classList.remove("active");
    }
  });
};

const returnPosition = (section) => {
  const sec = section.getBoundingClientRect();
  return [sec.top, sec.bottom];
};
// 
const isActive = (top,bottom) => {
  const viewportHeight = window.innerHeight;
  // Calculate the minimum top position for the element to be considered in the active window
  const minTopPosition = viewportHeight * 0.2; // Adjust 0.1 as needed
  // Check if the element is within the active window
  const isElementActive = top <= (viewportHeight - minTopPosition) && bottom >= minTopPosition;
  return isElementActive
};

const toggleState = (isActiveCheck,section) => {
  if (isActiveCheck) {
    section.classList.add("active");
  } else {
    section.classList.remove("active");
  }

};

// Function to handle scroll event
function handleScroll() {
  toggleActiveSection();
}

// Attach scroll event listener
window.addEventListener("scroll", handleScroll);
// Add submit event listener to the form
commentForm.addEventListener("submit", (event) => {
  handleCommentSubmit(event)
 });

toggleActiveSection();
buildNav(sections, ul);