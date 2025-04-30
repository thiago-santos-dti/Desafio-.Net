import { useQuery } from "@tanstack/react-query";
import { getAcceptedLeads } from "../services/leadService";
import { LeadsQueryEnum } from "../types/LeadsQueryEnum";

export const useLoadAcceptedLeads = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [LeadsQueryEnum.getAcceptedLeads],
    queryFn: () => getAcceptedLeads(),
  });

  return {
    data,
    isLoading,
    isError,
    refetch,
  };
};
