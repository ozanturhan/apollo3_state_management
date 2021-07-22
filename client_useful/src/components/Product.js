import { useGetProductDetail } from '../operations/queries/getProductDetail';
import { useState, useEffect } from 'react';
import { selectProduct } from '../operations/mutations/selectProduct';

const Product = ({ product, view }) => {
  const [isDetailVisible, setDetailVisible] = useState(view === 'detailed');
  const loading = useGetProductDetail(product, isDetailVisible);

  useEffect(() => {
    setDetailVisible(view === 'detailed');
  }, [view]);


  const handleToggleView = () => {
    setDetailVisible(!isDetailVisible);
  };

  const handleSelect = event => {
    selectProduct(product, event.target.checked);
  };

  return (
    <div className="product-container">
      <div>
        <div className="selection-area">
          <input type="checkbox" checked={product.selected} onChange={handleSelect} />
          <span>
            {product.title} (View Mode: {product.isDetailVisible ? 'detailed' : 'compact'})
          </span>
        </div>

        {loading && <div>Loading</div>}
        {isDetailVisible && product.detail && (
          <div>
            Price: {product.detail.price}
            Discount: {product.detail.discount}
          </div>
        )}
      </div>

      <button type="button" onClick={handleToggleView}>
        Toggle View
      </button>
    </div>
  );
};

export default Product;
