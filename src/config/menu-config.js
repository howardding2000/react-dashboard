import {
  HomeOutlined,
  UserOutlined,
  AppstoreOutlined,
  BarsOutlined,
  BarChartOutlined,
  SafetyCertificateOutlined,
  TagsOutlined,
  LineChartOutlined,
  PieChartOutlined,
} from "@ant-design/icons";

const menuList = [
  {
    title: "Home",
    key: "/home",
    icon: <HomeOutlined />,
  },
  {
    title: "Products",
    key: "/products",
    icon: <AppstoreOutlined />,
    children: [
      {
        title: "Category",
        key: "/category",
        icon: <TagsOutlined />,
      },
      {
        title: "Product",
        key: "/product",
        icon: <BarsOutlined />,
      },
    ],
  },
  {
    title: "Users",
    key: "/users",
    icon: <UserOutlined />,
  },
  {
    title: "Roles",
    key: "/roles",
    icon: <SafetyCertificateOutlined />,
  },
  {
    title: "Charts",
    key: "/charts",
    icon: <BarChartOutlined />,
    children: [
      {
        title: "Line Chart",
        key: "/charts/line-chart",
        icon: <LineChartOutlined />,
      },
      {
        title: "Pie Chart",
        key: "/charts/pie-chart",
        icon: <PieChartOutlined />,
      },
      {
        title: "Bar Chart",
        key: "/charts/bar-chart",
        icon: <BarChartOutlined />,
      },
    ],
  },
];

export default menuList;
