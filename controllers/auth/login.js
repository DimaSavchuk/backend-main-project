const { loginSchema } = require("../../models/user");
const HttpError = require("../../helpers/HttpError");
const { User } = require("../../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { log } = require("console");

const login = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  const { error } = loginSchema.validate(req.body);
  if (error) {
    error.status = 400;
    throw error;
  }

  const user = await User.findOne({ email });
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
      await User.findByIdAndUpdate(user._id, { adult: true });
    }
  }

  const payload = { id: user._id };
  const token = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "20h",
  });

  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
    user: {
      email,
      adult: user.adult,
      id: user._id,
    },
  });
};

module.exports = login;
