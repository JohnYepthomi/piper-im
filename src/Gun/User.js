import Gun from "gun";
import SEA from "gun/sea";

const gun = Gun();
const user = gun.user();

class User {
  static _user = user;

  static get() {
    return this._user;
  }

  static authenticate(pair) {
    return new Promise((resolve, reject) => {
      this._user.auth(pair.alias, pair.passphrase, (at) => {
        if (at.err) {
          console.log("auth error: ", at.err);
          resolve(false);
        } else {
          console.log("auth success");
          resolve(true);
        }
      });
    });
  }

  static register(pair) {
    return new Promise((resolve, reject) => {
      this._user.create(pair.alias, pair.passphrase, (ack) => {
        if (ack.ok !== 0) {
          console.log("user create error");
          resolve(false);
        } else {
          console.log("user created");
          resolve(true);
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

Object.freeze(User);

export default User;
