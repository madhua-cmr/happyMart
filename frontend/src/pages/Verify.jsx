/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useContext, useEffect } from "react"
import { ShopContext } from "../context/ShopContext"
import { useSearchParams } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"

const Verify = () => {

  const{navigate,token,setCartItems,backend_url} =useContext(ShopContext)
  const[searchParams,setSearchParams]=useSearchParams()

  const success=searchParams.get('success');
  const orderId=searchParams.get('orderId');

  const verifyPayment=async()=>{
try {
  if(!token){
    return null;
  }
  const response=await axios.post(backend_url+'/api/order/verifyStripe',{success,orderId},{headers:{token}})
  if(response.data.success){
    console.log("good")
    setCartItems({})
    navigate('/orders')
  }else{
    console.log(response.data.message)
    navigate('/')
  }
} catch (error) {
   console.log(error);
   toast.error(error.message)
}
  }

  useEffect(()=>{
    verifyPayment()
  },[token])

  return (
    <div>verify</div>
  )
}

export default Verify
