module.exports = {
  signUp: async (req, res, next) => {
    // Get Email & Password
    // req.value.body
    console.log('contents of req.valuse.body', req.value.body);
    console.log('UsersController.signUp() called!');
  },
  signIn: async (req, res, next) => {
    // Generate token
    console.log('UsersController.signIn() called!');
  },
  secret: async (req, res, next) => {
    //
    console.log('UsersController.secret() called!');
  }
};
