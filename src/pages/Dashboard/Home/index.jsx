import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import {
  Avatar,Button, Card,  Col,  Divider,  Empty,  Row,  Statistic,  Table,  Tag,  Typography,} from "antd";
import {
  UserAddOutlined,
  UsergroupAddOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  UserOutlined,
  SettingOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const statusColors = {
  pending: "gold",
  approved: "green",
  rejected: "red",
};

const Home = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    setUsers(JSON.parse(localStorage.getItem("users")) || []);
    setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
  }, []);

  const stats = useMemo(() => {
    const total = users.length;
    const pending = users.filter((u) => u.status === "pending").length;
    const approved = users.filter((u) => u.status === "approved").length;

    const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const newThisWeek = users.filter((u) => u.createdAt > oneWeekAgo).length;

    return { total, pending, approved, newThisWeek };
  }, [users]);

  const recentUsers = useMemo(
    () => [...users].sort((a, b) => b.createdAt - a.createdAt).slice(0, 5),
    [users]
  );

  const handleApprove = (email) => {
    const updated = users.map((u) =>
      u.email === email ? { ...u, status: "approved" } : u
    );
    setUsers(updated);
    localStorage.setItem("users", JSON.stringify(updated));
  };

  const handleReject = (email) => {
    const updated = users.map((u) =>
      u.email === email ? { ...u, status: "rejected" } : u
    );
    setUsers(updated);
    localStorage.setItem("users", JSON.stringify(updated));
  };

  const columns = [
    {
      title: "User",
      dataIndex: "fullName",
      key: "fullName",
      render: (fullName, record) => (
        <div className="d-flex align-items-center">
          <Avatar src={record.avatar} className="me-2">
            {fullName ? fullName[0]?.toUpperCase() : "?"}
          </Avatar>
          <div>
            <div>{fullName || "Unnamed user"}</div>
            <Text type="secondary" style={{ fontSize: 12 }}>
              {record.email}
            </Text>
          </div>
        </div>
      ),
    },
    {
      title: "Joined",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => new Date(createdAt).toLocaleDateString(),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={statusColors[status] || "default"}>
          {(status || "unknown").toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) =>
        record.status === "pending" ? (
          <>
            <Button
              type="link"
              size="small"
              onClick={() => handleApprove(record.email)}
            >
              Approve
            </Button>
            <Button
              type="link"
              size="small"
              danger
              onClick={() => handleReject(record.email)}
            >
              Reject
            </Button>
          </>
        ) : (
          <Text type="secondary">—</Text>
        ),
    },
  ];

  return (
    <main className="dashboard-home">
      <div className="container">
        <Title level={1} className="mb-0">
          {currentUser?.fullName ? `Welcome back, ${currentUser.fullName}` : "Dashboard"}
        </Title>
        <Text type="secondary">Here's what's happening with your users today.</Text>
        <Divider />
        {/* Quick links */}
<Row gutter={[16, 16]} className="mb-4">
  <Col xs={24} sm={8}>
    <Link to="profile">
      <Card hoverable>
        <div className="d-flex align-items-center">
          <UserOutlined style={{ fontSize: 20, marginRight: 10 }} />
          <Text strong>Profile</Text>
        </div>
      </Card>
    </Link>
  </Col>
  <Col xs={24} sm={8}>
    <Link to="settings">
      <Card hoverable>
        <div className="d-flex align-items-center">
          <SettingOutlined style={{ fontSize: 20, marginRight: 10 }} />
          <Text strong>Settings</Text>
        </div>
      </Card>
    </Link>
  </Col>
  <Col xs={24} sm={8}>
    <Link to="todos">
      <Card hoverable>
        <div className="d-flex align-items-center">
          <UnorderedListOutlined style={{ fontSize: 20, marginRight: 10 }} />
          <Text strong>Todos</Text>
        </div>
      </Card>
    </Link>
  </Col>
</Row>

        {/* Stat cards */}
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Total users"
                value={stats.total}
                prefix={<UsergroupAddOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
             <Statistic
              title="Pending approval"
              value={stats.pending}
              styles={{ content: { color: "#d4a106" } }}
              prefix={<ClockCircleOutlined />}
            />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Approved users"
                value={stats.approved}
                styles={{ content: { color: "#3f8600" } }}
                prefix={<CheckCircleOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="New this week"
                value={stats.newThisWeek}
                prefix={<UserAddOutlined />}
              />
            </Card>
          </Col>
        </Row>

        {/* Recent users */}
        <Card
          className="mt-4"
          title="Recent registrations"
          extra={
            stats.pending > 0 && (
              <Tag color="gold">{stats.pending} awaiting review</Tag>
            )
          }
        >
          {recentUsers.length ? (
            <Table
              dataSource={recentUsers}
              columns={columns}
              rowKey="uid"
              pagination={false}
            />
          ) : (
            <Empty description="No users yet" />
          )}
        </Card>
      </div>
    </main>
  );
};

export default Home;
