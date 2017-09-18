const {PI, cos, sin} = Math;
const TAU = PI * 2;

const drawEmoji = (ctx, {eyes, mouth}, x, y, diameter) => {

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

  if (eyes && eyes.left) {
    drawEye(eyes.left, -radius*0.4, -radius/3);
  }
  if (eyes && eyes.right) {
    drawEye(eyes.right, +radius*0.4, -radius/3);
  }


  return ctx.restore();
};
export default drawEmoji;