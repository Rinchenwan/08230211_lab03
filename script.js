// Lab 03 JavaScript for Portfolio Website
// Author: Tashi Lhamo
// Unique Version: Date & Time + Place Name

document.addEventListener("DOMContentLoaded", () => {

  // --- 1. Small Date + Time (Top of Page) ---
  // Create a div element to display the date and time
  const dateTimeText = document.createElement("div");
  dateTimeText.style.fontFamily = "Arial, sans-serif"; // readable font
  dateTimeText.style.fontSize = "10px";  // small size for subtle display
  dateTimeText.style.color = "#555";      // grayish color
  dateTimeText.style.textAlign = "right";   // align right on desktop
  dateTimeText.style.margin = "2px 8px";    // small margin for spacing
  dateTimeText.style.pointerEvents = "none"; // allow clicks to pass through

  // Insert the date/time div at the top of the body
  document.body.insertAdjacentElement("afterbegin", dateTimeText);

  // Function to update date and time every minute
  function updateDateTime() {
    const now = new Date();
    const dateOptions = { weekday: "short", month: "short", day: "numeric", year: "numeric" };
    const dateStr = now.toLocaleDateString(undefined, dateOptions); // format: Mon, Sep 30, 2025
    const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }); // HH:MM
    dateTimeText.textContent = `${dateStr} | ${timeStr}`; // set content
  }

  updateDateTime(); // initial call to display immediately
  setInterval(updateDateTime, 60000); // update every 60 seconds

  // Responsive adjustment: center on mobile, right-align on desktop
  function adjustDateTime() {
    if (window.innerWidth <= 768) {       // mobile or small screens
      dateTimeText.style.textAlign = "center";
      dateTimeText.style.fontSize = "11px"; // slightly bigger for readability
    } else {                               // desktop
      dateTimeText.style.textAlign = "right";
      dateTimeText.style.fontSize = "10px"; // small on desktop
    }
  }
  adjustDateTime(); // call initially
  window.addEventListener("resize", adjustDateTime); // adjust on window resize

  // --- 2. Toggle Education Section ---
  // Select all headers with class "section-header"
  const toggleButtons = document.querySelectorAll(".section-header");
  toggleButtons.forEach(button => {
    button.addEventListener("click", () => {
      const targetId = button.getAttribute("data-target"); // get associated section ID
      const content = document.getElementById(targetId);
      if (content) {
        // Toggle between visible and hidden
        content.style.display = (content.style.display === "block") ? "none" : "block";
      }
    });
  });

  // --- 3. Skills Hover Highlight ---
  // Select all skill images
  const skills = document.querySelectorAll(".skill-item img");
  skills.forEach(skill => {
    skill.addEventListener("mouseover", () => {
      skill.style.border = "2px solid #ff69b4"; // add pink border on hover
      skill.style.transform = "scale(1.05)";     // slightly enlarge
    });
    skill.addEventListener("mouseout", () => {
      skill.style.border = "";  // remove border when not hovered
      skill.style.transform = "scale(1)"; // reset size
    });
  });

  // --- 4. Show Place Name in Contact Page ---
  const contactSection = document.querySelector(".main-content");
  if (contactSection && navigator.geolocation) {
    const locationBox = document.createElement("p");
    locationBox.textContent = "📍 Detecting your place...";
    contactSection.appendChild(locationBox);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        // Reverse geocode using OpenStreetMap API
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
          .then(response => response.json())
          .then(data => {
            if (data && data.address) {
              const place = data.address.city || data.address.town || data.address.village || "Unknown place";
              const country = data.address.country || "";
              locationBox.textContent = `📍 You are in ${place}, ${country}`;
            } else {
              locationBox.textContent = "⚠️ Could not determine your place.";
            }
          })
          .catch(() => {
            locationBox.textContent = "⚠️ Location lookup failed.";
          });
      },
      (error) => {
        locationBox.textContent = "⚠️ Location access denied.";
      }
    );
  }

  // --- 5. Greeting Based on Time of Day ---
  const greetingHeading = document.querySelector(".main-content h2");
  if (greetingHeading) {
    const hour = new Date().getHours();
    if (hour < 12) {
      greetingHeading.textContent = "🌞 Good Morning, Tashi!";
    } else if (hour < 18) {
      greetingHeading.textContent = "🌼 Good Afternoon, Tashi!";
    } else {
      greetingHeading.textContent = "🌙 Good Evening, Tashi!";
    }
  }

});
