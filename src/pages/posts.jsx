import NewPost from "../components/Post/NewPost";
import PostsFeed from "../components/Post/PostsFeed";

const Posts = () => {
  return (
    <div
      className="post-view-container"
      style={{
        height: "76vh",
        overflowY: "scroll",
        paddingRight: "5px",
        marginRight: "-10px",
      }}
    >
      <PostsFeed />
    </div>
  );
};

export default Posts;
