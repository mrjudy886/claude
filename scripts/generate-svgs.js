const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '..', 'assets', 'svg');
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// Common constants
const VB = '-15 -25 45 45';
const W = 500;
const H = 500;
const BODY = '#DE886D';
const EYE = '#000000';

// Helper: wrap full SVG
function svg(innerContent) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${VB}" width="${W}" height="${H}">\n${innerContent}\n</svg>`;
}

// Helper: standard shadow
const shadow = `<g id="shadow-js"><rect x="3" y="15" width="9" height="1" fill="#000000" opacity="0.5"/></g>`;

// Helper: standard legs
const legs = `<g id="legs" fill="${BODY}">
    <rect x="3" y="11" width="1" height="4"/><rect x="5" y="11" width="1" height="4"/>
    <rect x="9" y="11" width="1" height="4"/><rect x="11" y="11" width="1" height="4"/>
  </g>`;

// Helper: standard body group (torso + arms + eyes) with breathe+blink
function bodyGroup(extraBodyContent = '', extraEyeContent = '') {
  return `<g id="body-js"><g class="breathe-anim">
    <rect id="torso" x="2" y="6" width="11" height="7" fill="${BODY}"/>
    <rect x="0" y="9" width="2" height="2" fill="${BODY}"/>
    <rect x="13" y="9" width="2" height="2" fill="${BODY}"/>
    ${extraBodyContent}
    <g id="eyes-js" fill="${EYE}"><g class="eyes-blink">
      <rect x="4" y="8" width="1" height="2"/><rect x="10" y="8" width="1" height="2"/>
      ${extraEyeContent}
    </g></g>
  </g></g>`;
}

// Helper: base style (breathe + blink)
function baseStyle(extra = '') {
  return `<defs><style>
    .breathe-anim { transform-origin: 7.5px 13px; animation: breathe 3.2s infinite ease-in-out; }
    .eyes-blink { transform-origin: 7.5px 9px; animation: eye-blink 4s infinite ease-in-out; }
    @keyframes breathe { 0%, 100% { transform: scale(1, 1) translate(0, 0); } 50% { transform: scale(1.02, 0.98) translate(0, 0.5px); } }
    @keyframes eye-blink { 0%, 10%, 100% { transform: scaleY(1); } 5% { transform: scaleY(0.1); } }
    ${extra}
  </style></defs>`;
}

// Helper: build a complete SVG with standard parts + custom style + custom elements
function buildSvg(extraStyle, extraElements = '', customLegs = null, customBody = null) {
  return svg([
    baseStyle(extraStyle),
    shadow,
    customLegs || legs,
    customBody || bodyGroup(),
    extraElements
  ].join('\n  '));
}

// All 70 animations
const animations = {};

// ============================================================
// IDLE/AMBIENT (10)
// ============================================================

// 1. clawd-idle-stretch
animations['clawd-idle-stretch'] = svg([
  `<defs><style>
    .breathe-anim { transform-origin: 7.5px 13px; animation: breathe 3.2s infinite ease-in-out; }
    .eyes-blink { transform-origin: 7.5px 9px; animation: eye-blink 4s infinite ease-in-out; }
    @keyframes breathe { 0%, 100% { transform: scale(1, 1) translate(0, 0); } 50% { transform: scale(1.02, 0.98) translate(0, 0.5px); } }
    @keyframes eye-blink { 0%, 10%, 100% { transform: scaleY(1); } 5% { transform: scaleY(0.1); } }
    .stretch-body { transform-origin: 7.5px 15px; animation: stretch 4s infinite ease-in-out; }
    .left-arm-stretch { transform-origin: 1px 10px; animation: arm-up-l 4s infinite ease-in-out; }
    .right-arm-stretch { transform-origin: 14px 10px; animation: arm-up-r 4s infinite ease-in-out; }
    @keyframes stretch { 0%, 100% { transform: scaleY(1); } 30%, 60% { transform: scaleY(1.08) translateY(-1px); } }
    @keyframes arm-up-l { 0%, 100% { transform: rotate(0deg) translate(0,0); } 30%, 60% { transform: rotate(-60deg) translate(-1px,-3px); } }
    @keyframes arm-up-r { 0%, 100% { transform: rotate(0deg) translate(0,0); } 30%, 60% { transform: rotate(60deg) translate(1px,-3px); } }
  </style></defs>`,
  shadow, legs,
  `<g id="body-js"><g class="breathe-anim stretch-body">
    <rect id="torso" x="2" y="6" width="11" height="7" fill="${BODY}"/>
    <g class="left-arm-stretch"><rect x="0" y="9" width="2" height="2" fill="${BODY}"/></g>
    <g class="right-arm-stretch"><rect x="13" y="9" width="2" height="2" fill="${BODY}"/></g>
    <g id="eyes-js" fill="${EYE}"><g class="eyes-blink">
      <rect x="4" y="8" width="1" height="2"/><rect x="10" y="8" width="1" height="2"/>
    </g></g>
  </g></g>`
].join('\n  '));

// 2. clawd-idle-phone
animations['clawd-idle-phone'] = svg([
  baseStyle(`
    .phone { animation: phone-scroll 2s infinite linear; }
    .right-arm-hold { transform-origin: 14px 10px; animation: hold-phone 3s infinite ease-in-out; }
    @keyframes phone-scroll { 0% { transform: translateY(0); } 100% { transform: translateY(-2px); } }
    @keyframes hold-phone { 0%, 100% { transform: rotate(-10deg); } 50% { transform: rotate(-15deg); } }
  `),
  shadow, legs,
  `<g id="body-js"><g class="breathe-anim">
    <rect id="torso" x="2" y="6" width="11" height="7" fill="${BODY}"/>
    <rect x="0" y="9" width="2" height="2" fill="${BODY}"/>
    <g class="right-arm-hold">
      <rect x="13" y="9" width="2" height="2" fill="${BODY}"/>
      <rect x="14" y="6" width="3" height="4" fill="#333" rx="0.3"/>
      <rect x="14.5" y="6.5" width="2" height="3" fill="#6af" class="phone"/>
    </g>
    <g id="eyes-js" fill="${EYE}"><g class="eyes-blink">
      <rect x="4" y="8" width="1" height="2"/><rect x="10" y="8" width="1" height="2"/>
    </g></g>
  </g></g>`
].join('\n  '));

// 3. clawd-idle-whistle
animations['clawd-idle-whistle'] = svg([
  baseStyle(`
    .sway { transform-origin: 7.5px 15px; animation: whistle-sway 2s infinite ease-in-out; }
    .note1 { animation: note-float1 2.5s infinite ease-out; }
    .note2 { animation: note-float2 2.5s 0.8s infinite ease-out; }
    .note3 { animation: note-float3 2.5s 1.6s infinite ease-out; }
    @keyframes whistle-sway { 0%, 100% { transform: rotate(-2deg); } 50% { transform: rotate(2deg); } }
    @keyframes note-float1 { 0% { transform: translate(0,0); opacity: 1; } 100% { transform: translate(-3px,-10px); opacity: 0; } }
    @keyframes note-float2 { 0% { transform: translate(0,0); opacity: 1; } 100% { transform: translate(2px,-12px); opacity: 0; } }
    @keyframes note-float3 { 0% { transform: translate(0,0); opacity: 1; } 100% { transform: translate(-1px,-11px); opacity: 0; } }
  `),
  shadow,
  `<g class="sway">`, legs,
  `<g id="body-js"><g class="breathe-anim">
    <rect id="torso" x="2" y="6" width="11" height="7" fill="${BODY}"/>
    <rect x="0" y="9" width="2" height="2" fill="${BODY}"/>
    <rect x="13" y="9" width="2" height="2" fill="${BODY}"/>
    <g id="eyes-js" fill="${EYE}"><g class="eyes-blink">
      <rect x="4" y="8" width="1" height="2"/><rect x="10" y="8" width="1" height="2"/>
    </g></g>
  </g></g></g>`,
  `<g fill="#FFD700">
    <rect class="note1" x="6" y="2" width="1.5" height="1.5"/>
    <rect class="note2" x="10" y="0" width="1.5" height="1.5"/>
    <rect class="note3" x="3" y="1" width="1.5" height="1.5"/>
  </g>`
].join('\n  '));

// 4. clawd-idle-daydream
animations['clawd-idle-daydream'] = svg([
  baseStyle(`
    .eyes-up { transform-origin: 7.5px 9px; animation: look-up 5s infinite ease-in-out; }
    .thought-cloud { animation: cloud-float 3s infinite ease-in-out; }
    .star1 { animation: star-twinkle 1.5s infinite ease-in-out; }
    .star2 { animation: star-twinkle 1.5s 0.5s infinite ease-in-out; }
    .star3 { animation: star-twinkle 1.5s 1s infinite ease-in-out; }
    @keyframes look-up { 0%, 100% { transform: translateY(0); } 30%, 70% { transform: translateY(-1px); } }
    @keyframes cloud-float { 0%, 100% { transform: translateY(0); opacity: 0.8; } 50% { transform: translateY(-1px); opacity: 1; } }
    @keyframes star-twinkle { 0%, 100% { opacity: 0.3; transform: scale(0.8); } 50% { opacity: 1; transform: scale(1.2); } }
  `),
  shadow, legs,
  `<g id="body-js"><g class="breathe-anim">
    <rect id="torso" x="2" y="6" width="11" height="7" fill="${BODY}"/>
    <rect x="0" y="9" width="2" height="2" fill="${BODY}"/>
    <rect x="13" y="9" width="2" height="2" fill="${BODY}"/>
    <g id="eyes-js" fill="${EYE}"><g class="eyes-up">
      <rect x="4" y="7" width="1" height="2"/><rect x="10" y="7" width="1" height="2"/>
    </g></g>
  </g></g>`,
  `<g class="thought-cloud">
    <rect x="4" y="-8" width="8" height="5" fill="white" opacity="0.7" rx="1"/>
    <rect x="6" y="-3" width="1" height="1" fill="white" opacity="0.5"/>
    <rect x="5" y="-1" width="1" height="1" fill="white" opacity="0.3"/>
    <rect class="star1" x="5" y="-7" width="1.5" height="1.5" fill="#FFD700"/>
    <rect class="star2" x="8" y="-6" width="1" height="1" fill="#FFD700"/>
    <rect class="star3" x="6.5" y="-5" width="1.2" height="1.2" fill="#FFD700"/>
  </g>`
].join('\n  '));

// 5. clawd-idle-bored
animations['clawd-idle-bored'] = svg([
  baseStyle(`
    .foot-tap { transform-origin: 3.5px 15px; animation: tap 0.6s infinite ease-in-out; }
    .sigh-body { transform-origin: 7.5px 13px; animation: sigh 4s infinite ease-in-out; }
    @keyframes tap { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-1px); } }
    @keyframes sigh { 0%, 60%, 100% { transform: scaleY(1); } 70% { transform: scaleY(0.92); } 85% { transform: scaleY(1.04); } }
  `),
  shadow,
  `<g id="legs" fill="${BODY}">
    <g class="foot-tap"><rect x="3" y="11" width="1" height="4"/></g>
    <rect x="5" y="11" width="1" height="4"/>
    <rect x="9" y="11" width="1" height="4"/><rect x="11" y="11" width="1" height="4"/>
  </g>`,
  `<g id="body-js"><g class="sigh-body">
    <rect id="torso" x="2" y="6" width="11" height="7" fill="${BODY}"/>
    <rect x="0" y="9" width="2" height="2" fill="${BODY}"/>
    <rect x="13" y="9" width="2" height="2" fill="${BODY}"/>
    <g id="eyes-js" fill="${EYE}"><g class="eyes-blink">
      <rect x="4" y="9" width="1" height="1"/><rect x="10" y="9" width="1" height="1"/>
    </g></g>
  </g></g>`
].join('\n  '));

// 6. clawd-idle-snack
animations['clawd-idle-snack'] = svg([
  baseStyle(`
    .munch { transform-origin: 7.5px 10px; animation: munch-anim 1s infinite ease-in-out; }
    .crumb1 { animation: crumb-fall1 2s infinite ease-in; }
    .crumb2 { animation: crumb-fall2 2s 0.5s infinite ease-in; }
    .crumb3 { animation: crumb-fall3 2s 1s infinite ease-in; }
    .right-arm-eat { transform-origin: 14px 10px; animation: eat-arm 1s infinite ease-in-out; }
    @keyframes munch-anim { 0%, 100% { transform: scale(1,1); } 50% { transform: scale(1.02, 0.97); } }
    @keyframes crumb-fall1 { 0% { transform: translate(0,0); opacity: 1; } 100% { transform: translate(-2px, 8px); opacity: 0; } }
    @keyframes crumb-fall2 { 0% { transform: translate(0,0); opacity: 1; } 100% { transform: translate(1px, 7px); opacity: 0; } }
    @keyframes crumb-fall3 { 0% { transform: translate(0,0); opacity: 1; } 100% { transform: translate(-1px, 9px); opacity: 0; } }
    @keyframes eat-arm { 0%, 100% { transform: rotate(-20deg) translate(-1px,-2px); } 50% { transform: rotate(-30deg) translate(-1px,-3px); } }
  `),
  shadow, legs,
  `<g id="body-js"><g class="breathe-anim munch">
    <rect id="torso" x="2" y="6" width="11" height="7" fill="${BODY}"/>
    <rect x="0" y="9" width="2" height="2" fill="${BODY}"/>
    <g class="right-arm-eat">
      <rect x="13" y="9" width="2" height="2" fill="${BODY}"/>
      <rect x="14" y="7" width="2" height="2" fill="#8B4513"/>
    </g>
    <g id="eyes-js" fill="${EYE}"><g class="eyes-blink">
      <rect x="4" y="8" width="1" height="2"/><rect x="10" y="8" width="1" height="2"/>
    </g></g>
  </g></g>`,
  `<g fill="#8B4513">
    <rect class="crumb1" x="8" y="10" width="0.5" height="0.5"/>
    <rect class="crumb2" x="10" y="11" width="0.5" height="0.5"/>
    <rect class="crumb3" x="7" y="10" width="0.5" height="0.5"/>
  </g>`
].join('\n  '));

// 7. clawd-idle-wave
animations['clawd-idle-wave'] = svg([
  baseStyle(`
    .wave-arm { transform-origin: 14px 10px; animation: wave 1.2s infinite ease-in-out; }
    @keyframes wave { 0%, 100% { transform: rotate(-30deg) translate(0,-2px); } 50% { transform: rotate(-70deg) translate(1px,-4px); } }
  `),
  shadow, legs,
  `<g id="body-js"><g class="breathe-anim">
    <rect id="torso" x="2" y="6" width="11" height="7" fill="${BODY}"/>
    <rect x="0" y="9" width="2" height="2" fill="${BODY}"/>
    <g class="wave-arm"><rect x="13" y="9" width="2" height="2" fill="${BODY}"/></g>
    <g id="eyes-js" fill="${EYE}"><g class="eyes-blink">
      <rect x="4" y="8" width="1" height="2"/><rect x="10" y="8" width="1" height="2"/>
    </g></g>
  </g></g>`
].join('\n  '));

// 8. clawd-idle-sit
animations['clawd-idle-sit'] = svg([
  baseStyle(`
    .sit-body { transform-origin: 7.5px 13px; animation: sit-bob 3s infinite ease-in-out; }
    .dangle-l1 { transform-origin: 3.5px 13px; animation: dangle1 2s infinite ease-in-out; }
    .dangle-l2 { transform-origin: 5.5px 13px; animation: dangle2 2s 0.3s infinite ease-in-out; }
    .dangle-r1 { transform-origin: 9.5px 13px; animation: dangle1 2s 0.6s infinite ease-in-out; }
    .dangle-r2 { transform-origin: 11.5px 13px; animation: dangle2 2s 0.9s infinite ease-in-out; }
    @keyframes sit-bob { 0%, 100% { transform: translateY(2px); } 50% { transform: translateY(1.5px); } }
    @keyframes dangle1 { 0%, 100% { transform: rotate(-5deg); } 50% { transform: rotate(5deg); } }
    @keyframes dangle2 { 0%, 100% { transform: rotate(5deg); } 50% { transform: rotate(-5deg); } }
  `),
  shadow,
  `<rect x="0" y="13" width="15" height="2" fill="#8B6914"/>`,
  `<g id="legs" fill="${BODY}">
    <g class="dangle-l1"><rect x="3" y="13" width="1" height="3"/></g>
    <g class="dangle-l2"><rect x="5" y="13" width="1" height="3"/></g>
    <g class="dangle-r1"><rect x="9" y="13" width="1" height="3"/></g>
    <g class="dangle-r2"><rect x="11" y="13" width="1" height="3"/></g>
  </g>`,
  `<g class="sit-body"><g id="body-js"><g class="breathe-anim">
    <rect id="torso" x="2" y="6" width="11" height="7" fill="${BODY}"/>
    <rect x="0" y="9" width="2" height="2" fill="${BODY}"/>
    <rect x="13" y="9" width="2" height="2" fill="${BODY}"/>
    <g id="eyes-js" fill="${EYE}"><g class="eyes-blink">
      <rect x="4" y="8" width="1" height="2"/><rect x="10" y="8" width="1" height="2"/>
    </g></g>
  </g></g></g>`
].join('\n  '));

