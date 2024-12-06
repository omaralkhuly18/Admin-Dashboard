// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Stack, useTheme } from "@mui/material";
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { Menu, MenuItem } from '@mui/material';

const drawerWidth = 240;

// تخصيص AppBar مع أنماط إضافية بناءً على حالة `open`
const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
    // @ts-ignore
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));



// eslint-disable-next-line react/prop-types
const TopBar = ({ open, handleDrawerOpen, setMode }) => {

    const theme = useTheme();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const [menuType, setMenuType] = useState(null); // لتحديد نوع القائمة المفتوحة

    const handleClick = (event, type) => {
        setAnchorEl(event.currentTarget);
        setMenuType(type);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setMenuType(null);
    };


    const handleMenuClick = (path) => {
        navigate(path); // التنقل إلى المسار المطلوب
        handleClose(); // إغلاق القائمة
    };

    return (
        <AppBar position="fixed"
            // @ts-ignore
            open={open}>
            <Toolbar>
                {/* إخفاء زر القائمة عندما يكون الشريط الجانبي مفتوحًا */}
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={{
                        marginRight: 5,
                        ...(open && { display: 'none' }), // إخفاء الزر عندما يكون `open` = true
                    }}
                >
                    <MenuIcon />
                </IconButton>
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </Search>
                <Box flexGrow={1} />
                <Stack direction={"row"}>
                    {theme.palette.mode === "light" ? (
                        <IconButton onClick={() => {
                            localStorage.setItem(
                                "currentModal", theme.palette.mode === "dark" ? "light" : "dark"
                            )
                            setMode((prevMode) =>
                                prevMode === 'light' ? 'dark' : 'light',
                            );

                        }} color="inherit" aria-label="light-mode" >
                            <LightModeOutlinedIcon />
                        </IconButton>
                    ) : (
                        <IconButton onClick={() => {
                            localStorage.setItem(
                                "currentModal", theme.palette.mode === "dark" ? "light" : "dark"
                            )
                            setMode((prevMode) =>
                                prevMode === 'light' ? 'dark' : 'light',
                            );
                        }} color="inherit" aria-label="dark-mode" >
                            <DarkModeOutlinedIcon />
                        </IconButton>
                    )}
                    {/* زر التنبيهات
                    <IconButton color="inherit" onClick={(event) => handleClick(event, 'notifications')} aria-label="notifications">
                        <NotificationsNoneOutlinedIcon />
                    </IconButton>

                    زر الإعدادات
                    <IconButton color="inherit" onClick={(event) => handleClick(event, 'settings')} aria-label="settings">
                        <SettingsOutlinedIcon />
                    </IconButton> */}

                    {/* زر الحساب الشخصي */}
                    <IconButton
                        color="inherit"
                        onClick={(event) => handleClick(event, "profile")}
                        aria-label="profile"
                    >
                        <PersonOutlinedIcon />
                    </IconButton>
                </Stack>
            </Toolbar>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {/* {menuType === 'notifications' && (
                    <>
                        <MenuItem onClick={handleClose}>Notification 1</MenuItem>
                        <MenuItem onClick={handleClose}>Notification 2</MenuItem>
                        <MenuItem onClick={handleClose}>Notification 3</MenuItem>
                    </>
                )}
                {menuType === 'settings' && (
                    <>
                        <MenuItem onClick={handleClose}>Setting 1</MenuItem>
                        <MenuItem onClick={handleClose}>Setting 2</MenuItem>
                        <MenuItem onClick={handleClose}>Setting 3</MenuItem>
                    </>
                )} */}
                {menuType === "profile" && (
                    <>
                        <MenuItem onClick={() => handleMenuClick("/profile")}>
                            Profile
                        </MenuItem>
                        <MenuItem onClick={() => handleMenuClick("/my-account")}>
                            My Account
                        </MenuItem>
                        <MenuItem onClick={() => handleMenuClick("/logout")}>
                            Logout
                        </MenuItem>
                    </>
                )}
            </Menu>
        </AppBar>
    );
}

export default TopBar;
