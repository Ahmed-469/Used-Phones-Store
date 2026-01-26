const isSeller = (req, res, next) => {
  if (!req.session.user || req.session.user.role !== 'seller') {
    return;
  }
  next();
};

module.exports = isSeller;