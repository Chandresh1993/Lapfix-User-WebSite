import React from "react";

import { ReactComponent as Locattion } from "../../assets/location-icon.svg";
import { ReactComponent as PhoneIcon } from "../../assets/phone-icon.svg";
import { ReactComponent as Email } from "../../assets/Email-icon 2.svg";

import { ReactComponent as Intagram } from "../../assets/black-instagram-icon.svg";

const Footer = () => {
  return (
    <div>
      {/* First Section */}

      <div className=" bg-black border-t ">
        <div className=" p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10 md:gap-20 py-5 md:px-28 ">
            {/* Logo and Description */}
            <div className="h-full">
              <div className="w-48">
                <p className="text-white font-bold text-4xl uppercase">
                  GolfCource
                </p>
              </div>
              <div className="mt-7">
                <p className="text-base break-words font-normal text-white">
                  LapFix has been your trusted Apple laptop expert since 2017.
                  Based in Nehru Place, we specialize in fast, reliable repairs,
                  sales, and genuine spare parts for all MacBook models across
                  India. From diagnostics to full restoration, we ensure peak
                  performance with authentic components.
                </p>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <p className="text-3xl font-semibold text-white">Contact us</p>
              <div className="mt-5">
                <p className="text-lg font-semibold text-white">
                  ParkGenie Private Limited
                </p>
              </div>

              <div className="mt-3 flex flex-col gap-2">
                {/* Address */}
                <div className="flex items-start flex-row gap-3 ">
                  <div className="w-7 ">
                    <Locattion className="w-7 h-full fill-white object-contain" />
                  </div>
                  <div>
                    <a
                      href="https://maps.app.goo.gl/S5J4PQ3mGQzLFpDK6"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <p className="text-base font-normal text-white break-words">
                        LapFix- 611, Shakuntala Apartments, LAPFIX 611, 59,
                        Nehru Place, New Delhi, Delhi 110019
                      </p>
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex flex-row items-start  gap-3">
                  <div className="w-6">
                    <Email className="w-full h-full object-contain fill-white" />
                  </div>
                  <div>
                    <a href="mailto:Info@uweens.com">
                      <p className="text-base font-normal text-white break-words">
                        Kashyapindustry@gmail.com
                      </p>
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex flex-row items-start gap-3">
                  <div className="w-7">
                    <PhoneIcon className="w-6 h-6 fill-white object-contain" />
                  </div>
                  <div>
                    <a href="tel:+91-9999229332 ">
                      <p className="text-base font-normal text-white break-words">
                        9999229332 / 9999449337 / 9999009336 /9999700766
                      </p>
                    </a>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-5">
                <div className="flex flex-row items-center gap-3">
                  <p className="text-base font-normal text-white">
                    Follow us :
                  </p>

                  <a
                    href="https://www.instagram.com/lapfixindia/?igsh=cW1kd2dpczhkYnJp&utm_source=qr#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-5"
                  >
                    <Intagram className="w-5 h-5 fill-white" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Second Footer Section */}
      <div className=" bg-gray-100">
        {/* Copyright */}
        <div className="border-t-2 border-gray-300 w-full flex items-center justify-center p-5">
          <p className="text-base font-normal text-black">
            Copyright &copy; 2017-2025 All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
