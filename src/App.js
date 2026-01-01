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
  const [editingContact, setEditingContact] = useState(null);

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
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} setEditingContact={setEditingContact}/> 
      {activeTab === "view" && <ExportButton data={exportData} />}
      {activeTab === "view" ?(
        <SearchBar search={search} setSearch={setSearch} />) 
        : null}

      {activeTab === "view" ? (
        <ViewContacts search={search} setExportData={setExportData} setEditingContact={setEditingContact} setActiveTab={setActiveTab}/>

      ) : (
        <AddContactForm editingContact={editingContact} setEditingContact={setEditingContact}/>
      )}
    </div>
  );
}

export default App;