// 9. clawd-idle-nap-head
animations['clawd-idle-nap-head'] = svg([
  baseStyle(`
    .head-droop { transform-origin: 7.5px 6px; animation: droop 4s infinite ease-in-out; }
    .zzz { animation: zzz-float 3s infinite ease-out; }
    .zzz2 { animation: zzz-float 3s 1s infinite ease-out; }
    @keyframes droop { 0%, 80%, 100% { transform: rotate(0deg); } 40%, 60% { transform: rotate(8deg) translateY(1px); } 70% { transform: rotate(0deg) translateY(-1px); } }
    @keyframes zzz-float { 0% { transform: translate(0,0); opacity: 0; } 20% { opacity: 1; } 100% { transform: translate(3px,-8px); opacity: 0; } }
  `),
  shadow, legs,
  `<g class="head-droop"><g id="body-js"><g class="breathe-anim">
    <rect id="torso" x="2" y="6" width="11" height="7" fill="${BODY}"/>
    <rect x="0" y="9" width="2" height="2" fill="${BODY}"/>
    <rect x="13" y="9" width="2" height="2" fill="${BODY}"/>
    <g id="eyes-js" fill="${EYE}">
      <rect x="4" y="9" width="1" height="0.5"/><rect x="10" y="9" width="1" height="0.5"/>
    </g>
  </g></g></g>`,
  `<g fill="#AAA" font-family="monospace" font-size="3">
    <text class="zzz" x="14" y="4">z</text>
    <text class="zzz2" x="16" y="2">z</text>
  </g>`
].join('\n  '));

// 10. clawd-idle-curious
animations['clawd-idle-curious'] = svg([
  baseStyle(`
    .lean-forward { transform-origin: 7.5px 15px; animation: lean 3s infinite ease-in-out; }
    .wide-eyes { animation: widen 3s infinite ease-in-out; }
    @keyframes lean { 0%, 100% { transform: rotate(0deg) translateX(0); } 40%, 60% { transform: rotate(5deg) translateX(1px); } }
    @keyframes widen { 0%, 100% { transform: scaleY(1); } 40%, 60% { transform: scaleY(1.3); } }
  `),
  shadow, legs,
  `<g class="lean-forward"><g id="body-js"><g class="breathe-anim">
    <rect id="torso" x="2" y="6" width="11" height="7" fill="${BODY}"/>
    <rect x="0" y="9" width="2" height="2" fill="${BODY}"/>
    <rect x="13" y="9" width="2" height="2" fill="${BODY}"/>
    <g id="eyes-js" fill="${EYE}"><g class="wide-eyes">
      <rect x="4" y="7" width="1.5" height="2.5"/><rect x="10" y="7" width="1.5" height="2.5"/>
    </g></g>
  </g></g></g>`
].join('\n  '));

// ============================================================
// WORKING/PRODUCTIVE (10)
// ============================================================

// 11. clawd-work-coding
animations['clawd-work-coding'] = svg([
  baseStyle(`
    .screen { animation: screen-glow 2s infinite ease-in-out; }
    .code-line1 { animation: code-scroll 3s infinite linear; }
    .code-line2 { animation: code-scroll 3s 0.5s infinite linear; }
    .code-line3 { animation: code-scroll 3s 1s infinite linear; }
    .typing-arms { animation: type-move 0.4s infinite ease-in-out; }
    @keyframes screen-glow { 0%, 100% { opacity: 0.8; } 50% { opacity: 1; } }
    @keyframes code-scroll { 0% { transform: translateY(0); opacity: 1; } 80% { opacity: 1; } 100% { transform: translateY(-3px); opacity: 0; } }
    @keyframes type-move { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(0.3px); } }
  `),
  shadow, legs,
  `<g id="body-js"><g class="breathe-anim">
    <rect id="torso" x="2" y="6" width="11" height="7" fill="${BODY}"/>
    <g class="typing-arms">
      <rect x="0" y="9" width="2" height="2" fill="${BODY}"/>
      <rect x="13" y="9" width="2" height="2" fill="${BODY}"/>
    </g>
    <g id="eyes-js" fill="${EYE}"><g class="eyes-blink">
      <rect x="4" y="8" width="1" height="2"/><rect x="10" y="8" width="1" height="2"/>
    </g></g>
  </g></g>`,
  `<g class="screen">
    <rect x="-8" y="3" width="10" height="8" fill="#1a1a2e" rx="0.5"/>
    <rect x="-7" y="11" width="8" height="1" fill="#333"/>
    <rect class="code-line1" x="-7" y="4.5" width="5" height="0.7" fill="#66ff66" opacity="0.8"/>
    <rect class="code-line2" x="-7" y="6" width="7" height="0.7" fill="#66ccff" opacity="0.8"/>
    <rect class="code-line3" x="-7" y="7.5" width="4" height="0.7" fill="#ffcc66" opacity="0.8"/>
  </g>`
].join('\n  '));

// 12. clawd-work-debug
animations['clawd-work-debug'] = svg([
  baseStyle(`
    .magnify { animation: mag-move 3s infinite ease-in-out; }
    .code-bg { opacity: 0.6; }
    .bug-blink { animation: bug-pulse 1s infinite ease-in-out; }
    @keyframes mag-move { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(3px, 1px); } }
    @keyframes bug-pulse { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }
  `),
  shadow, legs,
  `<g id="body-js"><g class="breathe-anim">
    <rect id="torso" x="2" y="6" width="11" height="7" fill="${BODY}"/>
    <rect x="0" y="9" width="2" height="2" fill="${BODY}"/>
    <rect x="13" y="9" width="2" height="2" fill="${BODY}"/>
    <g id="eyes-js" fill="${EYE}"><g class="eyes-blink">
      <rect x="4" y="8" width="1" height="2"/><rect x="10" y="8" width="1" height="2"/>
    </g></g>
  </g></g>`,
  `<g class="code-bg">
    <rect x="-8" y="2" width="10" height="9" fill="#1a1a2e" rx="0.5"/>
    <rect x="-7" y="3" width="5" height="0.5" fill="#888"/>
    <rect x="-7" y="4.5" width="7" height="0.5" fill="#888"/>
    <rect x="-7" y="6" width="4" height="0.5" fill="#ff4444" class="bug-blink"/>
    <rect x="-7" y="7.5" width="6" height="0.5" fill="#888"/>
  </g>`,
  `<g class="magnify">
    <circle cx="-2" cy="5" r="2.5" fill="none" stroke="#FFD700" stroke-width="0.5"/>
    <rect x="0" y="7" width="0.5" height="2" fill="#8B6914" transform="rotate(-30, 0, 7)"/>
  </g>`
].join('\n  '));

// 13. clawd-work-eureka
animations['clawd-work-eureka'] = svg([
  baseStyle(`
    .eureka-body { transform-origin: 7.5px 15px; animation: eureka-jump 3s infinite ease-in-out; }
    .bulb { animation: bulb-appear 3s infinite ease-in-out; }
    .bulb-glow { animation: glow-pulse 3s infinite ease-in-out; }
    .arm-up-l { transform-origin: 1px 10px; animation: arm-eureka-l 3s infinite ease-in-out; }
    .arm-up-r { transform-origin: 14px 10px; animation: arm-eureka-r 3s infinite ease-in-out; }
    @keyframes eureka-jump { 0%, 100% { transform: translateY(0); } 40%, 60% { transform: translateY(-3px); } }
    @keyframes bulb-appear { 0%, 20% { opacity: 0; transform: translateY(2px) scale(0.5); } 40%, 80% { opacity: 1; transform: translateY(0) scale(1); } 100% { opacity: 0; } }
    @keyframes glow-pulse { 0%, 20% { opacity: 0; } 40%, 80% { opacity: 0.4; } 100% { opacity: 0; } }
    @keyframes arm-eureka-l { 0%, 100% { transform: rotate(0); } 40%, 60% { transform: rotate(-70deg) translate(-1px,-3px); } }
    @keyframes arm-eureka-r { 0%, 100% { transform: rotate(0); } 40%, 60% { transform: rotate(70deg) translate(1px,-3px); } }
  `),
  shadow, legs,
  `<g class="eureka-body"><g id="body-js"><g class="breathe-anim">
    <rect id="torso" x="2" y="6" width="11" height="7" fill="${BODY}"/>
    <g class="arm-up-l"><rect x="0" y="9" width="2" height="2" fill="${BODY}"/></g>
    <g class="arm-up-r"><rect x="13" y="9" width="2" height="2" fill="${BODY}"/></g>
    <g id="eyes-js" fill="${EYE}"><g class="eyes-blink">
      <rect x="4" y="8" width="1" height="2"/><rect x="10" y="8" width="1" height="2"/>
    </g></g>
  </g></g></g>`,
  `<g class="bulb">
    <rect x="6" y="-5" width="3" height="3" fill="#FFD700" rx="0.5"/>
    <rect x="7" y="-2" width="1" height="1" fill="#B8860B"/>
    <rect class="bulb-glow" x="5" y="-6" width="5" height="5" fill="#FFD700" opacity="0.3" rx="1"/>
  </g>`
].join('\n  '));

// 14. clawd-work-meeting
animations['clawd-work-meeting'] = svg([
  baseStyle(`
    .pointer-move { transform-origin: 0px 10px; animation: point 3s infinite ease-in-out; }
    .chart-bar1 { animation: bar-grow1 3s infinite ease-in-out; }
    .chart-bar2 { animation: bar-grow2 3s 0.3s infinite ease-in-out; }
    .chart-bar3 { animation: bar-grow3 3s 0.6s infinite ease-in-out; }
    @keyframes point { 0%, 100% { transform: rotate(0deg); } 50% { transform: rotate(-10deg) translateY(-1px); } }
    @keyframes bar-grow1 { 0%, 100% { transform: scaleY(0.5); } 50% { transform: scaleY(1); } }
    @keyframes bar-grow2 { 0%, 100% { transform: scaleY(0.7); } 50% { transform: scaleY(1); } }
    @keyframes bar-grow3 { 0%, 100% { transform: scaleY(0.3); } 50% { transform: scaleY(1); } }
  `),
  shadow, legs,
  `<g id="body-js"><g class="breathe-anim">
    <rect id="torso" x="2" y="6" width="11" height="7" fill="${BODY}"/>
    <g class="pointer-move"><rect x="0" y="9" width="2" height="2" fill="${BODY}"/></g>
    <rect x="13" y="9" width="2" height="2" fill="${BODY}"/>
    <g id="eyes-js" fill="${EYE}"><g class="eyes-blink">
      <rect x="4" y="8" width="1" height="2"/><rect x="10" y="8" width="1" height="2"/>
    </g></g>
  </g></g>`,
  `<g>
    <rect x="-10" y="0" width="10" height="12" fill="white" stroke="#ccc" stroke-width="0.3"/>
    <g transform="translate(-9, 11)">
      <rect class="chart-bar1" x="1" y="0" width="2" height="-4" fill="#4488ff" transform-origin="2 0"/>
      <rect class="chart-bar2" x="4" y="0" width="2" height="-6" fill="#44bb88" transform-origin="5 0"/>
      <rect class="chart-bar3" x="7" y="0" width="2" height="-8" fill="#ff8844" transform-origin="8 0"/>
    </g>
  </g>`
].join('\n  '));

// 15. clawd-work-study
animations['clawd-work-study'] = svg([
  baseStyle(`
    .page-turn { transform-origin: -4px 8px; animation: turn 3s infinite ease-in-out; }
    .reading-eyes { animation: read-scan 4s infinite ease-in-out; }
    @keyframes turn { 0%, 40% { transform: rotateY(0deg); } 50%, 90% { transform: rotateY(-30deg); } 100% { transform: rotateY(0deg); } }
    @keyframes read-scan { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(1px); } }
  `),
  shadow, legs,
  `<g id="body-js"><g class="breathe-anim">
    <rect id="torso" x="2" y="6" width="11" height="7" fill="${BODY}"/>
    <rect x="0" y="9" width="2" height="2" fill="${BODY}"/>
    <rect x="13" y="9" width="2" height="2" fill="${BODY}"/>
    <g id="eyes-js" fill="${EYE}"><g class="eyes-blink reading-eyes">
      <rect x="4" y="8" width="1" height="2"/><rect x="10" y="8" width="1" height="2"/>
    </g></g>
  </g></g>`,
  `<g>
    <rect x="-9" y="5" width="7" height="5" fill="#2255aa"/>
    <rect x="-8" y="4" width="7" height="5" fill="#3366cc"/>
    <rect x="-7" y="3" width="7" height="5" fill="#4477dd"/>
    <g class="page-turn">
      <rect x="-4" y="3" width="3.5" height="5" fill="#fffff0"/>
    </g>
    <rect x="-7" y="3" width="3" height="5" fill="#fffff0"/>
    <rect x="-6.5" y="4" width="2" height="0.3" fill="#888"/>
    <rect x="-6.5" y="5" width="2" height="0.3" fill="#888"/>
    <rect x="-6.5" y="6" width="1.5" height="0.3" fill="#888"/>
  </g>`
].join('\n  '));

// 16. clawd-work-paint
animations['clawd-work-paint'] = svg([
  baseStyle(`
    .brush-move { transform-origin: 14px 10px; animation: paint-stroke 2s infinite ease-in-out; }
    .paint-dot1 { animation: dot-appear1 2s infinite ease-out; }
    .paint-dot2 { animation: dot-appear2 2s 0.7s infinite ease-out; }
    .paint-dot3 { animation: dot-appear3 2s 1.4s infinite ease-out; }
    @keyframes paint-stroke { 0%, 100% { transform: rotate(-20deg) translate(-3px, -4px); } 50% { transform: rotate(-30deg) translate(-5px, -2px); } }
    @keyframes dot-appear1 { 0% { opacity: 0; } 50%, 100% { opacity: 1; } }
    @keyframes dot-appear2 { 0% { opacity: 0; } 50%, 100% { opacity: 1; } }
    @keyframes dot-appear3 { 0% { opacity: 0; } 50%, 100% { opacity: 1; } }
  `),
  shadow, legs,
  `<g id="body-js"><g class="breathe-anim">
    <rect id="torso" x="2" y="6" width="11" height="7" fill="${BODY}"/>
    <rect x="0" y="9" width="2" height="2" fill="${BODY}"/>
    <g class="brush-move">
      <rect x="13" y="9" width="2" height="2" fill="${BODY}"/>
      <rect x="15" y="7" width="0.5" height="3" fill="#8B6914"/>
      <rect x="15" y="7" width="0.5" height="1" fill="#ff4466"/>
    </g>
    <g id="eyes-js" fill="${EYE}"><g class="eyes-blink">
      <rect x="4" y="8" width="1" height="2"/><rect x="10" y="8" width="1" height="2"/>
    </g></g>
  </g></g>`,
  `<g>
    <rect x="18" y="0" width="8" height="11" fill="white" stroke="#ccc" stroke-width="0.3"/>
    <rect class="paint-dot1" x="20" y="3" width="2" height="2" fill="#ff4466" opacity="0"/>
    <rect class="paint-dot2" x="22" y="5" width="2" height="2" fill="#44aaff" opacity="0"/>
    <rect class="paint-dot3" x="19" y="6" width="2" height="2" fill="#44dd66" opacity="0"/>
  </g>`
].join('\n  '));

// 17. clawd-work-write
animations['clawd-work-write'] = svg([
  baseStyle(`
    .pen-move { transform-origin: 14px 10px; animation: write-stroke 1.5s infinite ease-in-out; }
    .text-line1 { animation: line-draw1 3s infinite ease-in-out; }
    .text-line2 { animation: line-draw2 3s 1s infinite ease-in-out; }
    .text-line3 { animation: line-draw3 3s 2s infinite ease-in-out; }
    @keyframes write-stroke { 0%, 100% { transform: rotate(-15deg) translate(-2px,-3px); } 50% { transform: rotate(-20deg) translate(-4px,-3px); } }
    @keyframes line-draw1 { 0% { width: 0; } 33%, 100% { width: 4; } }
    @keyframes line-draw2 { 0%, 33% { width: 0; } 66%, 100% { width: 5; } }
    @keyframes line-draw3 { 0%, 66% { width: 0; } 100% { width: 3; } }
  `),
  shadow, legs,
  `<g id="body-js"><g class="breathe-anim">
    <rect id="torso" x="2" y="6" width="11" height="7" fill="${BODY}"/>
    <rect x="0" y="9" width="2" height="2" fill="${BODY}"/>
    <g class="pen-move">
      <rect x="13" y="9" width="2" height="2" fill="${BODY}"/>
      <rect x="15" y="8" width="0.4" height="3" fill="#222" transform="rotate(-20,15,9)"/>
    </g>
    <g id="eyes-js" fill="${EYE}"><g class="eyes-blink">
      <rect x="4" y="8" width="1" height="2"/><rect x="10" y="8" width="1" height="2"/>
    </g></g>
  </g></g>`,
  `<g>
    <rect x="17" y="4" width="8" height="10" fill="#fffff0" stroke="#ccc" stroke-width="0.2"/>
    <rect class="text-line1" x="18" y="5.5" width="4" height="0.4" fill="#333"/>
    <rect class="text-line2" x="18" y="7" width="5" height="0.4" fill="#333"/>
    <rect class="text-line3" x="18" y="8.5" width="3" height="0.4" fill="#333"/>
  </g>`
].join('\n  '));

