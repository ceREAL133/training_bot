const createReplies = (text1, text2, callbackData1, callbackData2) => {
  return {
    reply_markup: {
      keyboard: [
        [
          {
            text: text1,
            callback_data: callbackData1,
          },
          {
            text: text2,
            callback_data: callbackData2,
          },
        ],
      ],
      one_time_keyboard: true,
      resize_keyboard: true,
    },
  };
};

module.exports = createReplies;
