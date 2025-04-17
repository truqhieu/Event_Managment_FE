import { Outlet } from "react-router-dom";

const GuestLayout = () => {
  return (
    <div>
      {/* Header */}
      <header style={styles.header}>
        <h2>Event Management System</h2>
        {/* Bạn có thể thêm navigation, logo, login button, v.v. */}
      </header>

      {/* Nội dung */}
      <main style={styles.main}>
        <Outlet />
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>&copy; 2025 Event Management. All rights reserved.</p>
      </footer>
    </div>
  );
};

const styles = {
  header: {
    backgroundColor: "#0d6efd",
    color: "white",
    padding: "1rem",
    textAlign: "center",
  },
  main: {
    minHeight: "80vh",
    padding: "2rem",
    backgroundColor: "#f5f5f5",
  },
  footer: {
    backgroundColor: "#222",
    color: "white",
    textAlign: "center",
    padding: "1rem",
  },
};

export default GuestLayout;
