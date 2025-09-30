// Lab 03 JavaScript for Portfolio Website
// Author: Tashi Lhamo
// Unique Version: Date & Time + Place Name

document.addEventListener("DOMContentLoaded", () => {

  // --- 1. Small Date + Time (Top of Page) ---
  const dateTimeText = document.createElement("div");
  dateTimeText.style.fontFamily = "Arial, sans-serif";
  dateTimeText.style.fontSize = "10px";  // smaller size
  dateTimeText.style.color = "#555";
  dateTimeText.style.textAlign = "right";   // right on desktop
  dateTimeText.style.margin = "2px 8px";    // small margin
  dateTimeText.style.pointerEvents = "none"; // clicks pass through

  // Insert at top of body so it's always visible
  document.body.insertAdjacentElement("afterbegin", dateTimeText);

  function updateDateTime() {
    const now = new Date();
    const dateOptions = { weekday: "short", month: "short", day: "numeric", year: "numeric" };
    const dateStr = now.toLocaleDateString(undefined, dateOptions);
    const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    dateTimeText.textContent = `${dateStr} | ${timeStr}`;
  }

  updateDateTime();
  setInterval(updateDateTime, 60000);

  // Responsive: center on mobile
  function adjustDateTime() {
    if (window.innerWidth <= 768) {
      dateTimeText.style.textAlign = "center";
      dateTimeText.style.fontSize = "11px"; // slightly bigger for readability
    } else {
      dateTimeText.style.textAlign = "right";
      dateTimeText.style.fontSize = "10px"; // small on desktop
    }
  }
  adjustDateTime();
  window.addEventListener("resize", adjustDateTime);

  // --- 2. Toggle Education Section ---
  const toggleButtons = document.querySelectorAll(".section-header");
  toggleButtons.forEach(button => {
    button.addEventListener("click", () => {
      const targetId = button.getAttribute("data-target");
      const content = document.getElementById(targetId);
      if (content) {
        content.style.display = (content.style.display === "block") ? "none" : "block";
      }
    });
  });

  // --- 3. Skills Hover Highlight ---
  const skills = document.querySelectorAll(".skill-item img");
  skills.forEach(skill => {
    skill.addEventListener("mouseover", () => {
      skill.style.border = "2px solid #ff69b4";
      skill.style.transform = "scale(1.05)";
    });
    skill.addEventListener("mouseout", () => {
      skill.style.border = "";
      skill.style.transform = "scale(1)";
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
