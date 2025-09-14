import { Link } from "react-router-dom";

function Product({ product }) {
  console.log(product);
  return (
    <div>
      <a href={`/product/${product._id}`}>
        <img src={product.image} alt="" />
      </a>
      <div>
        <Link to={`/product/${product._id}`}>
          <div>
            <strong>{product.name}</strong>
          </div>
        </Link>
        <h3>${product.price}</h3>
      </div>
    </div>
  );
}

export default Product;
