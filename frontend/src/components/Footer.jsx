// Footer page bottom component
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div>
        <p className="footer-brand">Book<em>Nook</em> Library</p>
        <p className="footer-tagline">A quiet place to keep track of books.</p>
      </div>
      <p className="footer-copyright">© {new Date().getFullYear()} BookNook. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
