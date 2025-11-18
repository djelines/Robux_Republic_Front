import React from "react";

export default function PersonalInfoCard() {
  return (
    <div className="bg-white rounded-3xl shadow-sm p-8 border border-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Informations Personnelles</h3>
          <p className="text-sm text-slate-400">
            Mettez à jour vos coordonnées et votre adresse.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Prénom</label>
          <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 flex items-center text-slate-900">
            <i className="lucide lucide-user text-slate-400 mr-3 w-4 h-4"></i>
            <input
              type="text"
              value="Tyler"
              className="bg-transparent w-full outline-none font-semibold text-sm"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Nom</label>
          <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 flex items-center text-slate-900">
            <i className="lucide lucide-user text-slate-400 mr-3 w-4 h-4"></i>
            <input
              type="text"
              value="Durden"
              className="bg-transparent w-full outline-none font-semibold text-sm"
            />
          </div>
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Email</label>
          <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 flex items-center text-slate-900">
            <i className="lucide lucide-mail text-slate-400 mr-3 w-4 h-4"></i>
            <input
              type="email"
              value="tyler.durden@roblox.com"
              className="bg-transparent w-full outline-none font-semibold text-sm"
            />
          </div>
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
            Date de naissance
          </label>
          <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 flex items-center text-slate-900">
            <i className="lucide lucide-calendar text-slate-400 mr-3 w-4 h-4"></i>
            <input
              type="text"
              value="14/02/1998"
              className="bg-transparent w-full outline-none font-semibold text-sm"
            />
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-blue-200 hover:bg-blue-700 hover:shadow-blue-300 transition flex items-center active:scale-95">
          <i className="lucide lucide-save"></i>
          Sauvegarder les modifications
        </button>
      </div>
    </div>
  );
}
