document.addEventListener("DOMContentLoaded", function () {
  const scrollViewSection = document.querySelector("#scrollView");
  const scrollViewVideo = document.querySelector("#scrollViewVideo");
  const prophecyText = document.querySelector("#prophecyText");

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5, // Trigger when 50% of the element is visible
  };

  const observer = new IntersectionObserver(function (entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        scrollViewVideo.play(); // Play the video when it comes into view
        prophecyText.style.display = "none"; // Hide the prophecy text initially
      } else {
        scrollViewVideo.pause(); // Pause the video when it goes out of view
        scrollViewVideo.currentTime = 0; // Reset video to the beginning
        prophecyText.style.display = "none"; // Hide the prophecy text
      }
    });
  }, options);

  observer.observe(scrollViewSection);

  // Event listener for scroll event to check if scrollView section is in view
  window.addEventListener("scroll", function () {
    const scrollViewRect = scrollViewSection.getBoundingClientRect();
    if (
      scrollViewRect.top >= 0 &&
      scrollViewRect.bottom <= window.innerHeight
    ) {
      // ScrollView section is in view
      if (scrollViewVideo.paused) {
        scrollViewVideo.play(); // Start playing video from the beginning
      }
    } else {
      if (!scrollViewVideo.paused) {
        scrollViewVideo.pause(); // Pause the video if it's playing and not in view
        scrollViewVideo.currentTime = 0; // Reset video to the beginning
      }
    }
  });

  // Function to update the prophecy text based on current time
  function updateProphecyText() {
    const currentTime = new Date().getHours();

    if (currentTime >= 10 && currentTime < 14) {
      prophecyText.textContent =
        "In snowy peaks\nWhere legends play\nGlide down the slopes\nIn a warrior's display";
    } else if (currentTime >= 14 && currentTime < 18) {
      prophecyText.textContent =
        "Embark to Thermea's embrace\nLet tranquility be your goal\nUnlock the secret of Kung Fu\nAllow peace to fill your soul.";
    } else if (currentTime >= 18 && currentTime < 24) {
      prophecyText.textContent =
        "Return to the Valley of Peace\nWhere your journey first began\nTo watch our cherished memories\nHand in hand.";
    } else {
      prophecyText.textContent =
        "Embark to Thermea's embrace\nLet tranquility be your goal\nUnlock the secret of Kung Fu\nAllow peace to fill your soul.";
      // "Be patient, young grasshopper.\nYour time is coming soon.";
    }
  }

  // Event listener for video end event
  scrollViewVideo.addEventListener("ended", function () {
    prophecyText.style.display = "block"; // Show the prophecy text after video finishes playing
    updateProphecyText(); // Update the prophecy text based on current time
  });
});