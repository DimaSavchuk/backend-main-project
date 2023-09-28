const { UserModel } = require("../../models/UserModel");

const logout = async (req, res) => {
  const { _id } = req.user;
  await UserModel.findByIdAndUpdate(_id, { token: null });

  res.status(204).json();
};

module.exports = logout;
