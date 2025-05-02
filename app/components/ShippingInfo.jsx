import React from "react";
import Image from "next/image";
import shipping from "../assets/icons/shipping.svg";
import returnIcon from "../assets/icons/return.svg";
import support from "../assets/icons/support.svg";
import payment from "../assets/icons/payment.svg";

function shippingInfo() {
  return (
    <section className="grid grid-cols-2 gap-10 items-start text-center">
      <div className="flex flex-col items-center">
        <Image src={shipping} alt="Shipping" />
        <h2 className="font-extrabold pt-5 text-xl">Free Shipping & Returns</h2>
        <p>For all orders over $199.99</p>
      </div>
      <div className="flex flex-col items-center">
        <Image src={payment} alt="Wallet" />
        <h2 className="font-extrabold pt-5 text-xl">Secure Payment</h2>
        <p>We ensure secure payment</p>
      </div>
      <div className="flex flex-col items-center">
        <Image src={returnIcon} alt="Return" />
        <h2 className="font-extrabold pt-5 text-xl">Money Back Guarantee</h2>
        <p>30 days money back guarantee</p>
      </div>
      <div className="flex flex-col items-center">
        <Image src={support} alt="Customer Support" />
        <h2 className="font-extrabold pt-5 text-xl">24/7 Customer Support</h2>
        <p>Friendly customer support</p>
      </div>
    </section>
  );
}

export default shippingInfo;
