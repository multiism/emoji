const drawEmoji = function(ctx, {eyes, mouth}, x, y, diameter){

  const radius = diameter / 2;

  const yellowGradient = ctx.createLinearGradient(0, -radius, 0, diameter);

  yellowGradient.addColorStop(0.0, '#fcf5b5');
  yellowGradient.addColorStop(0.5, '#f1da36');
  yellowGradient.addColorStop(1.0, '#f4c838');
  
  ctx.save();
  ctx.translate(x, y);

  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, TAU);
  ctx.fillStyle = yellowGradient;
  ctx.fill();
  ctx.beginPath();
  ctx.arc(0, 5, radius * 0.92, 0, TAU);
  ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
  ctx.lineWidth = 10;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, diameter/2, 0, TAU);
  ctx.strokeStyle = "black";
  ctx.lineWidth = 10; // TODO: scale the strokes
  ctx.stroke();


  if (mouth) {
    let i;
    ctx.beginPath();
    //ctx.moveTo(-radius/2, radius*0.2)
    //ctx.lineTo(-radius/2*0.9, radius*0.4)
    //ctx.lineTo(0, radius*0.5)
    //ctx.lineTo(+radius/2*0.9, radius*0.4)
    //ctx.lineTo(+radius/2, radius*0.2)

    const smileY = mouth.smile * radius*0.2;

    for (i = 0; i <= 1; i += 0.1) {
      ctx.lineTo(
        (cos(i * PI) * radius)/2,
        ((((sin(i * PI) * radius)/2) * mouth.smile) + (radius*0.2)) - smileY
      );
    }

    ctx.strokeStyle = "black";
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = 10;
    if (mouth.open) {
      ctx.closePath();
      ctx.fillStyle = "white";
      ctx.fill();
    }

    ctx.stroke();

    if (mouth.tongue) {
      // TODO: mesh with the curve of the mouth
      ctx.beginPath();
      for (i = 0; i <= 1; i += 0.1) {
        ctx.lineTo(
          (cos(i * PI) * radius)/3,
          (((sin(i * PI) * radius)/2) * mouth.tongue) + (radius*0.2) + (smileY * (mouth.open ? 0 : 1))
        );
      }

      ctx.strokeStyle = "black";
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.lineWidth = 10;
      ctx.closePath();
      ctx.fillStyle = "#f34";
      ctx.fill();
      ctx.stroke();
    }
  }
  // TODO: add line down middle of tongue


  const drawEye = function(eye, x, y){
    ctx.beginPath();
    x += eye.offsetX * radius;
    y += eye.offsetY * radius;
    switch (eye.type) {
      case "open":
        ctx.arc(x, y, radius/6, 0, TAU);
        ctx.fillStyle = "black";
        return ctx.fill();
      case "wink":
        ctx.moveTo(x - (radius/7), y);
        ctx.lineTo(x + (radius/7), y);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 10;
        return ctx.stroke();
    }
  };

  if (eyes != null ? eyes.left : undefined) {
    drawEye(eyes.left, -radius*0.4, -radius/3);
  }
  if (eyes != null ? eyes.right : undefined) {
    drawEye(eyes.right, +radius*0.4, -radius/3);
  }


  return ctx.restore();
};


const makeRandomEmoji = function() {
  const chooseRandom = array=> array[~~(Math.random() * array.length)];

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
          : 0
    } // for dat.gui's benefit
  };
};
// TODO: width & offset or whatever
// TODO: :O :o :3 :S :P :9 :F :C :c :B :] :J :I :T :*
// TODO: skin color
// TODO: cat ears, hats etc.
// TODO: animation (maybe have an update method on these objects? or have higher level descriptors?)


const emojisContainer = document.getElementById("emojis");

let selectedEmojiDisplay = null;

const makeEmojiDisplay = function(emoji){

  let update;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.classList.add("emoji");
  emojisContainer.appendChild(canvas);

  const size = 150;
  const spacing = (size * 0.1) + 5;
  canvas.width = size + spacing;
  canvas.height = size + spacing;

  (update = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  return drawEmoji(ctx, emoji, canvas.width/2, canvas.height/2, size);
})();

  const thisEmojiDisplay = {emoji, canvas, ctx, size, update};

  canvas.style.cursor = "pointer";
  canvas.addEventListener("click", e=> {
    selectedEmojiDisplay = thisEmojiDisplay;
  return toggleDatGuiForEmoji(emoji);
});

  return thisEmojiDisplay;
};


let datGui = null;
let datGuiOpenForEmoji = null;
var toggleDatGuiForEmoji = function(emoji){
  if (datGui && (datGuiOpenForEmoji === emoji)) {
    datGui.destroy();
    return datGui = null;
  } else {
    return openDatGuiForEmoji(emoji);
  }
};
var openDatGuiForEmoji = function(emoji){
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
  eyesFolder.add(emoji.eyes.left, 'type', {"Open": "open", "Wink": "wink"}).name('Left Eye');
  eyesFolder.add(emoji.eyes.left, 'offsetX', -1, 1).name('Left Eye X');
  eyesFolder.add(emoji.eyes.left, 'offsetY', -1, 1).name('Left Eye Y');
  eyesFolder.add(emoji.eyes.right, 'type', {"Open": "open", "Wink": "wink"}).name('Right Eye');
  eyesFolder.add(emoji.eyes.right, 'offsetX', -1, 1).name('Right Eye X');
  return eyesFolder.add(emoji.eyes.right, 'offsetY', -1, 1).name('Right Eye Y');
};


const emojiDisplays = ([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => makeEmojiDisplay(makeRandomEmoji())));

animate(() => selectedEmojiDisplay != null ? selectedEmojiDisplay.update() : undefined);

