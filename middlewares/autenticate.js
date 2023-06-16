const userService = require("../services/userService");

module.exports = async (req, res, next) => {
    try {
      const user = await userService.findById(req.userId);
  
      if (!user) {
        return res.status(c.status.unauthorized).send({ error: 'User not found' });
      }
  
      req.user = user;
      next();
    } catch (err) {
      return res.status(c.status.unauthorized).send({ error: 'Invalid user' });
    }
  };