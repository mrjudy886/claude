const ASSETS_DIR = "../assets/svg";
const SOUNDS_DIR = "../assets/sounds";

const STATE_FILES = {
  idle: "clawd-idle-follow.svg",
  thinking: "clawd-working-thinking.svg",
  working: "clawd-working-typing.svg",
  building: "clawd-working-building.svg",
  juggling: "clawd-working-juggling.svg",
  groove: "clawd-headphones-groove.svg",
  sweeping: "clawd-working-sweeping.svg",
  carrying: "clawd-working-carrying.svg",
  happy: "clawd-happy.svg",
  error: "clawd-error.svg",
  notification: "clawd-notification.svg",
  sleeping: "clawd-sleeping.svg",
  yawning: "clawd-idle-yawn.svg",
  dozing: "clawd-idle-doze.svg",
  collapsing: "clawd-collapse-sleep.svg",
  waking: "clawd-wake.svg",
  dizzy: "clawd-dizzy.svg",
  roam: "clawd-mini-crabwalk.svg",
  "react-drag": "clawd-react-drag.svg",
  "react-left": "clawd-react-left.svg",
  "react-right": "clawd-react-right.svg",
  "react-annoyed": "clawd-react-annoyed.svg",
  "react-double": "clawd-react-double.svg",
  "react-double-jump": "clawd-react-double-jump.svg",
  "idle-look": "clawd-idle-look.svg",
  "idle-bubble": "clawd-idle-bubble.svg",
  "idle-reading": "clawd-idle-reading.svg",

  "idle-stretch": "clawd-idle-stretch.svg",
  "idle-phone": "clawd-idle-phone.svg",
  "idle-whistle": "clawd-idle-whistle.svg",
  "idle-daydream": "clawd-idle-daydream.svg",
  "idle-bored": "clawd-idle-bored.svg",
  "idle-snack": "clawd-idle-snack.svg",
  "idle-wave": "clawd-idle-wave.svg",
  "idle-sit": "clawd-idle-sit.svg",
  "idle-nap-head": "clawd-idle-nap-head.svg",
  "idle-curious": "clawd-idle-curious.svg",

  "work-coding": "clawd-work-coding.svg",
  "work-debug": "clawd-work-debug.svg",
  "work-eureka": "clawd-work-eureka.svg",
  "work-meeting": "clawd-work-meeting.svg",
  "work-study": "clawd-work-study.svg",
  "work-paint": "clawd-work-paint.svg",
  "work-write": "clawd-work-write.svg",
  "work-hammer": "clawd-work-hammer.svg",
  "work-science": "clawd-work-science.svg",
  "work-photo": "clawd-work-photo.svg",

  "play-dance": "clawd-play-dance.svg",
  "play-jump": "clawd-play-jump.svg",
  "play-ball": "clawd-play-ball.svg",
  "play-game": "clawd-play-game.svg",
  "play-music": "clawd-play-music.svg",
  "play-sing": "clawd-play-sing.svg",
  "play-skateboard": "clawd-play-skateboard.svg",
  "play-kite": "clawd-play-kite.svg",
  "play-balloon": "clawd-play-balloon.svg",
  "play-hula": "clawd-play-hula.svg",

  "life-eat": "clawd-life-eat.svg",
  "life-drink": "clawd-life-drink.svg",
  "life-cook": "clawd-life-cook.svg",
  "life-clean": "clawd-life-clean.svg",
  "life-exercise": "clawd-life-exercise.svg",
  "life-run": "clawd-life-run.svg",
  "life-shower": "clawd-life-shower.svg",
  "life-dress": "clawd-life-dress.svg",
  "life-garden": "clawd-life-garden.svg",
  "life-fish": "clawd-life-fish.svg",

  "emotion-love": "clawd-emotion-love.svg",
  "emotion-angry": "clawd-emotion-angry.svg",
  "emotion-confused": "clawd-emotion-confused.svg",
  "emotion-excited": "clawd-emotion-excited.svg",
  "emotion-scared": "clawd-emotion-scared.svg",
  "emotion-proud": "clawd-emotion-proud.svg",
  "emotion-shy": "clawd-emotion-shy.svg",
  "emotion-cry": "clawd-emotion-cry.svg",
  "emotion-laugh": "clawd-emotion-laugh.svg",
  "emotion-surprise": "clawd-emotion-surprise.svg",

  "social-hello": "clawd-social-hello.svg",
  "social-bye": "clawd-social-bye.svg",
  "social-highfive": "clawd-social-highfive.svg",
  "social-hug": "clawd-social-hug.svg",
  "social-peek": "clawd-social-peek.svg",
  "social-hide": "clawd-social-hide.svg",
  "social-point": "clawd-social-point.svg",
  "social-clap": "clawd-social-clap.svg",
  "social-thumbsup": "clawd-social-thumbsup.svg",
  "social-bow": "clawd-social-bow.svg",

  "game-shop": "clawd-game-shop.svg",
  "game-harvest": "clawd-game-harvest.svg",
  "game-plant": "clawd-game-plant.svg",
  "game-water": "clawd-game-water.svg",
  "game-coins": "clawd-game-coins.svg",
  "game-craft": "clawd-game-craft.svg",
  "game-treasure": "clawd-game-treasure.svg",
  "game-levelup": "clawd-game-levelup.svg",
  "game-feed": "clawd-game-feed.svg",
  "game-sleep-dream": "clawd-game-sleep-dream.svg",
};

