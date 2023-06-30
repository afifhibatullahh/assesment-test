import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DELETE_PRODUCT, GET_PRODUCTS } from "../services/product";
import { useToast } from "../hooks/useToast";
import { Dialog, InputDebounce, Loading, Paginate } from "../components";
import ModalForm from "./product/ModalForm";
import TableProduct from "./product/TableProduct";

const DashboardPage = () => {
  const [selectedProduct, setSelectedProduct] = useState({});
  const queryClient = useQueryClient();
  const toast = useToast();

  const [filter, setFilter] = useState({
    page: 1,
    search: "",
  });

  const { data, isSuccess, refetch, isLoading } = useQuery(
    ["products", filter],
    async ({ signal }) =>
      await GET_PRODUCTS(filter.page, filter.search, signal),
    {
      onSuccess: (data) => {
        setFilter({
          ...filter,
          page: data.data.currentPage ?? 1,
          total: data.data.total,
        });
      },
      keepPreviousData: true,
    }
  );

  const products = data?.data?.products;

  const nextPage = () => {
    const { page, total } = filter;
    if (total > page * 10) {
      setFilter({ ...filter, page: page + 1 });
    }
  };
  const prevPage = () => {
    const page = filter.page;
    if (!(page <= 1)) {
      setFilter({ ...filter, page: page - 1 });
    }
  };

  const deleteMutation = useMutation((id) => DELETE_PRODUCT(id), {
    onSuccess: (data) => {
      toast.success("Data berhasil dihapus");
      queryClient.invalidateQueries(["products", filter]);
    },
    onError: (error) => {
      console.log(error);
      toast.error("Terjadi kesalahan : ", error.message);
    },
  });

  const handleDelete = (data) => {
    deleteMutation.mutateAsync(data);
  };

  return (
    <div class="container mx-auto px-5">
      <div class="overflow-x-auto">
        <div className="flex justify-between items-center">
          <InputDebounce
            type="text"
            placeholder="Search"
            className="input input-bordered md:w-96"
            onChange={(value) => {
              setFilter({ ...filter, search: value });
            }}
            value={filter.search}
          />

          <button className="btn" onClick={() => window.my_modal_5.showModal()}>
            + Barang
          </button>
          <ModalForm
            refetch={refetch}
            selectedProduct={selectedProduct}
            setSelectedProduct={setSelectedProduct}
          />
        </div>
        {isLoading ? (
          <Loading />
        ) : (
          <TableProduct
            products={products}
            setSelectedProduct={setSelectedProduct}
            filter={filter}
            isSuccess={isSuccess}
          />
        )}
        <div class="flex justify-end">
          <Paginate data={filter} onNext={nextPage} onPrev={prevPage} />
        </div>
      </div>
      <Dialog
        onClick={() => handleDelete(selectedProduct._id)}
        onClose={() => setSelectedProduct({})}
      />
    </div>
  );
};

export default DashboardPage;
