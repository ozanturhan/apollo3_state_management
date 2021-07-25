import { useState } from 'react';
import Product from './Product';
import { useGetProducts } from '../operations/queries/getProducts';
import { selectAllProduct } from '../operations/mutations/selectAllProduct';

// for fake routing
const urlSearchParams = new URLSearchParams(window.location.search);

const ProductList = () => {
  const [viewMode, setViewMode] = useState(urlSearchParams.get('view') || 'compact');

  const { data, loading, isAllSelected } = useGetProducts(viewMode);

  const handleViewModeChanges = mode => {
    // fake routing
    window.history.pushState('', '', `?view=${mode}`);
    setViewMode(mode);
  };

  const handleSelectAllChange = event => {
    selectAllProduct(event.target.checked, viewMode);
  };

  return (
    <div className="container">
      <div className="list-header">
        <div className="selection-area">
          <div>
            <label>
              <input type="checkbox" checked={isAllSelected} onChange={handleSelectAllChange} />
              Select All
            </label>
          </div>
          <span>(View Mode: {viewMode})</span>
        </div>
        <div>
          <button type="button" onClick={() => handleViewModeChanges('compact')}>
            Compact
          </button>
          <button type="button" onClick={() => handleViewModeChanges('detailed')}>
            Detailed
          </button>
        </div>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="container">
          {data?.products?.items?.map(product => (
            <Product
              key={product.id}
              defaultViewMode={viewMode}
              product={product}
              view={viewMode}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