const IDLE_ANIMATIONS = [
  { file: "idle-look", duration: 6500 },
  { file: "idle-bubble", duration: 13500 },
  { file: "idle-reading", duration: 14000 },
  { file: "idle-stretch", duration: 5000 },
  { file: "idle-phone", duration: 8000 },
  { file: "idle-whistle", duration: 7000 },
  { file: "idle-daydream", duration: 10000 },
  { file: "idle-bored", duration: 6000 },
  { file: "idle-snack", duration: 5000 },
  { file: "idle-wave", duration: 4000 },
  { file: "idle-sit", duration: 12000 },
  { file: "idle-nap-head", duration: 6000 },
  { file: "idle-curious", duration: 5000 },
];

const AUTO_MODE_STATES = [
  { state: "idle", weight: 20, minDuration: 8000, maxDuration: 20000 },
  { state: "thinking", weight: 8, minDuration: 5000, maxDuration: 15000 },
  { state: "working", weight: 8, minDuration: 5000, maxDuration: 20000 },
  { state: "building", weight: 5, minDuration: 5000, maxDuration: 12000 },
  { state: "juggling", weight: 3, minDuration: 5000, maxDuration: 10000 },
  { state: "groove", weight: 4, minDuration: 5000, maxDuration: 10000 },
  { state: "sweeping", weight: 3, minDuration: 5500, maxDuration: 8000 },
  { state: "carrying", weight: 3, minDuration: 3000, maxDuration: 6000 },
  { state: "happy", weight: 5, minDuration: 4000, maxDuration: 6000 },
  { state: "notification", weight: 2, minDuration: 5000, maxDuration: 5000 },
  { state: "roam", weight: 8, minDuration: 4000, maxDuration: 10000 },

  { state: "work-coding", weight: 4, minDuration: 8000, maxDuration: 15000 },
  { state: "work-debug", weight: 3, minDuration: 6000, maxDuration: 10000 },
  { state: "work-study", weight: 3, minDuration: 8000, maxDuration: 14000 },
  { state: "work-paint", weight: 2, minDuration: 8000, maxDuration: 12000 },
  { state: "work-write", weight: 3, minDuration: 6000, maxDuration: 12000 },
  { state: "work-science", weight: 2, minDuration: 6000, maxDuration: 10000 },

  { state: "play-dance", weight: 3, minDuration: 5000, maxDuration: 10000 },
  { state: "play-game", weight: 3, minDuration: 8000, maxDuration: 15000 },
  { state: "play-music", weight: 2, minDuration: 6000, maxDuration: 12000 },
  { state: "play-sing", weight: 2, minDuration: 5000, maxDuration: 8000 },
  { state: "play-ball", weight: 2, minDuration: 4000, maxDuration: 8000 },
  { state: "play-skateboard", weight: 2, minDuration: 5000, maxDuration: 9000 },

  { state: "life-drink", weight: 3, minDuration: 4000, maxDuration: 7000 },
  { state: "life-exercise", weight: 2, minDuration: 5000, maxDuration: 10000 },
  { state: "life-fish", weight: 2, minDuration: 8000, maxDuration: 15000 },
  { state: "life-cook", weight: 2, minDuration: 6000, maxDuration: 10000 },

  { state: "emotion-love", weight: 2, minDuration: 4000, maxDuration: 6000 },
  { state: "emotion-laugh", weight: 2, minDuration: 3000, maxDuration: 5000 },
  { state: "emotion-proud", weight: 1, minDuration: 4000, maxDuration: 6000 },

  { state: "social-peek", weight: 2, minDuration: 4000, maxDuration: 7000 },
  { state: "social-clap", weight: 1, minDuration: 3000, maxDuration: 5000 },
];

