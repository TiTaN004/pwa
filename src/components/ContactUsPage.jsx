import React, { useState } from "react";
import email from "../assets/email.svg";
import nearme from "../assets/nearme.svg";
import axios from "axios";
import { baseUrl } from "../utils";

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${baseUrl}/send_mail.php`,
        formData
      );
      console.log("Response:", response.data);
      // Optionally reset form
      setFormData({ name: "", email: "", message: "" });
      alert("Message sent successfully!");
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message.");
    }
  };

  return (
    <div className="pt-[120px] min-h-screen bg-[#010000] text-white px-6 py-16 flex items-center justify-center flex-col">
      <div className="w-full max-w-6xl bg-[#1a1a1a] rounded-2xl shadow-xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        <div className="bg-gradient-to-br from-[#d5251d]/90 to-[#010000] p-10 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
            <p className="text-sm text-gray-200 mb-10">
              Have questions or want to work with us? We're always happy to
              chat.
            </p>

            <div className="space-y-5 text-sm">
              <div className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M3 5a2 2 0 012-2h2.6a1 1 0 01.98.8l.6 3a1 1 0 01-.29.92l-1.1 1.1a16 16 0 006.38 6.38l1.1-1.1a1 1 0 01.92-.29l3 .6a1 1 0 01.8.98V19a2 2 0 01-2 2h-1C9.82 21 3 14.18 3 6V5z" />
                </svg>
                <span>
                  <a
                    href="tel:+919727896779"
                    className="text-blue-400 hover:underline"
                  >
                    +91 97278 96779
                  </a>
                </span>
              </div>
              <div className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-whatsapp" viewBox="0 0 16 16">
  <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
</svg>
                <span>
                  <a
                    href="https://wa.me/918000557122"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    +91 80005 57122
                  </a>
                </span>
              </div>
              <div className="flex items-center gap-3">
                <img src={email} width={20} height={20} alt="email" />
                <span>
                  <a
                    href="mailto:info.panthenterprise@gmail.com"
                    className="text-blue-400 hover:underline"
                  >
                    info.panthenterprise@gmail.com
                  </a>
                </span>
              </div>
              <div className="flex items-center gap-3">
                <img src={nearme} width={20} height={20} alt="email" />

                <span>Morbi, India</span>
              </div>
            </div>
          </div>
          {/* <div className="flex gap-4 mt-12">
            <a href="#" className="text-white hover:text-gray-300 transition">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8v-6.93H7.9v-2.87H10V9.93c0-2.05 1.22-3.18 3.1-3.18.9 0 1.84.16 1.84.16v2.02H14c-1.1 0-1.44.68-1.44 1.37v1.65h2.46l-.39 2.87h-2.07V22c4.56-.93 8-4.96 8-9.8z" />
              </svg>
            </a>
            <a href="#" className="text-white hover:text-gray-300 transition">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.2c3.2 0 3.584.012 4.85.07 1.206.056 2.088.248 2.594.416a5.18 5.18 0 011.868 1.2 5.18 5.18 0 011.2 1.868c.168.506.36 1.388.416 2.594.058 1.266.07 1.65.07 4.85s-.012 3.584-.07 4.85c-.056 1.206-.248 2.088-.416 2.594a5.18 5.18 0 01-1.2 1.868 5.18 5.18 0 01-1.868 1.2c-.506.168-1.388.36-2.594.416-1.266.058-1.65.07-4.85.07s-3.584-.012-4.85-.07c-1.206-.056-2.088-.248-2.594-.416a5.18 5.18 0 01-1.868-1.2 5.18 5.18 0 01-1.2-1.868c-.168-.506-.36-1.388-.416-2.594C2.212 15.584 2.2 15.2 2.2 12s.012-3.584.07-4.85c.056-1.206.248-2.088.416-2.594a5.18 5.18 0 011.2-1.868 5.18 5.18 0 011.868-1.2c.506-.168 1.388-.36 2.594-.416C8.416 2.212 8.8 2.2 12 2.2zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zm6.406-11.45a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
              </svg>
            </a>
            <a href="#" className="text-white hover:text-gray-300 transition">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.3c-.966 0-1.75-.78-1.75-1.75s.784-1.75 1.75-1.75 1.75.78 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.3h-3v-5.6c0-1.34-.027-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.88v1.36h.04c.4-.75 1.37-1.54 2.82-1.54 3.02 0 3.58 1.99 3.58 4.58v5.6z" />
              </svg>
            </a>
          </div> */}
        </div>

        <div className="p-10 bg-[#1f1f1f]">
          <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm block mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full p-3 rounded-lg bg-[#2c2c2c] border border-[#333] focus:outline-none focus:border-[#d5251d]"
              />
            </div>

            <div>
              <label className="text-sm block mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full p-3 rounded-lg bg-[#2c2c2c] border border-[#333] focus:outline-none focus:border-[#d5251d]"
              />
            </div>

            <div>
              <label className="text-sm block mb-1">Message</label>
              <textarea
                rows={5}
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Type your message..."
                className="w-full p-3 rounded-lg bg-[#2c2c2c] border border-[#333] focus:outline-none focus:border-[#d5251d]"
              />
            </div>

            <button
              type="submit"
              className="bg-[#d5251d] hover:bg-[#bb1e18] transition-colors w-full py-3 rounded-lg font-semibold"
            >
              Submit Message
            </button>
          </form>
        </div>
      </div>
      <div className="w-full max-w-6xl mt-16 flex flex-col md:flex-row">
        <h2 className="text-2xl sm:text-3xl font-extrabold mb-6 text-center w-full md:w-1/4">
          Visit Us
        </h2>
        <div className="w-full aspect-[4/3] md:aspect-[16/9] rounded-[20px] overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d78385.89422673696!2d70.7788557436316!3d22.805038235998992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39598cd96ce15487%3A0x294863999340c94e!2sMorbi%2C%20Gujarat!5e1!3m2!1sen!2sin!4v1747577736298!5m2!1sen!2sin"
            className="w-full h-full border-0"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