// 18. clawd-work-hammer
animations['clawd-work-hammer'] = svg([
  baseStyle(`
    .hammer-swing { transform-origin: 14px 10px; animation: hammer 0.8s infinite ease-in-out; }
    .spark1 { animation: spark-fly1 0.8s infinite ease-out; }
    .spark2 { animation: spark-fly2 0.8s 0.2s infinite ease-out; }
    @keyframes hammer { 0%, 100% { transform: rotate(-60deg) translate(0,-4px); } 50% { transform: rotate(-10deg) translate(0,0); } }
    @keyframes spark-fly1 { 0%, 40% { opacity: 0; } 50% { opacity: 1; transform: translate(0,0); } 100% { opacity: 0; transform: translate(3px,-3px); } }
    @keyframes spark-fly2 { 0%, 40% { opacity: 0; } 50% { opacity: 1; transform: translate(0,0); } 100% { opacity: 0; transform: translate(-2px,-4px); } }
  `),
  shadow, legs,
  `<g id="body-js"><g class="breathe-anim">
    <rect id="torso" x="2" y="6" width="11" height="7" fill="${BODY}"/>
    <rect x="0" y="9" width="2" height="2" fill="${BODY}"/>
    <g class="hammer-swing">
      <rect x="13" y="9" width="2" height="2" fill="${BODY}"/>
      <rect x="15" y="6" width="0.5" height="4" fill="#8B6914"/>
      <rect x="14.5" y="5" width="2" height="1.5" fill="#888"/>
    </g>
    <g id="eyes-js" fill="${EYE}"><g class="eyes-blink">
      <rect x="4" y="8" width="1" height="2"/><rect x="10" y="8" width="1" height="2"/>
    </g></g>
  </g></g>`,
  `<rect x="17" y="10" width="6" height="5" fill="#8B6914"/>
  <rect class="spark1" x="19" y="9" width="1" height="1" fill="#FFD700"/>
  <rect class="spark2" x="18" y="8" width="1" height="1" fill="#FFD700"/>`
].join('\n  '));

// 19. clawd-work-science
animations['clawd-work-science'] = svg([
  baseStyle(`
    .hold-beaker { transform-origin: 14px 10px; animation: beaker-hold 3s infinite ease-in-out; }
    .bubble1 { animation: bubble-rise1 2s infinite ease-out; }
    .bubble2 { animation: bubble-rise2 2s 0.7s infinite ease-out; }
    .bubble3 { animation: bubble-rise3 2s 1.4s infinite ease-out; }
    .liquid { animation: liquid-bubble 1s infinite ease-in-out; }
    @keyframes beaker-hold { 0%, 100% { transform: rotate(-10deg); } 50% { transform: rotate(-15deg); } }
    @keyframes bubble-rise1 { 0% { transform: translateY(0); opacity: 1; } 100% { transform: translateY(-6px); opacity: 0; } }
    @keyframes bubble-rise2 { 0% { transform: translateY(0); opacity: 1; } 100% { transform: translateY(-7px); opacity: 0; } }
    @keyframes bubble-rise3 { 0% { transform: translateY(0); opacity: 1; } 100% { transform: translateY(-5px); opacity: 0; } }
    @keyframes liquid-bubble { 0%, 100% { transform: scaleY(1); } 50% { transform: scaleY(1.05); } }
  `),
  shadow, legs,
  `<g id="body-js"><g class="breathe-anim">
    <rect id="torso" x="2" y="6" width="11" height="7" fill="${BODY}"/>
    <rect x="0" y="9" width="2" height="2" fill="${BODY}"/>
    <g class="hold-beaker">
      <rect x="13" y="9" width="2" height="2" fill="${BODY}"/>
      <rect x="15" y="5" width="3" height="6" fill="none" stroke="#aaddff" stroke-width="0.4"/>
      <rect class="liquid" x="15.2" y="8" width="2.6" height="2.8" fill="#44dd88" opacity="0.7"/>
    </g>
    <g id="eyes-js" fill="${EYE}"><g class="eyes-blink">
      <rect x="4" y="8" width="1" height="2"/><rect x="10" y="8" width="1" height="2"/>
    </g></g>
  </g></g>`,
  `<g>
    <circle class="bubble1" cx="17" cy="7" r="0.4" fill="#44dd88" opacity="0.6"/>
    <circle class="bubble2" cx="16" cy="6" r="0.3" fill="#44dd88" opacity="0.6"/>
    <circle class="bubble3" cx="17.5" cy="5" r="0.5" fill="#44dd88" opacity="0.6"/>
  </g>`
].join('\n  '));

// 20. clawd-work-photo
animations['clawd-work-photo'] = svg([
  baseStyle(`
    .hold-camera { transform-origin: 7.5px 10px; animation: camera-hold 4s infinite ease-in-out; }
    .flash { animation: flash-blink 4s infinite ease-out; }
    .click-body { animation: click-snap 4s infinite ease-in-out; }
    @keyframes camera-hold { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(0.5px); } }
    @keyframes flash-blink { 0%, 70%, 80%, 100% { opacity: 0; } 75% { opacity: 1; } }
    @keyframes click-snap { 0%, 70%, 80%, 100% { transform: scale(1); } 75% { transform: scale(0.97); } }
  `),
  shadow, legs,
  `<g class="click-body"><g id="body-js"><g class="breathe-anim">
    <rect id="torso" x="2" y="6" width="11" height="7" fill="${BODY}"/>
    <rect x="0" y="9" width="2" height="2" fill="${BODY}"/>
    <rect x="13" y="9" width="2" height="2" fill="${BODY}"/>
    <g id="eyes-js" fill="${EYE}"><g class="eyes-blink">
      <rect x="4" y="8" width="1" height="2"/><rect x="10" y="8" width="1" height="2"/>
    </g></g>
  </g></g></g>`,
  `<g class="hold-camera">
    <rect x="16" y="7" width="5" height="3.5" fill="#333" rx="0.3"/>
    <rect x="17.5" y="7.5" width="2" height="2" fill="#555" rx="0.3"/>
    <circle cx="18.5" cy="8.5" r="0.7" fill="#88aaff"/>
    <rect x="19" y="6.5" width="1" height="0.8" fill="#444"/>
  </g>`,
  `<rect class="flash" x="-12" y="-10" width="40" height="35" fill="white" opacity="0"/>`
].join('\n  '));

// ============================================================
// PLAY/FUN (10)
// ============================================================

// 21. clawd-play-dance
animations['clawd-play-dance'] = svg([
  baseStyle(`
    .dance-body { transform-origin: 7.5px 15px; animation: dance-bounce 0.6s infinite ease-in-out; }
    .dance-arm-l { transform-origin: 1px 10px; animation: dance-l 0.6s infinite ease-in-out; }
    .dance-arm-r { transform-origin: 14px 10px; animation: dance-r 0.6s infinite ease-in-out; }
    .dance-leg-l { transform-origin: 4px 13px; animation: leg-dance-l 0.6s infinite ease-in-out; }
    .dance-leg-r { transform-origin: 10px 13px; animation: leg-dance-r 0.6s infinite ease-in-out; }
    @keyframes dance-bounce { 0%, 100% { transform: translateY(0) rotate(-3deg); } 50% { transform: translateY(-2px) rotate(3deg); } }
    @keyframes dance-l { 0%, 100% { transform: rotate(30deg); } 50% { transform: rotate(-40deg); } }
    @keyframes dance-r { 0%, 100% { transform: rotate(-30deg); } 50% { transform: rotate(40deg); } }
    @keyframes leg-dance-l { 0%, 100% { transform: rotate(5deg); } 50% { transform: rotate(-5deg); } }
    @keyframes leg-dance-r { 0%, 100% { transform: rotate(-5deg); } 50% { transform: rotate(5deg); } }
  `),
  shadow,
  `<g id="legs" fill="${BODY}">
    <g class="dance-leg-l"><rect x="3" y="11" width="1" height="4"/><rect x="5" y="11" width="1" height="4"/></g>
    <g class="dance-leg-r"><rect x="9" y="11" width="1" height="4"/><rect x="11" y="11" width="1" height="4"/></g>
  </g>`,
  `<g class="dance-body"><g id="body-js"><g class="breathe-anim">
    <rect id="torso" x="2" y="6" width="11" height="7" fill="${BODY}"/>
    <g class="dance-arm-l"><rect x="0" y="9" width="2" height="2" fill="${BODY}"/></g>
    <g class="dance-arm-r"><rect x="13" y="9" width="2" height="2" fill="${BODY}"/></g>
    <g id="eyes-js" fill="${EYE}"><g class="eyes-blink">
      <rect x="4" y="8" width="1" height="2"/><rect x="10" y="8" width="1" height="2"/>
    </g></g>
  </g></g></g>`
].join('\n  '));

// 22. clawd-play-jump
animations['clawd-play-jump'] = svg([
  baseStyle(`
    .jump-body { transform-origin: 7.5px 15px; animation: jump-rope 1.5s infinite ease-in-out; }
    .rope { transform-origin: 7.5px 10px; animation: rope-spin 1.5s infinite linear; }
    @keyframes jump-rope { 0%, 100% { transform: translateY(0); } 35%, 65% { transform: translateY(-5px); } }
    @keyframes rope-spin { 0% { transform: rotateX(0deg); } 100% { transform: rotateX(360deg); } }
  `),
  shadow,
  `<g class="jump-body">`,
  legs,
  `<g id="body-js"><g class="breathe-anim">
    <rect id="torso" x="2" y="6" width="11" height="7" fill="${BODY}"/>
    <rect x="0" y="9" width="2" height="2" fill="${BODY}"/>
    <rect x="13" y="9" width="2" height="2" fill="${BODY}"/>
    <g id="eyes-js" fill="${EYE}"><g class="eyes-blink">
      <rect x="4" y="8" width="1" height="2"/><rect x="10" y="8" width="1" height="2"/>
    </g></g>
  </g></g></g>`,
  `<ellipse class="rope" cx="7.5" cy="5" rx="10" ry="12" fill="none" stroke="#cc6633" stroke-width="0.4"/>`
].join('\n  '));

// 23. clawd-play-ball
animations['clawd-play-ball'] = svg([
  baseStyle(`
    .ball { animation: ball-bounce 1s infinite ease-in-out; }
    .ball-shadow { animation: ball-shadow-anim 1s infinite ease-in-out; }
    .arm-bounce { transform-origin: 14px 10px; animation: arm-ball 1s infinite ease-in-out; }
    @keyframes ball-bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
    @keyframes ball-shadow-anim { 0%, 100% { opacity: 0.3; transform: scale(1); } 50% { opacity: 0.1; transform: scale(0.5); } }
    @keyframes arm-ball { 0%, 100% { transform: rotate(-20deg) translateY(-1px); } 50% { transform: rotate(-40deg) translateY(-3px); } }
  `),
  shadow, legs,
  `<g id="body-js"><g class="breathe-anim">
    <rect id="torso" x="2" y="6" width="11" height="7" fill="${BODY}"/>
    <rect x="0" y="9" width="2" height="2" fill="${BODY}"/>
    <g class="arm-bounce"><rect x="13" y="9" width="2" height="2" fill="${BODY}"/></g>
    <g id="eyes-js" fill="${EYE}"><g class="eyes-blink">
      <rect x="4" y="8" width="1" height="2"/><rect x="10" y="8" width="1" height="2"/>
    </g></g>
  </g></g>`,
  `<circle class="ball" cx="17" cy="12" r="1.5" fill="#ff4444"/>
  <ellipse class="ball-shadow" cx="17" cy="15" rx="1.5" ry="0.3" fill="#000"/>`
].join('\n  '));

// 24. clawd-play-game
animations['clawd-play-game'] = svg([
  baseStyle(`
    .game-hold { animation: game-shake 0.3s infinite ease-in-out; }
    .screen-flash { animation: game-screen 0.5s infinite linear; }
    .btn-mash { animation: btn-press 0.2s infinite ease-in-out; }
    @keyframes game-shake { 0%, 100% { transform: translate(0,0); } 50% { transform: translate(0.3px, -0.3px); } }
    @keyframes game-screen { 0%, 50% { fill: #44ff44; } 51%, 100% { fill: #4488ff; } }
    @keyframes btn-press { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
  `),
  shadow, legs,
  `<g id="body-js"><g class="breathe-anim">
    <rect id="torso" x="2" y="6" width="11" height="7" fill="${BODY}"/>
    <rect x="0" y="9" width="2" height="2" fill="${BODY}"/>
    <rect x="13" y="9" width="2" height="2" fill="${BODY}"/>
    <g id="eyes-js" fill="${EYE}"><g class="eyes-blink">
      <rect x="4" y="8" width="1" height="2"/><rect x="10" y="8" width="1" height="2"/>
    </g></g>
  </g></g>`,
  `<g class="game-hold" transform="translate(0,2)">
    <rect x="3" y="0" width="9" height="5" fill="#555" rx="0.5"/>
    <rect class="screen-flash" x="4" y="0.5" width="4" height="3" rx="0.2"/>
    <rect class="btn-mash" x="9" y="1" width="1" height="1" fill="#ff4444" rx="0.2"/>
    <rect x="9" y="2.5" width="1" height="1" fill="#4444ff" rx="0.2"/>
  </g>`
].join('\n  '));

// 25. clawd-play-music
animations['clawd-play-music'] = svg([
  baseStyle(`
    .guitar-strum { transform-origin: 7.5px 10px; animation: strum 0.8s infinite ease-in-out; }
    .note-a { animation: note-up-a 2s infinite ease-out; }
    .note-b { animation: note-up-b 2s 0.7s infinite ease-out; }
    .note-c { animation: note-up-c 2s 1.4s infinite ease-out; }
    @keyframes strum { 0%, 100% { transform: rotate(-2deg); } 50% { transform: rotate(2deg); } }
    @keyframes note-up-a { 0% { opacity: 1; transform: translate(0,0); } 100% { opacity: 0; transform: translate(-3px,-8px); } }
    @keyframes note-up-b { 0% { opacity: 1; transform: translate(0,0); } 100% { opacity: 0; transform: translate(2px,-10px); } }
    @keyframes note-up-c { 0% { opacity: 1; transform: translate(0,0); } 100% { opacity: 0; transform: translate(-1px,-9px); } }
  `),
  shadow, legs,
  `<g class="guitar-strum"><g id="body-js"><g class="breathe-anim">
    <rect id="torso" x="2" y="6" width="11" height="7" fill="${BODY}"/>
    <rect x="0" y="9" width="2" height="2" fill="${BODY}"/>
    <rect x="13" y="9" width="2" height="2" fill="${BODY}"/>
    <g id="eyes-js" fill="${EYE}"><g class="eyes-blink">
      <rect x="4" y="8" width="1" height="2"/><rect x="10" y="8" width="1" height="2"/>
    </g></g>
  </g></g>`,
  `<rect x="3" y="9" width="3" height="4" fill="#8B4513" rx="0.5"/>
  <rect x="4" y="4" width="1" height="5" fill="#8B4513"/>
  <rect x="3.5" y="10" width="2" height="0.3" fill="#ddd"/>
  <rect x="3.5" y="11" width="2" height="0.3" fill="#ddd"/>
  </g>`,
  `<g fill="#FFD700">
    <rect class="note-a" x="2" y="4" width="1.5" height="1.5"/>
    <rect class="note-b" x="8" y="3" width="1.5" height="1.5"/>
    <rect class="note-c" x="12" y="2" width="1.5" height="1.5"/>
  </g>`
].join('\n  '));

// 26. clawd-play-sing
animations['clawd-play-sing'] = svg([
  baseStyle(`
    .sing-body { transform-origin: 7.5px 15px; animation: sing-sway 1.5s infinite ease-in-out; }
    .mouth { animation: mouth-open 0.8s infinite ease-in-out; }
    .sing-note1 { animation: sing-float1 2s infinite ease-out; }
    .sing-note2 { animation: sing-float2 2s 0.6s infinite ease-out; }
    @keyframes sing-sway { 0%, 100% { transform: rotate(-2deg); } 50% { transform: rotate(2deg); } }
    @keyframes mouth-open { 0%, 100% { height: 0.5; } 50% { height: 1; } }
    @keyframes sing-float1 { 0% { opacity: 1; transform: translate(0,0); } 100% { opacity: 0; transform: translate(4px,-7px); } }
    @keyframes sing-float2 { 0% { opacity: 1; transform: translate(0,0); } 100% { opacity: 0; transform: translate(5px,-9px); } }
  `),
  shadow, legs,
  `<g class="sing-body"><g id="body-js"><g class="breathe-anim">
    <rect id="torso" x="2" y="6" width="11" height="7" fill="${BODY}"/>
    <rect x="0" y="9" width="2" height="2" fill="${BODY}"/>
    <rect x="13" y="9" width="2" height="2" fill="${BODY}"/>
    <g id="eyes-js" fill="${EYE}"><g class="eyes-blink">
      <rect x="4" y="8" width="1" height="2"/><rect x="10" y="8" width="1" height="2"/>
    </g></g>
    <rect class="mouth" x="6" y="11" width="3" height="0.5" fill="#aa4444" rx="0.2"/>
  </g></g></g>`,
  `<g fill="#FFD700">
    <rect class="sing-note1" x="14" y="5" width="1.5" height="1.5"/>
    <rect class="sing-note2" x="16" y="3" width="1.2" height="1.2"/>
  </g>`
].join('\n  '));

