import React from "react";
import { InputForm } from "../../components";
import { useForm } from "react-hook-form";
import { useToast } from "../../hooks/useToast";

const ModalForm = () => {
  const { register, handleSubmit } = useForm();
  const toast = useToast();

  const onSubmit = async (data) => {
    const isValidFileUploaded = (file) => {
      const validFileSize = file.size / 1000 < 100;
      const validExtensions = ["png", "jpg"];
      const fileExtension = file.type.split("/")[1];

      return validExtensions.includes(fileExtension) && validFileSize;
    };

    if (isValidFileUploaded(data.image[0])) {
      toast.success("success");
    } else {
      toast.error("Gambar harus berformat jpg/pnd dan kurang dari 100kb");
    }

    const formData = new FormData();
    formData.append("file", data?.image[0]);

    // const res = await fetch("http://localhost:5000/upload-file", {
    //   method: "POST",
    //   body: formData,
    // }).then((res) => res.json());
    // alert(JSON.stringify(`${res.message}, status: ${res.status}`));
  };

  return (
    <>
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <form className="modal-box" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="font-bold text-lg">Tambah Barang</h3>

          <div className="py-3">
            <InputForm
              label={"Nama barang yang dimasukan?"}
              placeholder="Barang"
            />
            <label className="label">
              <span className="label-text">Gambar</span>
            </label>
            <input
              type="file"
              className="file-input file-input-bordered file-input-info w-full"
              {...register("image")}
            />
            <InputForm
              label={"Harga Beli"}
              type="number"
              placeholder="Harga Beli"
            />
            <InputForm
              label={"Harga Jual"}
              type="number"
              placeholder="Harga Jual"
            />
            <InputForm label={"Stok"} type="number" placeholder="Stok" />
          </div>
          <div className="modal-action">
            <span className="btn btn-error text-white">Batal </span>
            <button type="submit" className="btn btn-info text-white">
              Simpan
              {/* <span className="loading loading-spinner"></span> */}
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
};

export default ModalForm;
