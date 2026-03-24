import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Container,
  Divider,
  FormControlLabel,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
  Checkbox,
  InputAdornment,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import {login} from "../services/loginService.ts";
import {useNavigate} from "react-router-dom";


export const LoginPage = () => {
  const nav = useNavigate();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = identifier.trim().length >= 3 && password.length >= 6;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const id = identifier.trim();
    const pw = password;

    if (id.length < 3 || pw.length < 6) {
      setError("Bitte Daten prüfen.");
      return;
    }

    const user = login(id, pw);

    if (!user) {
      setError("E-Mail oder Passwort ist falsch.");
      return;
    }

    // optional: if rememberMe is unchecked, store only for this session
    if (!rememberMe) {
      try {
        sessionStorage.setItem("LOGGEDINUSER", JSON.stringify(user));
        localStorage.removeItem("LOGGEDINUSER");
      } catch {
        // ignore storage errors
      }
    }

    nav("/", { replace: true });
  };

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 84px)",
        display: "grid",
        placeItems: "center",
        py: 6,
        background: "linear-gradient(to bottom, #f4f6f5 0%, #ecefee 100%)",
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            p: { xs: 3, sm: 4 },
            borderRadius: 3,
            backgroundColor: "#ffffff",
            boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
          }}
        >
          <Stack spacing={2.5}>
            <Box>
              <Typography variant="h4" fontWeight={800}>
                Willkommen zurück
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                Melde dich an, um etwas zu bestellen
              </Typography>
            </Box>

            <Divider />

            {error && <Alert severity="error">{error}</Alert>}

            <Box component="form" onSubmit={onSubmit} noValidate>
              <Stack spacing={2}>
                <TextField
                  label="E-Mail"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  autoComplete="username"
                  required
                  fullWidth
                  helperText="Test: admin@steirertech.at / admin123 oder user@steirertech.at / user123"
                />

                <TextField
                  label="Passwort"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  fullWidth
                  type={showPw ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={showPw ? "Passwort ausblenden" : "Passwort anzeigen"}
                          onClick={() => setShowPw((p) => !p)}
                          edge="end"
                        >
                          {showPw ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Stack direction={{ xs: "column", sm: "row" }} alignItems={{ xs: "stretch", sm: "center" }} justifyContent="space-between" spacing={1}>
                  <FormControlLabel
                    control={<Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />}
                    label="Eingeloggt bleiben"
                  />
                </Stack>

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={!canSubmit}
                >
                  Anmelden
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => nav("/")}
                >
                  Als Gast fortfahren
                </Button>

                <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center" }}>
                  Noch kein Konto?{" "}
                  <Button variant="text" onClick={() => nav("/register")}>
                    Registrieren
                  </Button>
                </Typography>
              </Stack>
            </Box>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};