import {
  Box,
  Typography,
  Container,
  Alert,
  CircularProgress,
  Divider,
} from "@mui/material";
import { Grid } from "@mui/material";
import { useLoadAcceptedLeads } from "../hooks/useLoadAcceptedLeads";
import LeadCard from "./LeadCard";

const AcceptedLeads = () => {
  const { data: leads, isLoading, isError } = useLoadAcceptedLeads();

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "300px",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Alert severity="error" sx={{ my: 2 }}>
        Erro ao carregar os leads aceitos. Por favor, tente novamente mais
        tarde.
      </Alert>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h5" fontWeight={600}>
            Leads Aceitos
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Visualize todos os leads que você aceitou
          </Typography>
        </Box>
        <Typography variant="subtitle2" color="primary" fontWeight={500}>
          {leads?.length || 0} leads aceitos
        </Typography>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {leads && leads.length > 0 ? (
        <Grid container spacing={3}>
          {leads.map((lead) => (
            <Grid size={12} key={lead.id.toString()}>
              <LeadCard lead={lead} variant="accepted" />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box
          sx={{
            textAlign: "center",
            py: 8,
            bgcolor: "rgba(0,0,0,0.02)",
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" color="text.secondary">
            Nenhum lead aceito ainda
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Os leads que você aceitar aparecerão aqui
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default AcceptedLeads;
