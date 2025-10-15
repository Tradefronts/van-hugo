// Change navbar color on scroll
const isHomePage = window.location.pathname === "/";
const isPasswordPage = window.location.pathname === "/password";

console.log("isHomePage", isHomePage);

if (isPasswordPage) {
  navbar.classList.add("hidden"); // Add the black background class
}

// if (!isHomePage) {
//   navbar.classList.add("bg-white"); // Add the black background class
//   navbar.classList.remove("bg-transparent"); // Remove the transparent class
// }

window.addEventListener("scroll", function () {
  const navbar = document.getElementById("navbar");
  const scrollAmount = 100; // Amount of pixels to scroll before changing color

  // if (isHomePage) {
  //   if (window.scrollY > scrollAmount) {
  //     navbar.classList.add("bg-white"); // Add the black background class
  //     navbar.classList.remove("bg-transparent"); // Remove the transparent class
  //   } else {
  //     navbar.classList.remove("bg-white"); // Remove the black background class
  //     navbar.classList.add("bg-transparent"); // Add the transparent class
  //   }
  // }
});

function toggleMenu() {
  var mobileMenu = document.getElementById("mobile-menu");
  var rootNavBar = document.getElementById("navbar");

  if (rootNavBar.classList.contains("mobile-inactive")) {
    console.log("Opening menu");
    rootNavBar.classList.replace("mobile-inactive", "mobile-active");
    rootNavBar.classList.remove("animate-menu-close");
    rootNavBar.classList.add("animate-menu-open");
    mobileMenu.classList.remove("hidden");
    const listItems = document.querySelectorAll("#nav-items li");
    // Loop through each <li> element and add the specified class
    listItems.forEach((item) => {
      item.classList.add("animate-menu-items-on");
    });
  } else {
    console.log("Closing menu");
    rootNavBar.classList.replace("mobile-active", "mobile-inactive");
    rootNavBar.classList.replace("animate-menu-open", "animate-menu-close");
    mobileMenu.classList.add("hidden");
    const listItems = document.querySelectorAll("#nav-items li");
    // Loop through each <li> element and add the specified class
    listItems.forEach((item) => {
      item.classList.replace("animate-menu-items-on", "animate-menu-items-off");
    });
  }

  // if (mobileMenu.classList.contains('inline-block')) {
  //     mobileMenu.classList.remove('inline-block');
  //     mobileMenu.classList.add('hidden');
  //     rootNavBar.classList.remove("h-screen")
  // } else {
  //   rootNavBar.classList.add("h-screen")
  //   mobileMenu.classList.add('inline-block');
  //   mobileMenu.classList.remove('hidden');
  // }
}
