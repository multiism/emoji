import EmojiDisplay from "../src/emoji-display";
import makeSmileExpression from './smile-factory';

const frown = -0.7;
const smile = 0.7;

const linearInterpolate = (start, end, fraction) => start + (end - start) * fraction;

const smileynessForIndex = (face, faceCount) => {
  return linearInterpolate(frown, smile, face / (faceCount - 1));
};

class Slider {
  constructor(onSelect){
    this.onSelect = onSelect;
  }
  smileIndex;
  selectSmileIndex(index) {
    const previousIndex = this.smileIndex;
    this.smileIndex = index;
    this.setSliderFacePosition(index);
    this.animateSliderFaceExpression(previousIndex, index);
  };

  setSliderFacePosition(index) {
    this.selectedFaceDisplay.canvas.style.position = 'absolute';
    const firstCanvas = this.displays[0].canvas;
    const lastCanvas = this.displays[this.displays.length - 1].canvas;

    this.selectedFaceDisplay.canvas.style.left = 0;

    requestAnimationFrame(function () {
      const x = linearInterpolate(firstCanvas.offsetLeft, lastCanvas.offsetLeft, index / (this.faceCount - 1));
      const y = linearInterpolate(firstCanvas.offsetTop, lastCanvas.offsetTop, index / (this.faceCount - 1));
      this.selectedFaceDisplay.canvas.style.transform = `translate(${ x }px, ${ y }px)`;
    });
  }

  animateSliderFaceExpression(previousIndex, index) {
    const frameCount = 12;
    for (let frame = 0; frame < frameCount; frame++) {
      const interpolatedIndex = linearInterpolate(previousIndex, index, frame / (frameCount - 1));
      setTimeout(() => {
        this.showExpressionForIndex(interpolatedIndex);
      }, frame * 500 / frameCount)
    }
  }

  showExpressionForIndex(index) {
    const selectedSmileyness = smileynessForIndex(index, this.faceCount);
    this.selectedFaceDisplay.update({ emoji: makeSmileExpression(selectedSmileyness) });
  };

  render() {
    const container = document.createElement("div");
    const displays = this.displays = [];
    const faceCount = this.faceCount = 5;
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
    const selectedFaceDisplay = this.selectedFaceDisplay =
      new EmojiDisplay(makeSmileExpression(selectedSmileyness), { size });
    container.appendChild(selectedFaceDisplay.canvas);

    displays.forEach((display, face) => {
      display.canvas.addEventListener("click", function (face) {
        this.selectSmileIndex(face);
        selectedFaceDisplay.canvas.style.transition = 'transform 0.5s ease';
        selectedFaceDisplay.canvas.style.display = 'initial';
        if(this.onSelect){
          this.onSelect(index);
        }
      }.bind(null, face));
    });


    selectedFaceDisplay.canvas.style.display = 'none';
    setTimeout(function () {
      this.selectSmileIndex(2);
    }, 100);

    return container;
  }
}

export default Slider;
