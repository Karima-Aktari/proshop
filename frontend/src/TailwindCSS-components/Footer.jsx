function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <div className="text-center py-3">
        <p>ProShop &copy;{currentYear}</p>
      </div>
    </footer>
  );
}

export default Footer;
