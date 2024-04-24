import React from 'react';
import Search from './Search'; // Путь к вашему компоненту поиска
import SortTable from './SortTable'; // Путь к вашему компоненту SortTable
import Catalog from './Catalog'; // Путь к вашему компоненту Catalog

const App = () => {
  return (
    <div>
      <h2>Search Component:</h2>
      <Search products={initialProducts} searchType="exact" /> {/* Измените searchType на 'partial' для частичного совпадения */}
      <h2>SortTable Component:</h2>
      <SortTable products={initialProducts} />
      <h2>Catalog Component:</h2>
      <Catalog products={initialProducts} />
    </div>
  );
};

export default App;
