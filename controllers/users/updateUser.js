const HttpError = require("../../helpers/HttpError");
const { User } = require("../../models/userModel");

const updateUser = async (req, res) => {
  const { name } = req.body;

  if (!req.file || !req.file.path) {
    throw HttpError(400, "File is required for this request");
  }

  const avatarURL = req.file.path;

  let updates = {};
  if (name) updates.name = name;
  if (avatarURL) updates.avatarURL = avatarURL;

  const user = await User.findByIdAndUpdate(
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
