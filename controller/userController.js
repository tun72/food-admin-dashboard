const User = require("../model/userModel");

exports.getUser = async (req, res, next) => {
  try {
    const id = req.user._id;
    const user = await User.findById(id);

    res.status(200).json({
      user,
      message: "success",
    });
  } catch (err) {
    res.status(500).json({
        err,
        message: "fail",
      });
  }
};

exports.postEditUser = async(req, res, next) => {
  try {
    const id = req.user._id;
    const user = await User.findByIdAndUpdate(id, req.body)

    res.status(200).json({
      user,
      message: "success",
    });
  } catch (err) {
    res.status(500).json({
        err,
        message: "fail",
      });
  }
}
