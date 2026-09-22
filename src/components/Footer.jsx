import { Link } from "react-router-dom";

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <p>&copy; {currentYear} La Huaca Cocina Peruana</p>
      <Link to="/admin/login" className="admin-link">Administración</Link>
    </footer>
  );
}

export default Footer;