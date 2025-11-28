'use client';
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function AddProducts() {
  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [fullDesc, setFullDesc] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState(null);
  const [priority, setPriority] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newProduct = {
      title,
      shortDesc,
      fullDesc,
      price: Number(price),
      date: date ? date.toISOString().split("T")[0] : "",
      priority,
      imageUrl: imageUrl || null,
    };

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });

      if (!res.ok) throw new Error("Failed to add product");

      await res.json();
      toast.success("✨ Product added successfully!");

      // Reset form fields
      setTitle(""); 
      setShortDesc(""); 
      setFullDesc(""); 
      setPrice(""); 
      setDate(null); 
      setPriority(""); 
      setImageUrl("");

    } catch (error) {
      console.error(error);
      toast.error("❌ Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-100 to-indigo-200 flex items-center justify-center p-6">
      <Toaster position="top-right" />
      <div className="w-full max-w-3xl rounded-3xl shadow-2xl p-10 md:p-12 bg-white/30 backdrop-blur-xl border border-transparent hover:border-purple-400 transition duration-500">
        <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 mb-10 text-center drop-shadow-lg">
          Add New Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FloatingInput label="Product Title" value={title} setValue={setTitle} required />
            <FloatingInput label="Short Description" value={shortDesc} setValue={setShortDesc} required />
          </div>

          <FloatingTextarea label="Full Description" value={fullDesc} setValue={setFullDesc} required />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FloatingInput label="Price" type="number" value={price} setValue={setPrice} required />

            <div className="relative">
              <DatePicker
                selected={date}
                onChange={(d) => setDate(d)}
                dateFormat="yyyy-MM-dd"
                className="w-full border-b-2 border-gray-300 focus:border-purple-500 outline-none py-3 bg-transparent"
              />
              <label
                className={`absolute left-0 transition-all text-gray-400 
                  ${date ? "-top-2 text-sm text-purple-500" : "top-3 text-base"}`}
              >
                Date
              </label>
            </div>

            <div className="relative">
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="peer w-full border-b-2 border-gray-300 focus:border-purple-500 outline-none py-3 bg-transparent"
              >
                <option value="" disabled>Select Priority</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
              <label className="absolute left-0 top-3 text-gray-400 text-base transition-all 
                                peer-focus:-top-2 peer-focus:text-sm peer-focus:text-purple-500 
                                peer-valid:-top-2 peer-valid:text-sm">
                Priority
              </label>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            <FloatingInput label="Image URL (optional)" value={imageUrl} setValue={setImageUrl} />
            {imageUrl && (
              <div className="w-40 h-40 border-2 border-purple-300 rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition">
                <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 
                        text-white font-bold py-4 rounded-xl shadow-xl transform transition 
                        hover:scale-105 flex justify-center items-center gap-3 
                        ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {loading && (
              <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
            )}
            {loading ? "Adding..." : " Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
}

/* Floating Input Component */
function FloatingInput({ label, type = "text", value, setValue, required = false }) {
  return (
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required={required}
        className="peer w-full border-b-2 border-gray-300 focus:border-purple-500 outline-none py-3 bg-transparent"
      />
      <label className="absolute left-0 top-3 text-gray-400 text-base transition-all 
                        peer-focus:-top-2 peer-focus:text-sm peer-focus:text-purple-500 
                        peer-valid:-top-2 peer-valid:text-sm">
        {label}
      </label>
    </div>
  );
}

function FloatingTextarea({ label, value, setValue, required = false }) {
  return (
    <div className="relative">
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required={required}
        rows={4}
        className="peer w-full border-b-2 border-gray-300 focus:border-purple-500 outline-none py-3 bg-transparent resize-none"
      ></textarea>
      <label className="absolute left-0 top-3 text-gray-400 text-base transition-all 
                        peer-focus:-top-2 peer-focus:text-sm peer-focus:text-purple-500 
                        peer-valid:-top-2 peer-valid:text-sm">
        {label}
      </label>
    </div>
  );
}
