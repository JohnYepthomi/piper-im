import { Avatar, Divider, List, Skeleton } from "antd";
import React, { useEffect, useState, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import UserEdges from "../Gun/UserEdges";
import User from "../Gun/User";

const Friends = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [friends, setFriends] = useState([]);
  const [friendsRef] = useState(UserEdges.friends);
  const onRef = useRef();

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch(
      "https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo"
    )
      .then((res) => res.json())
      .then((body) => {
        setData([...data, ...body.results]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const getFriendsData = () => {
    friendsRef
      .get("list")
      .map()
      .on((data, friendId, _msg, _ev) => {
        const { pub, alias, createdAt } = data;
        if (!onRef.current) onRef.current = _ev;
        setFriends((state) => [
          ...state,
          {
            pub,
            alias,
            createdAt,
          },
        ]);
      }, true);
  };

  useEffect(() => {
    loadMoreData();
  }, []);

  return (
    <React.Fragment>
      <div style={{ width: "100%", textAlign: "right" }}>
        <button style={{ margin: "10px", marginRight: "auto" }}>
          Add Friend
        </button>
      </div>
      <div
        id="scrollableDiv"
        style={{
          height: 400,
          overflow: "auto",
          padding: "0 16px",
          border: "1px solid rgba(140, 140, 140, 0.35)",
        }}
      >
        <InfiniteScroll
          dataLength={data.length}
          next={loadMoreData}
          hasMore={data.length < 50}
          loader={
            <Skeleton
              avatar
              paragraph={{
                rows: 1,
              }}
              active
            />
          }
          endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          scrollableTarget="scrollableDiv"
        >
          <List
            dataSource={data}
            renderItem={(item) => (
              <List.Item key={item.email}>
                <List.Item.Meta
                  avatar={<Avatar src={item.picture.large} />}
                  title={<a href="https://ant.design">{item.name.last}</a>}
                  description={item.email}
                />
                <div>Content</div>
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>
    </React.Fragment>
  );
};
export default Friends;
