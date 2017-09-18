import drawEmoji from './draw-emoji';

const makeEmojiDisplay = (emoji, options = {}) =>{
  const size = options.size || 150;
  const spacing = options.spacing || (size * 0.1) + 5;

  let update;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = size + spacing;
  canvas.height = size + spacing;

  update = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    return drawEmoji(ctx, emoji, canvas.width / 2, canvas.height / 2, size);
  };
  update();

  return { emoji, canvas, ctx, size, update };
}
export default makeEmojiDisplay;