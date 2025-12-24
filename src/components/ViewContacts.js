import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

function ViewContacts({ search, setExportData }) {
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
  const filteredContacts = contacts.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search) ||
    c.location.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    setExportData(filteredContacts);
  }, [filteredContacts]);



  return (
    <div style={{ padding: "15px" }}>

        <table width="100%" border="1" cellPadding="8">
        <thead>
            <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Location</th>
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
                    <td>{c.phone}</td>
                    <td>{c.location}</td>
                </tr>
                ))
            )}
        </tbody>

        </table>
    </div>
    );
    
}

export default ViewContacts;
