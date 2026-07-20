import { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  message,
  Row,
  Tabs,
  Typography,
  Upload,
} from "antd";
import { UserOutlined, CameraOutlined, LockOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const initialInfo = { fullName: "", email: "", phone: "", bio: "" };
const initialPasswords = { currentPassword: "", newPassword: "", confirmPassword: "" };

const Profile = () => {
  const [info, setInfo] = useState(initialInfo);
  const [avatar, setAvatar] = useState("");
  const [passwords, setPasswords] = useState(initialPasswords);
  const [savingInfo, setSavingInfo] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  // Load the logged-in user (adjust the key to match your auth storage)
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      setInfo({
        fullName: currentUser.fullName || "",
        email: currentUser.email || "",
        phone: currentUser.phone || "",
        bio: currentUser.bio || "",
      });
      setAvatar(currentUser.avatar || "");
    }
  }, []);

  const handleInfoChange = (e) =>
    setInfo((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handlePasswordChange = (e) =>
    setPasswords((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleAvatarUpload = ({ file }) => {
    const reader = new FileReader();
    reader.onload = () => setAvatar(reader.result);
    reader.readAsDataURL(file);
    return false; // prevent antd's default upload behavior
  };

  const handleSaveInfo = () => {
    if (!info.fullName || !info.email) {
      return message.error("Full name and email are required");
    }

    setSavingInfo(true);
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const updatedUsers = users.map((u) =>
      u.email === currentUser?.email ? { ...u, ...info, avatar } : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem(
      "currentUser",
      JSON.stringify({ ...currentUser, ...info, avatar })
    );

    setSavingInfo(false);
    message.success("Profile updated");
  };

  const handleChangePassword = () => {
    const { currentPassword, newPassword, confirmPassword } = passwords;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return message.error("Please fill in all password fields");
    }
    if (newPassword !== confirmPassword) {
      return message.error("New passwords do not match");
    }

    setSavingPassword(true);
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const match = users.find((u) => u.email === currentUser?.email);

    if (!match || match.password !== currentPassword) {
      setSavingPassword(false);
      return message.error("Current password is incorrect");
    }

    const updatedUsers = users.map((u) =>
      u.email === currentUser.email ? { ...u, password: newPassword } : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    setSavingPassword(false);
    setPasswords(initialPasswords);
    message.success("Password changed successfully");
  };

  return (
    <main className="profile">
      <div className="container">
        <Title level={1} className="mb-5">
          Profile
        </Title>
        <Divider />

        <Row gutter={24}>
          {/* Avatar + summary */}
          <Col xs={24} md={7}>
            <Card className="text-center p-3">
              <Avatar size={96} icon={<UserOutlined />} src={avatar} />
              <Upload showUploadList={false} beforeUpload={() => false} onChange={handleAvatarUpload}>
                <Button icon={<CameraOutlined />} type="link" block>
                  Change photo
                </Button>
              </Upload>
              <Divider />
              <Title level={4} className="mb-0">
                {info.fullName || "Your name"}
              </Title>
              <Text type="secondary">{info.email || "your@email.com"}</Text>
            </Card>
          </Col>

          {/* Editable details */}
          <Col xs={24} md={17}>
            <Card>
              <Tabs
                defaultActiveKey="info"
                items={[
                  {
                    key: "info",
                    label: "Profile info",
                    children: (
                      <Form layout="vertical">
                        <Row gutter={16}>
                          <Col span={24}>
                            <Form.Item label="Full name" required>
                              <Input
                                size="large"
                                name="fullName"
                                value={info.fullName}
                                placeholder="Enter your full name"
                                onChange={handleInfoChange}
                              />
                            </Form.Item>
                          </Col>
                          <Col span={24}>
                            <Form.Item label="Email" required>
                              <Input
                                size="large"
                                name="email"
                                type="email"
                                value={info.email}
                                placeholder="Enter your email"
                                onChange={handleInfoChange}
                              />
                            </Form.Item>
                          </Col>
                          <Col span={24}>
                            <Form.Item label="Phone">
                              <Input
                                size="large"
                                name="phone"
                                value={info.phone}
                                placeholder="Enter your phone number"
                                onChange={handleInfoChange}
                              />
                            </Form.Item>
                          </Col>
                          <Col span={24}>
                            <Form.Item label="Bio">
                              <Input.TextArea
                                rows={4}
                                name="bio"
                                value={info.bio}
                                placeholder="Tell us a little about yourself"
                                onChange={handleInfoChange}
                              />
                            </Form.Item>
                          </Col>
                          <Col span={24}>
                            <Button
                              type="primary"
                              size="large"
                              loading={savingInfo}
                              onClick={handleSaveInfo}
                            >
                              Save changes
                            </Button>
                          </Col>
                        </Row>
                      </Form>
                    ),
                  },
                  {
                    key: "security",
                    label: "Security",
                    children: (
                      <Form layout="vertical">
                        <Row gutter={16}>
                          <Col span={24}>
                            <Form.Item label="Current password" required>
                              <Input.Password
                                size="large"
                                name="currentPassword"
                                prefix={<LockOutlined />}
                                value={passwords.currentPassword}
                                placeholder="Enter your current password"
                                onChange={handlePasswordChange}
                              />
                            </Form.Item>
                          </Col>
                          <Col span={24}>
                            <Form.Item label="New password" required>
                              <Input.Password
                                size="large"
                                name="newPassword"
                                prefix={<LockOutlined />}
                                value={passwords.newPassword}
                                placeholder="Enter a new password"
                                onChange={handlePasswordChange}
                              />
                            </Form.Item>
                          </Col>
                          <Col span={24}>
                            <Form.Item label="Confirm new password" required>
                              <Input.Password
                                size="large"
                                name="confirmPassword"
                                prefix={<LockOutlined />}
                                value={passwords.confirmPassword}
                                placeholder="Confirm your new password"
                                onChange={handlePasswordChange}
                              />
                            </Form.Item>
                          </Col>
                          <Col span={24}>
                            <Button
                              type="primary"
                              size="large"
                              loading={savingPassword}
                              onClick={handleChangePassword}
                            >
                              Change password
                            </Button>
                          </Col>
                        </Row>
                      </Form>
                    ),
                  },
                ]}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </main>
  );
};

export default Profile;
