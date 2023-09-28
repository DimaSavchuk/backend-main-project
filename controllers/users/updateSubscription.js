const { User } = require("../../models/userModel");

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;

  const user = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { new: true }
  );

  res.json({
    email: user.email,
    subscription: user.subscription,
  });
};

module.exports = updateSubscription;
