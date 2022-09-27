import React from 'react';
import { client, urlFor } from '../../lib/client';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { Product } from '../../components';
import { useState } from 'react';
import { useStateContext } from '../../context/StateContext';

const ProductDetails = ({ products, Similarproducts }) => {
    const { image, name, details, price } = products;
    const [index, setIndex] = useState(0);
    const { incQty, decQty, qty, onAdd, setShowCart } = useStateContext();

    //buy now funciton
    const handleBuyNow = () => {
        onAdd(products, qty);

        setShowCart(true);
    }

  return (
    <div>
        <div className='product-detail-container'>
            <div>
                <div className='image-container'>
                    <img src={urlFor(image && image[index])} alt={name} className="product-detail-image" />
                </div>
                 <div className='small-images-container'>
                    {image?.map((item, i) => (
                        <img key={i} src={urlFor(item)} 
                        className={i === index ? 'small-image selected-image' : 'small-image'}
                        onMouseEnter={() => setIndex(i)}
                        />
                    ))}
                </div> 
            </div>
            <div className='product-detail-desc'>
                <h1>{name}</h1>
                <div className='reviews'>
                    <div>
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                        <AiOutlineStar />
                    </div>
                    <p>(15)</p>
                </div>
                <h4>Details: </h4>
                <p>{details}</p>
                <p className='price'>${price}</p>
                <div className='quantity'>
                    <h3>Quantity: </h3>
                    <p className='quantity-desc'>
                        <span className='minus' onClick={decQty}><AiOutlineMinus /></span>
                        <span className='num'>{qty}</span>
                        <span className='plus' onClick={incQty}><AiOutlinePlus /></span>
                    </p>
                </div>
                <div className='buttons'>
                    <button type='button' className='add-to-cart'
                     onClick={() => onAdd(products, qty)}>Add to Cart</button>
                    <button type='button' className='buy-now' onClick={handleBuyNow}>Buy Now</button>
                </div>
            </div>
        </div>
        {/* you may like section */}
        <div className='maylike-products-wrapper'>
            <h2>You may also like</h2>
            <div className='marquee'>
                <div className='maylike-products-container track'>  
                   {Similarproducts.map((item) => (
                    <Product key={item.id} product={item} />
                   ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export const getStaticPaths = async () => {
    const query = `*[_type == product] {
        slug {
            current
        }
    }`;
    const products = await client.fetch(query);
    const paths = products.map((product) => ({
        params: {
            slug: product.slug.current
        }
    }));
    return {
        paths,
        fallback: 'blocking'
    }
}

export const getStaticProps = async ({ params: { slug }}) => {
    //get the products from sanity
  
    const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
    const productQuery = '*[_type == "product"]';

    const products = await client.fetch(query);
    const Similarproducts = await client.fetch(productQuery);
  
    return {
      props: {products, Similarproducts}
    }
  }

  
export default ProductDetails
