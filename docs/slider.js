import EmojiDisplay from "../src/emoji-display";
import makeSmileExpression from './smile-factory';

const frown = -0.7;
const smile = 0.7;

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
    const display = new EmojiDisplay(
      makeSmileExpression(smileyness),
      {
        size,
        colorScheme: { fill: '#aaa', stroke: '#fff' }
      });
    container.appendChild(display.canvas);

    displays.push(display);
  }

  container.style.position = 'relative';
  const selectedSmileyness = smileynessForIndex(0, faceCount);
  const selectedFaceDisplay = new EmojiDisplay(makeSmileExpression(selectedSmileyness), { size });
  container.appendChild(selectedFaceDisplay.canvas);

  displays.forEach((display, face) => {
    display.canvas.addEventListener("click", function (face) {
      selectSmileIndex(face);
      selectedFaceDisplay.canvas.style.transition = 'transform 0.5s ease';
      selectedFaceDisplay.canvas.style.display = 'initial';
    }.bind(null, face));
  });

  const showExpressionForIndex = function (index) {
    const selectedSmileyness = smileynessForIndex(index, faceCount);
    selectedFaceDisplay.update({ emoji: makeSmileExpression(selectedSmileyness) });
  };

  let smileIndex;
  const selectSmileIndex = (index) => {
    const previousIndex = smileIndex;
    smileIndex = index;
    showExpressionForIndex(index);

    selectedFaceDisplay.canvas.style.position = 'absolute';
    const firstCanvas = displays[0].canvas;
    const lastCanvas = displays[displays.length - 1].canvas;

    selectedFaceDisplay.canvas.style.left = 0;

    requestAnimationFrame(function () {
      const x = linearInterpolate(firstCanvas.offsetLeft, lastCanvas.offsetLeft, index / (faceCount - 1));
      const y = linearInterpolate(firstCanvas.offsetTop, lastCanvas.offsetTop, index / (faceCount - 1));
      selectedFaceDisplay.canvas.style.transform = `translate(${ x }px, ${ y }px)`;
    });
    const frameCount = 12;
    for (let frame = 0; frame < frameCount; frame++) {
      const interpolatedIndex = linearInterpolate(previousIndex, index, frame/(frameCount -1));
      setTimeout(()=>{
        showExpressionForIndex(interpolatedIndex);
      }, frame*500/frameCount)
    }
  };

  selectedFaceDisplay.canvas.style.display = 'none';
  setTimeout(function () {
    selectSmileIndex(2);
  }, 100);

  return container;
};

const container = document.querySelector('#slider-demo');
container.appendChild(makeSlider());
