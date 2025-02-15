import Image from "next/image";
import React from "react";
import Link from "next/link";
import { getUser } from "@/lib/actions/patient.actions";
import PatientForm from "@/components/forms/PatientForm";

export default function NewAppointment() {
  return (
    <div className="flex h-screen max-h-screen">
      {/* TODO: OTP Verification | PasskeyModal*/}

      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flw-1 justify-between">
          <Image
            src={"/assets/icons/logo-full.svg"}
            height={1000}
            width={1000}
            alt="logo"
            className="mb-12 h-10 w-fit"
          />

          {/* <PatientForm /> */}
          <p className="justify-items-end text-dark-600 xl:text-left">
            {" "}
            © {new Date().getFullYear()} CarePulse
          </p>
        </div>
      </section>
      <Image
        src="/assets/images/appointment-img.png"
        height={1000}
        width={1000}
        alt="appointment"
        className="side-img max-w-[390px] bg-bottom]"
      />
    </div>
  );
}
