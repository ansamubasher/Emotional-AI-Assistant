import Sidebar from "./Sidebar";
import "../styles/journal.css"; // for background

const Layout = ({ children }) => {
  return (
    <div className="journal-container dashboard-layout">
      <Sidebar />
      <div className="main-content">
        {children}
      </div>
    </div>
  );
};

export default Layout;