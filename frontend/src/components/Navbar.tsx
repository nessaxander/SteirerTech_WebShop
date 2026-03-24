import { AppBar, Toolbar, Box, Button, Container, Menu, MenuItem, Divider, IconButton, Tooltip } from "@mui/material";
import Searchbar from "./Searchbar.tsx";
import { useNavigate, useLocation } from "react-router-dom";

import { User } from "lucide-react";
import { useEffect, useState } from "react";
import { getLoggedInUser, logout } from "../services/loginService.ts";


const PRIMARY_GREEN = "#0a7a2a";

type Props = {
  search: string;
  setSearch: (value: string) => void;
};

export const Navbar = ({ search, setSearch }: Props) => {
  const nav = useNavigate();
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  const [accountAnchor, setAccountAnchor] = useState<null | HTMLElement>(null);

  const [user, setUser] = useState(() => getLoggedInUser());
  const isAuthed = !!user;

  useEffect(() => {
    const onStorage = () => setUser(getLoggedInUser());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const openAccountMenu = (e: React.MouseEvent<HTMLElement>) => {
    setAccountAnchor(e.currentTarget);
  };

  const closeAccountMenu = () => {
    setAccountAnchor(null);
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "#ffffff",
        borderTop: `30px solid ${PRIMARY_GREEN}`,
        borderBottom: "1px solid rgba(0,0,0,0.08)",
        boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
      }}
    >
      <Container maxWidth={false} disableGutters sx={{ px: 0 }}>
        <Toolbar
          disableGutters
          sx={{
            minHeight: 78,
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          {/* Brand (left) */}
          <Box
            onClick={() => nav("/")}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              cursor: "pointer",
              userSelect: "none",
              py: 0.5,
            }}
          >
            <img
              id={"stLogo"}
              alt={"Steirertech"}
              src={"src/assets/Steirertech-Logo.svg"}
              style={{
                width: 170,
                height: 48,
                objectFit: "contain",
                display: "block",
              }}
            />

          </Box>

          {!isLoginPage && (
            <Box
              sx={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box sx={{ width: "100%", maxWidth: 380 }}>
                <Box sx={{ transform: "scale(0.95)" }}>
                  <Searchbar
                    value={search}
                    onChange={(v) => {
                      setSearch(v);
                      if (location.pathname !== "/") nav("/");
                    }}
                  />
                </Box>
              </Box>
            </Box>
          )}

          {isLoginPage && <Box sx={{ flex: 1 }} />}

          {!isLoginPage && (
            <Box
              onMouseEnter={(e) => {
                openAccountMenu(e);
                setUser(getLoggedInUser());
              }}
              onMouseLeave={closeAccountMenu}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Tooltip title={isAuthed ? "Konto" : "Anmelden"} arrow>
                <IconButton
                  onClick={() => nav("/login")}
                  sx={{
                    bgcolor: "rgba(10,122,42,0.10)",
                    color: PRIMARY_GREEN,
                    borderRadius: 999,
                    border: "1px solid rgba(10,122,42,0.25)",
                    "&:hover": {
                      bgcolor: "rgba(10,122,42,0.16)",
                      borderColor: "rgba(10,122,42,0.35)",
                    },
                  }}
                >
                  <User size={20} />
                </IconButton>
              </Tooltip>

              <Menu
                anchorEl={accountAnchor}
                open={Boolean(accountAnchor)}
                onClose={closeAccountMenu}
                MenuListProps={{
                  onMouseEnter: () => {},
                  onMouseLeave: closeAccountMenu,
                  sx: { py: 0.5, minWidth: 220 },
                }}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                PaperProps={{
                  sx: {
                    mt: 1,
                    borderRadius: 2,
                    boxShadow: "0 10px 26px rgba(0,0,0,0.12)",
                    overflow: "hidden",
                  },
                }}
              >
                {!isAuthed && (
                  <MenuItem
                    onClick={() => {
                      closeAccountMenu();
                      nav("/login");
                    }}
                  >
                    Anmelden
                  </MenuItem>
                )}

                {isAuthed && (
                  <>
                    <MenuItem disabled sx={{ opacity: 0.9 }}>
                      Eingeloggt als: {user?.email}
                    </MenuItem>
                    <Divider />
                    <MenuItem
                      onClick={() => {
                        closeAccountMenu();
                        nav("/account");
                      }}
                    >
                      Mein Konto
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        logout();
                        setUser(null);
                        closeAccountMenu();
                        nav("/");
                      }}
                    >
                      Abmelden
                    </MenuItem>
                  </>
                )}
              </Menu>
            </Box>
          )}

          {isLoginPage && (
            <Button
              variant="contained"
              onClick={() => nav("/")}
              sx={{
                bgcolor: PRIMARY_GREEN,
                fontWeight: 700,
                px: 3,
                borderRadius: 2,
                textTransform: "none",
                "&:hover": {
                  bgcolor: "#086422",
                },
              }}
            >
              Zurück
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};