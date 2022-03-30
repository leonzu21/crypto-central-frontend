import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { useContext } from "react";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Skeleton,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Bell as BellIcon } from "../icons/bell";
import { UserCircle as UserCircleIcon } from "../icons/user-circle";
import { Users as UsersIcon } from "../icons/users";
import { useSession, signIn, signOut } from "next-auth/react";
import ThemeModeToggle from "./utils/ThemeModeToggle";

import CoinSearchBar from "./search-bar/coin-search-bar";

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
}));

export const DashboardNavbar = (props) => {
  const { onSidebarOpen, ...other } = props;
  const { data: session } = useSession();

  const coins = props.coins.coins;
  const sessionButton = session ? (
    <Button color="error" onClick={() => signOut()}>
      Sign out
    </Button>
  ) : (
    <Button color="success" onClick={() => signIn()}>
      Sign in
    </Button>
  );

  return (
    <>
      <DashboardNavbarRoot
        sx={{
          left: {
            lg: 280,
          },
          width: {
            lg: "calc(100% - 280px)",
          },
        }}
        {...other}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2,
          }}
        >
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: "inline-flex",
                lg: "none",
              },
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          {coins ? (
            <CoinSearchBar coins={coins} />
          ) : (
            <Skeleton sx={{ width: { md: 300, xs: 300 } }} animation="wave" />
          )}
          <Box sx={{ flexGrow: 1 }} />

          <ThemeModeToggle />

          {/* <Tooltip title="Contacts">
            <IconButton sx={{ ml: 1 }}>
              <UsersIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Notifications">
            <IconButton sx={{ ml: 1 }}>
              <Badge badgeContent={4} color="primary" variant="dot">
                <BellIcon fontSize="small" />
              </Badge>
            </IconButton>
          </Tooltip> */}
          <Avatar
            sx={{
              height: 40,
              width: 40,
              ml: 1,
            }}
            src="/static/images/avatars/avatar_mada.jpg"
          >
            <UserCircleIcon fontSize="small" />
          </Avatar>
          {sessionButton}
        </Toolbar>
      </DashboardNavbarRoot>
    </>
  );
};

DashboardNavbar.propTypes = {
  onSidebarOpen: PropTypes.func,
};
