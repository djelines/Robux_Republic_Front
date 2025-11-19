import React, { useState } from "react";
import { UpdateUserProfile } from "@/api/userUpdate";

export default function PersonalInfoCard({ user, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    uid: user?.uid,
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    email: user?.email || ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    UpdateUserProfile(form); 
    setIsEditing(false);
    
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm p-8 border border-gray-100">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Informations Personnelles</h3>
          <p className="text-sm text-slate-400">
            Mettez à jour vos coordonnées et votre adresse.
          </p>
        </div>

        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-green-200 hover:bg-green-700 hover:shadow-green-300 transition flex items-center active:scale-95"
          >
            <i className="lucide lucide-save mr-2"></i>
            Modifier
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Prénom</label>
          <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 flex items-center text-slate-900">
            <i className="lucide lucide-user text-slate-400 mr-3 w-4 h-4"></i>
            <input type="text" name="first_name" value={form.first_name} onChange={handleChange} className="bg-transparent w-full outline-none font-semibold text-sm" readOnly={!isEditing}/>
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Nom</label>
          <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 flex items-center text-slate-900">
            <i className="lucide lucide-user text-slate-400 mr-3 w-4 h-4"></i>
            <input type="text" name="last_name" value={form.last_name} onChange={handleChange} className="bg-transparent w-full outline-none font-semibold text-sm" readOnly={!isEditing} />
          </div>
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Email</label>
          <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 flex items-center text-slate-900">
            <i className="lucide lucide-mail text-slate-400 mr-3 w-4 h-4"></i>
            <input type="email"name="email" value={form.email} onChange={handleChange} className="bg-transparent w-full outline-none font-semibold text-sm" readOnly={!isEditing}/>
          </div>
        </div>
      </div>
      {isEditing && (
        <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-blue-200 hover:bg-blue-700 hover:shadow-blue-300 transition flex items-center active:scale-95"
          >
            <i className="lucide lucide-save mr-2"></i>
            Sauvegarder les modifications
          </button>
        </div>
      )}
    </div>
  );
}
