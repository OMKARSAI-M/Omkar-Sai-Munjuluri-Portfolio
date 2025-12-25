document.addEventListener("DOMContentLoaded", () => {
    const hero           = document.getElementById("hero");
    const navbar         = document.getElementById("navbar");
    const toggle         = document.getElementById("themeToggle");
    const toggleCircle   = document.querySelector(".toggle-circle");
    const aboutSection   = document.getElementById("about");
    const educationDiv   = document.getElementById("education");
    const experienceWrap = document.getElementById("experience");
      
        const menuToggle = document.getElementById("menuToggle");
        const mainNav    = document.getElementById("mainNav");
      
        if (menuToggle && mainNav) {
          menuToggle.addEventListener("click", () => {
            const isOpen = mainNav.classList.toggle("open");
            menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
          });
      
          // Close the menu after clicking a link (on mobile)
          mainNav.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
              mainNav.classList.remove("open");
              menuToggle.setAttribute("aria-expanded", "false");
            });
          });
        }

      
  
    /* ---------- THEME TOGGLE (unchanged logic, just example) ---------- */
    toggle.addEventListener("click", () => {
      const isDark = hero.classList.toggle("dark");
      const contactDiv = document.getElementById("contact");
  
      hero.classList.toggle("light", !isDark);
      navbar.classList.toggle("dark", isDark);
      toggle.classList.toggle("dark", isDark);
      contactDiv.classList.toggle("dark", isDark);

      if (aboutSection)   aboutSection.classList.toggle("dark", isDark);
      if (educationDiv)   educationDiv.classList.toggle("dark", isDark);
      if (experienceWrap) experienceWrap.classList.toggle("dark", isDark);
      if (contactDiv) contactDiv.classList.toggle("dark", isDark);
      toggleCircle.textContent = isDark ? "🌞" : "🦉";
    });
  
    /* ---------- REVEAL EACH TIMELINE ITEM ON SCROLL ---------- */
    const timelineItems = document.querySelectorAll(".timeline-item");
  
    if (timelineItems.length > 0) {
      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");   // fade in this item
              obs.unobserve(entry.target);             // reveal only once
            }
          });
        },
        {
          threshold: 0.25,              // 25% of item visible
          rootMargin: "0px 0px -10% 0px"
        }
      );
  
      timelineItems.forEach(item => observer.observe(item));
    }

    const contactForm = document.getElementById("contactForm");
    const formStatus = document.getElementById("formStatus");
  
    if (contactForm && formStatus) {
      contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        formStatus.textContent = "Sending...";
        formStatus.style.color = "#555";
  
        try {
          const response = await fetch(contactForm.action, {
            method: "POST",
            body: new FormData(contactForm),
            headers: { "Accept": "application/json" }
          });
  
          if (response.ok) {
            formStatus.textContent = "Message sent successfully!";
            formStatus.style.color = "#0a7c3b";
            contactForm.reset();
          } else {
            formStatus.textContent = "Something went wrong. Try again.";
            formStatus.style.color = "#b00020";
          }
        } catch (err) {
          formStatus.textContent = "Network error. Try again.";
          formStatus.style.color = "#b00020";
        }
      });
    }
  });