const KEYBOARD_STATES = [
  "work-coding",
  "working",
  "work-write",
  "work-study",
];

const TIMINGS = {
  yawnDuration: 3000,
  wakeDuration: 1500,
  mouseIdleTimeout: 20000,
  mouseSleepTimeout: 60000,
  collapseDuration: 3000,
  reactionDuration: 2500,
  dozingDuration: 20000,
};

const clawdObj = document.getElementById("clawd");
const petContainer = document.getElementById("pet-container");
const contextMenu = document.getElementById("context-menu");

let currentState = "idle";
let currentFile = "";
let isDragging = false;
let dragStartX = 0;
let dragStartY = 0;
let lastMouseMove = Date.now();
let isAutoMode = true;
let autoModeTimer = null;
let idleAnimTimer = null;
let sleepTimer = null;
let reactionTimer = null;
let isInSleepSequence = false;
let clickCount = 0;
let lastClickTime = 0;
let roamDirection = 1;
let roamTimer = null;
let eyeTrackingActive = false;
let eyeTrackingRAF = null;
let svgLoadCount = 0;
let isKeyboardActive = false;
let keyboardTimer = null;

function getSvgPath(stateKey) {
  const file = STATE_FILES[stateKey];
  if (!file) return null;
  return `${ASSETS_DIR}/${file}`;
}

function loadSVG(stateKey) {
  const svgPath = getSvgPath(stateKey);
  if (!svgPath) {
    if (stateKey !== "idle") loadSVG("idle");
    return;
  }

  svgLoadCount++;
  const thisLoad = svgLoadCount;
  currentState = stateKey;
  currentFile = STATE_FILES[stateKey];

  clawdObj.onload = () => {
    if (svgLoadCount !== thisLoad) return;
    updateEyeTracking();
  };

  clawdObj.onerror = () => {
    if (svgLoadCount !== thisLoad) return;
    if (stateKey !== "idle") loadSVG("idle");
  };

  clawdObj.data = `${svgPath}?_t=${Date.now()}`;
}

function updateEyeTracking() {
  const shouldTrack = currentState === "idle" || currentState === "dozing";
  if (shouldTrack && !eyeTrackingActive) {
    eyeTrackingActive = true;
    trackEyes();
  } else if (!shouldTrack && eyeTrackingActive) {
    eyeTrackingActive = false;
    if (eyeTrackingRAF) {
      cancelAnimationFrame(eyeTrackingRAF);
      eyeTrackingRAF = null;
    }
  }
}

function trackEyes() {
  if (!eyeTrackingActive) return;

  try {
    const cursor = window.electronAPI.getCursorPos();
    const maxOffset = 3;
    const dist = Math.sqrt(cursor.x * cursor.x + cursor.y * cursor.y);
    const norm = Math.min(dist / 300, 1);
    const eyeX = (cursor.x / (dist || 1)) * norm * maxOffset;
    const eyeY = (cursor.y / (dist || 1)) * norm * maxOffset;
    const bodyScale = 0.33;
    const bodyX = eyeX * bodyScale;
    const bodyY = eyeY * bodyScale;

    const svgDoc = clawdObj.contentDocument;
    if (svgDoc) {
      const eyes = svgDoc.getElementById("eyes-js");
      const body = svgDoc.getElementById("body-js");
      const shadow = svgDoc.getElementById("shadow-js");

      if (eyes)
        eyes.setAttribute("transform", `translate(${eyeX}, ${eyeY * 0.5})`);
      if (body)
        body.setAttribute("transform", `translate(${bodyX}, ${bodyY * 0.3})`);
      if (shadow) {
        const scaleX = 1 + Math.abs(bodyX) * 0.15;
        const shiftX = bodyX * 0.3;
        shadow.setAttribute(
          "transform",
          `translate(${shiftX}, 0) scale(${scaleX}, 1)`
        );
      }
    }
  } catch (e) {}

  eyeTrackingRAF = requestAnimationFrame(trackEyes);
}

