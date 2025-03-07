import { useSiteConfig } from "#root/hooks/useSiteConfig";
import { Suspense, useEffect, useState } from "react";
import { usePageContext } from "vike-react/usePageContext";
import { Layout as AntdLayout, Menu, Breadcrumb, Dropdown, Avatar } from "antd";
import {
  FullscreenOutlined,
  FullscreenExitOutlined,
  UserOutlined,
  FileTextOutlined,
  CommentOutlined,
  LinkOutlined,
  TagsOutlined,
  AppstoreOutlined,
  TeamOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  ApartmentOutlined,
  SettingOutlined,
  FileSearchOutlined,
} from "@ant-design/icons";
import { navigate } from "vike/client/router";
import { Link } from "../Link/Link";
import { logout } from "#root/api/auth";
import styles from "./Admin.module.scss";
import "../../assets/css/reset.css";
import "../../assets/css/app.css";
import { useMountedStyles } from "#root/hooks/useMountedStyles";
import { SiteConfigHead } from "./SiteConfigHead";

const { Header, Sider, Content } = AntdLayout;

function Layout({ children }: { children: React.ReactNode }) {
  const pageContext = usePageContext();

  const { site, meta } = useSiteConfig();

  const [collapsed, setCollapsed] = useState(false);

  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const [isFullscreen, setIsFullscreen] = useState(false);

  // 切换全屏
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      // 进入全屏
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      });
    } else {
      // 退出全屏
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      });
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // 自动展开和选中菜单
  useEffect(() => {
    const currentPath = pageContext.urlPathname;
    const selected: string[] = []; // 类型定义
    const open: string[] = []; // 类型定义

    // 检查当前路径是否为 /admin
    if (currentPath === "/admin") {
      selected.push(""); // 首页的 key 是空字符串
    }

    // 检查当前路径是否匹配某个子菜单的路径
    menuItems.forEach((menu) => {
      if (menu.children) {
        menu.children.forEach((item) => {
          if (currentPath.includes(item.key)) {
            selected.push(item.key);
            open.push(menu.key);
          }
        });
      } else if (currentPath === menu.key) {
        selected.push(menu.key);
      }
    });

    // 设置展开和选中的菜单
    setOpenKeys((prevOpenKeys) => [...new Set([...prevOpenKeys, ...open])]); // 合并之前的展开状态
    setSelectedKeys(selected);
  }, [pageContext.urlPathname]);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleLogout = () => {
    logout().then(() => {
      navigate("/admin/login");
    });
  };

  // 处理菜单展开/折叠
  const handleOpenChange = (keys: string[]) => {
    setOpenKeys(keys);
  };

  const menuItems = [
    // 首页
    {
      key: "",
      icon: <HomeOutlined />,
      label: <Link href="/admin">首页</Link>,
    },
    // 内容管理
    {
      key: "content",
      label: "内容管理",
      icon: <FileTextOutlined />,
      children: [
        {
          key: "article",
          icon: <FileTextOutlined />,
          label: <Link href="/admin/article">文章管理</Link>,
        },
        {
          key: "upsert",
          icon: <FileTextOutlined />,
          style: { display: "none" },
          label: <Link href="/admin/article/upsert">管理文章</Link>,
        },
        {
          key: "tag",
          icon: <TagsOutlined />,
          label: <Link href="/admin/tag">标签管理</Link>,
        },
        {
          key: "category",
          icon: <TagsOutlined />,
          label: <Link href="/admin/category">分类管理</Link>,
        },
        {
          key: "comment",
          icon: <CommentOutlined />,
          label: <Link href="/admin/comment">评论管理</Link>,
        }
      ],
    },
    // 系统管理
    {
      key: "system",
      label: "系统管理",
      icon: <SettingOutlined />,
      children: [
        {
          key: "friend-link",
          icon: <LinkOutlined />,
          label: <Link href="/admin/friend-link">友链管理</Link>,
        },
        {
          key: "meta",
          icon: <AppstoreOutlined />,
          label: <Link href="/admin/meta">元数据管理</Link>,
        },
        {
          key: "site",
          icon: <ApartmentOutlined />,
          label: <Link href="/admin/site">站点管理</Link>,
        },
        {
          key: "file",
          icon: <FileSearchOutlined />,
          label: <Link href="/admin/file">文件管理</Link>,
        },
        {
          key: "user",
          icon: <TeamOutlined />,
          label: <Link href="/admin/user">用户管理</Link>,
        },
      ],
    },
  ];

  const userMenu = {
    items: [
      {
        key: "logout",
        label: (
          <span
            onClick={() => handleLogout()}
            style={{ display: "block", width: "100%" }}
          >
            退出登录
          </span>
        ),
      },
    ],
  };

  const breadcrumbItems = pageContext.urlPathname
    .split("/")
    .filter(Boolean)
    .map((path, index, arr) => {
      const url = "/" + arr.slice(0, index + 1).join("/");

      // 处理首页路径
      let breadcrumbTitle = path;
      if (url === "/admin" || url === "") {
        breadcrumbTitle = "首页"; // 首页
      } else {
        menuItems.forEach((menu) => {
          menu.children?.forEach((item) => {
            if (path === item.key) {
              breadcrumbTitle = item.label.props.children; // 获取菜单项的文字标签
            }
          });
        });
      }

      return { title: <Link href={url}>{breadcrumbTitle}</Link> };
    });

  const _s = useMountedStyles();

  return (
    <>
      <SiteConfigHead site={site} meta={meta} titleSuffix="-管理后台" />
      <Suspense>
        <div className={styles["admin-layout"]} style={_s}>
          <AntdLayout style={{ minHeight: "100vh" }}>
            <Sider
              trigger={null}
              collapsible
              collapsed={collapsed}
              style={{
                position: 'sticky',
                height: "100vh",
                top: 0,
                bottom: 0,
              }}>
              <div
                className={`${styles["logo"]} ${collapsed ? styles["logo-collapsed"] : ""
                  }`}
              >
                <Link href="/">{site.name}</Link>
              </div>
              <Menu
                theme="dark"
                mode="inline"
                selectedKeys={selectedKeys}
                openKeys={openKeys}
                onOpenChange={handleOpenChange}
                items={menuItems}
              />
            </Sider>
            <AntdLayout>
              <Header
                style={{
                  padding: 0,
                  background: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingLeft: 16,
                  paddingRight: 16,
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
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
                  <Breadcrumb
                    style={{ marginLeft: 16 }}
                    items={breadcrumbItems}
                  />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  {isFullscreen ? (
                    <FullscreenExitOutlined
                      onClick={toggleFullscreen}
                      style={{ fontSize: "18px", cursor: "pointer" }}
                    />
                  ) : (
                    <FullscreenOutlined
                      onClick={toggleFullscreen}
                      style={{ fontSize: "18px", cursor: "pointer" }}
                    />
                  )}
                  <a
                    className={styles["to-site"]}
                    href={site.url}
                    target="_blank"
                  >
                    <LinkOutlined
                      style={{ fontSize: "18px", cursor: "pointer" }}
                    />
                  </a>
                  <Dropdown menu={userMenu}>
                    <Avatar
                      style={{ cursor: "pointer" }}
                      icon={<UserOutlined />}
                    />
                  </Dropdown>
                </div>
              </Header>
              <Content
                style={{
                  margin: "16px",
                  padding: 24,
                  background: "#fff",
                  minHeight: 280,
                  // maxHeight: "calc(100vh - 64px - 36px)",
                  // overflow: "auto",
                }}
              >
                {children}
              </Content>
            </AntdLayout>
          </AntdLayout>
        </div>
      </Suspense>
    </>
  );
}

export { Layout };
