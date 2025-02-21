import React, {useContext, useState} from "react";
import {Sidebar, Menu, MenuItem, SubMenu, menuClasses} from 'react-pro-sidebar';
import {useTheme} from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MapIcon from '@mui/icons-material/Map';
import SettingsIcon from '@mui/icons-material/Settings';
import StoreIcon from '@mui/icons-material/Store';
import ReceiptIcon from '@mui/icons-material/Receipt';
import DifferenceIcon from '@mui/icons-material/Difference';
import theme from "../theme";
import AgricultureIcon from '@mui/icons-material/Agriculture';
import {Link} from "wouter";
import {Avatar} from "@mui/material";
import {UserContext} from "../store/userContext";
import LogoutIcon from '@mui/icons-material/Logout';
import PeopleIcon from '@mui/icons-material/People';
import LogoPic from './../assets/logo.png'

const subMenuContentStyles = {
  ['.' + menuClasses.subMenuContent]: {
    backgroundColor: theme.palette.background.paper,
  },
};

const linkStyles = {
  textDecoration: 'none',
  color: theme.palette.primary.main,
  width: '100%',
  height: '100%',
  display: 'block',
};

const buttonStyles = {
  '&:hover': {
    backgroundColor: 'transparent',
  },
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  width: '100%',
  height: '100%',
  color: theme.palette.primary.main
};

function SideMenu() {
  const theme = useTheme();
  const userCtx = useContext(UserContext)
  const [collapsed, setCollapsed] = useState(false);
  return (

    <Sidebar
      collapsed={collapsed}
      collapsedWidth="85px"
      backgroundColor={theme.palette.background.paper}
      rootStyles={{
        borderRight: `1px solid ${theme.palette.secondary.main}`,
      }}
      style={{minHeight: '100vh', zIndex: 1000}}
    >
      <Menu
        menuItemStyles={{
          button: ({disabled}) => ({
            color: disabled ? theme.palette.secondary.main : theme.palette.primary.main,
            '&:hover': {
              backgroundColor: theme.palette.custom.hover,
              color: theme.palette.primary.main,
            },
          }),
        }}
      >
          <MenuItem>
            <IconButton onClick={() => setCollapsed(!collapsed)}
                        sx={buttonStyles} disableRipple>
              {collapsed ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
            </IconButton>
          </MenuItem>
          <MenuItem component={<Link to="/"/>}>
            <Avatar variant="square" src={LogoPic} />
          </MenuItem>
          <MenuItem icon={<MapIcon/>} component={<Link to="/map"/>}> Zemljevid </MenuItem>
          <MenuItem icon={<ReceiptIcon/>} component={<Link to="/invoices"/>}>
            Računi
          </MenuItem>
          <MenuItem icon={<DifferenceIcon/>} component={<Link to="/jobTypes"/>}>
            Službe
          </MenuItem>
          <MenuItem icon={<StoreIcon/>} component={<Link to="/companies"/>}>
            Podjetja
          </MenuItem>
          <MenuItem icon={<AgricultureIcon/>} component={<Link to="/equipment"/>}> 
            Stroji
          </MenuItem>
          <SubMenu
            label="settings"
            rootStyles={subMenuContentStyles}
            icon={<SettingsIcon/>}
          >
            <MenuItem icon={<PeopleIcon />}>
              <Link to='/users' style={linkStyles}>
                Uporabniki
              </Link>
            </MenuItem>
            <MenuItem icon={<LogoutIcon />} onClick={() => {
              userCtx.logout()
            }}>
              Odjava
            </MenuItem>
          </SubMenu>
      </Menu>
    </Sidebar>

  );
}

export default SideMenu;
