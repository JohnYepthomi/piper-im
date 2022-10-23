import { Button, PageHeader, Divider, Badge, Avatar, Typography } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  DeploymentUnitOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import User from "../Gun/User";
import clearObject from "../utils/ClearObject";

export default function Header({ username }) {
  const { Text } = Typography;
  const navigate = useNavigate();

  function handleLogOut() {
    try {
      console.log("logging out user...");
      User.logOut();
    } catch (e) {
      console.error("error calling user.leave()", e);
    }
    navigate("/");
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px",
        borderBottom: "1px solid #f0f0f0",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <Avatar
          style={{ backgroundColor: "purple" }}
          size="small"
          icon={<DeploymentUnitOutlined />}
        />
        <Typography.Title level={5} style={{ margin: 0 }}>
          Pipeer
        </Typography.Title>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "0px",
          padding: "0px",
        }}
      >
        <Button
          style={{ fontSize: "0.56rem" }}
          danger={true}
          icon={<LogoutOutlined />}
          onClick={handleLogOut}
        >
          Logout
          <label
            style={{
              fontWeight: "bold",
              fontSize: "1rem",
              marginLeft: "5px",
            }}
          >
            {username && username}
          </label>
        </Button>
      </div>
    </div>
  );
}
