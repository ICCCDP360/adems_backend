function cors(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://student.cdp360.com",
    "https://student.goadem.com",
    "https://students.cdp360.com",
    "https://students.goadem.com",
    "https://student-dev.cdp360.in"

  ]);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );

  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  next();
}

module.exports = cors;
