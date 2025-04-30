import { useLoadInvitedLeads } from "../hooks/useLoadInvitedLeads";
import { useAcceptOrDeclineLead } from "../hooks/useAcceptOrDeclineLead";

const InvitedLeads = () => {
  const { data: leads } = useLoadInvitedLeads();
  const { submitAcceptLead, submitDeclineLead } = useAcceptOrDeclineLead();

  return (
    <div>
      <h2>Invited Leads</h2>
      {leads?.map((lead) => (
        <div key={lead.id}>
          <p>
            {lead.firstName} - {lead.description}
          </p>
          <button onClick={() => submitAcceptLead(lead.id)}>Accept</button>
          <button onClick={() => submitDeclineLead(lead.id)}>Decline</button>
        </div>
      ))}
    </div>
  );
};

export default InvitedLeads;