// 27. clawd-play-skateboard
animations['clawd-play-skateboard'] = svg([
  baseStyle(`
    .skate-move { animation: skate-roll 2s infinite linear; }
    .body-lean { transform-origin: 7.5px 13px; animation: lean-ride 2s infinite ease-in-out; }
    .wheel-spin { animation: wheel 0.5s infinite linear; }
    @keyframes skate-roll { 0% { transform: translateX(-3px); } 100% { transform: translateX(3px); } }
    @keyframes lean-ride { 0%, 100% { transform: rotate(-3deg); } 50% { transform: rotate(3deg); } }
    @keyframes wheel { 0% { opacity: 0.6; } 50% { opacity: 1; } 100% { opacity: 0.6; } }
  `),
  `<g class="skate-move">`,
  shadow,
  `<g>
    <rect x="1" y="15" width="13" height="1" fill="#8B4513"/>
    <rect class="wheel-spin" x="2" y="16" width="1.5" height="1" fill="#333" rx="0.3"/>
    <rect class="wheel-spin" x="11" y="16" width="1.5" height="1" fill="#333" rx="0.3"/>
  </g>`,
  legs,
  `<g class="body-lean"><g id="body-js"><g class="breathe-anim">
    <rect id="torso" x="2" y="6" width="11" height="7" fill="${BODY}"/>
    <rect x="0" y="9" width="2" height="2" fill="${BODY}"/>
    <rect x="13" y="9" width="2" height="2" fill="${BODY}"/>
    <g id="eyes-js" fill="${EYE}"><g class="eyes-blink">
      <rect x="4" y="8" width="1" height="2"/><rect x="10" y="8" width="1" height="2"/>
    </g></g>
  </g></g></g>`,
  `</g>`
].join('\n  '));

// 28. clawd-play-kite
animations['clawd-play-kite'] = svg([
  baseStyle(`
    .kite { animation: kite-fly 3s infinite ease-in-out; }
    .kite-string { animation: string-sway 3s infinite ease-in-out; }
    .arm-hold-string { transform-origin: 14px 10px; animation: hold-string 3s infinite ease-in-out; }
    @keyframes kite-fly { 0%, 100% { transform: translate(0, 0) rotate(-5deg); } 50% { transform: translate(2px, -2px) rotate(5deg); } }
    @keyframes string-sway { 0%, 100% { transform: rotate(-2deg); } 50% { transform: rotate(2deg); } }
    @keyframes hold-string { 0%, 100% { transform: rotate(-30deg) translate(0,-2px); } 50% { transform: rotate(-35deg) translate(0,-2.5px); } }
  `),
  shadow, legs,
  `<g id="body-js"><g class="breathe-anim">
    <rect id="torso" x="2" y="6" width="11" height="7" fill="${BODY}"/>
    <rect x="0" y="9" width="2" height="2" fill="${BODY}"/>
    <g class="arm-hold-string"><rect x="13" y="9" width="2" height="2" fill="${BODY}"/></g>
    <g id="eyes-js" fill="${EYE}"><g class="eyes-blink">
      <rect x="4" y="7" width="1" height="2"/><rect x="10" y="7" width="1" height="2"/>
    </g></g>
  </g></g>`,
  `<g class="kite-string"><line x1="14" y1="8" x2="18" y2="-12" stroke="#888" stroke-width="0.2"/></g>`,
  `<g class="kite">
    <polygon points="18,-12 15,-8 18,-4 21,-8" fill="#ff4466"/>
    <polygon points="18,-12 15,-8 18,-4 21,-8" fill="none" stroke="#cc2244" stroke-width="0.3"/>
    <line x1="18" y1="-4" x2="17" y2="-1" stroke="#ffcc00" stroke-width="0.3"/>
    <line x1="18" y1="-4" x2="19" y2="-1" stroke="#4488ff" stroke-width="0.3"/>
  </g>`
].join('\n  '));

// 29. clawd-play-balloon
animations['clawd-play-balloon'] = svg([
  baseStyle(`
    .balloon { animation: balloon-bob 2s infinite ease-in-out; }
    .balloon-string { animation: string-bob 2s infinite ease-in-out; }
    .arm-hold-bal { transform-origin: 14px 10px; animation: hold-bal 2s infinite ease-in-out; }
    @keyframes balloon-bob { 0%, 100% { transform: translateY(0) rotate(-2deg); } 50% { transform: translateY(-2px) rotate(2deg); } }
    @keyframes string-bob { 0%, 100% { transform: rotate(-1deg); } 50% { transform: rotate(1deg); } }
    @keyframes hold-bal { 0%, 100% { transform: rotate(-20deg) translate(0,-1px); } 50% { transform: rotate(-25deg) translate(0,-1.5px); } }
  `),
  shadow, legs,
  `<g id="body-js"><g class="breathe-anim">
    <rect id="torso" x="2" y="6" width="11" height="7" fill="${BODY}"/>
    <rect x="0" y="9" width="2" height="2" fill="${BODY}"/>
    <g class="arm-hold-bal"><rect x="13" y="9" width="2" height="2" fill="${BODY}"/></g>
    <g id="eyes-js" fill="${EYE}"><g class="eyes-blink">
      <rect x="4" y="8" width="1" height="2"/><rect x="10" y="8" width="1" height="2"/>
    </g></g>
  </g></g>`,
  `<g class="balloon-string"><line x1="14" y1="8" x2="16" y2="-5" stroke="#888" stroke-width="0.2"/></g>`,
  `<g class="balloon">
    <ellipse cx="16" cy="-8" rx="3" ry="3.5" fill="#ff4488"/>
    <rect x="15.5" y="-4.8" width="1" height="0.8" fill="#cc2266"/>
  </g>`
].join('\n  '));

// 30. clawd-play-hula
animations['clawd-play-hula'] = svg([
  baseStyle(`
    .hula-body { transform-origin: 7.5px 10px; animation: hula-wiggle 0.6s infinite ease-in-out; }
    .hula-hoop { transform-origin: 7.5px 10px; animation: hoop-spin 0.6s infinite linear; }
    @keyframes hula-wiggle { 0%, 100% { transform: translateX(-0.5px); } 50% { transform: translateX(0.5px); } }
    @keyframes hoop-spin { 0% { transform: scaleX(1) rotate(0deg); } 25% { transform: scaleX(0.3) rotate(0deg); } 50% { transform: scaleX(-1) rotate(0deg); } 75% { transform: scaleX(0.3) rotate(0deg); } 100% { transform: scaleX(1) rotate(0deg); } }
  `),
  shadow, legs,
  `<g class="hula-body"><g id="body-js"><g class="breathe-anim">
    <rect id="torso" x="2" y="6" width="11" height="7" fill="${BODY}"/>
    <rect x="0" y="9" width="2" height="2" fill="${BODY}"/>
    <rect x="13" y="9" width="2" height="2" fill="${BODY}"/>
    <g id="eyes-js" fill="${EYE}"><g class="eyes-blink">
      <rect x="4" y="8" width="1" height="2"/><rect x="10" y="8" width="1" height="2"/>
    </g></g>
  </g></g></g>`,
  `<ellipse class="hula-hoop" cx="7.5" cy="10" rx="9" ry="1" fill="none" stroke="#ff6600" stroke-width="0.7"/>`
].join('\n  '));

// ============================================================
// DAILY LIFE (10)
// ============================================================

// 31. clawd-life-eat
animations['clawd-life-eat'] = svg([
  baseStyle(`
    .eat-body { transform-origin: 7.5px 10px; animation: nom 0.8s infinite ease-in-out; }
    .nom-crumb1 { animation: crumb-a 1.5s infinite ease-out; }
    .nom-crumb2 { animation: crumb-b 1.5s 0.5s infinite ease-out; }
    @keyframes nom { 0%, 100% { transform: scaleY(1); } 50% { transform: scaleY(0.95); } }
    @keyframes crumb-a { 0% { opacity: 1; transform: translate(0,0); } 100% { opacity: 0; transform: translate(-2px,4px); } }
    @keyframes crumb-b { 0% { opacity: 1; transform: translate(0,0); } 100% { opacity: 0; transform: translate(2px,5px); } }
  `),
  shadow, legs,
  `<g class="eat-body"><g id="body-js"><g class="breathe-anim">
    <rect id="torso" x="2" y="6" width="11" height="7" fill="${BODY}"/>
    <rect x="0" y="9" width="2" height="2" fill="${BODY}"/>
    <rect x="13" y="9" width="2" height="2" fill="${BODY}"/>
    <g id="eyes-js" fill="${EYE}"><g class="eyes-blink">
      <rect x="4" y="8" width="1" height="2"/><rect x="10" y="8" width="1" height="2"/>
    </g></g>
  </g></g></g>`,
  `<g>
    <ellipse cx="7.5" cy="5" rx="4" ry="1.5" fill="#ddd" stroke="#bbb" stroke-width="0.3"/>
    <rect x="5" y="3.5" width="5" height="1.5" fill="#88cc44" rx="0.3"/>
    <rect class="nom-crumb1" x="5" y="5" width="0.5" height="0.5" fill="#88cc44"/>
    <rect class="nom-crumb2" x="9" y="5" width="0.5" height="0.5" fill="#88cc44"/>
  </g>`
].join('\n  '));

// 32. clawd-life-drink
animations['clawd-life-drink'] = svg([
  baseStyle(`
    .hold-cup { transform-origin: 14px 10px; animation: sip 3s infinite ease-in-out; }
    .steam1 { animation: steam-rise1 2s infinite ease-out; }
    .steam2 { animation: steam-rise2 2s 0.7s infinite ease-out; }
    .steam3 { animation: steam-rise3 2s 1.4s infinite ease-out; }
    @keyframes sip { 0%, 100% { transform: rotate(-15deg) translate(-1px,-2px); } 40%, 60% { transform: rotate(-25deg) translate(-2px,-3px); } }
    @keyframes steam-rise1 { 0% { opacity: 0.6; transform: translate(0,0); } 100% { opacity: 0; transform: translate(-1px,-5px); } }
    @keyframes steam-rise2 { 0% { opacity: 0.6; transform: translate(0,0); } 100% { opacity: 0; transform: translate(1px,-6px); } }
    @keyframes steam-rise3 { 0% { opacity: 0.6; transform: translate(0,0); } 100% { opacity: 0; transform: translate(0,-5px); } }
  `),
  shadow, legs,
  `<g id="body-js"><g class="breathe-anim">
    <rect id="torso" x="2" y="6" width="11" height="7" fill="${BODY}"/>
    <rect x="0" y="9" width="2" height="2" fill="${BODY}"/>
    <g class="hold-cup">
      <rect x="13" y="9" width="2" height="2" fill="${BODY}"/>
      <rect x="15" y="6" width="3" height="4" fill="#ddd"/>
      <rect x="15" y="6.5" width="3" height="2" fill="#8B4513" opacity="0.7"/>
      <rect x="18" y="7.5" width="1" height="1.5" fill="none" stroke="#ddd" stroke-width="0.3"/>
    </g>
    <g id="eyes-js" fill="${EYE}"><g class="eyes-blink">
      <rect x="4" y="8" width="1" height="2"/><rect x="10" y="8" width="1" height="2"/>
    </g></g>
  </g></g>`,
  `<g fill="#ccc" opacity="0.5">
    <rect class="steam1" x="16" y="5" width="0.5" height="1"/>
    <rect class="steam2" x="17" y="4" width="0.5" height="1"/>
    <rect class="steam3" x="16.5" y="4.5" width="0.5" height="1"/>
  </g>`
].join('\n  '));

// 33. clawd-life-cook
animations['clawd-life-cook'] = svg([
  baseStyle(`
    .stir { transform-origin: 1px 10px; animation: stir-pot 1.5s infinite ease-in-out; }
    .cook-steam1 { animation: cook-steam-a 2s infinite ease-out; }
    .cook-steam2 { animation: cook-steam-b 2s 0.6s infinite ease-out; }
    .cook-steam3 { animation: cook-steam-c 2s 1.2s infinite ease-out; }
    @keyframes stir-pot { 0%, 100% { transform: rotate(10deg); } 50% { transform: rotate(-10deg); } }
    @keyframes cook-steam-a { 0% { opacity: 0.5; transform: translate(0,0); } 100% { opacity: 0; transform: translate(-1px,-6px); } }
    @keyframes cook-steam-b { 0% { opacity: 0.5; transform: translate(0,0); } 100% { opacity: 0; transform: translate(1px,-7px); } }
    @keyframes cook-steam-c { 0% { opacity: 0.5; transform: translate(0,0); } 100% { opacity: 0; transform: translate(0,-6px); } }
  `),
  shadow, legs,
  `<g id="body-js"><g class="breathe-anim">
    <rect id="torso" x="2" y="6" width="11" height="7" fill="${BODY}"/>
    <g class="stir">
      <rect x="0" y="9" width="2" height="2" fill="${BODY}"/>
      <rect x="-2" y="7" width="0.5" height="5" fill="#8B6914"/>
    </g>
    <rect x="13" y="9" width="2" height="2" fill="${BODY}"/>
    <g id="eyes-js" fill="${EYE}"><g class="eyes-blink">
      <rect x="4" y="8" width="1" height="2"/><rect x="10" y="8" width="1" height="2"/>
    </g></g>
  </g></g>`,
  `<g>
    <rect x="-7" y="8" width="6" height="5" fill="#666"/>
    <rect x="-7.5" y="8" width="7" height="1" fill="#777"/>
    <rect class="cook-steam1" x="-5" y="7" width="0.5" height="1" fill="#ccc"/>
    <rect class="cook-steam2" x="-4" y="6" width="0.5" height="1" fill="#ccc"/>
    <rect class="cook-steam3" x="-3" y="7" width="0.5" height="1" fill="#ccc"/>
  </g>`
].join('\n  '));

// 34. clawd-life-clean
animations['clawd-life-clean'] = svg([
  baseStyle(`
    .mop-move { transform-origin: 1px 10px; animation: mop-sweep 1.2s infinite ease-in-out; }
    .sparkle1 { animation: clean-sparkle1 1.2s infinite ease-out; }
    .sparkle2 { animation: clean-sparkle2 1.2s 0.4s infinite ease-out; }
    @keyframes mop-sweep { 0%, 100% { transform: rotate(15deg); } 50% { transform: rotate(-15deg); } }
    @keyframes clean-sparkle1 { 0%, 100% { opacity: 0; } 50% { opacity: 1; } }
    @keyframes clean-sparkle2 { 0%, 100% { opacity: 0; } 50% { opacity: 1; } }
  `),
  shadow, legs,
  `<g id="body-js"><g class="breathe-anim">
    <rect id="torso" x="2" y="6" width="11" height="7" fill="${BODY}"/>
    <g class="mop-move">
      <rect x="0" y="9" width="2" height="2" fill="${BODY}"/>
      <rect x="-1" y="5" width="0.5" height="8" fill="#8B6914"/>
      <rect x="-2" y="13" width="3" height="1.5" fill="#aaa"/>
    </g>
    <rect x="13" y="9" width="2" height="2" fill="${BODY}"/>
    <g id="eyes-js" fill="${EYE}"><g class="eyes-blink">
      <rect x="4" y="8" width="1" height="2"/><rect x="10" y="8" width="1" height="2"/>
    </g></g>
  </g></g>`,
  `<g fill="#88ddff">
    <rect class="sparkle1" x="-4" y="12" width="1" height="1"/>
    <rect class="sparkle2" x="-2" y="11" width="0.8" height="0.8"/>
  </g>`
].join('\n  '));

// 35. clawd-life-exercise
animations['clawd-life-exercise'] = svg([
  baseStyle(`
    .pushup-body { transform-origin: 7.5px 15px; animation: pushup 1.5s infinite ease-in-out; }
    .sweat1 { animation: sweat-drop1 1.5s infinite ease-in; }
    .sweat2 { animation: sweat-drop2 1.5s 0.5s infinite ease-in; }
    @keyframes pushup { 0%, 100% { transform: translateY(0) scaleY(1); } 50% { transform: translateY(2px) scaleY(0.85); } }
    @keyframes sweat-drop1 { 0% { opacity: 0; transform: translate(0,0); } 50% { opacity: 1; } 100% { opacity: 0; transform: translate(-1px, 4px); } }
    @keyframes sweat-drop2 { 0% { opacity: 0; transform: translate(0,0); } 50% { opacity: 1; } 100% { opacity: 0; transform: translate(1px, 4px); } }
  `),
  shadow, legs,
  `<g class="pushup-body"><g id="body-js"><g class="breathe-anim">
    <rect id="torso" x="2" y="6" width="11" height="7" fill="${BODY}"/>
    <rect x="0" y="9" width="2" height="2" fill="${BODY}"/>
    <rect x="13" y="9" width="2" height="2" fill="${BODY}"/>
    <g id="eyes-js" fill="${EYE}"><g class="eyes-blink">
      <rect x="4" y="8" width="1" height="2"/><rect x="10" y="8" width="1" height="2"/>
    </g></g>
  </g></g></g>`,
  `<g fill="#66bbff">
    <rect class="sweat1" x="1" y="7" width="0.7" height="0.7"/>
    <rect class="sweat2" x="14" y="7" width="0.7" height="0.7"/>
  </g>`
].join('\n  '));

