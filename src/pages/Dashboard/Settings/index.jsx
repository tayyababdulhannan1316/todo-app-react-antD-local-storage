import { useState, useEffect } from "react";
import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  message,
  Modal,
  Popconfirm,
  Row,
  Select,
  Switch,
  Tabs,
  Typography,
} from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

const initialPreferences = {
  theme: "system",
  language: "en",
  emailNotifications: true,
  productUpdates: true,
  securityAlerts: true,
  profileVisibility: "public",
};

const Settings = () => {
  const [preferences, setPreferences] = useState(initialPreferences);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("preferences"));
    if (saved) setPreferences((p) => ({ ...p, ...saved }));
  }, []);

  const updatePreference = (key, value) =>
    setPreferences((s) => ({ ...s, [key]: value }));

  const handleSave = () => {
    setSaving(true);
    localStorage.setItem("preferences", JSON.stringify(preferences));
    setSaving(false);
    message.success("Settings saved");
  };

  const handleDeleteAccount = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) return message.error("No account found");

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const remaining = users.filter((u) => u.email !== currentUser.email);
    localStorage.setItem("users", JSON.stringify(remaining));
    localStorage.removeItem("currentUser");

    message.success("Account deleted");
    // Redirect to login/home as appropriate for your router, e.g.:
    // navigate("/login");
  };

  const confirmDeleteAccount = () => {
    Modal.confirm({
      title: "Delete your account?",
      icon: <ExclamationCircleOutlined />,
      content:
        "This permanently removes your account and data. This action cannot be undone.",
      okText: "Delete account",
      okType: "danger",
      cancelText: "Cancel",
      onOk: handleDeleteAccount,
    });
  };

  return (
    <main className="settings">
      <div className="container">
        <Title level={1} className="mb-5">
          Settings
        </Title>
        <Divider />

        <Card>
          <Tabs
            defaultActiveKey="general"
            items={[
              {
                key: "general",
                label: "General",
                children: (
                  <Form layout="vertical">
                    <Row gutter={16}>
                      <Col xs={24} md={12}>
                        <Form.Item label="Theme">
                          <Select
                            size="large"
                            value={preferences.theme}
                            onChange={(value) => updatePreference("theme", value)}
                            options={[
                              { value: "system", label: "Match system" },
                              { value: "light", label: "Light" },
                              { value: "dark", label: "Dark" },
                            ]}
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={12}>
                        <Form.Item label="Language">
                          <Select
                            size="large"
                            value={preferences.language}
                            onChange={(value) => updatePreference("language", value)}
                            options={[
                              { value: "en", label: "English" },
                              { value: "ur", label: "Urdu" },
                              { value: "es", label: "Spanish" },
                              { value: "fr", label: "French" },
                            ]}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form>
                ),
              },
              {
                key: "notifications",
                label: "Notifications",
                children: (
                  <Row gutter={[16, 16]}>
                    <Col span={24} className="d-flex justify-content-between align-items-center">
                      <div>
                        <Text strong>Email notifications</Text>
                        <Paragraph type="secondary" className="mb-0">
                          Receive general updates by email
                        </Paragraph>
                      </div>
                      <Switch
                        checked={preferences.emailNotifications}
                        onChange={(checked) => updatePreference("emailNotifications", checked)}
                      />
                    </Col>
                    <Divider className="my-2" />
                    <Col span={24} className="d-flex justify-content-between align-items-center">
                      <div>
                        <Text strong>Product updates</Text>
                        <Paragraph type="secondary" className="mb-0">
                          New features and announcements
                        </Paragraph>
                      </div>
                      <Switch
                        checked={preferences.productUpdates}
                        onChange={(checked) => updatePreference("productUpdates", checked)}
                      />
                    </Col>
                    <Divider className="my-2" />
                    <Col span={24} className="d-flex justify-content-between align-items-center">
                      <div>
                        <Text strong>Security alerts</Text>
                        <Paragraph type="secondary" className="mb-0">
                          Sign-in attempts and password changes
                        </Paragraph>
                      </div>
                      <Switch
                        checked={preferences.securityAlerts}
                        onChange={(checked) => updatePreference("securityAlerts", checked)}
                      />
                    </Col>
                  </Row>
                ),
              },
              {
                key: "privacy",
                label: "Privacy",
                children: (
                  <Form layout="vertical">
                    <Row gutter={16}>
                      <Col xs={24} md={12}>
                        <Form.Item
                          label="Profile visibility"
                          extra="Controls who can see your profile details"
                        >
                          <Select
                            size="large"
                            value={preferences.profileVisibility}
                            onChange={(value) => updatePreference("profileVisibility", value)}
                            options={[
                              { value: "public", label: "Public" },
                              { value: "members", label: "Members only" },
                              { value: "private", label: "Private" },
                            ]}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form>
                ),
              },
              {
                key: "danger",
                label: "Danger zone",
                children: (
                  <Card variant="borderless" className="border border-danger">
                    <Title level={5} className="text-danger">
                      Delete account
                    </Title>
                    <Paragraph type="secondary">
                      Once you delete your account, there is no going back. All of your
                      data will be permanently removed.
                    </Paragraph>
                    <Popconfirm
                      title="Are you sure?"
                      description="This cannot be undone."
                      okText="Yes, delete"
                      okButtonProps={{ danger: true }}
                      cancelText="Cancel"
                      onConfirm={confirmDeleteAccount}
                    >
                      <Button danger>Delete my account</Button>
                    </Popconfirm>
                  </Card>
                ),
              },
            ]}
          />

          <Divider />
          <Button type="primary" size="large" loading={saving} onClick={handleSave}>
            Save settings
          </Button>
        </Card>
      </div>
    </main>
  );
};

export default Settings;
