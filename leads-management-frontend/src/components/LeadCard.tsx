import { FC } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
  Divider,
  styled,
  alpha,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import { Grid } from "@mui/material";
import {
  CalendarToday,
  LocationOn,
  Category,
  Description,
  AttachMoney,
  Email,
  Phone,
  AccountCircle,
} from "@mui/icons-material";
import { ILead } from "../types/Lead";

interface LeadCardProps {
  lead: ILead;
  variant: "invited" | "accepted";
  onAccept?: (id: number) => void;
  onDecline?: (id: number) => void;
  isProcessingId?: number | null;
}

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  borderRadius: 12,
  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
  },
}));

const LeadInfoItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  marginBottom: theme.spacing(1),
  "& svg": {
    marginRight: theme.spacing(1.5),
    color: theme.palette.primary.main,
  },
}));

const CategoryChip = styled(Chip)(({ theme }) => ({
  borderRadius: 8,
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
  color: theme.palette.primary.main,
  fontWeight: 600,
  fontSize: "0.75rem",
}));

const PriceBox = styled(Box)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.success.main, 0.1),
  color: theme.palette.success.dark,
  padding: theme.spacing(1, 2),
  borderRadius: 8,
  display: "inline-flex",
  alignItems: "center",
  fontWeight: 600,
}));

const LeadCard: FC<LeadCardProps> = ({
  lead,
  variant,
  onAccept,
  onDecline,
  isProcessingId,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  const hasDiscount = lead.price > 500;
  const isProcessing = isProcessingId === lead.id;

  return (
    <StyledCard elevation={2}>
      <CardContent>
        <Box sx={{ mb: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid size="grow">
              <Typography variant="h6" fontWeight={600}>
                {lead.firstName} {lead.lastName || ""}
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: "block" }}
              >
                ID: {lead.id}
              </Typography>
            </Grid>
            <Grid>
              <CategoryChip
                icon={<Category fontSize="small" />}
                label={lead.category}
                size="small"
              />
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <LeadInfoItem>
              <CalendarToday fontSize="small" />
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Data de criação
                </Typography>
                <Typography variant="body2">
                  {formatDate(lead.dateCreated)}
                </Typography>
              </Box>
            </LeadInfoItem>

            <LeadInfoItem>
              <LocationOn fontSize="small" />
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Localidade
                </Typography>
                <Typography variant="body2">{lead.suburb}</Typography>
              </Box>
            </LeadInfoItem>

            <LeadInfoItem>
              <Description fontSize="small" />
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Descrição
                </Typography>
                <Tooltip title={lead.description}>
                  <Typography
                    variant="body2"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {lead.description}
                  </Typography>
                </Tooltip>
              </Box>
            </LeadInfoItem>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <LeadInfoItem>
              <AttachMoney fontSize="small" />
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Valor
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <PriceBox>{formatCurrency(lead.price)}</PriceBox>
                  {hasDiscount && (
                    <Chip
                      size="small"
                      color="success"
                      label="10% OFF"
                      sx={{
                        fontSize: "0.65rem",
                        height: "20px",
                        fontWeight: "bold",
                      }}
                    />
                  )}
                </Box>
              </Box>
            </LeadInfoItem>

            {variant === "accepted" && lead.email && (
              <LeadInfoItem>
                <Email fontSize="small" />
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Email
                  </Typography>
                  <Typography variant="body2">{lead.email}</Typography>
                </Box>
              </LeadInfoItem>
            )}

            {variant === "accepted" && lead.phoneNumber && (
              <LeadInfoItem>
                <Phone fontSize="small" />
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Telefone
                  </Typography>
                  <Typography variant="body2">{lead.phoneNumber}</Typography>
                </Box>
              </LeadInfoItem>
            )}

            {variant === "invited" && (
              <LeadInfoItem>
                <AccountCircle fontSize="small" />
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Status
                  </Typography>
                  <Typography
                    variant="body2"
                    color="warning.main"
                    fontWeight={500}
                  >
                    Aguardando decisão
                  </Typography>
                </Box>
              </LeadInfoItem>
            )}
          </Grid>
        </Grid>
      </CardContent>

      {variant === "invited" && (
        <CardActions sx={{ p: 2, pt: 0, justifyContent: "flex-end" }}>
          <Button
            variant="outlined"
            color="error"
            onClick={() => onDecline && onDecline(lead.id)}
            disabled={isProcessing}
          >
            Recusar
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => onAccept && onAccept(lead.id)}
            disabled={isProcessing}
            startIcon={
              isProcessing ? (
                <CircularProgress size={20} color="inherit" />
              ) : null
            }
            sx={{ ml: 1 }}
          >
            {isProcessing ? "Processando..." : "Aceitar"}
          </Button>
        </CardActions>
      )}
    </StyledCard>
  );
};

export default LeadCard;