// 36. clawd-life-run
animations['clawd-life-run'] = svg([
  baseStyle(`
    .run-bounce { transform-origin: 7.5px 15px; animation: run-bob 0.4s infinite ease-in-out; }
    .run-leg-l { transform-origin: 4px 13px; animation: run-l 0.4s infinite ease-in-out; }
    .run-leg-r { transform-origin: 10px 13px; animation: run-r 0.4s infinite ease-in-out; }
    .run-arm-l { transform-origin: 1px 10px; animation: run-al 0.4s infinite ease-in-out; }
    .run-arm-r { transform-origin: 14px 10px; animation: run-ar 0.4s infinite ease-in-out; }
    .speed-line1 { animation: speed1 0.6s infinite linear; }
    .speed-line2 { animation: speed2 0.6s 0.2s infinite linear; }
    .speed-line3 { animation: speed3 0.6s 0.4s infinite linear; }
    @keyframes run-bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-1.5px); } }
    @keyframes run-l { 0%, 100% { transform: rotate(20deg); } 50% { transform: rotate(-20deg); } }
    @keyframes run-r { 0%, 100% { transform: rotate(-20deg); } 50% { transform: rotate(20deg); } }
    @keyframes run-al { 0%, 100% { transform: rotate(15deg); } 50% { transform: rotate(-15deg); } }
    @keyframes run-ar { 0%, 100% { transform: rotate(-15deg); } 50% { transform: rotate(15deg); } }
    @keyframes speed1 { 0% { opacity: 0.6; transform: translateX(0); } 100% { opacity: 0; transform: translateX(-5px); } }
    @keyframes speed2 { 0% { opacity: 0.6; transform: translateX(0); } 100% { opacity: 0; transform: translateX(-5px); } }
    @keyframes speed3 { 0% { opacity: 0.6; transform: translateX(0); } 100% { opacity: 0; transform: translateX(-5px); } }
  `),
  shadow,
  `<g id="legs" fill="${BODY}">
    <g class="run-leg-l"><rect x="3" y="11" width="1" height="4"/><rect x="5" y="11" width="1" height="4"/></g>
    <g class="run-leg-r"><rect x="9" y="11" width="1" height="4"/><rect x="11" y="11" width="1" height="4"/></g>
  </g>`,
  `<g class="run-bounce"><g id="body-js"><g class="breathe-anim">
    <rect id="torso" x="2" y="6" width="11" height="7" fill="${BODY}"/>
    <g class="run-arm-l"><rect x="0" y="9" width="2" height="2" fill="${BODY}"/></g>
    <g class="run-arm-r"><rect x="13" y="9" width="2" height="2" fill="${BODY}"/></g>
    <g id="eyes-js" fill="${EYE}"><g class="eyes-blink">
      <rect x="4" y="8" width="1" height="2"/><rect x="10" y="8" width="1" height="2"/>
    </g></g>
  </g></g></g>`,
  `<g fill="#ccc" opacity="0.4">
    <rect class="speed-line1" x="-3" y="8" width="3" height="0.3"/>
    <rect class="speed-line2" x="-3" y="10" width="4" height="0.3"/>
    <rect class="speed-line3" x="-3" y="12" width="3" height="0.3"/>
  </g>`
].join('\n  '));

// 37. clawd-life-shower
animations['clawd-life-shower'] = svg([
  baseStyle(`
    .drop1 { animation: water-fall1 1s infinite linear; }
    .drop2 { animation: water-fall2 1s 0.2s infinite linear; }
    .drop3 { animation: water-fall3 1s 0.4s infinite linear; }
    .drop4 { animation: water-fall4 1s 0.6s infinite linear; }
    .drop5 { animation: water-fall5 1s 0.8s infinite linear; }
    .happy-eyes { animation: happy-squint 3s infinite ease-in-out; }
    @keyframes water-fall1 { 0% { transform: translateY(-15px); opacity: 0; } 20% { opacity: 1; } 100% { transform: translateY(10px); opacity: 0; } }
    @keyframes water-fall2 { 0% { transform: translateY(-15px); opacity: 0; } 20% { opacity: 1; } 100% { transform: translateY(10px); opacity: 0; } }
    @keyframes water-fall3 { 0% { transform: translateY(-15px); opacity: 0; } 20% { opacity: 1; } 100% { transform: translateY(10px); opacity: 0; } }
    @keyframes water-fall4 { 0% { transform: translateY(-15px); opacity: 0; } 20% { opacity: 1; } 100% { transform: translateY(10px); opacity: 0; } }
    @keyframes water-fall5 { 0% { transform: translateY(-15px); opacity: 0; } 20% { opacity: 1; } 100% { transform: translateY(10px); opacity: 0; } }
    @keyframes happy-squint { 0%, 100% { transform: scaleY(0.5); } 50% { transform: scaleY(0.3); } }
  `),
  shadow, legs,
  `<g id="body-js"><g class="breathe-anim">
    <rect id="torso" x="2" y="6" width="11" height="7" fill="${BODY}"/>
    <rect x="0" y="9" width="2" height="2" fill="${BODY}"/>
    <rect x="13" y="9" width="2" height="2" fill="${BODY}"/>
    <g id="eyes-js" fill="${EYE}"><g class="happy-eyes">
      <rect x="4" y="9" width="1" height="1"/><rect x="10" y="9" width="1" height="1"/>
    </g></g>
  </g></g>`,
  `<rect x="3" y="-10" width="9" height="1.5" fill="#888"/>
  <g fill="#66bbff" opacity="0.6">
    <rect class="drop1" x="4" y="-5" width="0.5" height="1.5"/>
    <rect class="drop2" x="6" y="-5" width="0.5" height="1.5"/>
    <rect class="drop3" x="8" y="-5" width="0.5" height="1.5"/>
    <rect class="drop4" x="10" y="-5" width="0.5" height="1.5"/>
    <rect class="drop5" x="5" y="-5" width="0.5" height="1.5"/>
  </g>`
].join('\n  '));

// 38. clawd-life-dress
animations['clawd-life-dress'] = svg([
  baseStyle(`
    .hat-on { animation: hat-place 3s infinite ease-in-out; }
    .arm-place { transform-origin: 14px 10px; animation: arm-hat 3s infinite ease-in-out; }
    @keyframes hat-place { 0%, 100% { transform: translateY(-2px) rotate(-5deg); } 40%, 60% { transform: translateY(0) rotate(0deg); } }
    @keyframes arm-hat { 0%, 100% { transform: rotate(-50deg) translate(0,-4px); } 40%, 60% { transform: rotate(-30deg) translate(0,-2px); } }
  `),
  shadow, legs,
  `<g id="body-js"><g class="breathe-anim">
    <rect id="torso" x="2" y="6" width="11" height="7" fill="${BODY}"/>
    <rect x="0" y="9" width="2" height="2" fill="${BODY}"/>
    <g class="arm-place"><rect x="13" y="9" width="2" height="2" fill="${BODY}"/></g>
    <g id="eyes-js" fill="${EYE}"><g class="eyes-blink">
      <rect x="4" y="8" width="1" height="2"/><rect x="10" y="8" width="1" height="2"/>
    </g></g>
  </g></g>`,
  `<g class="hat-on">
    <rect x="3" y="4" width="9" height="2" fill="#4444cc"/>
    <rect x="1" y="6" width="13" height="1" fill="#4444cc"/>
  </g>`
].join('\n  '));

// 39. clawd-life-garden
animations['clawd-life-garden'] = svg([
  baseStyle(`
    .water-pour { transform-origin: 1px 10px; animation: pour 3s infinite ease-in-out; }
    .water-stream { animation: stream-flow 3s infinite ease-in-out; }
    .plant-grow { transform-origin: -5px 15px; animation: grow 6s infinite ease-in-out; }
    @keyframes pour { 0%, 100% { transform: rotate(0deg); } 30%, 70% { transform: rotate(-20deg) translate(-2px,-2px); } }
    @keyframes stream-flow { 0%, 20%, 80%, 100% { opacity: 0; } 30%, 70% { opacity: 0.6; } }
    @keyframes grow { 0%, 100% { transform: scaleY(1); } 50% { transform: scaleY(1.2); } }
  `),
  shadow, legs,
  `<g id="body-js"><g class="breathe-anim">
    <rect id="torso" x="2" y="6" width="11" height="7" fill="${BODY}"/>
    <g class="water-pour">
      <rect x="0" y="9" width="2" height="2" fill="${BODY}"/>
      <rect x="-4" y="7" width="4" height="3" fill="#888"/>
      <rect x="-5" y="7" width="1.5" height="0.5" fill="#888"/>
    </g>
    <rect x="13" y="9" width="2" height="2" fill="${BODY}"/>
    <g id="eyes-js" fill="${EYE}"><g class="eyes-blink">
      <rect x="4" y="8" width="1" height="2"/><rect x="10" y="8" width="1" height="2"/>
    </g></g>
  </g></g>`,
  `<rect class="water-stream" x="-5" y="10" width="0.5" height="4" fill="#66bbff" opacity="0"/>`,
  `<g class="plant-grow">
    <rect x="-6" y="12" width="2" height="3" fill="#44aa44"/>
    <rect x="-7" y="11" width="1.5" height="1.5" fill="#66cc66"/>
    <rect x="-5" y="10" width="1.5" height="1.5" fill="#66cc66"/>
    <rect x="-7" y="14" width="4" height="1" fill="#8B6914"/>
  </g>`
].join('\n  '));

// 40. clawd-life-fish
animations['clawd-life-fish'] = svg([
  baseStyle(`
    .rod-hold { transform-origin: 14px 10px; animation: rod-bob 3s infinite ease-in-out; }
    .line-bob { animation: line-swing 3s infinite ease-in-out; }
    .fish-bite { animation: fish-nibble 3s infinite ease-in-out; }
    @keyframes rod-bob { 0%, 100% { transform: rotate(-30deg) translate(0,-2px); } 60%, 80% { transform: rotate(-35deg) translate(0,-3px); } }
    @keyframes line-swing { 0%, 100% { transform: rotate(-1deg); } 50% { transform: rotate(1deg); } }
    @keyframes fish-nibble { 0%, 50%, 100% { transform: translateY(0); } 60%, 70% { transform: translateY(-1px); } }
  `),
  shadow, legs,
  `<g id="body-js"><g class="breathe-anim">
    <rect id="torso" x="2" y="6" width="11" height="7" fill="${BODY}"/>
    <rect x="0" y="9" width="2" height="2" fill="${BODY}"/>
    <g class="rod-hold">
      <rect x="13" y="9" width="2" height="2" fill="${BODY}"/>
      <rect x="15" y="3" width="0.5" height="8" fill="#8B6914"/>
      <g class="line-bob">
        <line x1="15.25" y1="3" x2="20" y2="12" stroke="#888" stroke-width="0.2"/>
        <g class="fish-bite">
          <rect x="19" y="12" width="2" height="1" fill="#4488ff"/>
          <rect x="21" y="12" width="1" height="0.5" fill="#4488ff"/>
        </g>
      </g>
    </g>
    <g id="eyes-js" fill="${EYE}"><g class="eyes-blink">
      <rect x="4" y="8" width="1" height="2"/><rect x="10" y="8" width="1" height="2"/>
    </g></g>
  </g></g>`
].join('\n  '));

// ============================================================
// EMOTIONS (10)
// ============================================================

// 41. clawd-emotion-love
animations['clawd-emotion-love'] = svg([
  baseStyle(`
    .heart1 { animation: heart-float1 2s infinite ease-out; }
    .heart2 { animation: heart-float2 2s 0.5s infinite ease-out; }
    .heart3 { animation: heart-float3 2s 1s infinite ease-out; }
    .heart4 { animation: heart-float4 2s 1.5s infinite ease-out; }
    .love-eyes { animation: love-pulse 1s infinite ease-in-out; }
    @keyframes heart-float1 { 0% { opacity: 1; transform: translate(0,0) scale(0.5); } 100% { opacity: 0; transform: translate(-3px,-10px) scale(1); } }
    @keyframes heart-float2 { 0% { opacity: 1; transform: translate(0,0) scale(0.5); } 100% { opacity: 0; transform: translate(2px,-12px) scale(1); } }
    @keyframes heart-float3 { 0% { opacity: 1; transform: translate(0,0) scale(0.5); } 100% { opacity: 0; transform: translate(-1px,-11px) scale(1); } }
    @keyframes heart-float4 { 0% { opacity: 1; transform: translate(0,0) scale(0.5); } 100% { opacity: 0; transform: translate(4px,-9px) scale(1); } }
    @keyframes love-pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.1); } }
  `),
  shadow, legs,
  `<g id="body-js"><g class="breathe-anim love-eyes">
    <rect id="torso" x="2" y="6" width="11" height="7" fill="${BODY}"/>
    <rect x="0" y="9" width="2" height="2" fill="${BODY}"/>
    <rect x="13" y="9" width="2" height="2" fill="${BODY}"/>
    <g id="eyes-js" fill="#ff4488">
      <rect x="4" y="8" width="1.5" height="1.5"/><rect x="9.5" y="8" width="1.5" height="1.5"/>
    </g>
  </g></g>`,
  `<g fill="#ff4488">
    <rect class="heart1" x="4" y="3" width="2" height="2" rx="0.5"/>
    <rect class="heart2" x="9" y="2" width="2" height="2" rx="0.5"/>
    <rect class="heart3" x="6" y="1" width="2" height="2" rx="0.5"/>
    <rect class="heart4" x="12" y="3" width="2" height="2" rx="0.5"/>
  </g>`
].join('\n  '));

// 42. clawd-emotion-angry
animations['clawd-emotion-angry'] = svg([
  baseStyle(`
    .angry-shake { transform-origin: 7.5px 15px; animation: shake 0.15s infinite linear; }
    .steam-l { animation: angry-steam-l 1s infinite ease-out; }
    .steam-r { animation: angry-steam-r 1s 0.3s infinite ease-out; }
    .angry-face { animation: angry-pulse 0.5s infinite ease-in-out; }
    @keyframes shake { 0%, 100% { transform: translateX(-0.5px); } 50% { transform: translateX(0.5px); } }
    @keyframes angry-steam-l { 0% { opacity: 0.8; transform: translate(0,0); } 100% { opacity: 0; transform: translate(-2px,-5px); } }
    @keyframes angry-steam-r { 0% { opacity: 0.8; transform: translate(0,0); } 100% { opacity: 0; transform: translate(2px,-5px); } }
    @keyframes angry-pulse { 0%, 100% { fill: #DE886D; } 50% { fill: #ee6655; } }
  `),
  shadow, legs,
  `<g class="angry-shake"><g id="body-js"><g class="breathe-anim">
    <rect id="torso" x="2" y="6" width="11" height="7" class="angry-face"/>
    <rect x="0" y="9" width="2" height="2" fill="${BODY}"/>
    <rect x="13" y="9" width="2" height="2" fill="${BODY}"/>
    <g id="eyes-js" fill="${EYE}">
      <rect x="4" y="8" width="1.5" height="1" transform="rotate(-10,4.5,8.5)"/>
      <rect x="10" y="8" width="1.5" height="1" transform="rotate(10,10.5,8.5)"/>
    </g>
    <rect x="5" y="7" width="2" height="0.5" fill="${EYE}" transform="rotate(15,6,7)"/>
    <rect x="9" y="7" width="2" height="0.5" fill="${EYE}" transform="rotate(-15,10,7)"/>
  </g></g></g>`,
  `<g fill="#ff4444" opacity="0.6">
    <rect class="steam-l" x="2" y="4" width="1" height="1.5"/>
    <rect class="steam-r" x="12" y="4" width="1" height="1.5"/>
  </g>`
].join('\n  '));

// 43. clawd-emotion-confused
animations['clawd-emotion-confused'] = svg([
  baseStyle(`
    .qmark1 { animation: q-spin1 3s infinite linear; }
    .qmark2 { animation: q-spin2 3s 1s infinite linear; }
    .qmark3 { animation: q-spin3 3s 2s infinite linear; }
    .confused-tilt { transform-origin: 7.5px 10px; animation: head-tilt 3s infinite ease-in-out; }
    @keyframes q-spin1 { 0% { transform: translate(0,0) rotate(0deg); opacity: 0; } 20% { opacity: 1; } 100% { transform: translate(-3px,-8px) rotate(180deg); opacity: 0; } }
    @keyframes q-spin2 { 0% { transform: translate(0,0) rotate(0deg); opacity: 0; } 20% { opacity: 1; } 100% { transform: translate(4px,-9px) rotate(-180deg); opacity: 0; } }
    @keyframes q-spin3 { 0% { transform: translate(0,0) rotate(0deg); opacity: 0; } 20% { opacity: 1; } 100% { transform: translate(-1px,-7px) rotate(180deg); opacity: 0; } }
    @keyframes head-tilt { 0%, 100% { transform: rotate(-5deg); } 50% { transform: rotate(5deg); } }
  `),
  shadow, legs,
  `<g class="confused-tilt"><g id="body-js"><g class="breathe-anim">
    <rect id="torso" x="2" y="6" width="11" height="7" fill="${BODY}"/>
    <rect x="0" y="9" width="2" height="2" fill="${BODY}"/>
    <rect x="13" y="9" width="2" height="2" fill="${BODY}"/>
    <g id="eyes-js" fill="${EYE}"><g class="eyes-blink">
      <rect x="4" y="8" width="1" height="2"/><rect x="10" y="8" width="1" height="2"/>
    </g></g>
  </g></g></g>`,
  `<g fill="#FFD700" font-family="monospace" font-weight="bold" font-size="4">
    <text class="qmark1" x="5" y="4">?</text>
    <text class="qmark2" x="10" y="3">?</text>
    <text class="qmark3" x="7" y="2">?</text>
  </g>`
].join('\n  '));

