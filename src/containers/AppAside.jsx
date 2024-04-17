import React from "react";
import PropTypes from "prop-types";
import { Layout, Avatar} from "antd";
import CustomMenu from "../components/CustomMenu";
import iot from "../assets/images/iot.png"
const { Sider } = Layout;

const AppAside = props => {
  let { menuToggle, menu } = props;
  return (
    <Sider className="aside" theme="light" collapsed={menuToggle}>
      <div className="logo" style={{ marginBottom: "35px" }}>
          <Avatar src={iot} style={{width: "60px", height: "60px" }} />
      </div>
      <CustomMenu menu={menu}></CustomMenu>
    </Sider>
  );
};

AppAside.propTypes = {
  menuToggle: PropTypes.bool,
  menu: PropTypes.array.isRequired
};

export default AppAside;
