function ContactList({ contacts }) {
  if (contacts.length === 0) {
    return <p style={{ textAlign: "center" }}>No contacts found</p>;
  }

  return (
    <div>
      {contacts.map((c, index) => (
        <div key={index} style={styles.card}>
          <b>{c.name}</b><br />
          {c.location}<br />
          📞 {c.phone}
        </div>
      ))}
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #ddd",
    margin: "10px",
    padding: "10px",
    borderRadius: "5px"
  }
};

export default ContactList;
