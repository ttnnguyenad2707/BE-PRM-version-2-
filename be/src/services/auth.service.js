// @ts-ignore
const User = require('../models/user.model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { REFRESH_KEY, ACCESS_KEY } = process.env;

class AuthService {

    async registerUser(req, res) {
        const { email, password, firstname, lastname } = req.body;
        try {

            const checkEmailExists = await User.findOne({ email: email });
            if (checkEmailExists) return res.status(400).json("Email has exists");
            
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(password, salt);

            const result = await User.create({
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: hashed,

            })
            //  return result;
              return res.status(200).json(
                {
                    message : 'Register Success !',
                    
                }
              );

        } catch (error) {
            throw error;
        }
    }

    async genAccessToken(user) {
        return jwt.sign({
            id: user.id,
            admin: user.admin,
        }, ACCESS_KEY, { expiresIn: "2h" });
    }
    async genRefreshToken(user) {
        return jwt.sign({
            id: user.id,
            admin: user.admin,
        }, REFRESH_KEY, { expiresIn: "365d" });
    }

    async loginUser(req, res) {
        try {
            const findUser = await User.findOne({ email: req.body.email });
            if (!findUser) {
                res.status(401).json({ error: "Wrong email" });
            }
            const comparePassword = await bcrypt.compare(req.body.password, findUser.password);
            if (!comparePassword) {
                return res.status(401).json({ error: "Wrong password" });
            }
            const { password, refreshToken, ...others } = findUser._doc;
            if (findUser && comparePassword) {
                const genAccessToken = await this.genAccessToken(findUser);
                const genRefreshToken = await this.genRefreshToken(findUser);

                const a = res.cookie("accessToken", genAccessToken, {
                    httpOnly: false,
                    secure: false,
                    path: "/",
                    sameSite: "strict",
                });
                await User.findByIdAndUpdate({ _id: findUser.id }, { refreshToken: genRefreshToken });
                return res.status(200).json({ ...others });
            }
        } catch (error) {
            throw error;
        }
    }


    async refreshAccessToken(req, res) {
        const { id } = req.body;
        const findUser = await User.findById(id);
        if (!findUser) {
            return res.status(404).json("Not found User");
        }

        const getRefreshTokenInDB = findUser.refreshToken;

        try {
            jwt.verify(getRefreshTokenInDB, REFRESH_KEY);


            const newAccessToken = await this.genAccessToken(findUser);
            const newRefreshToken = await this.genRefreshToken(findUser);

            res.cookie("accessToken", newAccessToken, {
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "strict",
            });

            await User.findByIdAndUpdate({ _id: findUser.id }, { refreshToken: newRefreshToken });

            res.status(200).json({ accessToken: newAccessToken });
        } catch (error) {
            res.status(403).json("Invalid refreshToken");
        }
    }

    async logoutUser(req, res) {
        res.clearCookie("accessToken");
        res.status(200).json("Logout successful");
    }
    async checkUser(req, res) {
        const token = req.headers.token;
        if (token) {
          const accessToken = token.split(" ")[1];
          try {
            const user = jwt.verify(accessToken, ACCESS_KEY);
      
            const currentTimestamp = Math.floor(Date.now() / 1000); 
            if (user.exp < currentTimestamp) {
                console.log('a');
              return res.status(401).json("Token has expired");
            }
      
            const findUser = await User.findById(user.id);
            const { password, refreshToken, ...other } = findUser._doc;
            return res.status(200).json({ ...other });
          } catch (err) {
            return res.status(403).json("Token has expired");
          }
        } else {
          return res.status(401).json("You are not authenticated");
        }
      }
      



}

module.exports = new AuthService();