// 44. clawd-emotion-excited
animations['clawd-emotion-excited'] = svg([
  baseStyle(`
    .excited-jump { transform-origin: 7.5px 15px; animation: exc-jump 0.5s infinite ease-in-out; }
    .sparkle-e1 { animation: sparkle-a 1s infinite ease-out; }
    .sparkle-e2 { animation: sparkle-b 1s 0.3s infinite ease-out; }
    .sparkle-e3 { animation: sparkle-c 1s 0.6s infinite ease-out; }
    .sparkle-e4 { animation: sparkle-d 1s 0.9s infinite ease-out; }
    @keyframes exc-jump { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
    @keyframes sparkle-a { 0% { opacity: 1; transform: translate(0,0); } 100% { opacity: 0; transform: translate(-4px,-6px); } }
    @keyframes sparkle-b { 0% { opacity: 1; transform: translate(0,0); } 100% { opacity: 0; transform: translate(5px,-5px); } }
    @keyframes sparkle-c { 0% { opacity: 1; transform: translate(0,0); } 100% { opacity: 0; transform: translate(-3px,-7px); } }
    @keyframes sparkle-d { 0% { opacity: 1; transform: translate(0,0); } 100% { opacity: 0; transform: translate(4px,-8px); } }
  `),
  shadow,
  `<g class="excited-jump">`, legs,
  `<g id="body-js"><g class="breathe-anim">
    <rect id="torso" x="2" y="6" width="11" height="7" fill="${BODY}"/>
    <rect x="0" y="9" width="2" height="2" fill="${BODY}"/>
    <rect x="13" y="9" width="2" height="2" fill="${BODY}"/>
    <g id="eyes-js" fill="${EYE}">
      <rect x="4" y="7" width="1.5" height="2.5"/><rect x="10" y="7" width="1.5" height="2.5"/>
    </g>
  </g></g></g>`,
  `<g fill="#FFD700">
    <rect class="sparkle-e1" x="1" y="4" width="1" height="1"/>
    <rect class="sparkle-e2" x="13" y="3" width="1" height="1"/>
    <rect class="sparkle-e3" x="5" y="2" width="1" height="1"/>
    <rect class="sparkle-e4" x="10" y="1" width="1" height="1"/>
  </g>`
].join('\n  '));

// 45. clawd-emotion-scared
animations['clawd-emotion-scared'] = svg([
  baseStyle(`
    .scared-shake { transform-origin: 7.5px 15px; animation: scare-shake 0.2s infinite linear; }
    .sweat-s1 { animation: sweat-a 1.5s infinite ease-in; }
    .sweat-s2 { animation: sweat-b 1.5s 0.5s infinite ease-in; }
    .wide-scared { animation: scare-eyes 2s infinite ease-in-out; }
    @keyframes scare-shake { 0%, 100% { transform: translateX(-0.3px); } 50% { transform: translateX(0.3px); } }
    @keyframes sweat-a { 0% { opacity: 0; transform: translate(0,0); } 30% { opacity: 1; } 100% { opacity: 0; transform: translate(-1px,5px); } }
    @keyframes sweat-b { 0% { opacity: 0; transform: translate(0,0); } 30% { opacity: 1; } 100% { opacity: 0; transform: translate(1px,5px); } }
    @keyframes scare-eyes { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.1); } }
  `),
  shadow, legs,
  `<g class="scared-shake"><g id="body-js"><g class="breathe-anim">
    <rect id="torso" x="2" y="6" width="11" height="7" fill="${BODY}"/>
    <rect x="0" y="9" width="2" height="2" fill="${BODY}"/>
    <rect x="13" y="9" width="2" height="2" fill="${BODY}"/>
    <g id="eyes-js" fill="${EYE}"><g class="wide-scared">
      <rect x="3.5" y="7.5" width="2" height="2.5"/><rect x="9.5" y="7.5" width="2" height="2.5"/>
      <rect x="4" y="8" width="1" height="1" fill="white"/>
      <rect x="10" y="8" width="1" height="1" fill="white"/>
    </g></g>
  </g></g></g>`,
  `<g fill="#66bbff">
    <rect class="sweat-s1" x="1" y="7" width="0.7" height="1"/>
    <rect class="sweat-s2" x="14" y="7" width="0.7" height="1"/>
  </g>`
].join('\n  '));

// 46. clawd-emotion-proud
animations['clawd-emotion-proud'] = svg([
  baseStyle(`
    .proud-puff { transform-origin: 7.5px 13px; animation: puff-chest 3s infinite ease-in-out; }
    .sparkle-p1 { animation: proud-sparkle1 2s infinite ease-in-out; }
    .sparkle-p2 { animation: proud-sparkle2 2s 0.7s infinite ease-in-out; }
    .sparkle-p3 { animation: proud-sparkle3 2s 1.4s infinite ease-in-out; }
    @keyframes puff-chest { 0%, 100% { transform: scale(1, 1); } 50% { transform: scale(1.06, 1.02); } }
    @keyframes proud-sparkle1 { 0%, 100% { opacity: 0; } 50% { opacity: 1; } }
    @keyframes proud-sparkle2 { 0%, 100% { opacity: 0; } 50% { opacity: 1; } }
    @keyframes proud-sparkle3 { 0%, 100% { opacity: 0; } 50% { opacity: 1; } }
  `),
  shadow, legs,
  `<g id="body-js"><g class="proud-puff">
    <rect id="torso" x="2" y="6" width="11" height="7" fill="${BODY}"/>
    <rect x="0" y="9" width="2" height="2" fill="${BODY}"/>
    <rect x="13" y="9" width="2" height="2" fill="${BODY}"/>
    <g id="eyes-js" fill="${EYE}"><g class="eyes-blink">
      <rect x="4" y="9" width="1" height="0.8"/><rect x="10" y="9" width="1" height="0.8"/>
    </g></g>
  </g></g>`,
  `<g fill="#FFD700">
    <rect class="sparkle-p1" x="1" y="6" width="1" height="1" opacity="0"/>
    <rect class="sparkle-p2" x="14" y="7" width="1" height="1" opacity="0"/>
    <rect class="sparkle-p3" x="7" y="4" width="1" height="1" opacity="0"/>
  </g>`
].join('\n  '));

// 47. clawd-emotion-shy
animations['clawd-emotion-shy'] = svg([
  baseStyle(`
    .shy-turn { transform-origin: 7.5px 10px; animation: turn-away 4s infinite ease-in-out; }
    .blush { animation: blush-pulse 2s infinite ease-in-out; }
    @keyframes turn-away { 0%, 100% { transform: rotate(0deg) scaleX(1); } 30%, 70% { transform: rotate(-5deg) scaleX(0.95); } }
    @keyframes blush-pulse { 0%, 100% { opacity: 0.3; } 50% { opacity: 0.7; } }
  `),
  shadow, legs,
  `<g class="shy-turn"><g id="body-js"><g class="breathe-anim">
    <rect id="torso" x="2" y="6" width="11" height="7" fill="${BODY}"/>
    <rect x="0" y="9" width="2" height="2" fill="${BODY}"/>
    <rect x="13" y="9" width="2" height="2" fill="${BODY}"/>
    <g id="eyes-js" fill="${EYE}"><g class="eyes-blink">
      <rect x="4" y="8" width="1" height="2"/><rect x="10" y="8" width="1" height="2"/>
    </g></g>
    <rect class="blush" x="3" y="10" width="2" height="1" fill="#ff8888" opacity="0.3"/>
    <rect class="blush" x="10" y="10" width="2" height="1" fill="#ff8888" opacity="0.3"/>
  </g></g></g>`
].join('\n  '));

// 48. clawd-emotion-cry
animations['clawd-emotion-cry'] = svg([
  baseStyle(`
    .tear-l1 { animation: tear-fall-l 1s infinite linear; }
    .tear-l2 { animation: tear-fall-l 1s 0.5s infinite linear; }
    .tear-r1 { animation: tear-fall-r 1s 0.2s infinite linear; }
    .tear-r2 { animation: tear-fall-r 1s 0.7s infinite linear; }
    .sob-body { transform-origin: 7.5px 10px; animation: sob 1s infinite ease-in-out; }
    @keyframes tear-fall-l { 0% { transform: translate(0,0); opacity: 1; } 100% { transform: translate(-1px,6px); opacity: 0; } }
    @keyframes tear-fall-r { 0% { transform: translate(0,0); opacity: 1; } 100% { transform: translate(1px,6px); opacity: 0; } }
    @keyframes sob { 0%, 100% { transform: scaleY(1); } 50% { transform: scaleY(0.95); } }
  `),
  shadow, legs,
  `<g class="sob-body"><g id="body-js"><g class="breathe-anim">
    <rect id="torso" x="2" y="6" width="11" height="7" fill="${BODY}"/>
    <rect x="0" y="9" width="2" height="2" fill="${BODY}"/>
    <rect x="13" y="9" width="2" height="2" fill="${BODY}"/>
    <g id="eyes-js" fill="${EYE}">
      <rect x="4" y="9" width="1.5" height="0.5"/><rect x="10" y="9" width="1.5" height="0.5"/>
    </g>
  </g></g></g>`,
  `<g fill="#66bbff">
    <rect class="tear-l1" x="4.5" y="10" width="0.5" height="1"/>
    <rect class="tear-l2" x="4.5" y="10" width="0.5" height="1"/>
    <rect class="tear-r1" x="10.5" y="10" width="0.5" height="1"/>
    <rect class="tear-r2" x="10.5" y="10" width="0.5" height="1"/>
  </g>`
].join('\n  '));

// 49. clawd-emotion-laugh
animations['clawd-emotion-laugh'] = svg([
  baseStyle(`
    .laugh-shake { transform-origin: 7.5px 13px; animation: ha-shake 0.3s infinite ease-in-out; }
    .ha1 { animation: ha-float1 2s infinite ease-out; }
    .ha2 { animation: ha-float2 2s 0.7s infinite ease-out; }
    .ha3 { animation: ha-float3 2s 1.4s infinite ease-out; }
    @keyframes ha-shake { 0%, 100% { transform: rotate(-2deg); } 50% { transform: rotate(2deg); } }
    @keyframes ha-float1 { 0% { opacity: 1; transform: translate(0,0); } 100% { opacity: 0; transform: translate(-2px,-7px); } }
    @keyframes ha-float2 { 0% { opacity: 1; transform: translate(0,0); } 100% { opacity: 0; transform: translate(3px,-8px); } }
    @keyframes ha-float3 { 0% { opacity: 1; transform: translate(0,0); } 100% { opacity: 0; transform: translate(-1px,-6px); } }
  `),
  shadow, legs,
  `<g class="laugh-shake"><g id="body-js"><g class="breathe-anim">
    <rect id="torso" x="2" y="6" width="11" height="7" fill="${BODY}"/>
    <rect x="0" y="9" width="2" height="2" fill="${BODY}"/>
    <rect x="13" y="9" width="2" height="2" fill="${BODY}"/>
    <g id="eyes-js" fill="${EYE}">
      <rect x="4" y="9" width="1.5" height="0.5"/><rect x="10" y="9" width="1.5" height="0.5"/>
    </g>
    <rect x="5" y="11" width="5" height="1" fill="#aa4444" rx="0.3"/>
  </g></g></g>`,
  `<g fill="#ff8844" font-family="monospace" font-size="2.5" font-weight="bold">
    <text class="ha1" x="3" y="4">ha</text>
    <text class="ha2" x="9" y="3">ha</text>
    <text class="ha3" x="6" y="2">ha</text>
  </g>`
].join('\n  '));

// 50. clawd-emotion-surprise
animations['clawd-emotion-surprise'] = svg([
  baseStyle(`
    .surprise-jump { transform-origin: 7.5px 15px; animation: jump-back 2s infinite ease-out; }
    .exclaim { animation: exclaim-appear 2s infinite ease-out; }
    @keyframes jump-back { 0%, 100% { transform: translate(0,0) scale(1); } 20%, 40% { transform: translate(-2px, -3px) scale(1.05); } }
    @keyframes exclaim-appear { 0%, 100% { opacity: 0; transform: scale(0.5); } 20%, 60% { opacity: 1; transform: scale(1); } }
  `),
  shadow, legs,
  `<g class="surprise-jump"><g id="body-js"><g class="breathe-anim">
    <rect id="torso" x="2" y="6" width="11" height="7" fill="${BODY}"/>
    <rect x="0" y="9" width="2" height="2" fill="${BODY}"/>
    <rect x="13" y="9" width="2" height="2" fill="${BODY}"/>
    <g id="eyes-js" fill="${EYE}">
      <rect x="3.5" y="7.5" width="2" height="2.5"/><rect x="9.5" y="7.5" width="2" height="2.5"/>
    </g>
  </g></g></g>`,
  `<g class="exclaim" fill="#ff4444" font-family="monospace" font-size="6" font-weight="bold">
    <text x="6" y="-2">!</text>
  </g>`
].join('\n  '));

// ============================================================
// SOCIAL/INTERACTIVE (10)
// ============================================================

// 51. clawd-social-hello
animations['clawd-social-hello'] = svg([
  baseStyle(`
    .hello-wave { transform-origin: 14px 10px; animation: wave-fast 0.5s infinite ease-in-out; }
    .hello-body { transform-origin: 7.5px 15px; animation: hello-bounce 1s infinite ease-in-out; }
    @keyframes wave-fast { 0%, 100% { transform: rotate(-50deg) translate(1px,-4px); } 50% { transform: rotate(-80deg) translate(2px,-5px); } }
    @keyframes hello-bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-1px); } }
  `),
  shadow, legs,
  `<g class="hello-body"><g id="body-js"><g class="breathe-anim">
    <rect id="torso" x="2" y="6" width="11" height="7" fill="${BODY}"/>
    <rect x="0" y="9" width="2" height="2" fill="${BODY}"/>
    <g class="hello-wave"><rect x="13" y="9" width="2" height="2" fill="${BODY}"/></g>
    <g id="eyes-js" fill="${EYE}"><g class="eyes-blink">
      <rect x="4" y="8" width="1" height="2"/><rect x="10" y="8" width="1" height="2"/>
    </g></g>
  </g></g></g>`
].join('\n  '));

// 52. clawd-social-bye
animations['clawd-social-bye'] = svg([
  baseStyle(`
    .bye-wave { transform-origin: 14px 10px; animation: slow-wave 2s infinite ease-in-out; }
    .sad-body { transform-origin: 7.5px 13px; animation: sad-droop 3s infinite ease-in-out; }
    @keyframes slow-wave { 0%, 100% { transform: rotate(-30deg) translate(0,-2px); } 50% { transform: rotate(-50deg) translate(0,-3px); } }
    @keyframes sad-droop { 0%, 100% { transform: scaleY(1); } 50% { transform: scaleY(0.97); } }
  `),
  shadow, legs,
  `<g class="sad-body"><g id="body-js"><g class="breathe-anim">
    <rect id="torso" x="2" y="6" width="11" height="7" fill="${BODY}"/>
    <rect x="0" y="9" width="2" height="2" fill="${BODY}"/>
    <g class="bye-wave"><rect x="13" y="9" width="2" height="2" fill="${BODY}"/></g>
    <g id="eyes-js" fill="${EYE}">
      <rect x="4" y="9" width="1" height="1"/><rect x="10" y="9" width="1" height="1"/>
    </g>
  </g></g></g>`
].join('\n  '));

// 53. clawd-social-highfive
animations['clawd-social-highfive'] = svg([
  baseStyle(`
    .hf-arm { transform-origin: 14px 10px; animation: highfive-up 2s infinite ease-in-out; }
    .hf-spark { animation: hf-sparkle 2s infinite ease-out; }
    @keyframes highfive-up { 0%, 100% { transform: rotate(-80deg) translate(1px,-5px); } 40%, 60% { transform: rotate(-90deg) translate(2px,-6px); } }
    @keyframes hf-sparkle { 0%, 30%, 100% { opacity: 0; } 40%, 60% { opacity: 1; } }
  `),
  shadow, legs,
  `<g id="body-js"><g class="breathe-anim">
    <rect id="torso" x="2" y="6" width="11" height="7" fill="${BODY}"/>
    <rect x="0" y="9" width="2" height="2" fill="${BODY}"/>
    <g class="hf-arm"><rect x="13" y="9" width="2" height="2" fill="${BODY}"/></g>
    <g id="eyes-js" fill="${EYE}"><g class="eyes-blink">
      <rect x="4" y="8" width="1" height="2"/><rect x="10" y="8" width="1" height="2"/>
    </g></g>
  </g></g>`,
  `<g fill="#FFD700">
    <rect class="hf-spark" x="15" y="2" width="1" height="1"/>
    <rect class="hf-spark" x="17" y="3" width="0.8" height="0.8"/>
    <rect class="hf-spark" x="14" y="0" width="0.8" height="0.8"/>
  </g>`
].join('\n  '));

