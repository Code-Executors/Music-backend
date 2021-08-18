const {UserModel} = require('../module/Schema.module');

const getSongs = async (req,res) =>{
  UserModel.findOne({email:'xa7d9q0862ivuth0fv3c9b78f'}, (e, user)=>{
    user===null?res.send('No Data'):res.json(user);
  });
};

const createSong = async (req, res) => {
  UserModel.findOne({ email:'xa7d9q0862ivuth0fv3c9b78f' }, (err, user) => {
    if (err) console.error(err);
    user.playlist.push(req.body);
    user.save();
    res.send(user);
  });
};

const deleteSong = async (req,res) =>{
  const songId = req.params.id;
  UserModel.findOne({email:'xa7d9q0862ivuth0fv3c9b78f'}, (err, user) => {
    const newPlaylistArr = user.playlist.filter(song => song.id !== songId);
    user.playlist = newPlaylistArr;
    user.save();
    res.send(user);
  });
};

module.exports = {
  getSongs,
  createSong,
  deleteSong
};
