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
};

const IDLE_ANIMATIONS = [
  { file: "idle-look", duration: 6500 },
  { file: "idle-bubble", duration: 13500 },
  { file: "idle-reading", duration: 14000 },
];

const AUTO_MODE_STATES = [
  { state: "idle", weight: 30, minDuration: 8000, maxDuration: 20000 },
  { state: "thinking", weight: 15, minDuration: 5000, maxDuration: 15000 },
  { state: "working", weight: 15, minDuration: 5000, maxDuration: 20000 },
  { state: "building", weight: 8, minDuration: 5000, maxDuration: 12000 },
  { state: "juggling", weight: 5, minDuration: 5000, maxDuration: 10000 },
  { state: "groove", weight: 5, minDuration: 5000, maxDuration: 10000 },
  { state: "sweeping", weight: 5, minDuration: 5500, maxDuration: 8000 },
  { state: "carrying", weight: 5, minDuration: 3000, maxDuration: 6000 },
  { state: "happy", weight: 8, minDuration: 4000, maxDuration: 6000 },
  { state: "notification", weight: 4, minDuration: 5000, maxDuration: 5000 },
  { state: "roam", weight: 10, minDuration: 4000, maxDuration: 10000 },
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

function getSvgPath(stateKey) {
  const file = STATE_FILES[stateKey];
  if (!file) return null;
  return `${ASSETS_DIR}/${file}`;
}

function loadSVG(stateKey) {
  const svgPath = getSvgPath(stateKey);
  if (!svgPath) return;

  svgLoadCount++;
  const thisLoad = svgLoadCount;
  clawdObj.data = `${svgPath}?_t=${thisLoad}`;
  currentState = stateKey;
  currentFile = STATE_FILES[stateKey];

  clawdObj.onload = () => {
    if (svgLoadCount !== thisLoad) return;
    updateEyeTracking();
  };
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

      if (eyes) eyes.setAttribute("transform", `translate(${eyeX}, ${eyeY * 0.5})`);
      if (body) body.setAttribute("transform", `translate(${bodyX}, ${bodyY * 0.3})`);
      if (shadow) {
        const scaleX = 1 + Math.abs(bodyX) * 0.15;
        const shiftX = bodyX * 0.3;
        shadow.setAttribute("transform", `translate(${shiftX}, 0) scale(${scaleX}, 1)`);
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
  const delay = 10000 + Math.random() * 15000;
  idleAnimTimer = setTimeout(() => {
    if (currentState !== "idle" || isDragging || isInSleepSequence) return;
    const anim = IDLE_ANIMATIONS[Math.floor(Math.random() * IDLE_ANIMATIONS.length)];
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
  if (!isInSleepSequence && currentState !== "sleeping" &&
      currentState !== "dozing" && currentState !== "yawning" &&
      currentState !== "collapsing") return;
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
    window.electronAPI.dragStart({ dx: Math.round(roamDirection * speed), dy: 0 });
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

  if (isInSleepSequence || currentState === "sleeping" ||
      currentState === "dozing" || currentState === "yawning" ||
      currentState === "collapsing") {
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
    if (r <= 0) { chosen = entry; break; }
  }

  const duration = chosen.minDuration + Math.random() * (chosen.maxDuration - chosen.minDuration);

  if (chosen.state === "idle") {
    setState("idle");
  } else if (chosen.state === "roam") {
    setState("roam");
  } else {
    setState(chosen.state, { duration });
  }

  autoModeTimer = setTimeout(() => {
    if (isAutoMode && !reactionTimer && !isInSleepSequence) {
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
  if (isInSleepSequence || currentState === "sleeping" ||
      currentState === "dozing" || currentState === "collapsing") {
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

  if (isInSleepSequence || currentState === "sleeping" ||
      currentState === "dozing" || currentState === "collapsing") {
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
      item.textContent = "Auto Mode (ON)";
    } else if (item.dataset.action === "auto") {
      item.textContent = "Auto Mode (OFF)";
    }
  });
});

document.addEventListener("click", (e) => {
  if (!contextMenu.contains(e.target) && !contextMenu.classList.contains("hidden")) {
    contextMenu.classList.add("hidden");
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    contextMenu.classList.add("hidden");
  }
});

document.querySelectorAll(".menu-item").forEach((item) => {
  item.addEventListener("click", (e) => {
    e.stopPropagation();
    const action = item.dataset.action;
    contextMenu.classList.add("hidden");

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

    switch (action) {
      case "idle":
        setState("idle");
        break;
      case "thinking":
        setState("thinking");
        break;
      case "working":
        setState("working");
        break;
      case "building":
        setState("building");
        break;
      case "juggling":
        setState("juggling");
        break;
      case "sweeping":
        setState("sweeping");
        break;
      case "carrying":
        setState("carrying");
        break;
      case "happy":
        setState("happy");
        playSound("confirm.mp3");
        break;
      case "error":
        setState("error");
        break;
      case "notification":
        setState("notification");
        playSound("complete.mp3");
        break;
      case "sleep":
        startSleepSequence();
        break;
      case "roam":
        setState("roam");
        break;
    }
  });
});

// --- Initialize ---
loadSVG("idle");
startAutoMode();