function setState(stateKey, opts = {}) {
  if (reactionTimer && !opts.force) return;
  clearIdleAnimTimer();

  if (stateKey !== "roam") stopRoam();

  if (stateKey === "roam") {
    startRoam();
    return;
  }

  if (stateKey === "idle") {
    isInSleepSequence = false;
  }

  loadSVG(stateKey);

  if (stateKey === "idle") {
    scheduleIdleAnim();
    scheduleSleep();
  }

  if (opts.duration) {
    const dur = opts.duration;
    const stateAtSet = stateKey;
    setTimeout(() => {
      if (currentState === stateAtSet && !reactionTimer) {
        setState("idle");
      }
    }, dur);
  }
}

function scheduleIdleAnim() {
  clearIdleAnimTimer();
  const delay = 8000 + Math.random() * 12000;
  idleAnimTimer = setTimeout(() => {
    if (currentState !== "idle" || isDragging || isInSleepSequence) return;
    const anim =
      IDLE_ANIMATIONS[Math.floor(Math.random() * IDLE_ANIMATIONS.length)];
    loadSVG(anim.file);
    currentState = "idle";
    setTimeout(() => {
      if (currentState === "idle" && !isInSleepSequence) {
        loadSVG("idle");
        scheduleIdleAnim();
      }
    }, anim.duration);
  }, delay);
}

function clearIdleAnimTimer() {
  if (idleAnimTimer) {
    clearTimeout(idleAnimTimer);
    idleAnimTimer = null;
  }
}

function scheduleSleep() {
  clearSleepTimer();
  sleepTimer = setTimeout(() => {
    if (currentState === "idle" && !isDragging && !reactionTimer) {
      startSleepSequence();
    }
  }, TIMINGS.mouseSleepTimeout);
}

function clearSleepTimer() {
  if (sleepTimer) {
    clearTimeout(sleepTimer);
    sleepTimer = null;
  }
}

function startSleepSequence() {
  isInSleepSequence = true;
  clearIdleAnimTimer();
  stopAutoMode();
  stopRoam();

  loadSVG("yawning");
  setTimeout(() => {
    if (!isInSleepSequence) return;
    loadSVG("dozing");
    setTimeout(() => {
      if (!isInSleepSequence) return;
      loadSVG("collapsing");
      setTimeout(() => {
        if (!isInSleepSequence) return;
        loadSVG("sleeping");
      }, TIMINGS.collapseDuration);
    }, TIMINGS.dozingDuration);
  }, TIMINGS.yawnDuration);
}

function wakeUp() {
  if (
    !isInSleepSequence &&
    currentState !== "sleeping" &&
    currentState !== "dozing" &&
    currentState !== "yawning" &&
    currentState !== "collapsing"
  )
    return;
  isInSleepSequence = false;
  loadSVG("waking");
  setTimeout(() => {
    setState("idle");
    if (isAutoMode) startAutoMode();
  }, TIMINGS.wakeDuration);
}

function startRoam() {
  stopRoam();
  clearIdleAnimTimer();
  clearSleepTimer();
  roamDirection = Math.random() > 0.5 ? 1 : -1;
  loadSVG("roam");
  currentState = "roam";
  petContainer.classList.add("roam-walk");
  if (roamDirection < 0) {
    petContainer.classList.add("mini-left");
  } else {
    petContainer.classList.remove("mini-left");
  }

  const speed = 1.5;
  roamTimer = setInterval(() => {
    window.electronAPI.dragStart({
      dx: Math.round(roamDirection * speed),
      dy: 0,
    });
  }, 16);

  const duration = 4000 + Math.random() * 8000;
  setTimeout(() => {
    if (currentState === "roam") {
      stopRoam();
      setState("idle");
    }
  }, duration);
}

