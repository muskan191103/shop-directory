import { useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";

function AddContactForm({ editingContact, setEditingContact }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [duplicateData, setDuplicateData] = useState(null);
  const [showDuplicateModal, setShowDuplicateModal] = useState(false);
  const [secondaryPhone, setSecondaryPhone] = useState("");

  useEffect(() => {
    if (editingContact) {
      setName(editingContact.name || "");
      setPhone(editingContact.primaryPhone || editingContact.phone || "");
      setSecondaryPhone(editingContact.secondaryPhone || "");
      setLocation(editingContact.location || "");
    }
  }, [editingContact]);

  const keepExisting = () => {
    setShowDuplicateModal(false);
    resetForm();
  };

  const replaceExisting = async () => {
    await saveNewContact(true);
    setShowDuplicateModal(false);
  };

  const resetForm = () => {
    setName("");
    setPhone("");
    setSecondaryPhone("");
    setLocation("");
    setDuplicateData(null);
    setEditingContact(null);
  };

  const saveNewContact = async (isUpdate = false) => {
    const data = {
      name,
      phone,
      primaryPhone: phone,
      secondaryPhone: secondaryPhone || "",
      location,
      shopId: "shop_001",
      updatedAt: serverTimestamp()
    };

    // Only set createdAt when creating new contact
    if (!isUpdate) {
      data.createdAt = serverTimestamp();
    }

    await setDoc(doc(db, "contacts", phone), data, { merge: true });

    alert("Contact saved successfully");
    resetForm();
    setEditingContact(null);
  };


  const addContact = async () => {
    if (!name || !phone || !location) {
      alert("Please fill all fields");
      return;
    }

    if (editingContact) {
      await saveNewContact(true);
      setEditingContact(null);
      return;
    }

    const docRef = doc(db, "contacts", phone);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setDuplicateData(docSnap.data()); // store old data
      setShowDuplicateModal(true);       // open modal
      return;
    }

    await saveNewContact();
  };

  return (
    <div style={styles.form}>
      <input
        placeholder="Name"
        style={styles.input}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Location"
        style={styles.input}
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <input
        placeholder="Phone Number"
        style={styles.input}
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <input
        placeholder="Additional Phone (optional)"
        value={secondaryPhone}
        onChange={(e) => setSecondaryPhone(e.target.value)}
        style={styles.input}
      />


      <button style={styles.button} onClick={addContact}>
        {editingContact ? "Update Contact" : "Save Contact"}
      </button>

      
      <button
        onClick={() => {
          resetForm();
          setEditingContact(null);
        }}
        style={{
          marginTop: "10px",
          width: "100%",
          padding: "10px",
          background: "#999",
          color: "white",
          border: "none",
          cursor: "pointer"
        }}
      >
        Cancel
      </button>


      {showDuplicateModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3>Duplicate Phone Number</h3>

            <p><b>Existing Contact:</b></p>
            <p>Name: {duplicateData?.name}</p>
            <p>Location: {duplicateData?.location}</p>
            <p>Phone: {duplicateData?.phone}</p>

            <div style={{ marginTop: "15px" }}>
              <button style={styles.modalBtn} onClick={keepExisting}>
                Keep Existing
              </button>

              <button style={styles.modalBtn} onClick={replaceExisting}>
                Replace with New
              </button>

              <button
                style={{ ...styles.modalBtn, background: "#999" }}
                onClick={() => setShowDuplicateModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

const styles = {
  form: {
    padding: "15px"
  },
  input: {
    padding: "10px",
    width: "100%",
    marginBottom: "10px",
    boxSizing: "border-box"
  },
  button: {
    padding: "10px",
    width: "100%",
    background: "#1976d2",
    color: "white",
    border: "none",
    cursor: "pointer"
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000
  },
  modal: {
    background: "#fff",
    padding: "20px",
    borderRadius: "6px",
    width: "300px",
    textAlign: "center"
  },
  modalBtn: {
    margin: "5px",
    padding: "8px 12px",
    border: "none",
    cursor: "pointer",
    background: "#1976d2",
    color: "white"
  }
};

export default AddContactForm;
