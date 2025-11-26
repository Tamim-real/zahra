import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-20 pt-16 pb-10 px-6 md:px-20">
      
      {/* Top Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Brand Section */}
        <div>
          <h2 className="text-3xl font-bold mb-3">Zahra</h2>
          <p className="text-gray-300 leading-relaxed">
            Your trusted store for fashion, lifestyle & premium wear.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4 mt-5">
            <a className="hover:text-pink-500 transition cursor-pointer">
              <Facebook />
            </a>
            <a className="hover:text-pink-500 transition cursor-pointer">
              <Instagram />
            </a>
            <a className="hover:text-pink-500 transition cursor-pointer">
              <Twitter />
            </a>
            <a className="hover:text-pink-500 transition cursor-pointer">
              <Youtube />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li><a href="#" className="hover:text-pink-400 transition">Home</a></li>
            <li><a href="#" className="hover:text-pink-400 transition">Explore</a></li>
            <li><a href="#" className="hover:text-pink-400 transition">Men</a></li>
            <li><a href="#" className="hover:text-pink-400 transition">Kids</a></li>
            <li><a href="#" className="hover:text-pink-400 transition">Feed</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Support</h3>
          <ul className="space-y-2 text-gray-300">
            <li><a href="#" className="hover:text-pink-400 transition">Contact Us</a></li>
            <li><a href="#" className="hover:text-pink-400 transition">About Us</a></li>
            <li><a href="#" className="hover:text-pink-400 transition">Return Policy</a></li>
            <li><a href="#" className="hover:text-pink-400 transition">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-pink-400 transition">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Newsletter</h3>
          <p className="text-gray-300 mb-3">Subscribe to get best offers.</p>

          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white outline-none"
            />
            <button className="px-4 py-2 bg-pink-600 rounded-lg hover:bg-pink-700 transition">
              Join
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="h-px w-full bg-gray-700 my-8"></div>

      {/* Footer Bottom Text */}
      <p className="text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} Zahra Store — All Rights Reserved.
      </p>
    </footer>
  );
}
 