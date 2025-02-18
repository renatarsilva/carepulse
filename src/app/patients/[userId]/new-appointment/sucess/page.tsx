import React from "react";
import Link from "next/link";
import Image from "next/image";

const Sucess = () => {
  return (
    <div className="flex h-screen max-h-screen px-[5%]">
      <div className="success-img">
        <Link href="/">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="logo"
            className="h-10 w-fit"
          />
        </Link>
      </div>
    </div>
  );
};

export default Sucess;
