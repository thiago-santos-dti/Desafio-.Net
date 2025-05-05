import { useState } from "react";
import {
  Box,
  Typography,
  Container,
  Alert,
  CircularProgress,
  Divider,
  Snackbar,
} from "@mui/material";
import { useLoadInvitedLeads } from "../hooks/useLoadInvitedLeads";
import { useAcceptOrDeclineLead } from "../hooks/useAcceptOrDeclineLead";
import LeadCard from "./LeadCard";

const InvitedLeads = () => {
  const { data: leads, isLoading, isError } = useLoadInvitedLeads();
  const { submitAcceptLead, submitDeclineLead } = useAcceptOrDeclineLead();
  const [processingId, setProcessingId] = useState<number | null>(null);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
    open: boolean;
  }>({ message: "", type: "success", open: false });

  const handleAccept = async (id: number) => {
    try {
      setProcessingId(id);
      await submitAcceptLead(id);
      setNotification({
        message: "Lead aceito com sucesso!",
        type: "success",
        open: true,
      });
    } catch (error) {
      setNotification({
        message: "Erro ao aceitar o lead.",
        type: "error",
        open: true,
      });
    } finally {
      setProcessingId(null);
    }
  };

  const handleDecline = async (id: number) => {
    try {
      setProcessingId(id);
      await submitDeclineLead(id);
      setNotification({
        message: "Lead recusado com sucesso!",
        type: "success",
        open: true,
      });
    } catch (error) {
      setNotification({
        message: "Erro ao recusar o lead.",
        type: "error",
        open: true,
      });
    } finally {
      setProcessingId(null);
    }
  };

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
        Erro ao carregar os leads. Por favor, tente novamente mais tarde.
      </Alert>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h5" fontWeight={600}>
            Leads Convidados
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Gerencie os leads que estão aguardando sua decisão
          </Typography>
        </Box>
        <Typography variant="subtitle2" color="primary" fontWeight={500}>
          {leads?.length || 0} leads disponíveis
        </Typography>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {leads && leads.length > 0 ? (
        leads.map((lead) => (
          <LeadCard
            key={lead.id}
            lead={lead}
            variant="invited"
            onAccept={handleAccept}
            onDecline={handleDecline}
            isProcessingId={processingId}
          />
        ))
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
            Não há leads convidados no momento
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Quando novos leads forem convidados, eles aparecerão aqui
          </Typography>
        </Box>
      )}

      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={() => setNotification((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          severity={notification.type}
          variant="filled"
          onClose={() => setNotification((prev) => ({ ...prev, open: false }))}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default InvitedLeads;
