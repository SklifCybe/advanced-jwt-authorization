class UserController {
  async registration(req, res, next) {
    try {
      
    } catch(err) {
      console.log(err);
    }
  }

  async login(req, res, next) {
    try {

    } catch(err) {
      console.log(err);
    }
  }

  async logout(req, res, next) {
    try {

    } catch(err) {
      console.log(err);
    }
  }

  async activate(req, res, next) {
    try {

    } catch(err) {
      console.log(err);
    }
  }

  async refresh(req, res, next) {
    try {

    } catch(err) {
      console.log(err);
    }
  }

  async getUsers(req, res, next) {
    try {
      res.json(['123', '456']);
    } catch(err) {
      console.log(err);
    }
  }
}

module.exports = new UserController();