function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <p>&copy; {currentYear} La Huaca Cocina Peruana</p>
    </footer>
  );
}

export default Footer;