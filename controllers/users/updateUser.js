const HttpError = require("../../helpers/HttpError");
const { UserModel } = require("../../models/UserModel");

const updateUser = async (req, res) => {
  const { name } = req.body;

  let updates = {};

  if (name) updates.name = name;

  if (req.file && req.file.path) {
    updates.avatarURL = req.file.path;
  }

  if (!name && !req.file) {
    throw HttpError(400, "Provide either name or file for update");
  }

  const user = await UserModel.findByIdAndUpdate(
    req.user._id,
    { $set: updates },
    { new: true }
  );

  if (!user) {
    throw HttpError(404, "User not found");
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      name: user.name,
      avatarURL: user.avatarURL,
    },
  });
};

module.exports = updateUser;
