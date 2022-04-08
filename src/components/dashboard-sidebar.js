import { useEffect, useState } from "react";
import React from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Divider,
  Drawer,
  Typography,
  useMediaQuery,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  List,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { ChartBar as ChartBarIcon } from "../icons/chart-bar";
import { Selector as SelectorIcon } from "../icons/selector";
import { User as UserIcon } from "../icons/user";
import { Users as UsersIcon } from "../icons/users";
import PhishingIcon from "@mui/icons-material/Phishing";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import { Logo } from "./logo";
import { NavItem } from "./nav-item";

import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import WorkIcon from '@mui/icons-material/Work';
import { hasChildren } from "../utils/hasChildren";

const MenuItem = ({ item }) => {
  const Component = hasChildren(item) ? MultiLevel : SingleLevel;
  return <Component item={item} />;
};

const SingleLevel = ({ item }) => {
  return (
    <NavItem
      key={item.title}
      icon={item.icon}
      href={item.href}
      title={item.title}
    />
  );
};

const MultiLevel = ({ item }) => {
  const { items: children } = item;
  const [openItem, setOpenItem] = useState(false);

  const handleClick = () => {
    setOpenItem((prev) => !prev);
  };

  let expand = null;

  if (openItem) expand = <ExpandLessIcon />;
  else expand = <ExpandMoreIcon />;

  return (
    <React.Fragment>
      <ListItem
        disableGutters
        sx={{
          display: "flex",
          mb: 0.5,
          py: 0,
          px: 2,
        }}
      >
        <Button
          onClick={handleClick}
          component="a"
          startIcon={item.icon}
          disableRipple
          sx={{
            // backgroundColor: openItem && "rgba(255,255,255, 0.08)",
            borderRadius: 1,
            color: openItem ? "primary.main" : "neutral.300",
            fontWeight: openItem && "fontWeightBold",
            justifyContent: "flex-start",
            px: 3,
            textAlign: "left",
            textTransform: "none",
            width: "100%",
            "& .MuiButton-startIcon": {
              color: openItem ? "primary.main" : "neutral.400",
            },
            "&:hover": {
              backgroundColor: "rgba(255,255,255, 0.08)",
            },
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            {item.title}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            {expand}
          </Box>
        </Button>
      </ListItem>
      <Collapse style={{marginLeft: 25}} in={openItem} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {children.map((child, key) => (
            <MenuItem key={key} item={child} />
          ))}
        </List>
      </Collapse>
    </React.Fragment>
  );
};

const items = [
  {
    // href: "/",
    icon: <ChartBarIcon fontSize="small" />,
    title: "Dashboard",
    items: [
      {
        href: "/icos",
        icon: <FiberNewIcon fontSize="small" />,
        title: "My ICOs",
      },
      {
        href: "/portfolio",
        icon: <WorkIcon fontSize="small" />,
        title: "Portfolio",
      },
    ],
  },
  {
    href: "/coins",
    icon: <CurrencyBitcoinIcon fontSize="small" />,
    title: "Coins",
  },
  {
    href: "/whale-alerts",
    icon: <PhishingIcon fontSize="small" />,
    title: "Whale Alerts",
  },
  // {
  //   href: "/icos",
  //   icon: <FiberNewIcon fontSize="small" />,
  //   title: "ICO Drops",
  // },
  // {
  //   href: '/settings',
  //   icon: (<CogIcon fontSize="small" />),
  //   title: 'Settings'
  // },
  // {
  //   href: '/login',
  //   icon: (<LockIcon fontSize="small" />),
  //   title: 'Login'
  // },
  // {
  //   href: '/register',
  //   icon: (<UserAddIcon fontSize="small" />),
  //   title: 'Register'
  // },
  // {
  //   href: '/404',
  //   icon: (<XCircleIcon fontSize="small" />),
  //   title: 'Error'
  // }
];

export const DashboardSidebar = (props) => {
  const { open, onClose } = props;
  const router = useRouter();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"), {
    defaultMatches: true,
    noSsr: false,
  });

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      if (open) {
        onClose?.();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath]
  );

  const content = (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div>
          <Box sx={{ p: 3 }}></Box>
          <Box sx={{ px: 2 }}>
            <Box
              sx={{
                alignItems: "center",
                backgroundColor: "rgba(255, 255, 255, 0.04)",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                px: 3,
                py: "11px",
                borderRadius: 1,
              }}
            >
              <div>
                <NextLink href="/" passHref>
                  <a>
                    <img
                      style={{
                        height: 100,
                        width: 100,
                      }}
                      src="logo.png"
                      alt="logo"
                    />
                  </a>
                </NextLink>
                <Typography color="inherit" variant="subtitle1">
                  Crypto Central
                </Typography>
              </div>
            </Box>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: "#2D3748",
            my: 3,
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {items.map((item) => (
            // <NavItem
            //   key={item.title}
            //   icon={item.icon}
            //   href={item.href}
            //   title={item.title}
            // />
            <MenuItem key={item.title} item={item} />
          ))}
        </Box>
        <Divider sx={{ borderColor: "#2D3748" }} />
        <Box
          sx={{
            px: 2,
            py: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              mt: 2,
              mx: "auto",
              width: "160px",
              "& img": {
                width: "100%",
              },
            }}
          >
            <img alt="Go to pro" src="/static/images/sidebar_pro.png" />
          </Box>
          {/* <NextLink
            href="https://material-kit-pro-react.devias.io/"
            passHref
          >
            <Button
              color="secondary"
              component="a"
              endIcon={(<OpenInNewIcon />)}
              fullWidth
              sx={{ mt: 2 }}
              variant="contained"
            >
              Pro Live Preview
            </Button>
          </NextLink> */}
        </Box>
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.900",
            color: "#FFFFFF",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.900",
          color: "#FFFFFF",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
