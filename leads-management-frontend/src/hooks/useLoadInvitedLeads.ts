import { useQuery } from "@tanstack/react-query";
import { getInvitedLeads } from "../services/leadService";
import { LeadsQueryEnum } from "../types/LeadsQueryEnum";

export const useLoadInvitedLeads = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [LeadsQueryEnum.getInvitedLeads],
    queryFn: () => getInvitedLeads(),
  });

  return {
    data,
    isLoading,
    isError,
    refetch,
  };
};
