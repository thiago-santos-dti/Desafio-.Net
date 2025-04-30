export interface ILead {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  email?: string;
  dateCreated: string;
  suburb: string;
  category: string;
  description: string;
  price: number;
}
