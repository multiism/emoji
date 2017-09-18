import makeEmojiDisplay from "../src/make-emoji-display";


const makeSmileExpression = (smileAmount) => {
  return {
    eyes: {
      left: {
        type: "open",
        offsetX: 0,
        offsetY: 0
      },
      right: {
        type: "open",
        offsetX: 0,
        offsetY: 0
      }
    },
    mouth: {
      smile: smileAmount,
      open: false,
      tongue: 0
    }
  };
};

const makeSlider = ()=> {
  const container = document.createElement("div");
  const displays = [];
  let frown = -1;
  let smile = 1;
  let faceCount = 5;
  for (let face = 0; face < faceCount; face++) {
    const smileyness = (smile - frown)*face/(faceCount - 1) + frown;
    const display = makeEmojiDisplay(makeSmileExpression(smileyness), {size: 32});
    container.appendChild(display.canvas);
    displays.push(display);
  }
  return container;
};

const container = document.querySelector('#slider-demo');
container.appendChild(makeSlider());