// 54. clawd-social-hug
animations['clawd-social-hug'] = svg([
  baseStyle(`
    .hug-squeeze { transform-origin: 7.5px 10px; animation: hug-pulse 2s infinite ease-in-out; }
    .arm-wrap-l { transform-origin: 1px 10px; animation: wrap-l 2s infinite ease-in-out; }
    .arm-wrap-r { transform-origin: 14px 10px; animation: wrap-r 2s infinite ease-in-out; }
    @keyframes hug-pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05, 0.95); } }
    @keyframes wrap-l { 0%, 100% { transform: rotate(20deg) translate(1px, 0); } 50% { transform: rotate(30deg) translate(1.5px, 0); } }
    @keyframes wrap-r { 0%, 100% { transform: rotate(-20deg) translate(-1px, 0); } 50% { transform: rotate(-30deg) translate(-1.5px, 0); } }
  `),
  shadow, legs,
  `<g class="hug-squeeze"><g id="body-js"><g class="breathe-anim">
    <rect id="torso" x="2" y="6" width="11" height="7" fill="${BODY}"/>
    <g class="arm-wrap-l"><rect x="0" y="9" width="2" height="2" fill="${BODY}"/></g>
    <g class="arm-wrap-r"><rect x="13" y="9" width="2" height="2" fill="${BODY}"/></g>
    <g id="eyes-js" fill="${EYE}">
      <rect x="4" y="9" width="1" height="0.5"/><rect x="10" y="9" width="1" height="0.5"/>
    </g>
  </g></g></g>`
].join('\n  '));

// 55. clawd-social-peek
animations['clawd-social-peek'] = svg([
  baseStyle(`
    .peek-body { animation: peek-slide 4s infinite ease-in-out; }
    .peek-eyes { animation: peek-look 4s infinite ease-in-out; }
    @keyframes peek-slide { 0%, 100% { transform: translateX(-5px); } 30%, 70% { transform: translateX(0); } }
    @keyframes peek-look { 0%, 100% { transform: translateX(0); } 30%, 70% { transform: translateX(1px); } }
  `),
  shadow,
  `<rect x="-10" y="2" width="6" height="13" fill="#8B6914"/>`,
  legs,
  `<g class="peek-body"><g id="body-js"><g class="breathe-anim">
    <rect id="torso" x="2" y="6" width="11" height="7" fill="${BODY}"/>
    <rect x="0" y="9" width="2" height="2" fill="${BODY}"/>
    <rect x="13" y="9" width="2" height="2" fill="${BODY}"/>
    <g id="eyes-js" fill="${EYE}"><g class="peek-eyes eyes-blink">
      <rect x="4" y="8" width="1" height="2"/><rect x="10" y="8" width="1" height="2"/>
    </g></g>
  </g></g></g>`
].join('\n  '));

// 56. clawd-social-hide
animations['clawd-social-hide'] = svg([
  baseStyle(`
    .hide-body { animation: hide-duck 4s infinite ease-in-out; }
    .hide-eyes { animation: hide-peek 4s infinite ease-in-out; }
    @keyframes hide-duck { 0%, 100% { transform: translateY(0); } 30%, 70% { transform: translateY(5px); } }
    @keyframes hide-peek { 0%, 100% { transform: scaleY(0.3); } 30%, 70% { transform: scaleY(1); } }
  `),
  shadow,
  `<g class="hide-body">`, legs,
  `<g id="body-js"><g class="breathe-anim">
    <rect id="torso" x="2" y="6" width="11" height="7" fill="${BODY}"/>
    <rect x="0" y="9" width="2" height="2" fill="${BODY}"/>
    <rect x="13" y="9" width="2" height="2" fill="${BODY}"/>
    <g id="eyes-js" fill="${EYE}"><g class="hide-eyes">
      <rect x="4" y="8" width="1.5" height="2"/><rect x="10" y="8" width="1.5" height="2"/>
    </g></g>
  </g></g></g>`,
  `<rect x="-2" y="8" width="19" height="8" fill="#8B6914"/>`
].join('\n  '));

// 57. clawd-social-point
animations['clawd-social-point'] = svg([
  baseStyle(`
    .point-arm { transform-origin: 14px 10px; animation: point-extend 2s infinite ease-in-out; }
    .point-dot { animation: point-pulse 2s infinite ease-in-out; }
    @keyframes point-extend { 0%, 100% { transform: rotate(-10deg) translate(2px, -1px); } 50% { transform: rotate(-15deg) translate(3px, -1px); } }
    @keyframes point-pulse { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }
  `),
  shadow, legs,
  `<g id="body-js"><g class="breathe-anim">
    <rect id="torso" x="2" y="6" width="11" height="7" fill="${BODY}"/>
    <rect x="0" y="9" width="2" height="2" fill="${BODY}"/>
    <g class="point-arm">
      <rect x="13" y="9" width="2" height="2" fill="${BODY}"/>
      <rect x="15" y="9" width="3" height="1" fill="${BODY}"/>
    </g>
    <g id="eyes-js" fill="${EYE}"><g class="eyes-blink">
      <rect x="4" y="8" width="1" height="2"/><rect x="10" y="8" width="1" height="2"/>
    </g></g>
  </g></g>`,
  `<rect class="point-dot" x="20" y="8" width="1.5" height="1.5" fill="#FFD700" rx="0.3"/>`
].join('\n  '));

// 58. clawd-social-clap
animations['clawd-social-clap'] = svg([
  baseStyle(`
    .clap-l { transform-origin: 1px 10px; animation: clap-left 0.6s infinite ease-in-out; }
    .clap-r { transform-origin: 14px 10px; animation: clap-right 0.6s infinite ease-in-out; }
    .clap-spark { animation: clap-sparkle 0.6s infinite ease-out; }
    @keyframes clap-left { 0%, 100% { transform: rotate(-30deg) translate(-1px,-2px); } 50% { transform: rotate(10deg) translate(2px,-1px); } }
    @keyframes clap-right { 0%, 100% { transform: rotate(30deg) translate(1px,-2px); } 50% { transform: rotate(-10deg) translate(-2px,-1px); } }
    @keyframes clap-sparkle { 0%, 40% { opacity: 0; } 50% { opacity: 1; } 100% { opacity: 0; transform: translateY(-2px); } }
  `),
  shadow, legs,
  `<g id="body-js"><g class="breathe-anim">
    <rect id="torso" x="2" y="6" width="11" height="7" fill="${BODY}"/>
    <g class="clap-l"><rect x="0" y="9" width="2" height="2" fill="${BODY}"/></g>
    <g class="clap-r"><rect x="13" y="9" width="2" height="2" fill="${BODY}"/></g>
    <g id="eyes-js" fill="${EYE}"><g class="eyes-blink">
      <rect x="4" y="8" width="1" height="2"/><rect x="10" y="8" width="1" height="2"/>
    </g></g>
  </g></g>`,
  `<g fill="#FFD700">
    <rect class="clap-spark" x="6" y="6" width="1" height="1"/>
    <rect class="clap-spark" x="8" y="5" width="0.8" height="0.8"/>
  </g>`
].join('\n  '));

// 59. clawd-social-thumbsup
animations['clawd-social-thumbsup'] = svg([
  baseStyle(`
    .thumb-arm { transform-origin: 14px 10px; animation: thumb-raise 2s infinite ease-in-out; }
    .thumb-sparkle { animation: thumb-spark 2s infinite ease-in-out; }
    @keyframes thumb-raise { 0%, 100% { transform: rotate(-60deg) translate(0,-4px); } 50% { transform: rotate(-65deg) translate(0,-4.5px); } }
    @keyframes thumb-spark { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }
  `),
  shadow, legs,
  `<g id="body-js"><g class="breathe-anim">
    <rect id="torso" x="2" y="6" width="11" height="7" fill="${BODY}"/>
    <rect x="0" y="9" width="2" height="2" fill="${BODY}"/>
    <g class="thumb-arm">
      <rect x="13" y="9" width="2" height="2" fill="${BODY}"/>
      <rect x="14" y="7" width="2" height="2" fill="${BODY}"/>
      <rect x="14.5" y="6" width="1" height="1.5" fill="${BODY}"/>
    </g>
    <g id="eyes-js" fill="${EYE}"><g class="eyes-blink">
      <rect x="4" y="9" width="1" height="0.8"/><rect x="10" y="9" width="1" height="0.8"/>
    </g></g>
  </g></g>`,
  `<rect class="thumb-sparkle" x="16" y="4" width="1" height="1" fill="#FFD700"/>`
].join('\n  '));

// 60. clawd-social-bow
animations['clawd-social-bow'] = svg([
  baseStyle(`
    .bow-body { transform-origin: 7.5px 13px; animation: bow-tilt 3s infinite ease-in-out; }
    @keyframes bow-tilt { 0%, 100% { transform: rotate(0deg); } 30%, 60% { transform: rotate(25deg) translateY(2px); } }
  `),
  shadow, legs,
  `<g class="bow-body"><g id="body-js"><g class="breathe-anim">
    <rect id="torso" x="2" y="6" width="11" height="7" fill="${BODY}"/>
    <rect x="0" y="9" width="2" height="2" fill="${BODY}"/>
    <rect x="13" y="9" width="2" height="2" fill="${BODY}"/>
    <g id="eyes-js" fill="${EYE}"><g class="eyes-blink">
      <rect x="4" y="8" width="1" height="2"/><rect x="10" y="8" width="1" height="2"/>
    </g></g>
  </g></g></g>`
].join('\n  '));

// ============================================================
// GAME ACTIVITIES (10)
// ============================================================

// 61. clawd-game-shop
animations['clawd-game-shop'] = svg([
  baseStyle(`
    .walk-body { transform-origin: 7.5px 15px; animation: walk-bob 0.6s infinite ease-in-out; }
    .walk-legs-l { transform-origin: 4px 13px; animation: w-leg-l 0.6s infinite ease-in-out; }
    .walk-legs-r { transform-origin: 10px 13px; animation: w-leg-r 0.6s infinite ease-in-out; }
    .bag-swing { animation: bag-sway 0.6s infinite ease-in-out; }
    @keyframes walk-bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-1px); } }
    @keyframes w-leg-l { 0%, 100% { transform: rotate(10deg); } 50% { transform: rotate(-10deg); } }
    @keyframes w-leg-r { 0%, 100% { transform: rotate(-10deg); } 50% { transform: rotate(10deg); } }
    @keyframes bag-sway { 0%, 100% { transform: rotate(-3deg); } 50% { transform: rotate(3deg); } }
  `),
  shadow,
  `<g id="legs" fill="${BODY}">
    <g class="walk-legs-l"><rect x="3" y="11" width="1" height="4"/><rect x="5" y="11" width="1" height="4"/></g>
    <g class="walk-legs-r"><rect x="9" y="11" width="1" height="4"/><rect x="11" y="11" width="1" height="4"/></g>
  </g>`,
  `<g class="walk-body"><g id="body-js"><g class="breathe-anim">
    <rect id="torso" x="2" y="6" width="11" height="7" fill="${BODY}"/>
    <rect x="0" y="9" width="2" height="2" fill="${BODY}"/>
    <rect x="13" y="9" width="2" height="2" fill="${BODY}"/>
    <g id="eyes-js" fill="${EYE}"><g class="eyes-blink">
      <rect x="4" y="8" width="1" height="2"/><rect x="10" y="8" width="1" height="2"/>
    </g></g>
  </g></g></g>`,
  `<g class="bag-swing" transform="translate(15,7)">
    <rect x="0" y="0" width="4" height="5" fill="#dd8844"/>
    <rect x="0.5" y="-1" width="3" height="1.5" fill="none" stroke="#aa6633" stroke-width="0.3" rx="0.5"/>
  </g>`
].join('\n  '));

// 62. clawd-game-harvest
animations['clawd-game-harvest'] = svg([
  baseStyle(`
    .reach-up { transform-origin: 7.5px 13px; animation: reach 2.5s infinite ease-in-out; }
    .arm-pick { transform-origin: 14px 10px; animation: pick-up 2.5s infinite ease-in-out; }
    .fruit { animation: fruit-picked 2.5s infinite ease-in-out; }
    @keyframes reach { 0%, 100% { transform: translateY(0) scaleY(1); } 40%, 60% { transform: translateY(-1px) scaleY(1.03); } }
    @keyframes pick-up { 0%, 30% { transform: rotate(-60deg) translate(0,-5px); } 50%, 100% { transform: rotate(-20deg) translate(0,-2px); } }
    @keyframes fruit-picked { 0%, 30% { transform: translate(0,0); opacity: 1; } 50% { transform: translate(2px,4px); opacity: 1; } 70%, 100% { transform: translate(2px,4px); opacity: 0; } }
  `),
  shadow, legs,
  `<g class="reach-up"><g id="body-js"><g class="breathe-anim">
    <rect id="torso" x="2" y="6" width="11" height="7" fill="${BODY}"/>
    <rect x="0" y="9" width="2" height="2" fill="${BODY}"/>
    <g class="arm-pick"><rect x="13" y="9" width="2" height="2" fill="${BODY}"/></g>
    <g id="eyes-js" fill="${EYE}"><g class="eyes-blink">
      <rect x="4" y="7" width="1" height="2"/><rect x="10" y="7" width="1" height="2"/>
    </g></g>
  </g></g></g>`,
  `<rect x="10" y="-8" width="10" height="3" fill="#44aa44" rx="0.5"/>
  <rect x="14" y="-5" width="1" height="8" fill="#886633"/>
  <g class="fruit">
    <rect x="16" y="-4" width="2" height="2" fill="#ff4444" rx="0.3"/>
    <rect x="16.5" y="-4.5" width="1" height="0.5" fill="#44aa44"/>
  </g>`
].join('\n  '));

// 63. clawd-game-plant
animations['clawd-game-plant'] = svg([
  baseStyle(`
    .dig-arm { transform-origin: 14px 10px; animation: dig-motion 2s infinite ease-in-out; }
    .seed-drop { animation: seed-fall 2s infinite ease-in; }
    .dirt-pile { animation: dirt-move 2s infinite ease-in-out; }
    @keyframes dig-motion { 0%, 100% { transform: rotate(-20deg) translate(0,-2px); } 50% { transform: rotate(10deg) translate(2px,1px); } }
    @keyframes seed-fall { 0%, 60% { opacity: 0; transform: translate(0,-3px); } 70% { opacity: 1; transform: translate(0,0); } 100% { opacity: 0; } }
    @keyframes dirt-move { 0%, 100% { transform: scaleY(1); } 50% { transform: scaleY(1.1); } }
  `),
  shadow, legs,
  `<g id="body-js"><g class="breathe-anim">
    <rect id="torso" x="2" y="6" width="11" height="7" fill="${BODY}"/>
    <rect x="0" y="9" width="2" height="2" fill="${BODY}"/>
    <g class="dig-arm">
      <rect x="13" y="9" width="2" height="2" fill="${BODY}"/>
      <rect x="15" y="9" width="1" height="3" fill="#888"/>
      <rect x="14.5" y="11.5" width="2" height="1" fill="#888"/>
    </g>
    <g id="eyes-js" fill="${EYE}"><g class="eyes-blink">
      <rect x="4" y="8" width="1" height="2"/><rect x="10" y="8" width="1" height="2"/>
    </g></g>
  </g></g>`,
  `<g class="dirt-pile">
    <rect x="17" y="13" width="5" height="2" fill="#8B6914" rx="0.5"/>
  </g>
  <rect class="seed-drop" x="19" y="12" width="1" height="1" fill="#44aa44" rx="0.2"/>`
].join('\n  '));

// 64. clawd-game-water
animations['clawd-game-water'] = svg([
  baseStyle(`
    .water-arm { transform-origin: 14px 10px; animation: water-tilt 3s infinite ease-in-out; }
    .water-drop1 { animation: w-drop1 1s infinite linear; }
    .water-drop2 { animation: w-drop2 1s 0.3s infinite linear; }
    .water-drop3 { animation: w-drop3 1s 0.6s infinite linear; }
    .sprout { animation: sprout-grow 6s infinite ease-in-out; }
    @keyframes water-tilt { 0%, 100% { transform: rotate(-25deg) translate(-1px,-3px); } 50% { transform: rotate(-30deg) translate(-2px,-3px); } }
    @keyframes w-drop1 { 0% { opacity: 1; transform: translateY(0); } 100% { opacity: 0; transform: translateY(5px); } }
    @keyframes w-drop2 { 0% { opacity: 1; transform: translateY(0); } 100% { opacity: 0; transform: translateY(5px); } }
    @keyframes w-drop3 { 0% { opacity: 1; transform: translateY(0); } 100% { opacity: 0; transform: translateY(5px); } }
    @keyframes sprout-grow { 0%, 100% { transform: scaleY(1); } 50% { transform: scaleY(1.15); } }
  `),
  shadow, legs,
  `<g id="body-js"><g class="breathe-anim">
    <rect id="torso" x="2" y="6" width="11" height="7" fill="${BODY}"/>
    <rect x="0" y="9" width="2" height="2" fill="${BODY}"/>
    <g class="water-arm">
      <rect x="13" y="9" width="2" height="2" fill="${BODY}"/>
      <rect x="15" y="6" width="3" height="3" fill="#888"/>
      <rect x="18" y="6" width="1" height="0.5" fill="#888"/>
    </g>
    <g id="eyes-js" fill="${EYE}"><g class="eyes-blink">
      <rect x="4" y="8" width="1" height="2"/><rect x="10" y="8" width="1" height="2"/>
    </g></g>
  </g></g>`,
  `<g class="sprout" transform="translate(19,10)">
    <rect x="0" y="3" width="3" height="2" fill="#8B6914"/>
    <rect x="1" y="1" width="1" height="2" fill="#44aa44"/>
    <rect x="0" y="0" width="1" height="1.5" fill="#66cc66"/>
    <rect x="2" y="0" width="1" height="1.5" fill="#66cc66"/>
  </g>`,
  `<g fill="#66bbff" opacity="0.6">
    <rect class="water-drop1" x="18" y="8" width="0.5" height="1"/>
    <rect class="water-drop2" x="19" y="8" width="0.5" height="1"/>
    <rect class="water-drop3" x="18.5" y="8" width="0.5" height="1"/>
  </g>`
].join('\n  '));

