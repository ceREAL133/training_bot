const { Telegraf } = require("telegraf");
require("dotenv").config();

const createReplies = require("./src/markups/create.reply");
const replies_text = require("./src/text");

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.command("start", (ctx) => {
  console.log(`username: ${ctx.from.username}`);

  bot.telegram.sendMessage(
    ctx.chat.id,
    replies_text.greetingText,
    createReplies("Yes, i will join", "No, next time", "positive", "negative")
  );
});

bot.launch();
