const { SportsmenModel } = require("../database");

module.exports = {
  createTrainer: async (ctx, role) => {
    const createdSportsman = await SportsmenModel.create({
      sportsmanName: ctx.from.first_name,
      sportsmanNick: ctx.from.username,
      role: role,
    });
  }
};
