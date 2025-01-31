import { useSiteConfig } from "#root/hooks/useSiteConfig";
import { useState } from "react";
import { Layout as AntdLayout, Menu } from "antd";
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import "../../assets/css/reset.css";
import "../../assets/css/app.css";

const { Header, Sider, Content } = AntdLayout;

function Layout({ children }: { children: React.ReactNode }) {
  const { site, meta } = useSiteConfig();

  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const menuItems = [
    { key: "1", icon: <UserOutlined />, label: "用户管理" },
    { key: "2", icon: <VideoCameraOutlined />, label: "视频管理" },
    { key: "3", icon: <UploadOutlined />, label: "上传管理" },
  ];

  return (
    <div className="admin-layout">
      <AntdLayout style={{ minHeight: "100vh" }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div
            className="logo"
            style={{
              height: 32,
              margin: 16,
              background: "rgba(255, 255, 255, 0.2)",
            }}
          ></div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]} items={menuItems} />
        </Sider>
        <AntdLayout>
          <Header
            style={{
              padding: 0,
              background: "#fff",
              display: "flex",
              alignItems: "center",
              paddingLeft: 16,
            }}
          >
            {collapsed ? (
              <MenuUnfoldOutlined
                onClick={toggleCollapse}
                style={{ fontSize: "18px", cursor: "pointer" }}
              />
            ) : (
              <MenuFoldOutlined
                onClick={toggleCollapse}
                style={{ fontSize: "18px", cursor: "pointer" }}
              />
            )}
          </Header>
          <Content
            style={{
              margin: "16px",
              padding: 24,
              background: "#fff",
              minHeight: 280,
            }}
          >
            {children}
          </Content>
        </AntdLayout>
      </AntdLayout>
    </div>
  );
}

export { Layout };
