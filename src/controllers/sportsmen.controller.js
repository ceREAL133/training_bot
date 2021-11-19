const { SportsmenModel } = require("../database");

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
};
