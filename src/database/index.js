import Sequelize from 'sequelize';
import mongoose from 'mongoose';
import Redis from 'redis';
import User from '../app/models/User';
import File from '../app/models/File';
import Appointment from '../app/models/Appointment';
import dataBaseConfig from '../config/database';

const models = [User, File, Appointment];

class Database {
  constructor() {
    this.init();
    this.mongo();
    this.redis();
  }

  init() {
    this.connection = new Sequelize(dataBaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      'mongodb://localhost:27017/gobarber',
      {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
      }
    );
  }

  redis() {
    const redisClient = Redis.createClient({
      host: '192.168.99.100',
      port: 6379,
    });

    redisClient.on('ready', function() {
      console.log('Redis is ready');
    });

    redisClient.on('error', function() {
      console.log('Error in Redis');
    });
  }
}

export default new Database();
