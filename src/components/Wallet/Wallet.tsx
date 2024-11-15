import React from "react";
import { Button } from "../ui/button";

const Wallet = () => {
  // TOOD : wallet info
  const address = "0x3710a38d7310F0036a6094cC8b9aBae95Fcf2B20";
  return (
    <div className="absolute top-0 w-full h-12 px-8 flex justify-between items-center">
      <Button variant="gradient" className="w-auto pl-2 pr-4">
        <div className="bg-white opacity-95 w-8 h-8 rounded-full text-sky-300 flex justify-center items-center text-lg font-bold">
          C
        </div>
        14.3
      </Button>
      <Button variant="gradient" className="w-auto">
        {`${address.slice(0, 5)}...${address.slice(-3)}`}
      </Button>
    </div>
  );
};

export default Wallet;
