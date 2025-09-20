import React from "react";
import { Link } from "react-router";
import { Facebook, Twitter, Instagram, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2">
              <img
                src="/icons8-track-and-field-96.png"
                alt="logo"
                className="h-8 w-8"
              />
              <span className="text-xl font-bold text-red-600">Squadly</span>
            </Link>
            <p className="mt-3 text-sm text-gray-600 leading-relaxed">
              Your ultimate sports companion. Organize, play, and track your
              activities with ease.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gray-800 font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/courts"
                  className="text-gray-600 hover:text-red-600 transition-colors"
                >
                  Courts
                </Link>
              </li>
              <li>
                <Link
                  to="/club"
                  className="text-gray-600 hover:text-red-600 transition-colors"
                >
                  Club
                </Link>
              </li>
              <li>
                <Link
                  to="/activities"
                  className="text-gray-600 hover:text-red-600 transition-colors"
                >
                  Activities
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className="text-gray-600 hover:text-red-600 transition-colors"
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Socials */}
          <div>
            <h3 className="text-gray-800 font-semibold mb-3">Stay Connected</h3>
            <p className="text-sm text-gray-600 mb-4">
              Get updates and stay in touch with us.
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="text-gray-500 hover:text-red-600 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="text-gray-500 hover:text-red-600 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="text-gray-500 hover:text-red-600 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="mailto:support@squadly.com"
                className="text-gray-500 hover:text-red-600 transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-200 mt-8 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Squadly. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
