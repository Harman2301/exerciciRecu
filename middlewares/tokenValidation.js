// const jwt = require('jsonwebtoken');

// const tokenValidation = (req, res, next) => {
//     console.log(req.header('Authorization'));
//   const token = req.header('Authorization') ? req.header('Authorization').split(' ')[1] : null;

//   if (!token) return res.status(401).json({error: 'Access Denied'});

//   try {
//     const secretKey = 'secret123';
//     const verified = jwt.verify(token, secretKey);
//     req.user = verified;
//     next();
//   } catch (err) {
//     res.status(400).json({error: 'Invalid token'});
//   }
// };

// module.exports = tokenValidation;

const jwt = require('jsonwebtoken');

const tokenValidation = (req, res, next) => {
  const token = req.header('Authorization') ? req.header('Authorization').split(' ')[1] : null;

  if (token) {
    try {
      const secretKey = 'secret123';
      const verified = jwt.verify(token, secretKey);
      req.tokenPayload = verified;
    } catch (err) {
      return res.status(400).json({ error: 'Invalid token' });
    }
  }

  next();
};

module.exports = tokenValidation;




