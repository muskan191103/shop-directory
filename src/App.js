import { useState, useEffect } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import Tabs from "./components/Tabs";
import AddContactForm from "./components/AddContactForm";
import ExportButton from "./components/ExportButton";
import ViewContacts from "./components/ViewContacts";
import Login from "./components/Login";

import { onAuthStateChanged } from "firebase/auth";
import { getAuth } from "firebase/auth";


function App() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("view");
  const [exportData, setExportData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (currentUser)=>{
      setUser(currentUser);
    });
  }, []);

  if (!user) {
    return <Login />;
  }

  return (
    <div>
      <Header />
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} /> 
      {activeTab === "view" && <ExportButton data={exportData} />}
      {activeTab === "view" ?(
        <SearchBar search={search} setSearch={setSearch} />) 
        : null}

      {activeTab === "view" ? (
        <ViewContacts search={search} setExportData={setExportData} />

      ) : (
        <AddContactForm />
      )}
    </div>
  );
}

export default App;
