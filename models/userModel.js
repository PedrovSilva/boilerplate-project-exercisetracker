const mongo = require("mongoose");

const userSchema = new mongo.Schema({
  _id: {
    type: mongo.Schema.Types.ObjectId,
    auto: true,
  },
  name: {
    type: String,
    require: true,
  },
});

const User = mongo.model("User", userSchema);

module.exports = User;
