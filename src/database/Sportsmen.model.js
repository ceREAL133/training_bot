const { Schema, model } = require("mongoose");
const { sportsmanRolesEnum } = require("../constants")

const sportsmanSchema = new Schema({
  sportsmanName: {
    type: String,
    text: true,
    required: true,
  },
  sportsmanNick: {
    type: String,
    text: true,
  },
  role: {
    type: String,
    text: true,
    enum: Object.values(sportsmanRolesEnum),
    required: true,
  },
});
