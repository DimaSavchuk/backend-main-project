const HttpError = require("../../helpers/HttpError");
const { UserModel } = require("../../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });
  const comparePassword = await bcrypt.compare(password, user.password);
  if (!user || !comparePassword) {
    throw HttpError(401, "Email, password is wrong or not verify.");
  }

  if (user.birthDate) {
    const currentDate = new Date();
    const birthDate = new Date(user.birthDate * 1000);

    const age =
      currentDate.getFullYear() -
      birthDate.getFullYear() -
      (currentDate.getMonth() < birthDate.getMonth() ||
      (currentDate.getMonth() === birthDate.getMonth() &&
        currentDate.getDate() < birthDate.getDate())
        ? 1
        : 0);

    if (age >= 18 && !user.adult) {
      await UserModel.findByIdAndUpdate(user._id, { adult: true });
    }
  }

  const payload = { id: user._id };
  const token = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "200h",
  });

  await UserModel.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    user: {
      email,
      name: user.name,
      adult: user.adult,
      id: user._id,
    },
  });
};

module.exports = login;
