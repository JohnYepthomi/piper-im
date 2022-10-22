import SEA from "gun/sea";
import guid from "../utils/guid";
import UserEdges from "./UserEdges";
import deepFreeze from "../utils/deepFreeze";

const Message = {
  _secrets: {},
  readOn: async (recipientEpub, updater, ref) => {
    const secret = this.getSecret(recipientEpub);
    UserEdges.messages
      .get(secret)
      .map()
      .on((msg, msgId, _m, _e) => {
        if (!ref.current) ref.current = _e;
        updater((state) => [
          ...state.filter((item) => item.id !== msgId),
          {
            id: postId,
            post: msg.post,
            author: msg.author,
          },
        ]);
      }, true);
  },
  write: async (authedUser, message, recipientEpub) => {
    const secret = this.getSecret(recipientEpub);
    const enc_msg = await SEA.encrypt(message, secret);
    UserEdges.messages.get(secret).put(enc_msg);
  },
  remove: async (authedUser, messageId) => {
    const secret = this.getSecret(recipientEpub);
    UserEdges.messages.get(secret).get(messageId).put(null);
  },
  async getSecret(recipientEpub) {
    if (!this._secrets[recipientEpub]) {
      const secret = await SEA.secret(recipientEpub, authedUser.get());
      this._secrets[recipientEpub] = secret;
      return secret;
    } else {
      return this._secrets[recipientEpub];
    }
  },
};

deepFreeze(Message);
export default Message;
