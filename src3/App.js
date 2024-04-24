import React, { useState } from 'react';

const ProductCatalog = ({ products }) => {
  // Состояние для хранения текущей сортировки
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  // Функция для обновления состояния сортировки при клике на заголовок столбца
  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Функция для сортировки массива товаров
  const sortedProducts = [...products].sort((a, b) => {
    if (sortConfig.direction === 'ascending') {
      return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
    } else {
      return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
    }
  });

  // Функция для подсчета общего количества товаров
  const totalQuantity = products.reduce((acc, product) => acc + product.quantity, 0);

  // Функция для подсчета общей стоимости товаров
  const totalCost = products.reduce((acc, product) => acc + product.price * product.quantity, 0);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('id')}>#</th>
            <th onClick={() => handleSort('name')}>Название товара</th>
            <th onClick={() => handleSort('price')}>Цена</th>
            <th onClick={() => handleSort('quantity')}>Количество</th>
          </tr>
        </thead>
        <tbody>
          {sortedProducts.map((product, index) => (
            <tr key={product.id} style={{ backgroundColor: product.quantity < 3 ? 'yellow' : product.quantity === 0 ? 'red' : 'transparent' }}>
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Вывод общего количества товаров и их общей стоимости */}
      <div>
        <p>Общее количество товаров: {totalQuantity}</p>
        <p>Общая стоимость товаров: {totalCost}</p>
      </div>
    </div>
  );
};

export default ProductCatalog;
