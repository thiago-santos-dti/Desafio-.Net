import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LeadsQueryEnum } from "../types/LeadsQueryEnum";
import { acceptLead, declineLead } from "../services/leadService";
import { sendEmailNotification } from "../services/emailService";

export const useAcceptOrDeclineLead = () => {
  const queryClient = useQueryClient();
  const {
    mutate: submitAcceptLead,
    isPending: isLoadingAcceptLead,
    isError: isErrorAcceptLead,
  } = useMutation({
    mutationKey: [LeadsQueryEnum.acceptLead],
    mutationFn: (id: number) => acceptLead(id),
    onSuccess: (lead) => {
      queryClient.invalidateQueries({
        queryKey: [LeadsQueryEnum.getAcceptedLeads],
      });
      queryClient.invalidateQueries({
        queryKey: [LeadsQueryEnum.getInvitedLeads],
      });
      sendEmailNotification(lead.email!, `Lead ${lead.id} aceito.`);
    },
  });

  const {
    mutate: submitDeclineLead,
    isPending: isLoadingDeclineLead,
    isError: isErrorDeclineLead,
  } = useMutation({
    mutationKey: [LeadsQueryEnum.declineLead],
    mutationFn: (id: number) => declineLead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [LeadsQueryEnum.getInvitedLeads],
      });
    },
  });

  return {
    isLoading: isLoadingAcceptLead || isLoadingDeclineLead,
    isError: isErrorAcceptLead || isErrorDeclineLead,
    submitAcceptLead,
    submitDeclineLead,
  };
};
