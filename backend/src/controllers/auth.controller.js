import { User } from "../models/User.js";
import { hashPassword, comparePassword, hashToken, generateCode } from "../utils/hash.js";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "../utils/jwt.js";
import { setAuthCookies, clearAuthCookies } from "../utils/cookie.js";

// Helper: create token pair and store refresh hash
async function issueTokens(res, user) {
  const accessToken = signAccessToken({ sub: user._id.toString(), email: user.email });
  const refreshToken = signRefreshToken({ sub: user._id.toString() });
  user.refreshTokenHash = hashToken(refreshToken);
  user.refreshTokenExpires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  await user.save();
  setAuthCookies(res, accessToken, refreshToken);
  return { accessToken, refreshToken };
}

export async function signup(req, res, next) {
  try {
    const { name, email, password } = req.body;
    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) return res.status(409).json({ error: "Email already registered" });

    const passwordHash = await hashPassword(password);
    // For "skip email" mode: auto-verify to keep UI simple, but still generate a code for demo logging
    const code = generateCode(6);
    const user = new User({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      passwordHash,
      isVerified: true, // skip verification for now — set to false if you want enforced verify
      verificationCodeHash: hashToken(code),
      verificationExpires: new Date(Date.now() + 10 * 60 * 1000),
    });
    await user.save();

    // Log code for demo — no email sending
    console.log(`[Auth] Signup verification code for ${user.email}: ${code} (user auto-verified for dev)`);

    // Immediately issue tokens (no need to verify)
    await issueTokens(res, user);

    res.status(201).json({
      message: "Account created",
      user: user.toSafeObject(),
      // In dev, expose code so frontend verify page can use it without email
      ...(process.env.NODE_ENV !== "production" ? { devCode: code } : {}),
    });
  } catch (err) {
    next(err);
  }
}

export async function verify(req, res, next) {
  try {
    const { email, code } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(404).json({ error: "User not found" });
    if (user.isVerified) return res.json({ message: "Already verified", user: user.toSafeObject() });

    if (!user.verificationCodeHash || !user.verificationExpires || user.verificationExpires < new Date()) {
      return res.status(400).json({ error: "Code expired, please request a new one" });
    }
    // Allow dev master code 000000 or 123456 to pass without hash check if you want
    const isDevMaster = code === "123456" || code === "000000";
    const hashed = hashToken(code);
    if (!isDevMaster && hashed !== user.verificationCodeHash) {
      return res.status(400).json({ error: "Invalid code" });
    }
    user.isVerified = true;
    user.verificationCodeHash = null;
    user.verificationExpires = null;
    await user.save();
    res.json({ message: "Email verified", user: user.toSafeObject() });
  } catch (err) {
    next(err);
  }
}

export async function resendCode(req, res, next) {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(404).json({ error: "User not found" });
    if (user.isVerified) return res.json({ message: "Already verified" });
    const code = generateCode(6);
    user.verificationCodeHash = hashToken(code);
    user.verificationExpires = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();
    console.log(`[Auth] Resend verification code for ${user.email}: ${code}`);
    res.json({ message: "Code resent", ...(process.env.NODE_ENV !== "production" ? { devCode: code } : {}) });
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(401).json({ error: "Invalid email or password" });

    const ok = await comparePassword(password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: "Invalid email or password" });

    // If you enforce verification, uncomment:
    // if (!user.isVerified) return res.status(403).json({ error: "Please verify your email first" });

    await issueTokens(res, user);
    res.json({ message: "Logged in", user: user.toSafeObject() });
  } catch (err) {
    next(err);
  }
}

export async function refresh(req, res, next) {
  try {
    const token = req.cookies?.refreshToken;
    if (!token) return res.status(401).json({ error: "No refresh token" });
    let payload;
    try {
      payload = verifyRefreshToken(token);
    } catch (e) {
      clearAuthCookies(res);
      return res.status(401).json({ error: "Invalid refresh token" });
    }
    const user = await User.findById(payload.sub);
    if (!user || !user.refreshTokenHash) {
      clearAuthCookies(res);
      return res.status(401).json({ error: "Refresh revoked" });
    }
    if (user.refreshTokenExpires && user.refreshTokenExpires < new Date()) {
      clearAuthCookies(res);
      return res.status(401).json({ error: "Refresh expired" });
    }
    const hashed = hashToken(token);
    if (hashed !== user.refreshTokenHash) {
      clearAuthCookies(res);
      return res.status(401).json({ error: "Refresh mismatch — possible reuse" });
    }
    // Rotate
    await issueTokens(res, user);
    res.json({ message: "Tokens refreshed", user: user.toSafeObject() });
  } catch (err) {
    next(err);
  }
}

export async function logout(req, res, next) {
  try {
    const user = req.user; // may be undefined if called without auth
    if (user) {
      user.refreshTokenHash = null;
      user.refreshTokenExpires = null;
      await user.save();
    } else {
      // try to clear by refresh token lookup
      const token = req.cookies?.refreshToken;
      if (token) {
        try {
          const payload = verifyRefreshToken(token);
          const u = await User.findById(payload.sub);
          if (u) {
            u.refreshTokenHash = null;
            u.refreshTokenExpires = null;
            await u.save();
          }
        } catch {}
      }
    }
    clearAuthCookies(res);
    res.json({ message: "Logged out" });
  } catch (err) {
    next(err);
  }
}

export async function me(req, res, next) {
  try {
    res.json({ user: req.user.toSafeObject() });
  } catch (err) {
    next(err);
  }
}

export async function forgotPassword(req, res, next) {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });
    // Always return success to avoid enumeration, but log if exists
    if (user) {
      const code = generateCode(6);
      user.resetCodeHash = hashToken(code);
      user.resetExpires = new Date(Date.now() + 15 * 60 * 1000);
      await user.save();
      console.log(`[Auth] Password reset code for ${user.email}: ${code}`);
      if (process.env.NODE_ENV !== "production") {
        return res.json({ message: "If email exists, code logged to console", devCode: code });
      }
    }
    res.json({ message: "If that email is registered, you'll get a code" });
  } catch (err) {
    next(err);
  }
}

export async function resetPassword(req, res, next) {
  try {
    const { email, code, newPassword } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user || !user.resetCodeHash || !user.resetExpires || user.resetExpires < new Date()) {
      return res.status(400).json({ error: "Code expired or invalid" });
    }
    const hashed = hashToken(code);
    // allow dev master codes
    const isDevMaster = code === "123456" || code === "000000";
    if (!isDevMaster && hashed !== user.resetCodeHash) {
      return res.status(400).json({ error: "Invalid code" });
    }
    user.passwordHash = await hashPassword(newPassword);
    user.resetCodeHash = null;
    user.resetExpires = null;
    // Invalidate existing sessions
    user.refreshTokenHash = null;
    user.refreshTokenExpires = null;
    await user.save();
    clearAuthCookies(res);
    res.json({ message: "Password reset successful — please log in" });
  } catch (err) {
    next(err);
  }
}
