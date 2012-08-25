module.exports = {
  userLoggedIn: function () {
    try {
      if (!session.passport.user) {
        console.log('Should NOT be logged in!');
        return false;
      }
      return true;
    } catch(e) {
      console.log('Should NOT be logged in!');
      return false;
    }
  }
}