function stopRoam() {
  if (roamTimer) {
    clearInterval(roamTimer);
    roamTimer = null;
  }
  petContainer.classList.remove("roam-walk", "mini-left");
}

function playReaction(type) {
  if (reactionTimer) {
    clearTimeout(reactionTimer);
    reactionTimer = null;
  }

  if (
    isInSleepSequence ||
    currentState === "sleeping" ||
    currentState === "dozing" ||
    currentState === "yawning" ||
    currentState === "collapsing"
  ) {
    wakeUp();
    return;
  }

  stopRoam();
  clearIdleAnimTimer();
  loadSVG(type);

  reactionTimer = setTimeout(() => {
    reactionTimer = null;
    setState("idle");
    if (isAutoMode) {
      stopAutoMode();
      startAutoMode();
    }
  }, TIMINGS.reactionDuration);
}

function playSound(name) {
  try {
    const audio = new Audio(`${SOUNDS_DIR}/${name}`);
    audio.volume = 0.3;
    audio.play().catch(() => {});
  } catch (e) {}
}

// --- Keyboard Activity Detection (via main process powerMonitor) ---
if (window.electronAPI.onUserTyping) {
  window.electronAPI.onUserTyping(() => {
    lastMouseMove = Date.now();

    if (isInSleepSequence || currentState === "sleeping") {
      wakeUp();
      return;
    }

    if (!isKeyboardActive && isAutoMode && !isDragging && !reactionTimer) {
      isKeyboardActive = true;
      const kbState =
        KEYBOARD_STATES[Math.floor(Math.random() * KEYBOARD_STATES.length)];
      stopAutoMode();
      clearIdleAnimTimer();
      clearSleepTimer();
      loadSVG(kbState);
      currentState = kbState;
    }

    if (keyboardTimer) clearTimeout(keyboardTimer);
    keyboardTimer = setTimeout(() => {
      isKeyboardActive = false;
      keyboardTimer = null;
      if (isAutoMode) {
        setState("idle");
        startAutoMode();
      }
    }, 5000);
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    contextMenu.classList.add("hidden");
  }
});

// --- Game Panel Animation Commands ---
if (window.electronAPI.onAnimationCommand) {
  window.electronAPI.onAnimationCommand((state) => {
    if (STATE_FILES[state]) {
      const wasAuto = isAutoMode;
      stopAutoMode();
      isAutoMode = false;
      if (reactionTimer) {
        clearTimeout(reactionTimer);
        reactionTimer = null;
      }
      isInSleepSequence = false;
      setState(state, { force: true, duration: 5000 });
      setTimeout(() => {
        isAutoMode = wasAuto;
        if (wasAuto) startAutoMode();
      }, 5000);
    }
  });
}

// --- Auto Mode ---
function startAutoMode() {
  stopAutoMode();
  isAutoMode = true;
  scheduleNextAutoState();
}

function stopAutoMode() {
  if (autoModeTimer) {
    clearTimeout(autoModeTimer);
    autoModeTimer = null;
  }
}

function scheduleNextAutoState() {
  if (!isAutoMode) return;

  const totalWeight = AUTO_MODE_STATES.reduce((s, e) => s + e.weight, 0);
  let r = Math.random() * totalWeight;
  let chosen = AUTO_MODE_STATES[0];
  for (const entry of AUTO_MODE_STATES) {
    r -= entry.weight;
    if (r <= 0) {
      chosen = entry;
      break;
    }
  }

  const duration =
    chosen.minDuration +
    Math.random() * (chosen.maxDuration - chosen.minDuration);

  if (chosen.state === "idle") {
    setState("idle");
  } else if (chosen.state === "roam") {
    setState("roam");
  } else {
    setState(chosen.state, { duration });
  }

  autoModeTimer = setTimeout(() => {
    if (isAutoMode && !reactionTimer && !isInSleepSequence && !isKeyboardActive) {
      scheduleNextAutoState();
    }
  }, duration);
}

