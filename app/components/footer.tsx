import { Link } from "@remix-run/react";

  
const Footer = () => {
  return (
    <footer className="footer footer-center bg-gray-100 text-base-content p-4">
      <aside>
        <p>
          Copyright © 2016-{new Date().getFullYear()} - All rights reserved.
          <span className="text-red-800"> Marki Insurance Agency. </span>{" "}
          Powered by <Link to="https://decidedtech.co.ke"> DecidedTech</Link>
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
