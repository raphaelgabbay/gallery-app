import React from "react";

function FormulaireDeContact() {
  return (
    <div class="bg-slate-300 p-4">
      <div class="flex flex-col p-2">
        <label>
          <span>Email</span>
        </label>
        <input
          type="email"
          name="email"
          class="p-2 bg-slate-200"
          placeholder="you@example.com"
        />
      </div>
      <div class="flex flex-col p-2">
        <label>
          <span>Firstname</span>
        </label>
        <input
          type="text"
          name=""
          class="p-2 bg-slate-200"
          placeholder="Firstname"
        />
      </div>
      <div class="flex flex-col p-2">
        <label>
          <span>Lastname</span>
        </label>
        <input
          type="text"
          name=""
          class="p-2 bg-slate-200"
          placeholder="Lastname"
        />
      </div>
      <div class="p-2 mt-4"><button class="bg-sky-500 hover:bg-sky-700 p-3 text">Envoyer</button></div>
    </div>
  );
}

export default FormulaireDeContact;