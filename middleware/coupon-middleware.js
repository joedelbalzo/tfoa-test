const restrictAccess = async (req, res, next) => {
  const origin = (await req.headers.origin) || (await req.headers.referer);

  const allowedBases = ["fife-porpoise-xrrg.squarespace.com", "tfoa-test.onrender.com", "localhost:3000", "localhost:5000"];

  const isAllowedOrigin = allowedBases.some((base) => origin.includes(base));

  if (isAllowedOrigin) {
    console.log("allowed");
    next();
  } else {
    console.log("denied here.");
    res.status(403).send(`Access Denied: Your ${origin} is not allowed.`);
  }
};

module.exports = { restrictAccess };