// --- Drag Handling ---
petContainer.addEventListener("mousedown", (e) => {
  if (e.button === 2) return;
  isDragging = true;
  dragStartX = e.screenX;
  dragStartY = e.screenY;
  petContainer.classList.add("dragging");

  lastMouseMove = Date.now();
  if (
    isInSleepSequence ||
    currentState === "sleeping" ||
    currentState === "dozing" ||
    currentState === "collapsing"
  ) {
    wakeUp();
    return;
  }
  clearSleepTimer();
  playReaction("react-drag");
});

document.addEventListener("mousemove", (e) => {
  lastMouseMove = Date.now();

  if (isDragging) {
    const dx = e.screenX - dragStartX;
    const dy = e.screenY - dragStartY;
    dragStartX = e.screenX;
    dragStartY = e.screenY;
    window.electronAPI.dragStart({ dx, dy });
  }
});

document.addEventListener("mouseup", () => {
  if (isDragging) {
    isDragging = false;
    petContainer.classList.remove("dragging");
    if (reactionTimer) {
      clearTimeout(reactionTimer);
      reactionTimer = null;
    }
    setState("idle");
    scheduleSleep();
  }
});

// --- Click Reactions ---
petContainer.addEventListener("click", (e) => {
  if (e.button !== 0) return;

  if (isDragging) return;

  const now = Date.now();

  if (
    isInSleepSequence ||
    currentState === "sleeping" ||
    currentState === "dozing" ||
    currentState === "collapsing"
  ) {
    wakeUp();
    return;
  }

  if (now - lastClickTime < 400) {
    clickCount++;
  } else {
    clickCount = 1;
  }
  lastClickTime = now;

  if (clickCount >= 4) {
    playReaction("react-double");
    playSound("confirm.mp3");
    clickCount = 0;
  } else if (clickCount >= 2) {
    playReaction("happy");
    playSound("confirm.mp3");
  } else {
    const rect = petContainer.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const mid = rect.width / 2;
    playReaction(clickX < mid ? "react-left" : "react-right");
  }
});

// --- Context Menu ---
petContainer.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  const menu = contextMenu;
  menu.classList.remove("hidden");

  let x = e.clientX;
  let y = e.clientY;

  const menuW = 160;
  const menuH = menu.offsetHeight || 300;
  if (x + menuW > window.innerWidth) x = window.innerWidth - menuW;
  if (y + menuH > window.innerHeight) y = Math.max(0, y - menuH);

  menu.style.left = `${x}px`;
  menu.style.top = `${y}px`;

  document.querySelectorAll(".menu-item").forEach((item) => {
    item.classList.remove("active");
    if (item.dataset.action === "auto" && isAutoMode) {
      item.classList.add("active");
      item.textContent = "自动模式 (开)";
    } else if (item.dataset.action === "auto") {
      item.textContent = "自动模式 (关)";
    }
  });
});

document.addEventListener("click", (e) => {
  if (
    !contextMenu.contains(e.target) &&
    !contextMenu.classList.contains("hidden")
  ) {
    contextMenu.classList.add("hidden");
  }
});

document.querySelectorAll(".menu-item").forEach((item) => {
  item.addEventListener("click", (e) => {
    e.stopPropagation();
    const action = item.dataset.action;
    contextMenu.classList.add("hidden");

    if (action === "game-panel") {
      window.electronAPI.openGamePanel();
      return;
    }

    if (action === "auto") {
      isAutoMode = !isAutoMode;
      if (isAutoMode) {
        startAutoMode();
      } else {
        stopAutoMode();
        setState("idle");
      }
      return;
    }

    stopAutoMode();
    isAutoMode = false;
    isInSleepSequence = false;
    if (reactionTimer) {
      clearTimeout(reactionTimer);
      reactionTimer = null;
    }

    if (action === "sleep") {
      startSleepSequence();
    } else if (action === "roam") {
      setState("roam");
    } else if (STATE_FILES[action]) {
      setState(action);
      if (action === "happy") playSound("confirm.mp3");
      if (action === "notification") playSound("complete.mp3");
    }
  });
});

// --- Initialize ---
loadSVG("idle");
startAutoMode();
