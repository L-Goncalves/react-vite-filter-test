import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';

export interface Product {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail: string
  images: string[]
}

const getProducts = async () => {
  const response = await axios.get("https://dummyjson.com/products");

  return response.data.products;
}


function App() {
  const [products, setProducts] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const filter = (product: Product) => {
    if(!searchValue){
      return product
    }
    return product.title.toLowerCase().includes(searchValue);

  }

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
    });
  }, [])
  

  return (
    <>
      <input type='text' onChange={(e: any) => { 
        setSearchValue(e.target.value)
      }}/>

       {products.filter(filter).map( (product: Product) => { 

        const price = (product.price)
        const discontedPrice = (product.price / 100) * product.discountPercentage;
        const discountApplied = price - discontedPrice;

          return <div>
              Titulo: {product.title} <br/>
              Preço: R${price.toFixed(2).toString().replace('.', ',')} <br/>
              Com Desconto: R${discountApplied.toFixed(2).toString().replace('.', ',')}
          </div>
       })}
    </>
  )
}

export default App
