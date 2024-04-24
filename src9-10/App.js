import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  addToCart,
  removeFromCart,
  setDeliveryMethod,
  setPaymentMethod,
  setAddress,
} from './actions';

const productsData = [
  {
    id: 1,
    name: 'Товар 1',
    price: 100,
    quantity: 10,
    image: 'product1.jpg',
    description: 'Описание товара 1',
    isNew: true,
    discount: 10,
  },
  {
    id: 2,
    name: 'Товар 2',
    price: 200,
    quantity: 5,
    image: 'product2.jpg',
    description: 'Описание товара 2',
    isNew: false,
    discount: 0,
  },
  // Добавьте больше товаров по аналогии
];

const SortTable = ({ products, onSort }) => {
  const [sortBy, setSortBy] = useState(null);

  const handleSort = (key) => {
    if (sortBy === key) {
      setSortBy(null);
      onSort(null);
    } else {
      setSortBy(key);
      onSort(key);
    }
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th onClick={() => handleSort('name')}>Наименование</th>
          <th onClick={() => handleSort('price')}>Стоимость</th>
          <th onClick={() => handleSort('quantity')}>Количество</th>
          <th onClick={() => handleSort('discount')}>Скидка</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>{product.quantity}</td>
            <td>{product.discount}%</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const Catalog = ({ products }) => {
  const [sortedProducts, setSortedProducts] = useState(products);

  const handleSort = (key) => {
    let sorted = [...products];
    if (key === 'name' || key === 'price' || key === 'quantity' || key === 'discount') {
      sorted.sort((a, b) => {
        if (key === 'name') return a.name.localeCompare(b.name);
        return a[key] - b[key];
      });
    }
    setSortedProducts(sorted);
  };

  return (
    <div className="catalog">
      <SortTable products={sortedProducts} onSort={handleSort} />
      <div className="products">
        {sortedProducts.map((product) => (
          <div key={product.id} className="product">
            {product.isNew && <span className="new">Новинка</span>}
            <img className="product-image" src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            {product.discount > 0 ? (
              <div>
                <p>Цена со скидкой: {product.price - (product.price * product.discount) / 100}</p>
                <p>Старая цена: <del>{product.price}</del></p>
              </div>
            ) : (
              <p>Цена: {product.price}</p>
            )}
            <p>Количество: {product.quantity}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const Search = ({ products }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const results = products.filter((product) => product.name.toLowerCase().includes(term));
    setSearchResults(results);
  };

  return (
    <div className="search">
      <input
        type="text"
        placeholder="Поиск по наименованию товара"
        value={searchTerm}
        onChange={handleSearch}
      />
      <div className="search-results">
        {searchResults.map((product) => (
          <div key={product.id} className="search-result">
            <h3>{product.name}</h3>
            <p>Количество: {product.quantity}</p>
            <p>Стоимость: {product.price}</p>
            {product.discount > 0 && (
              <p>Цена со скидкой: {product.price - (product.price * product.discount) / 100}</p>
            )}
            <p>Описание: {product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const OrderForm = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const deliveryMethod = useSelector((state) => state.deliveryMethod);
  const paymentMethod = useSelector((state) => state.paymentMethod);
  const address = useSelector((state) => state.address);
  const [currentPage, setCurrentPage] = useState(1);

  const handleNextPage = () => setCurrentPage(currentPage + 1);
  const handlePrevPage = () => setCurrentPage(currentPage - 1);

  const handleDeliveryMethodChange = (e) => {
    dispatch(setDeliveryMethod(e.target.value));
  };

  const handlePaymentMethodChange = (e) => {
    dispatch(setPaymentMethod(e.target.value));
  };

  const handleAddressChange = (e) => {
    dispatch(setAddress(e.target.value));
  };

  const handleAddToCart = (productId, quantity) => {
    dispatch(addToCart(productId, quantity));
  };

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  return (
    <div>
      {currentPage === 1 && (
        <div>
          <h2>Корзина</h2>
          {cart.map((item) => (
            <div key={item.productId}>
              <input
                type="checkbox"
                checked={item.isChecked}
                onChange={(e) => handleAddToCart(item.productId, item.quantity)}
              />
              <span>{item.productName}</span>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => handleAddToCart(item.productId, e.target.value)}
              />
              <button onClick={() => handleRemoveFromCart(item.productId)}>Удалить</button>
            </div>
          ))}
          <button onClick={handleNextPage}>Далее</button>
        </div>
      )}
      {currentPage === 2 && (
        <div>
          <h2>Выбор способа доставки</h2>
          <div>
            <input
              type="radio"
              value="courier"
              checked={deliveryMethod === 'courier'}
              onChange={handleDeliveryMethodChange}
            />
            <label>Курьером</label>
          </div>
          <div>
            <input
              type="radio"
              value="post"
              checked={deliveryMethod === 'post'}
              onChange={handleDeliveryMethodChange}
            />
            <label>Почтой</label>
          </div>
          <div>
            <input
              type="radio"
              value="pickup"
              checked={deliveryMethod === 'pickup'}
              onChange={handleDeliveryMethodChange}
            />
            <label>Самовывоз</label>
          </div>
          {deliveryMethod !== 'pickup' && (
            <input
              type="text"
              placeholder="Введите адрес доставки"
              value={address}
              onChange={handleAddressChange}
            />
          )}
          <h2>Выбор способа оплаты</h2>
          <div>
            <input
              type="radio"
              value="cash"
              checked={paymentMethod === 'cash'}
              onChange={handlePaymentMethodChange}
            />
            <label>Наличными</label>
          </div>
          <div>
            <input
              type="radio"
              value="card"
              checked={paymentMethod === 'card'}
              onChange={handlePaymentMethodChange}
            />
            <label>Банковской картой</label>
          </div>
          <div>
            <input
              type="radio"
              value="transfer"
              checked={paymentMethod === 'transfer'}
              onChange={handlePaymentMethodChange}
            />
            <label>Банковским переводом</label>
          </div>
          <button onClick={handlePrevPage}>Назад</button>
          <button onClick={handleNextPage}>Далее</button>
        </div>
      )}
    </div>
  );
};

const App = () => {
  return (
    <div>
      <Search products={productsData} />
      <Catalog products={productsData} />
      <OrderForm />
    </div>
  );
};

export default App;
