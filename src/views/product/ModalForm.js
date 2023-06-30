import React, { useEffect, useState } from "react";
import { InputForm, TextAlt } from "../../components";
import { Controller, useForm } from "react-hook-form";
import { useToast } from "../../hooks/useToast";

import { CREATE_PRODUCT, UPDATE_PRODUCT } from "../../services/product";

const ModalForm = ({ selectedProduct, setSelectedProduct, refetch }) => {
  const { name, purchasePrice, salesPrice, stock } = selectedProduct;
  const [processing, setProcessing] = useState(false);
  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { errors },
  } = useForm();
  const toast = useToast();
  const isEdit = Object.keys(selectedProduct).length;

  useEffect(() => {
    reset({
      name: name ?? "",
      purchasePrice: purchasePrice ?? "",
      salesPrice: salesPrice ?? "",
      stock: stock ?? "",
    });
  }, [selectedProduct]);

  const isValidFileUploaded = (file) => {
    const validFileSize = file.size / 1024 < 100;
    const validExtensions = ["png", "jpg", "jpeg"];
    const fileExtension = file.type.split("/")[1];

    return validExtensions.includes(fileExtension) && validFileSize;
  };

  const onSubmit = async (data) => {
    setProcessing(true);
    try {
      if (isValidFileUploaded(data.image[0])) {
        let formData = new FormData();
        for (let key in data) {
          if (key === "image") formData.append(key, data[key][0]);
          else formData.append(key, data[key]);
        }

        let res;
        if (isEdit) res = await UPDATE_PRODUCT(selectedProduct._id, formData);
        else res = await CREATE_PRODUCT(formData);

        if (res.status >= 200 && res.status < 300) {
          window.my_modal_5.close();
          handleClose();
          refetch();
          toast.success("Data berhasil disimpan");
        }
      } else {
        alert("Gambar harus berformat jpg/png dan kurang dari 100kb");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
    setProcessing(false);
  };

  const handleClose = () => {
    reset();
    setSelectedProduct({});
  };

  return (
    <>
      <dialog
        id="my_modal_5"
        className="modal modal-bottom sm:modal-middle z-50"
      >
        <form className="modal-box" onSubmit={handleSubmit(onSubmit)}>
          <span
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => {
              window.my_modal_5.close();
              handleClose();
            }}
          >
            ✕
          </span>
          <h3 className="font-bold text-lg">
            {isEdit ? "Edit" : "Tambah"} Barang
          </h3>

          <div className="py-3">
            <Controller
              control={control}
              name="name"
              defaultValue={name}
              rules={{ required: true }}
              render={({ field }) => (
                <InputForm
                  label={"Nama barang yang dimasukan?"}
                  placeholder="Barang"
                  {...field}
                />
              )}
            />
            {errors.name && <TextAlt />}

            <label className="label">
              <span className="label-text">Gambar</span>
            </label>
            <input
              type="file"
              className="file-input file-input-bordered file-input-info w-full"
              {...register("image", { required: true })}
            />
            {errors.image && <TextAlt />}
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
            {errors.purchasePrice && <TextAlt />}
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
            {errors.salesPrice && <TextAlt />}
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
            {errors.stock && <TextAlt />}
          </div>
          <div className="modal-action">
            <button type="submit" className="btn btn-info text-white">
              {processing ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Simpan"
              )}
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
};

export default ModalForm;
