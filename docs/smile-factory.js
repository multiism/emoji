const makeSmileExpression = smileAmount => {
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
export default makeSmileExpression;
