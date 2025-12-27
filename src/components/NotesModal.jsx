import { useState } from "react";

export default function NotesModal({ item, onClose, onAdd }) {
  const [note, setNote] = useState("");

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded p-5 w-[90%] max-w-md shadow-lg">

        <h2 className="text-xl font-bold mb-3">Add Order Notes</h2>
        <p className="text-sm text-gray-600 mb-3">
          Tell us how you want your cut. Example:
          <br />- No Liver <br />- Only head pieces <br />- Medium cut <br />- Remove skin
        </p>

        <textarea
          className="w-full border p-2 rounded min-h-[80px]"
          placeholder="Enter your preference..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <div className="flex justify-end gap-3 mt-4">
          <button 
            onClick={onClose} 
            className="px-4 py-2 border rounded">
            Cancel
          </button>

          <button 
            onClick={() => { onAdd(note); onClose(); }}
            className="px-4 py-2 bg-teal-600 text-white rounded">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
