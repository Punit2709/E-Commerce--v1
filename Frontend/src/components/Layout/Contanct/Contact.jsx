import React, { Fragment } from "react";
import "./Contact.css";
import { Button } from "@mui/material";
import MetaData from '../MetaData';

const Contact = () => {
  return (
    <Fragment>
      <MetaData title='Contact Page'/>
    <div className="contactContainer">
      <a className="mailBtn" href="mailto:punitsp2003@gmail.com">
        <Button>Contact: punitsp2003@gmail.com</Button>
      </a>
    </div>
    </Fragment>
  );
};

export default Contact;