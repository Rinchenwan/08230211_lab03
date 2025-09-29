// =========================================
// Lab 03 JavaScript for Portfolio Website
// Author: Tashi Lhamo
// Unique Version: Date & Time + Place Name
// =========================================

document.addEventListener("DOMContentLoaded", () => {

  // --- 1. Small Date + Time in Top-Right Corner (No Box) ---
  // Creates a subtle date/time display that does not block page content
  const dateTimeText = document.createElement("div");
  dateTimeText.style.position = "fixed"; // fixed position so it stays on top
  dateTimeText.style.top = "8px";
  dateTimeText.style.right = "8px"; // top-right corner
  dateTimeText.style.fontFamily = "Arial, sans-serif";
  dateTimeText.style.fontSize = "12px"; // small size to avoid obstruction
  dateTimeText.style.color = "#555"; // subtle text color
  dateTimeText.style.pointerEvents = "none"; // clicks pass through
  document.body.appendChild(dateTimeText);

  // Function to update the date and time every minute
  function updateDateTime() {
    const now = new Date();
    const dateOptions = { weekday: "short", month: "short", day: "numeric", year: "numeric" };
    const dateStr = now.toLocaleDateString(undefined, dateOptions); // format: Mon, Sep 30, 2025
    const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }); // format: HH:MM
    dateTimeText.textContent = `${dateStr} | ${timeStr}`;
  }
  updateDateTime();
  setInterval(updateDateTime, 60000); // update every 60 seconds

  // --- 2. Toggle Education Section ---
  // Allows sections to collapse/expand when the header is clicked
  const toggleButtons = document.querySelectorAll(".section-header");
  toggleButtons.forEach(button => {
    button.addEventListener("click", () => {
      const targetId = button.getAttribute("data-target"); // get associated section id
      const content = document.getElementById(targetId);
      if (content) {
        // Toggle between visible and hidden
        content.style.display = (content.style.display === "block") ? "none" : "block";
      }
    });
  });

  // --- 3. Skills Hover Highlight ---
  // Adds visual feedback on skill icons when hovered
  const skills = document.querySelectorAll(".skill-item img");
  skills.forEach(skill => {
    skill.addEventListener("mouseover", () => {
      skill.style.border = "2px solid #ff69b4"; // pink border on hover
      skill.style.transform = "scale(1.05)"; // slightly enlarge
    });
    skill.addEventListener("mouseout", () => {
      skill.style.border = ""; // remove border when not hovering
      skill.style.transform = "scale(1)"; // reset size
    });
  });

  // --- 4. Show Place Name in Contact Page ---
  // Detects user's location and displays the city/town/village
  const contactSection = document.querySelector(".main-content");
  if (contactSection && navigator.geolocation) {
    const locationBox = document.createElement("p");
    locationBox.textContent = "📍 Detecting your place...";
    contactSection.appendChild(locationBox);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        // Use OpenStreetMap API to reverse geocode coordinates into place name
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
  // Changes greeting text dynamically depending on current hour
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
