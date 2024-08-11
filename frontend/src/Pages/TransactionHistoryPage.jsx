import React, { useEffect, useState } from "react";
import "./CSS/ShopCategory.css";
import TransactionHistory from "../Components/TransactionHistory/TransactionHistory";
import { backend_url } from '../App';


const TransactionHistoryPage = () => {

  const [transHistory,settransHistory] = useState({});

  useEffect(()=>{
    const fetchproduct = async()=>{
      await fetch(`${backend_url}/showTransactionHistory`)
      .then((res)=>res.json()).then((data)=>settransHistory(data))
    }
    fetchproduct()
    
  },[])



    return (
        <div>
          <TransactionHistory productList={transHistory.productList}/>
          
        </div>
      )
}

export default TransactionHistoryPage
