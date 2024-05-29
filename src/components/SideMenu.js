import React, {useState} from "react";
import {Sidebar, Menu, MenuItem, SubMenu, menuClasses} from 'react-pro-sidebar';
import {useTheme} from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MapIcon from '@mui/icons-material/Map';
import QuizIcon from '@mui/icons-material/Quiz';
import SettingsIcon from '@mui/icons-material/Settings';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import theme from "../theme";
import {Link} from "wouter";
import {Avatar} from "@mui/material";

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
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div style={{display: 'flex', height: '100vh', minHeight: '100vh'}}>
            <Sidebar
                collapsed={collapsed}
                collapsedWidth="85px"
                backgroundColor={theme.palette.background.paper}
                rootStyles={{
                    borderRight: `1px solid ${theme.palette.secondary.main}`,
                }}
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
                    <MenuItem component={<Link to="/" />}>
                        <Avatar variant="square" src="./favicon.ico">
                        </Avatar>
                    </MenuItem>
                    <MenuItem icon={<MapIcon/>} component={<Link to="/map" />}> Map </MenuItem>
                    <MenuItem icon={<AgricultureIcon/>} component={<Link to="/equipment" />}> Equipment </MenuItem>
                    <MenuItem icon={<SettingsIcon/>}> Settings </MenuItem>
                    <SubMenu
                        label="drop down example"
                        rootStyles={subMenuContentStyles}
                        icon={<QuizIcon/>}
                    >
                        <MenuItem>
                            <Link to='/hi' style={linkStyles}>
                                i have a link
                            </Link>
                        </MenuItem>
                        <MenuItem> <Link to='/' style={linkStyles}>
                            get un-hi-ed
                        </Link> </MenuItem>
                    </SubMenu>
                </Menu>
            </Sidebar>
        </div>
    );
}

export default SideMenu;
