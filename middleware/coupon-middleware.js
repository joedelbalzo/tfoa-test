const restrictAccess = (req, res, next) => {
  const origin = req.headers.origin || req.headers.referer;
  console.log("we're here checking origins");
  if (origin) {
    console.log(origin);
  } else {
    console.log("wtf is the origin");
  }
  const allowedOrigins = [
    "https://fife-porpoise-xrrg.squarespace.com",
    "http://fife-porpoise-xrrg.squarespace.com",
    "https://tfoa-test.onrender.com",
    "http://tfoa-test.onrender.com",
    "http://localhost:3000",
    "http://localhost:5000",
  ];

  if (allowedOrigins.includes(origin) || (origin === undefined && req.headers.host.includes("localhost"))) {
    console.log("allowed");
    next();
  } else {
    res.status(403).send(`Access Denied: Your ${origin} is not allowed.`);
  }
};

module.exports = { restrictAccess };
