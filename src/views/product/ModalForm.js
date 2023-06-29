import React from "react";
import { InputForm } from "../../components";
import { Controller, useForm } from "react-hook-form";
import { useToast } from "../../hooks/useToast";

const ModalForm = () => {
  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { errors },
  } = useForm();
  const toast = useToast();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const isValidFileUploaded = (file) => {
        const validFileSize = file.size / 1024 < 100;
        const validExtensions = ["png", "jpg"];
        const fileExtension = file.type.split("/")[1];

        return validExtensions.includes(fileExtension) && validFileSize;
      };

      if (isValidFileUploaded(data.image[0])) {
        toast.success("success");
      } else {
        toast.error("Gambar harus berformat jpg/png dan kurang dari 100kb");
      }

      const formData = new FormData();
      formData.append("file", data?.image[0]);
    } catch (error) {
      toast.error(error.message);
    }

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
          <span
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => {
              window.my_modal_5.close();
              reset();
            }}
          >
            ✕
          </span>
          <h3 className="font-bold text-lg">Tambah Barang</h3>

          <div className="py-3">
            <Controller
              control={control}
              name="name"
              rules={{ required: true }}
              render={({ field }) => (
                <InputForm
                  label={"Nama barang yang dimasukan?"}
                  placeholder="Barang"
                  {...field}
                />
              )}
            />
            {errors.name && (
              <span className="label-text-alt text-red-500">
                This field is required
              </span>
            )}

            <label className="label">
              <span className="label-text">Gambar</span>
            </label>
            <input
              type="file"
              className="file-input file-input-bordered file-input-info w-full"
              {...register("image", { required: true })}
            />
            {errors.image && (
              <span className="label-text-alt text-red-500">
                This field is required
              </span>
            )}
            <Controller
              control={control}
              name="purchasePrice"
              rules={{ required: true }}
              render={({ field }) => (
                <InputForm
                  label={"Harga Beli"}
                  type="number"
                  placeholder="Harga Beli"
                  {...field}
                />
              )}
            />
            {errors.purchasePrice && (
              <span className="label-text-alt text-red-500">
                This field is required
              </span>
            )}
            <Controller
              control={control}
              name="salesPrice"
              rules={{ required: true }}
              render={({ field }) => (
                <InputForm
                  label={"Harga Jual"}
                  type="number"
                  placeholder="Harga Jual"
                  {...field}
                />
              )}
            />
            {errors.salesPrice && (
              <span className="label-text-alt text-red-500">
                This field is required
              </span>
            )}
            <Controller
              control={control}
              name="stock"
              rules={{ required: true }}
              render={({ field }) => (
                <InputForm
                  label={"Stok"}
                  type="number"
                  placeholder="Stok"
                  {...field}
                />
              )}
            />
            {errors.stock && (
              <span className="label-text-alt text-red-500">
                This field is required
              </span>
            )}
          </div>
          <div className="modal-action">
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
