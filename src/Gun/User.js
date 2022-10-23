class User {
  static _user;

  static get() {
    return this._user;
  }

  static init(user) {
    this._user = user;
  }

  static authenticate(pair) {
    return new Promise((resolve, reject) => {
      this._user.auth(pair.alias, pair.passphrase, (at) => {
        if (at.err) {
          console.log("auth error: ", at.err);
          resolve({ success: false, error: at.err });
        } else {
          console.log("auth success");
          resolve({ success: true, error: false });
        }
      });
    });
  }

  static register(pair) {
    return new Promise((resolve, reject) => {
      this._user.create(pair.alias, pair.passphrase, (ack) => {
        if (ack.ok !== 0) {
          console.log("user create error", ack.err);
          resolve({ success: false, error: ack.err });
        } else {
          console.log("user created");
          resolve({ success: true, error: false });
        }
      });
    });
  }

  static logOut() {
    if (this._user.is) {
      this._user.leave();
      console.log("_user logged out");
    }
  }
}

export default User;
