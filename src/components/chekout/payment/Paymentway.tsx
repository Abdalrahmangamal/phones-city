import React, { useState } from "react";

interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  logo: string;
}

import OrderSummary from "../public/Ordersummary";

export default function Paymentway() {
  return (
    <div>
      <OrderSummary />
    </div>
  );
}
