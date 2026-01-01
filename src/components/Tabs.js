function Tabs({ activeTab, setActiveTab, setEditingContact }) {
  return (
    <div style={styles.container}>
      <button
        onClick={() => { 
          setActiveTab("view");
          setEditingContact(null);
        }}
        style={activeTab === "view" ? styles.active : styles.button}
      >
        View Contacts
      </button>

      <button
        onClick={() => { 
          setActiveTab("add"); 
          setEditingContact(null);}}
        style={activeTab === "add" ? styles.active : styles.button}
      >
        Add Contact
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    padding: "10px"
  },
  button: {
    padding: "10px 15px",
    fontSize: "16px"
  },
  active: {
    padding: "10px 15px",
    fontSize: "16px",
    background: "#1976d2",
    color: "white"
  }
};

export default Tabs;
