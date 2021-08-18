const {UserModel} = require('../module/Schema.module');

const getSongs = async (req,res) =>{
  // const{email} = req.query;
  UserModel.findOne({email:'xa7d9q0862ivuth0fv3c9b78f'}, (e, user)=>{
    user===null?res.send('No Data'):res.json(user);
    // console.log(user.songs);
  });
  // res.send(email);
};

const createSong = async (req, res) => {
  // const {

  //   title,
  //   artist,
  //   uri
  // } = req.body;
  UserModel.findOne({ email:'xa7d9q0862ivuth0fv3c9b78f' }, (err, user) => {
    if (err) console.error(err);
    user.playlist.push(req.body);
    user.save();
    res.send(user);
  });
  // create the new cat
  // const newSongObj = new UserModel({
  //   title: title,
  //   artist:artist,
  //   uri:uri,
  // });
  // newSongObj.save();

  // res.json(newSongObj);
};

const deleteSong = async (req,res) =>{
  const songId = req.params.id;
  // UserModel.deleteOne({_id:songId},(error,deleted)=>{
  //   res.send(deleted);
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
