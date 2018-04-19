import drawEmoji from "./draw-emoji";

class EmojiDisplay {
  constructor(emoji, options = {}) {
    this.canvas = document.createElement("canvas");
    this.context = this.canvas.getContext("2d");

    this.size = options.size || 150;
    this.spacing = options.spacing || this.getDefaultSpacing();
    this.colorScheme = options.colorScheme || {};
    this.emoji = emoji;

    this.update();
  }

  getDefaultSpacing() {
    return this.size * 0.1 + 5;
  }

  update(options = {}) {
    this.size = options.size || this.size;
    this.spacing =
      options.spacing || options.size ? this.getDefaultSpacing() : this.spacing;
    this.colorScheme = options.colorScheme || this.colorScheme;

    this.canvas.width = this.size + this.spacing;
    this.canvas.height = this.size + this.spacing;
    if (options.emoji) {
      this.emoji = Object.assign(this.emoji, options.emoji);
    }

    drawEmoji(
      this.context,
      this.emoji,
      this.canvas.width / 2,
      this.canvas.height / 2,
      this.size,
      this.colorScheme
    );
  }
}

export default EmojiDisplay;