// 65. clawd-game-coins
animations['clawd-game-coins'] = svg([
  baseStyle(`
    .coin1 { animation: coin-fall1 1.5s infinite ease-in; }
    .coin2 { animation: coin-fall2 1.5s 0.3s infinite ease-in; }
    .coin3 { animation: coin-fall3 1.5s 0.6s infinite ease-in; }
    .coin4 { animation: coin-fall4 1.5s 0.9s infinite ease-in; }
    .catch-arms { animation: catch-move 1.5s infinite ease-in-out; }
    @keyframes coin-fall1 { 0% { transform: translate(-2px, -15px); opacity: 0; } 30% { opacity: 1; } 100% { transform: translate(0, 0); opacity: 0; } }
    @keyframes coin-fall2 { 0% { transform: translate(3px, -15px); opacity: 0; } 30% { opacity: 1; } 100% { transform: translate(0, 0); opacity: 0; } }
    @keyframes coin-fall3 { 0% { transform: translate(-1px, -15px); opacity: 0; } 30% { opacity: 1; } 100% { transform: translate(0, 0); opacity: 0; } }
    @keyframes coin-fall4 { 0% { transform: translate(2px, -15px); opacity: 0; } 30% { opacity: 1; } 100% { transform: translate(0, 0); opacity: 0; } }
    @keyframes catch-move { 0%, 100% { transform: translateX(-1px); } 50% { transform: translateX(1px); } }
  `),
  shadow, legs,
  `<g id="body-js"><g class="breathe-anim catch-arms">
    <rect id="torso" x="2" y="6" width="11" height="7" fill="${BODY}"/>
    <rect x="0" y="9" width="2" height="2" fill="${BODY}"/>
    <rect x="13" y="9" width="2" height="2" fill="${BODY}"/>
    <g id="eyes-js" fill="${EYE}"><g class="eyes-blink">
      <rect x="4" y="7" width="1" height="2"/><rect x="10" y="7" width="1" height="2"/>
    </g></g>
  </g></g>`,
  `<g fill="#FFD700">
    <rect class="coin1" x="4" y="5" width="2" height="2" rx="0.3"/>
    <rect class="coin2" x="9" y="5" width="2" height="2" rx="0.3"/>
    <rect class="coin3" x="6" y="5" width="2" height="2" rx="0.3"/>
    <rect class="coin4" x="11" y="5" width="2" height="2" rx="0.3"/>
  </g>`
].join('\n  '));

// 66. clawd-game-craft
animations['clawd-game-craft'] = svg([
  baseStyle(`
    .craft-hammer { transform-origin: 14px 10px; animation: craft-hit 0.8s infinite ease-in-out; }
    .craft-spark1 { animation: c-spark1 0.8s infinite ease-out; }
    .craft-spark2 { animation: c-spark2 0.8s 0.3s infinite ease-out; }
    @keyframes craft-hit { 0%, 100% { transform: rotate(-50deg) translate(0,-3px); } 50% { transform: rotate(-5deg) translate(0,0); } }
    @keyframes c-spark1 { 0%, 40% { opacity: 0; } 50% { opacity: 1; } 100% { opacity: 0; transform: translate(2px,-3px); } }
    @keyframes c-spark2 { 0%, 40% { opacity: 0; } 50% { opacity: 1; } 100% { opacity: 0; transform: translate(-2px,-2px); } }
  `),
  shadow, legs,
  `<g id="body-js"><g class="breathe-anim">
    <rect id="torso" x="2" y="6" width="11" height="7" fill="${BODY}"/>
    <rect x="0" y="9" width="2" height="2" fill="${BODY}"/>
    <g class="craft-hammer">
      <rect x="13" y="9" width="2" height="2" fill="${BODY}"/>
      <rect x="15" y="7" width="0.5" height="3" fill="#8B6914"/>
      <rect x="14.5" y="6" width="1.5" height="1.2" fill="#888"/>
    </g>
    <g id="eyes-js" fill="${EYE}"><g class="eyes-blink">
      <rect x="4" y="8" width="1" height="2"/><rect x="10" y="8" width="1" height="2"/>
    </g></g>
  </g></g>`,
  `<g>
    <rect x="17" y="9" width="7" height="4" fill="#8B6914"/>
    <rect x="17" y="8.5" width="7" height="1" fill="#aa8844"/>
    <rect x="19" y="8" width="2" height="1" fill="#ccc"/>
    <rect class="craft-spark1" x="19" y="7" width="0.8" height="0.8" fill="#FFD700"/>
    <rect class="craft-spark2" x="21" y="7" width="0.8" height="0.8" fill="#FFD700"/>
  </g>`
].join('\n  '));

// 67. clawd-game-treasure
animations['clawd-game-treasure'] = svg([
  baseStyle(`
    .chest-lid { transform-origin: 17px 8px; animation: lid-open 3s infinite ease-in-out; }
    .glow { animation: treasure-glow 3s infinite ease-in-out; }
    .sparkle-t1 { animation: t-sparkle1 3s infinite ease-out; }
    .sparkle-t2 { animation: t-sparkle2 3s 0.5s infinite ease-out; }
    .sparkle-t3 { animation: t-sparkle3 3s 1s infinite ease-out; }
    .excited-arms { animation: arms-up 3s infinite ease-in-out; }
    @keyframes lid-open { 0%, 100% { transform: rotate(0deg); } 30%, 70% { transform: rotate(-40deg); } }
    @keyframes treasure-glow { 0%, 100% { opacity: 0; } 30%, 70% { opacity: 0.6; } }
    @keyframes t-sparkle1 { 0%, 20% { opacity: 0; } 40%, 60% { opacity: 1; transform: translate(-1px,-3px); } 80%, 100% { opacity: 0; transform: translate(-2px,-6px); } }
    @keyframes t-sparkle2 { 0%, 20% { opacity: 0; } 40%, 60% { opacity: 1; transform: translate(2px,-4px); } 80%, 100% { opacity: 0; transform: translate(3px,-7px); } }
    @keyframes t-sparkle3 { 0%, 20% { opacity: 0; } 40%, 60% { opacity: 1; transform: translate(0,-3px); } 80%, 100% { opacity: 0; transform: translate(0,-6px); } }
    @keyframes arms-up { 0%, 100% { transform: translateY(0); } 30%, 70% { transform: translateY(-1px); } }
  `),
  shadow, legs,
  `<g class="excited-arms"><g id="body-js"><g class="breathe-anim">
    <rect id="torso" x="2" y="6" width="11" height="7" fill="${BODY}"/>
    <rect x="0" y="9" width="2" height="2" fill="${BODY}"/>
    <rect x="13" y="9" width="2" height="2" fill="${BODY}"/>
    <g id="eyes-js" fill="${EYE}"><g class="eyes-blink">
      <rect x="4" y="7" width="1.5" height="2.5"/><rect x="10" y="7" width="1.5" height="2.5"/>
    </g></g>
  </g></g></g>`,
  `<g>
    <rect x="17" y="9" width="8" height="5" fill="#8B6914"/>
    <rect x="20" y="10" width="2" height="1" fill="#FFD700"/>
    <g class="chest-lid">
      <rect x="17" y="6" width="8" height="3" fill="#aa7722" rx="0.5"/>
      <rect x="20" y="8" width="2" height="1" fill="#FFD700"/>
    </g>
    <rect class="glow" x="18" y="7" width="6" height="3" fill="#FFD700" opacity="0"/>
    <rect class="sparkle-t1" x="19" y="7" width="1" height="1" fill="#FFD700"/>
    <rect class="sparkle-t2" x="23" y="6" width="1" height="1" fill="#FFD700"/>
    <rect class="sparkle-t3" x="21" y="5" width="1" height="1" fill="#FFD700"/>
  </g>`
].join('\n  '));

// 68. clawd-game-levelup
animations['clawd-game-levelup'] = svg([
  baseStyle(`
    .levelup-body { transform-origin: 7.5px 15px; animation: lvl-grow 3s infinite ease-in-out; }
    .arrow1 { animation: arrow-up1 2s infinite ease-out; }
    .arrow2 { animation: arrow-up2 2s 0.5s infinite ease-out; }
    .arrow3 { animation: arrow-up3 2s 1s infinite ease-out; }
    .lvl-sparkle1 { animation: lvl-sp1 1.5s infinite ease-in-out; }
    .lvl-sparkle2 { animation: lvl-sp2 1.5s 0.5s infinite ease-in-out; }
    .lvl-sparkle3 { animation: lvl-sp3 1.5s 1s infinite ease-in-out; }
    @keyframes lvl-grow { 0%, 100% { transform: scale(1); } 40%, 60% { transform: scale(1.1); } }
    @keyframes arrow-up1 { 0% { opacity: 1; transform: translateY(0); } 100% { opacity: 0; transform: translateY(-10px); } }
    @keyframes arrow-up2 { 0% { opacity: 1; transform: translateY(0); } 100% { opacity: 0; transform: translateY(-10px); } }
    @keyframes arrow-up3 { 0% { opacity: 1; transform: translateY(0); } 100% { opacity: 0; transform: translateY(-10px); } }
    @keyframes lvl-sp1 { 0%, 100% { opacity: 0; } 50% { opacity: 1; } }
    @keyframes lvl-sp2 { 0%, 100% { opacity: 0; } 50% { opacity: 1; } }
    @keyframes lvl-sp3 { 0%, 100% { opacity: 0; } 50% { opacity: 1; } }
  `),
  shadow, legs,
  `<g class="levelup-body"><g id="body-js"><g class="breathe-anim">
    <rect id="torso" x="2" y="6" width="11" height="7" fill="${BODY}"/>
    <rect x="0" y="9" width="2" height="2" fill="${BODY}"/>
    <rect x="13" y="9" width="2" height="2" fill="${BODY}"/>
    <g id="eyes-js" fill="${EYE}"><g class="eyes-blink">
      <rect x="4" y="8" width="1" height="2"/><rect x="10" y="8" width="1" height="2"/>
    </g></g>
  </g></g></g>`,
  `<g fill="#44ff88">
    <polygon class="arrow1" points="3,2 5,2 4,-1"/>
    <polygon class="arrow2" points="7,1 9,1 8,-2"/>
    <polygon class="arrow3" points="11,2 13,2 12,-1"/>
  </g>
  <g fill="#FFD700">
    <rect class="lvl-sparkle1" x="0" y="5" width="1" height="1"/>
    <rect class="lvl-sparkle2" x="14" y="4" width="1" height="1"/>
    <rect class="lvl-sparkle3" x="7" y="2" width="1" height="1"/>
  </g>`
].join('\n  '));

// 69. clawd-game-feed
animations['clawd-game-feed'] = svg([
  baseStyle(`
    .feed-arm { transform-origin: 14px 10px; animation: feed-hold 2s infinite ease-in-out; }
    .food-item { animation: food-shrink 2s infinite ease-in-out; }
    .feed-heart1 { animation: feed-heart-a 2s infinite ease-out; }
    .feed-heart2 { animation: feed-heart-b 2s 0.7s infinite ease-out; }
    .feed-heart3 { animation: feed-heart-c 2s 1.4s infinite ease-out; }
    @keyframes feed-hold { 0%, 100% { transform: rotate(-15deg) translate(-1px,-2px); } 50% { transform: rotate(-20deg) translate(-1px,-2.5px); } }
    @keyframes food-shrink { 0% { transform: scale(1); opacity: 1; } 80% { transform: scale(0.5); opacity: 0.5; } 100% { transform: scale(1); opacity: 1; } }
    @keyframes feed-heart-a { 0% { opacity: 0; } 30% { opacity: 1; } 100% { opacity: 0; transform: translate(-2px,-5px); } }
    @keyframes feed-heart-b { 0% { opacity: 0; } 30% { opacity: 1; } 100% { opacity: 0; transform: translate(3px,-6px); } }
    @keyframes feed-heart-c { 0% { opacity: 0; } 30% { opacity: 1; } 100% { opacity: 0; transform: translate(0,-5px); } }
  `),
  shadow, legs,
  `<g id="body-js"><g class="breathe-anim">
    <rect id="torso" x="2" y="6" width="11" height="7" fill="${BODY}"/>
    <rect x="0" y="9" width="2" height="2" fill="${BODY}"/>
    <g class="feed-arm">
      <rect x="13" y="9" width="2" height="2" fill="${BODY}"/>
      <g class="food-item">
        <rect x="14" y="7" width="2" height="2" fill="#ff8844" rx="0.3"/>
      </g>
    </g>
    <g id="eyes-js" fill="${EYE}"><g class="eyes-blink">
      <rect x="4" y="8" width="1" height="2"/><rect x="10" y="8" width="1" height="2"/>
    </g></g>
  </g></g>`,
  `<g fill="#ff4488">
    <rect class="feed-heart1" x="5" y="3" width="1.5" height="1.5" rx="0.3"/>
    <rect class="feed-heart2" x="10" y="2" width="1.5" height="1.5" rx="0.3"/>
    <rect class="feed-heart3" x="7" y="1" width="1.5" height="1.5" rx="0.3"/>
  </g>`
].join('\n  '));

// 70. clawd-game-sleep-dream
animations['clawd-game-sleep-dream'] = svg([
  baseStyle(`
    .sleep-body { transform-origin: 7.5px 13px; animation: sleep-breathe 4s infinite ease-in-out; }
    .zzz-1 { animation: zzz-go1 3s infinite ease-out; }
    .zzz-2 { animation: zzz-go2 3s 1s infinite ease-out; }
    .zzz-3 { animation: zzz-go3 3s 2s infinite ease-out; }
    .dream-bubble { animation: dream-float 4s infinite ease-in-out; }
    .dream-fish { animation: fish-swim 2s infinite ease-in-out; }
    @keyframes sleep-breathe { 0%, 100% { transform: scale(1, 1); } 50% { transform: scale(1.03, 0.97); } }
    @keyframes zzz-go1 { 0% { opacity: 0; transform: translate(0,0); } 30% { opacity: 1; } 100% { opacity: 0; transform: translate(3px,-8px); } }
    @keyframes zzz-go2 { 0% { opacity: 0; transform: translate(0,0); } 30% { opacity: 1; } 100% { opacity: 0; transform: translate(4px,-9px); } }
    @keyframes zzz-go3 { 0% { opacity: 0; transform: translate(0,0); } 30% { opacity: 1; } 100% { opacity: 0; transform: translate(2px,-7px); } }
    @keyframes dream-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-1px); } }
    @keyframes fish-swim { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(1px); } }
  `),
  shadow, legs,
  `<g class="sleep-body"><g id="body-js">
    <rect id="torso" x="2" y="6" width="11" height="7" fill="${BODY}"/>
    <rect x="0" y="9" width="2" height="2" fill="${BODY}"/>
    <rect x="13" y="9" width="2" height="2" fill="${BODY}"/>
    <g id="eyes-js" fill="${EYE}">
      <rect x="4" y="9" width="1.5" height="0.5"/><rect x="10" y="9" width="1.5" height="0.5"/>
    </g>
  </g></g>`,
  `<g fill="#aaa" font-family="monospace" font-size="3">
    <text class="zzz-1" x="14" y="5">z</text>
    <text class="zzz-2" x="16" y="3">z</text>
    <text class="zzz-3" x="18" y="1">z</text>
  </g>`,
  `<g class="dream-bubble">
    <rect x="16" y="-10" width="10" height="7" fill="white" opacity="0.7" rx="1"/>
    <rect x="15" y="-3" width="1" height="1" fill="white" opacity="0.5"/>
    <rect x="14" y="-1" width="0.8" height="0.8" fill="white" opacity="0.3"/>
    <g class="dream-fish">
      <rect x="18" y="-8" width="3" height="2" fill="#4488ff"/>
      <rect x="21" y="-8.5" width="1" height="1" fill="#4488ff"/>
      <rect x="21" y="-7" width="1" height="1" fill="#4488ff"/>
      <rect x="18.5" y="-7.5" width="0.5" height="0.5" fill="${EYE}"/>
    </g>
  </g>`
].join('\n  '));

// Write all files
let count = 0;
for (const [name, content] of Object.entries(animations)) {
  const filePath = path.join(OUTPUT_DIR, `${name}.svg`);
  fs.writeFileSync(filePath, content, 'utf8');
  count++;
  console.log(`Written: ${name}.svg`);
}

console.log(`\nDone! Generated ${count} SVG files in ${OUTPUT_DIR}`);
