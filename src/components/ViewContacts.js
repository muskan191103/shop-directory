import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

function ViewContacts({ search, setExportData, setEditingContact, setActiveTab }) {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    const q = query(
      collection(db, "contacts"),
      orderBy("location")
    );

    const querySnapshot = await getDocs(q);

    const data = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    setContacts(data);
  };

  const filteredContacts = contacts.filter((c) => {
    const primary = c.primaryPhone || c.phone || "";
    const secondary = c.secondaryPhone || "";

    return (
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      primary.includes(search) ||
      secondary.includes(search) ||
      c.location.toLowerCase().includes(search.toLowerCase())
    );
  });

  useEffect(() => {
    setExportData(filteredContacts);
  }, [filteredContacts]);



  return (
    <div style={{ padding: "15px" }}>

      <table width="100%" border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Name</th>
            <th>Primary Phone</th>
            <th>Secondary Phone</th>
            <th>Location</th>
            <th>Edit</th>
          </tr>
        </thead>

        <tbody>
          {filteredContacts.length === 0 ? (
            <tr>
              <td colSpan="3" style={{ textAlign: "center" }}>
                No contacts found
              </td>
            </tr>
          ) : (
            filteredContacts.map(c => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>{c.primaryPhone || c.phone}</td>
                <td>{c.secondaryPhone || "-"}</td>
                <td>{c.location}</td>
                <td>
                  <button onClick={() => {
                    setEditingContact(c);
                    setActiveTab("add");
                  }}>
                    Edit
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>

      </table>
    </div>
  );

}

export default ViewContacts;
