const { Telegraf } = require("telegraf");
const mongoose = require("mongoose");
require("dotenv").config();

const { constant, sportsmanRolesEnum } = require("./src/constants");
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

  bot.hears(sportsmanRolesEnum.TRAINER, (ctx) => {
    console.log('asdasd');
  });
});

// bot.action('')

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

// bot.telegram.sendMessage(
//   ctx.chat.id,
//   replies_text.joinTrainingText,
//   createReplies("Yes, i will join", "No, next time", "positive", "negative")
// );
