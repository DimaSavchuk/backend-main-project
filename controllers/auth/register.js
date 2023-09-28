const HttpError = require("../../helpers/HttpError");
const { User } = require("../../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");

const register = async (req, res) => {
  const { email, password, name, birthDate } = req.body;

  const userEmail = await User.findOne({ email });
  if (userEmail) {
    throw HttpError(409, "Email in use");
  }

  const avatarURL = gravatar.url(email);
  const hashPassword = await bcrypt.hash(password, 12);

  const birth = new Date(birthDate * 1000);

  const today = new Date();
  const age =
    today.getFullYear() -
    birth.getFullYear() -
    (today.getMonth() < birth.getMonth() ||
    (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate())
      ? 1
      : 0);

  const isAdult = age >= 18;

  const newUser = await User.create({
    email,
    password: hashPassword,
    name,
    avatarURL,
    birthDate,
    adult: isAdult,
  });

  const payload = { id: newUser._id };
  const token = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "200h",
  });

  await User.findByIdAndUpdate(newUser._id, { token });
  newUser.token = token;

  res.status(201).json({
    status: "success",
    code: 201,
    data: newUser.toObject(),
  });
};

module.exports = register;
