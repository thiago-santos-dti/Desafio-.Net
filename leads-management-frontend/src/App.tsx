import InvitedLeads from "./components/InvitedLeads";
import AcceptedLeads from "./components/AcceptedLeads";

const App = () => {
  return (
    <div>
      <h1>Leads Management</h1>
      <InvitedLeads />
      <AcceptedLeads />
    </div>
  );
};

export default App;
