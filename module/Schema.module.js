const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const playlistSchema = new Schema({
  title: {
    type: String,
  },
  artist: {
    type: String,
  },
  uri: {
    type: String,
  }
});

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
  },
  playlist: [playlistSchema]
});

const UserModel = mongoose.model('users', userSchema);

const seedFunction = () => {
  try {
    const user = new UserModel({
      email: 'xa7d9q0862ivuth0fv3c9b78f',
      playlist: [
        {
          title: 'drake',
          artist: 'wael',
          uri: 'spotifydfddas'
        }
      ]

    });
    user.save();
  } catch (e) {
    console.log('Error while creating the user: ', e.message);
  }
};

module.exports = {
  UserModel,
  seedFunction,
};
