exports.checkAccountPayload = (req, res, next) => {
  // KODLAR BURAYA
  // Not: Validasyon için Yup(şu an yüklü değil!) kullanabilirsiniz veya kendiniz manuel yazabilirsiniz.
  try {
    let {name, budget} = req.body;
    if (!name || !budget) {
      res.status(400).json({message: "name and budget are required"});
    }  else if (typeof name !== 'string') {
      res.status(400).json({message: "name of account must be a string"});
    }
    else if (name.trim().length < 3 || name.trim().length > 100) {
      res.status(400).json({message: "name of account must be between 3 and 100"});
    }
    else if (typeof budget !== 'number') {
      res.status(400).json({message: "budget of account must be a number"});
    }
    else if (budget < 0 || budget > 1000000) {
      res.status(400).json({message: "budget of account is too large or too small"});
    }
    else {
      next();
    }
  } catch (error) {
    next(error);
  }
}

exports.checkAccountNameUnique = (req, res, next) => {
  // KODLAR BURAYA
  try {
    const {name} = req.body;
    const existing = db('accounts').where('name', name.trim()).first();
    if (existing) {
      res.status(400).json({message: "that name is taken"});
    }
    else {
      next();
    }
  } catch (error) {
    next(error);
  }
}

exports.checkAccountId = (req, res, next) => {
  // KODLAR BURAYA
  try {
    const {id} = req.params;
    const existing = db('accounts').where('id', id).first();
    if (!existing) {
      res.status(404).json({message: "account not found"});
    }
    else {
      req.account = existing;
      next();
    }
  } catch (error) {
    next(error);
  }
}
