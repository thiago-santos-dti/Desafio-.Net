import { useLoadAcceptedLeads } from "../hooks/useLoadAcceptedLeads";

const AcceptedLeads = () => {
  const { data: leads } = useLoadAcceptedLeads();

  return (
    <div>
      <h2>Accepted Leads</h2>
      {leads?.map((lead) => (
        <div key={lead.id}>
          <p>
            {lead.firstName} - {lead.email}
          </p>
        </div>
      ))}
    </div>
  );
};

export default AcceptedLeads;
