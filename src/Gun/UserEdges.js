export default {
  app: undefined,
  posts: undefined,
  public: undefined,
  private: undefined,
  notes: undefined,
  friends: undefined,
  messages: undefined,
  init(user) {
    if (user.is && !this.app && !this.public && !this.private) {
      this.app = user.get("app");

      //Public Edges
      this.public = this.app.get("public");
      this.posts = this.public.get("posts");

      //Private Edges
      this.private = this.app.get("private");
      this.notes = this.private.get("notes");
      this.messages = this.private.get("messages");
      this.friends = this.private.get("friends");
      Object.freeze(this);
    }
  },
};
