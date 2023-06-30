import React from "react";

const TableProduct = ({ products, setSelectedProduct, filter, isSuccess }) => {
  return (
    <table class="table">
      <thead>
        <tr>
          <th></th>
          <th>Nama Barang</th>
          <th>Gambar</th>
          <th>Harga Beli</th>
          <th>Harga Jual</th>
          <th>Stok</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {isSuccess &&
          products?.map((product, i) => {
            return (
              <tr key={i}>
                <th>{(filter.page - 1) * 10 + i + 1}</th>
                <th className="w-20">{product.name}</th>
                <td className="w-20">{product.image}</td>
                <td>{product.purchasePrice}</td>
                <td>{product.salesPrice}</td>
                <td>{product.stock}</td>
                <td>
                  <div className="btn-group btn-group-vertical lg:btn-group-horizontal">
                    <button
                      className="btn btn-circle btn-info btn-outline"
                      onClick={() => {
                        setSelectedProduct(product);
                        window.my_modal_5.showModal();
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setSelectedProduct(product);
                        window.dialog.showModal();
                      }}
                      className="btn btn-circle btn-error text-white"
                    >
                      Del
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default TableProduct;
