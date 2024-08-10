import React, { useContext, useEffect, useState } from 'react'
import Breadcrums from '../Components/Breadcrums/Breadcrums'
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay'
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox'
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../Context/ShopContext'
import ReviewBox from '../Components/ReviewBox/ReviewBox'
import { backend_url } from '../App';

const Product = () => {
  // const {products} = useContext(ShopContext);
  const {productId} = useParams();
  const [product,setProduct] = useState({});

  useEffect(()=>{
    const fetchproduct = async()=>{
      await fetch(`${backend_url}/products/${productId}`)
      .then((res)=>res.json()).then((data)=>setProduct(data))
    }
    fetchproduct()
    
  },[])

  return product ? (
    <div>
      <Breadcrums product={product}/>
      <ProductDisplay product={product}/>
      <DescriptionBox product={product}/>
      <ReviewBox id={product.id} review={product.review}/>
      
    </div>
  ) : <p>Not Found</p>
}

export default Product
