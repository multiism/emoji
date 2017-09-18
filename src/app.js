import makeEmojiDisplay from './make-emoji-display';

const makeRandomEmoji = function () {
  const chooseRandom = array => array[~~(Math.random() * array.length)];

  const randomEye = () =>
    ({
      type: Math.random() < 0.3 ? "wink" : "open",
      offsetX: (Math.random() - 0.5),
      offsetY: (Math.random() - 0.5)
    })
  ;
  return {
    eyes: {
      left: randomEye(),
      right: randomEye()
    },
    // TODO: offsets or whatever
    // TODO: hearts, dollars, stars
    // also: XD  >_<  ^^  ._.  8)  B)
    // what about spider eyes? ::::)
    mouth: {
      smile: Math.random() - Math.random(), // -1..1 (negative for frown)
      open: Math.random() < 0.3, // 0..1?
      // teeth: 0 # 0..1 or bool? what would this define exactly?
      // slant: 0 # -1..1?
      tongue: // -1..1? TODO: offsets or angle or whatever
        Math.random() < 0.7 ?
          // Math.random() - Math.random()
          chooseRandom([-1, -0.5, 0.5, 1])
          : 0 // for dat.gui's benefit, could be undefined otherwise
    }
  };
};
// TODO: width & offset or whatever
// TODO: :O :o :3 :S :P :9 :F :C :c :B :] :J :I :T :*
// TODO: skin color
// TODO: cat ears, hats etc.
// TODO: animation (maybe have an update method on these objects? or have higher level descriptors?)


const emojisContainer = document.getElementById("emojis");

let selectedEmojiDisplay = null;

const makeEditableEmojiDisplay = function (emoji) {
  const thisEmojiDisplay = makeEmojiDisplay(emoji);
  const { canvas } = thisEmojiDisplay;
  canvas.style.cursor = "pointer";
  emojisContainer.appendChild(canvas);
  canvas.addEventListener("click", e => {
    selectedEmojiDisplay = thisEmojiDisplay;
    return toggleDatGuiForEmoji(emoji);
  });
  return thisEmojiDisplay;
};


let datGui = null;
let datGuiOpenForEmoji = null;
var toggleDatGuiForEmoji = function (emoji) {
  if (datGui && (datGuiOpenForEmoji === emoji)) {
    datGui.destroy();
    return datGui = null;
  } else {
    return openDatGuiForEmoji(emoji);
  }
};
var openDatGuiForEmoji = function (emoji) {
  if (datGui != null) {
    datGui.destroy();
  }
  datGui = new dat.GUI();
  datGuiOpenForEmoji = emoji;
  const mouthFolder = datGui.addFolder('Mouth');
  mouthFolder.open();
  mouthFolder.add(emoji.mouth, 'smile', -1, +1).name('Smile');
  mouthFolder.add(emoji.mouth, 'open').name('Open');
  mouthFolder.add(emoji.mouth, 'tongue', -1, +1).step(0.5);
  const eyesFolder = datGui.addFolder('Eyes');
  eyesFolder.open();
  eyesFolder.add(emoji.eyes.left, 'type', { "Open": "open", "Wink": "wink" }).name('Left Eye');
  eyesFolder.add(emoji.eyes.left, 'offsetX', -1, 1).name('Left Eye X');
  eyesFolder.add(emoji.eyes.left, 'offsetY', -1, 1).name('Left Eye Y');
  eyesFolder.add(emoji.eyes.right, 'type', { "Open": "open", "Wink": "wink" }).name('Right Eye');
  eyesFolder.add(emoji.eyes.right, 'offsetX', -1, 1).name('Right Eye X');
  return eyesFolder.add(emoji.eyes.right, 'offsetY', -1, 1).name('Right Eye Y');
};


const emojiDisplays = ([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => makeEditableEmojiDisplay(makeRandomEmoji())));

const animate = ()=> {
  selectedEmojiDisplay && selectedEmojiDisplay.update();
  requestAnimationFrame(animate);
};
animate();
