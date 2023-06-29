import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import { useQuery } from "@tanstack/react-query";
import { GET_PRODUCTS } from "../services/product";

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
      onSuccess: (data) =>
        setFilter({ ...filter, page: data.data.currentPage ?? 1 }),
      keepPreviousData: true,
    }
  );

  const products = data?.data?.products;

  return (
    <div class="container mx-auto">
      <div class="overflow-x-auto">
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
      </div>
    </div>
  );
};

export default DashboardPage;
