const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect(process.env.MONGODB_LOCAL_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB::: connected:::${this.name}`);
  } catch (error) {
    console.log(`MongoDB::: error:::${JSON.stringify(error)}`);
  }
}

module.exports = { connect };
