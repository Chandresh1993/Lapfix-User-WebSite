import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const MainLayout = ({ children }) => {
  return (
    <div className="workspace flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
