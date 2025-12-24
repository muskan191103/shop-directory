function SearchBar({ search, setSearch }) {
  return (
    <div style={styles.container}>
      <input
        placeholder="Search name / phone / location"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.input}
      />
    </div>
  );
}

const styles = {
  container: {
    padding: "10px",
    background: "#f5f5f5",
    width: "100%",          
    boxSizing: "border-box"
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    boxSizing: "border-box"
  }
};

export default SearchBar;
