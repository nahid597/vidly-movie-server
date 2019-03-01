
module.exports = function (req, res, next) {
   if(!req.user.isAdmin) return res.status(403).send('No access. you must be admin..');

   next();
}

