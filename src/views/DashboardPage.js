import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import { useQuery } from "@tanstack/react-query";
import { GET_PRODUCTS } from "../services/product";
import Paginate from "../components/Paginate";
import InputDebounce from "../components/InputDebounce";
import ModalForm from "./product/ModalForm";

const DashboardPage = () => {
  const { token } = useAuth();
  const [filter, setFilter] = useState({
    page: 1,
    search: "",
  });

  const { data, isSuccess, isError } = useQuery(
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
          <ModalForm />
        </div>
        <table class="table">
          <thead>
            <tr>
              <th></th>
              <th>Nama Barang</th>
              <th>Gambar</th>
              <th>Harga Beli</th>
              <th>Harga Jual</th>
              <th>Stok</th>
            </tr>
          </thead>
          <tbody>
            {isSuccess &&
              products?.map((product, i) => {
                return (
                  <tr>
                    <th>{(filter.page - 1) * 10 + i + 1}</th>
                    <th>{product.name}</th>
                    <td>{product.image}</td>
                    <td>{product.purchasePrice}</td>
                    <td>{product.salesPrice}</td>
                    <td>{product.stock}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div class="flex justify-end">
          <Paginate data={filter} onNext={nextPage} onPrev={prevPage} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
