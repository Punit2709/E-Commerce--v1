import React from "react";
import { Link } from "react-router-dom";

import "./Footer.css";
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
  return (
      <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="Appstore" />
      </div>

      <div className="midFooter">
        <h1>ECOMMERCE.</h1>
        <p>High Quality is our first priority</p>

        <p>Copyrights 2024 &copy; Punit K P</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <Link to="http://instagram.com/punitp_2.703" target="_blank"> <InstagramIcon /> </Link>
        <Link to="http://x.com/Punit2709" target="_blank"><TwitterIcon /></Link>
      </div>
    </footer>
  );
};

export default Footer;