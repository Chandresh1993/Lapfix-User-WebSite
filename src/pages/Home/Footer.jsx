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

      <div className=" bg-gray-100 ">
        <div className=" p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10 md:gap-20 py-5 md:px-28 ">
            {/* Logo and Description */}
            <div className="h-full">
              <div className="w-48">
                <img
                  className="w-full h-full object-contain"
                  src={logo}
                  alt="Footer Logo"
                />
              </div>
              <div className="mt-7">
                <p className="text-base break-words font-normal text-gray-500">
                  United Web Enhancers Private Limited(UWEPL) the parent of
                  parkGenie Pvt Ltd has been involved in developing parking
                  parking management and related software since 2007, UWEPL has
                  been the Tech Mind for the 2nd largest private parking company
                  in Denmark.
                </p>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <p className="text-3xl font-semibold text-gray-500">Contact us</p>
              <div className="mt-5">
                <p className="text-lg font-semibold text-gray-500">
                  ParkGenie Private Limited
                </p>
                <p className="text-base font-light text-gray-500">
                  A venture of United Web Enhancers Pvt. Ltd.
                </p>
              </div>

              <div className="mt-3 flex flex-col gap-2">
                {/* Address */}
                <div className="flex flex-row gap-3">
                  <div className="w-7">
                    <Locattion className="w-full h-full fill-gray-500 object-contain" />
                  </div>
                  <div>
                    <a
                      href="https://maps.app.goo.gl/S5J4PQ3mGQzLFpDK6"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <p className="text-base font-normal text-gray-500 break-words">
                        209, Welldone Tech Park, Sohna Road, Sector 48,
                        Gurugram, Haryana - 122018
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
                        Info@uweens.com
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
                        +91-124-4227149
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
            Copyright &copy; 2007-2025 All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
