import React from "react";
import logo from "../../assets/footer-logo.png";
import { ReactComponent as Locattion } from "../../assets/location-icon.svg";
import { ReactComponent as PhoneIcon } from "../../assets/phone-icon.svg";
import { ReactComponent as Email } from "../../assets/Email-icon 2.svg";
import faceBook from "../../assets/facebook-icon.svg";
import youTube from "../../assets/youtube-icon.svg";
import intagram from "../../assets/black-instagram-icon.svg";

const Footer = () => {
  return (
    <div>
      {/* First Section */}

      <div className=" bg-white border-t ">
        <div className=" p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10 md:gap-20 py-5 md:px-28 ">
            {/* Logo and Description */}
            <div className="h-full">
              <div className="w-fit">
                <h2 className="text-4xl font-bold text-gray-800">LapFix</h2>
              </div>

              <div className="mt-7">
                <p className="text-base break-words font-normal text-gray-500">
                  LapFix is your trusted partner for Apple laptop repairs,
                  sales, and genuine spare parts. Since 2017, based in Nehru
                  Place, we have been delivering expert services for all models
                  of Apple laptops across India. At LapFix, we specialize
                  exclusively in Apple laptops — offering fast diagnostics,
                  dependable repairs, and authentic components. Whether it’s a
                  MacBook Air, MacBook Pro, or any other model, our skilled
                  technicians ensure your device is restored to peak
                  performance.
                </p>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <p className="text-3xl font-semibold text-gray-500">Contact us</p>
              <div className="mt-5">
                <p className="text-lg font-semibold text-gray-500">LapFix</p>
                <p className="text-base font-light text-gray-500">
                  Kashyap Industry
                </p>
              </div>

              <div className="mt-3 flex flex-col gap-2">
                {/* Address */}
                <div className="flex flex-row gap-3 ">
                  <div className="w-7 ">
                    <Locattion className="w-7 h-full fill-gray-500 object-contain" />
                  </div>
                  <div>
                    <a
                      href="https://g.co/kgs/yVFrHn1"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <p className="text-base font-normal text-gray-500 break-words">
                        Address: LAPFIX- 611, Shakuntala Apartments, Building
                        NO, 59, Nehru Place, New Delhi, 110019
                      </p>
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex flex-row items-center gap-3">
                  <div className="w-6">
                    <Email className="w-full h-full object-contain fill-gray-500" />
                  </div>
                  <div>
                    <a href="mailto:Info@uweens.com">
                      <p className="text-base font-normal text-gray-500 break-words">
                        Kashyapindustry@gmail.com
                      </p>
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex flex-row items-center gap-3">
                  <div className="w-7">
                    <PhoneIcon className="w-6 h-6 fill-gray-500 object-contain" />
                  </div>
                  <div>
                    <a href="tel:+91-124-4227149">
                      <p className="text-base font-normal text-gray-500 break-words">
                        9999229332 / 9999449337 / 9999009336 /9999700766
                      </p>
                    </a>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-5">
                <div className="flex flex-row items-center gap-3">
                  <p className="text-base font-normal text-gray-500">
                    Follow us
                  </p>
                  <a
                    href="https://www.facebook.com/parkgenieapp/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-7"
                  >
                    <img
                      src={faceBook}
                      alt="Facebook"
                      className="w-full h-full object-contain"
                    />
                  </a>

                  <a
                    href="https://www.linkedin.com/company/parkgenie-pvt-limited/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-5"
                  >
                    <img
                      src={intagram}
                      alt="intagram"
                      className="w-full h-full object-contain"
                    />
                  </a>
                  <a
                    href="https://www.youtube.com/channel/UC9vS3kqoWoVqMMSvgwxztCA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10"
                  >
                    <img
                      src={youTube}
                      alt="YouTube"
                      className="w-full h-full object-contain"
                    />
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
          <p className="text-base font-normal text-gray-600">
            Copyright &copy; 2017-2025 All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
