const mongoose = require("mongoose");
module.exports = (client) => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() =>
      console.log(
        `├─────────┬\n│ MONGODB │ -> Connected to mongodb\n├─────────•`
      )
    )
    .catch((err) => {
      console.log(
        `├─────────┬\n│ MONGODB │ -> Error connecting to mongodb\n├─────────•`
      );
      console.error(err);
    });
};
