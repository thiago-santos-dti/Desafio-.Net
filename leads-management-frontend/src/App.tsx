import { useState } from "react";
import {
  Box,
  CssBaseline,
  ThemeProvider,
  createTheme,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Tabs,
  Tab,
  useMediaQuery,
} from "@mui/material";
import { Person, CheckCircle, Business } from "@mui/icons-material";
import InvitedLeads from "./components/InvitedLeads";
import AcceptedLeads from "./components/AcceptedLeads";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`lead-tabpanel-${index}`}
      aria-labelledby={`lead-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

const App = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const isMobile = useMediaQuery("(max-width:600px)");

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#2563eb",
      },
      success: {
        main: "#10b981",
      },
      warning: {
        main: "#f59e0b",
      },
      error: {
        main: "#ef4444",
      },
      background: {
        default: "#f9fafb",
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h5: {
        fontWeight: 600,
      },
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            fontWeight: 500,
            paddingTop: 8,
            paddingBottom: 8,
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <AppBar
          position="static"
          color="default"
          elevation={0}
          sx={{
            borderBottom: "1px solid #e5e7eb",
            bgcolor: "white",
          }}
        >
          <Container maxWidth="lg">
            <Toolbar disableGutters>
              <Business color="primary" sx={{ mr: 1.5 }} />
              <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
                Leads Manager
              </Typography>
            </Toolbar>
          </Container>
        </AppBar>

        <Container maxWidth="lg" sx={{ mt: 3 }}>
          <Tabs
            value={tabIndex}
            onChange={handleTabChange}
            variant={isMobile ? "fullWidth" : "standard"}
            sx={{
              bgcolor: "white",
              borderRadius: 1,
              mb: 2,
              px: 2,
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            }}
          >
            <Tab
              icon={<Person />}
              iconPosition="start"
              label={isMobile ? "Convidados" : "Leads Convidados"}
            />
            <Tab
              icon={<CheckCircle />}
              iconPosition="start"
              label={isMobile ? "Aceitos" : "Leads Aceitos"}
            />
          </Tabs>

          <TabPanel value={tabIndex} index={0}>
            <InvitedLeads />
          </TabPanel>

          <TabPanel value={tabIndex} index={1}>
            <AcceptedLeads />
          </TabPanel>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default App;
