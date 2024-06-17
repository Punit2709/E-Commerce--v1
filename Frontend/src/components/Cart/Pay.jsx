import React, { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Payment from "./Payment";
import axios from "axios";

function Pay() {
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    getStripeApiKey();
  }, []);

  if (!stripeApiKey) {
    return null;
  }

  return (
    <Elements stripe={loadStripe(stripeApiKey)}>
      <Payment />
    </Elements>
  );
}

export default Pay;
