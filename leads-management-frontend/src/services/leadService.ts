import axios from "axios";
import { ILead } from "../types/Lead";

const API_URL = "http://localhost:5133/api/leads";

export const getInvitedLeads = async (): Promise<ILead[]> => {
  const response = await axios.get<ILead[]>(`${API_URL}/invited`);
  return response.data;
};

export const getAcceptedLeads = async (): Promise<ILead[]> => {
  const response = await axios.get<ILead[]>(`${API_URL}/accepted`);
  return response.data;
};

export const acceptLead = async (id: number): Promise<ILead> => {
  const response = await axios.post<ILead>(`${API_URL}/accept/${id}`);
  return response.data;
};

export const declineLead = async (id: number): Promise<ILead> => {
  const response = await axios.post<ILead>(`${API_URL}/decline/${id}`);
  return response.data;
};
