import React from "react";

const Dialog = ({ onClick, onClose }) => {
  return (
    <>
      <dialog id="dialog" className="modal">
        <form method="dialog" className="modal-box">
          <span
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => {
              onClose();
              window.dialog.close();
            }}
          >
            ✕
          </span>
          <h3 className="font-bold text-lg">Yakin</h3>
          <p className="py-4">Ingin menghapus data ?</p>
          <div className="modal-action">
            <button onClick={onClick} className="btn">
              Delete
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
};

export default Dialog;
