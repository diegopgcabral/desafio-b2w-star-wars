import mongoose from 'mongoose';

class Database {
  constructor() {
    this.mongo();
  }

  mongo() {
    this.mongoConnection = mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
  }
}

export default new Database();
