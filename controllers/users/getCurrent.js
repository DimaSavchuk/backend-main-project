const getCurrent = async (req, res) => {
  console.log(req.body);
  const { email, name, avatarURL } = req.user;
  res.json({
    status: "success",
    code: 200,
    data: {
      user: { email, name, avatarURL },
    },
  });
};

module.exports = getCurrent;
