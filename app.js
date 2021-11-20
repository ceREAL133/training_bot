const { Telegraf } = require("telegraf");
const mongoose = require("mongoose");
require("dotenv").config();

const { constant, sportsmanRolesEnum } = require("./src/constants");
const { SportsmenController } = require("./src/controllers/index");
const createReplies = require("./src/markups/create.reply");
const replies_text = require("./src/text");

_mongooseConnector();
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
  console.log(`username: ${ctx.from.username}`);

  bot.telegram.sendMessage(
    ctx.chat.id,
    replies_text.greetingText,
    createReplies(
      sportsmanRolesEnum.SPORTSMAN,
      sportsmanRolesEnum.TRAINER,
      "sportsman",
      "trainer"
    )
  );

  bot.action("trainer", async (ctx) => {
    const value = SportsmenController.createSportsman(
      ctx,
      sportsmanRolesEnum.TRAINER
    );
    SportsmenController.createdUserReply(ctx, value, bot);
  });

  bot.action("sportsman", async (ctx) => {
    const value = SportsmenController.createSportsman(
      ctx,
      sportsmanRolesEnum.SPORTSMAN
    );
    SportsmenController.createdUserReply(ctx, value, bot);
  });
});

bot.command("change_reply", (ctx) => {
  bot.telegram.sendMessage(ctx.chat.id, replies_text.changeReply);
});

bot.launch();

function _mongooseConnector() {
  mongoose.connect(constant.DB_TABLE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}
