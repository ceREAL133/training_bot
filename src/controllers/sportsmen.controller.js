const { SportsmenModel } = require("../database");
const { sportsmanRolesEnum } = require("../constants");
const replies_text = require("../text");

module.exports = {
  createSportsman: async (ctx, role) => {
    try {
      const searchedSportsman = await SportsmenModel.findOne({
        $or: [
          { sportsmanNick: ctx.from.username },
          { sportsmanName: ctx.from.first_name }
        ],
      });

      if (!searchedSportsman) {
        const createdSportsman = await SportsmenModel.create({
          sportsmanName: ctx.from.first_name,
          sportsmanNick: ctx.from.username,
          role: role,
        });
      }
      return !!searchedSportsman;
    } catch (error) {
      return error;
    }
  },

  createdUserReply: async (values, value, bot) => {
    if (await value) {
      bot.telegram.sendMessage(values.chat.id, replies_text.userExist);
    } else {
      bot.telegram.sendMessage(
        values.chat.id,
        replies_text.userCreatedSuccessfully
      );
    }
  },
};
