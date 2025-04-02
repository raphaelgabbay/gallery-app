'use client'
import React from "react";

const PaymentButton = () => {
  return (
    <div className="flex justify-center items-cente p-4">
      <button onClick={()=>confirm("Voulez vous vraiment effectuer un virement de 10 000€ sur le compte de G2R ?")} className="bg-green-400 p-4 font-bold rounded-full transition-all duration-300 hover:scale-[1200%] hover:opacity-95 hover:bg-green-600">Payer</button>
    </div>
  );
};

export default PaymentButton;
