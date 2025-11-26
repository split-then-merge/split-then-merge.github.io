window.HELP_IMPROVE_VIDEOJS = false;

$(document).ready(function() {
    var options = {
      slidesToScroll: 1,
      slidesToShow: 1,
      loop: true,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 5000,
    }
    // Initialize Bulma Carousel and Slider
    var carousels = bulmaCarousel.attach('.carousel', options);
    bulmaSlider.attach();
})

/* ==========================================
   1. Overview Section
   ========================================== */
function setOverviewMode(mode) {
  const video = document.getElementById('overview-video');
  const tabInf = document.getElementById('tab-inference');
  const tabTrain = document.getElementById('tab-training');

  if (mode === 'inference') {
    video.src = "assets/method_overview/animation_v2.mp4";
    tabInf.classList.add('is-active');
    tabTrain.classList.remove('is-active');
  } else if (mode === 'training') {
    video.src = "assets/method_overview/overview_v2.mp4";
    tabTrain.classList.add('is-active');
    tabInf.classList.remove('is-active');
  }
  video.load();
  video.play(); 
}

/* ==========================================
   2. Multi-Section Composition Results
   ========================================== */

// Global Data Source: Maps ID to file paths and prompt text
const videoData = {
  1: { fg: "assets/main_videos/ex1/fg_cb.mp4", bg: "assets/main_videos/ex1/bg.mp4", res: "assets/main_videos/ex1/ours.mp4", prompt: "\"A pig is walking in the forest\"" },
  2: { fg: "assets/main_videos/ex2/fg_cb.mp4", bg: "assets/main_videos/ex2/bg.mp4", res: "assets/main_videos/ex2/ours.mp4", prompt: "\"A pig is wandering around in the balcony\"" },
  3: { fg: "assets/main_videos/ex3/fg_cb.mp4", bg: "assets/main_videos/ex3/bg.mp4", res: "assets/main_videos/ex3/ours.mp4", prompt: "\"A car is turning at the crossroads\"" },
  4: { fg: "assets/main_videos/ex4/fg_cb.mp4", bg: "assets/main_videos/ex4/bg.mp4", res: "assets/main_videos/ex4/ours.mp4", prompt: "\"A grey hourse is walking\"" },
  5: { fg: "assets/main_videos/ex5/fg_cb.mp4", bg: "assets/main_videos/ex5/bg.mp4", res: "assets/main_videos/ex5/ours.mp4", prompt: "\"A pig is wandering around on the moon\"" },
  6: { fg: "assets/main_videos/ex6/fg_cb.mp4", bg: "assets/main_videos/ex6/bg.mp4", res: "assets/main_videos/ex6/ours.mp4", prompt: "\"A pig is looking around in New York City\"" },
  7: { fg: "assets/main_videos/ex7/fg_cb.mp4", bg: "assets/main_videos/ex7/bg.mp4", res: "assets/main_videos/ex7/ours.mp4", prompt: "\"A blackswan is floating on river\"" },
  8: { fg: "assets/main_videos/ex8/fg_cb.mp4", bg: "assets/main_videos/ex8/bg.mp4", res: "assets/main_videos/ex8/ours.mp4", prompt: "\"An elephant is walking in the dark\"" },
  9: { fg: "assets/main_videos/ex9/fg_cb.mp4", bg: "assets/main_videos/ex9/bg.mp4", res: "assets/main_videos/ex9/ours.mp4", prompt: "\"A vibrant orange fox is in a room\"" },
  10: { fg: "assets/main_videos/ex10/fg_cb.mp4", bg: "assets/main_videos/ex10/bg.mp4", res: "assets/main_videos/ex10/ours.mp4", prompt: "\"A pig is walking indoors\"" },
  11: { fg: "assets/main_videos/ex11/fg_cb.mp4", bg: "assets/main_videos/ex11/bg.mp4", res: "assets/main_videos/ex11/ours.mp4", prompt: "\"A boat is floating on a road\"" },
  12: { fg: "assets/main_videos/ex12/fg_cb.mp4", bg: "assets/main_videos/ex12/bg.mp4", res: "assets/main_videos/ex12/ours.mp4", prompt: "\"A duck is swimming\"" },
  13: { fg: "assets/main_videos/ex13/fg_cb.mp4", bg: "assets/main_videos/ex13/bg.mp4", res: "assets/main_videos/ex13/ours.mp4", prompt: "\"A boat is floating on a road\"" },
  14: { fg: "assets/main_videos/ex14/fg_cb.mp4", bg: "assets/main_videos/ex14/bg.mp4", res: "assets/main_videos/ex14/ours.mp4", prompt: "\"A goat is walking indoors\"" },
  15: { fg: "assets/main_videos/ex15/fg_cb.mp4", bg: "assets/main_videos/ex15/bg.mp4", res: "assets/main_videos/ex15/ours.mp4", prompt: "\"A bird is flying\"" },
  16: { fg: "assets/main_videos/ex16/fg_cb.mp4", bg: "assets/main_videos/ex16/bg.mp4", res: "assets/main_videos/ex16/ours.mp4", prompt: "\"A car is turning\"" },
  17: { fg: "assets/main_videos/ex17/fg_cb.mp4", bg: "assets/main_videos/ex17/bg.mp4", res: "assets/main_videos/ex17/ours.mp4", prompt: "\"A cat is sitting indoors\"" },
  18: { fg: "assets/main_videos/ex18/fg_cb.mp4", bg: "assets/main_videos/ex18/bg.mp4", res: "assets/main_videos/ex18/ours.mp4", prompt: "\"A man is playing tennis outside\"" },
  19: { fg: "assets/main_videos/ex19/fg_cb.mp4", bg: "assets/main_videos/ex19/bg.mp4", res: "assets/main_videos/ex19/ours.mp4", prompt: "\"A horse is walking in the room\"" },
};

// Grouping Logic: Maps HTML section IDs to the video IDs used in that section
const galleryGroups = {
  'test': [1, 4, 7, 15, 16],
  'indoor': [2, 9, 17, 19],
  'outdoor': [3, 5, 6, 8, 18],
  'multi': [10, 14],
  'impossible': [11, 12, 13]
};

function updateGallery(groupId, videoIndex, btnElement) {
  const data = videoData[videoIndex];
  if (!data) return;

  // DOM Elements
  const fg = document.getElementById(`vid-${groupId}-fg`);
  const bg = document.getElementById(`vid-${groupId}-bg`);
  const res = document.getElementById(`vid-${groupId}-res`);
  const prompt = document.getElementById(`prompt-${groupId}`);

  // Update Sources
  if (fg && bg && res) {
    fg.src = data.fg;
    bg.src = data.bg;
    res.src = data.res;
    if(prompt) prompt.innerText = data.prompt;

    // Enable looping so it plays continuously without switching
    res.loop = true; 

    // Reload and play
    fg.load(); fg.play();
    bg.load(); bg.play();
    res.load(); res.play();
  }

  // Update UI Active State (Thumbnails)
  const container = document.getElementById(`gallery-${groupId}`);
  if (container) {
    const thumbs = container.querySelectorAll('.video-thumb');
    thumbs.forEach(t => t.classList.remove('active'));
    
    if (btnElement) {
      // If clicked manually
      btnElement.classList.add('active');
    } else {
      // Fallback for programmatic access (if needed in future)
      const groupArray = galleryGroups[groupId];
      const arrayPos = groupArray.indexOf(videoIndex);
      if (thumbs[arrayPos]) thumbs[arrayPos].classList.add('active');
    }
  }
}