import { User } from "../models/User.js";

export async function getMe(req, res) {
  res.json({ user: req.user.toSafeObject() });
}

export async function patchMe(req, res, next) {
  try {
    const { name } = req.body;
    if (name !== undefined) {
      req.user.name = name.trim();
    }
    await req.user.save();
    res.json({ user: req.user.toSafeObject() });
  } catch (err) {
    next(err);
  }
}

export async function deleteMe(req, res, next) {
  try {
    await User.findByIdAndDelete(req.user._id);
    res.clearCookie("accessToken", { httpOnly: true, sameSite: "lax", path: "/" });
    res.clearCookie("refreshToken", { httpOnly: true, sameSite: "lax", path: "/" });
    res.json({ message: "Account deleted" });
  } catch (err) {
    next(err);
  }
}
