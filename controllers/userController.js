const c = require("../config/constants");
const userService = require("../services/userService");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.register = async (req, res) => {
    const response = { status: 500, message: "Server error" };
    try {
      const { name, email, password} = req.body;

      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);
  
      const user = {
        name,
        email,
        password: passwordHash,
      };
      const responseFromService = await userService.create(user);
      if (responseFromService) {
        response.status = 201;
        response.message = "User created successfully!";
        response.result = responseFromService.result;
      }
    } catch (err) {
      console.log("UserController-register:", err);
      response.status = 500;
      response.message = "Server error";
    }
    return res.status(response.status).send(response);
};


module.exports.login = async (req, res) => {
    const response = { status: 500, message: "Server error" };
    try {
      const { email, password } = req.body;
  
      const user = await userService.login(email);
  
      if (!user) {
        response.status = 401;
        response.message = "Incorrect email or password";
        return res.status(response.status).send(response);
      }
  
      console.log(user)
  
      const validPassword = await bcrypt.compare(password, user.result.password);
  
      if (!validPassword) {
        response.status = 401;
        response.message = "Incorrect email or password";
        return res.status(response.status).send(response);
      }

    const token = jwt.sign({ userId: user.result._id }, "secret123", { expiresIn: "30m" });

  
      response.status = 200;
      response.message = "Login successful";
      response.result = { token };
    } catch (err) {
      console.log("UserController-login:", err);
      response.status = 500;
      response.message = "Server error";
    }
    return res.status(response.status).send(response);
  };

