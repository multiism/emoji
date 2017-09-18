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
const frown = -1;
const smile = 1;

const linearInterpolate = (start, end, fraction) => start + (end - start) * fraction;

const smileynessForIndex = (face, faceCount) => {
  return linearInterpolate(frown, smile, face / (faceCount - 1));
};

const makeSlider = () => {
  const container = document.createElement("div");
  const displays = [];
  const faceCount = 5;
  const size = 32;

  for (let face = 0; face < faceCount; face++) {
    const smileyness = smileynessForIndex(face, faceCount);
    const display = makeEmojiDisplay(makeSmileExpression(smileyness), { size });
    container.appendChild(display.canvas);
    display.canvas.addEventListener("click", ()=>{

    })
    displays.push(display);
  }

  container.style.position = 'relative';
  const selectedSmileyness = smileynessForIndex(0, faceCount);
  const selectedFaceDisplay = makeEmojiDisplay(makeSmileExpression(selectedSmileyness), { size });
  container.appendChild(selectedFaceDisplay.canvas);

  const selectSmileIndex = (index)=> {

    const selectedSmileyness = smileynessForIndex(index, faceCount);
    selectedFaceDisplay.emoji = makeSmileExpression(selectedSmileyness); // mutant!?
    selectedFaceDisplay.update();

    selectedFaceDisplay.canvas.style.position = 'absolute';
    const firstCanvas = displays[0].canvas;
    const lastCanvas = displays[displays.length - 1].canvas;

    selectedFaceDisplay.canvas.style.left = 0;

    setTimeout(function(){
      const x = linearInterpolate(firstCanvas.offsetLeft, lastCanvas.offsetLeft, index / (faceCount - 1));
      const y = linearInterpolate(firstCanvas.offsetTop, lastCanvas.offsetTop, index / (faceCount - 1));
      selectedFaceDisplay.canvas.style.transform = `translate(${ x }px, ${ y }px)`;
    }, 200);
  };

  selectSmileIndex(0); // TODO: invisible initially instead

  return container;
};

const container = document.querySelector('#slider-demo');
container.appendChild(makeSlider());
