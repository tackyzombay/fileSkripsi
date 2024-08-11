import React, { useEffect, useState } from 'react'
import './TransactionHistory.css'
import { backend_url } from "../../App";

const TransactionHistory = (props) => {
    const [transactionHistory, settransactionHistory] = useState("");
    const userLoggedIn = !!localStorage.getItem("auth-token");
    const showTransactionHistory = async () => {
        await fetch(`${backend_url}/showTransactionHistory`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': `${localStorage.getItem("auth-token")}`,
          },
        }).then((resp) => {
            const json = resp.json()
            console.log(json)
            return json;
        })
      }

      useEffect(()=>{
        showTransactionHistory()
      },[])

      return (
        <div className="transhistory">
          
        <div className="transhistory-box">
        {
          props.productList.map((history) => (
            <div className='transhistory-text'>
              <h4>{history.username}</h4>
              <p>{history.review}</p>
            </div>
          ))
        }
        </div>
        {/* 
          {
            userLoggedIn && (
            
            {
               props.productList.map(() => (
                 <div className='reviewbox-description-text'>
                   <h4>{singleReview.username}</h4>
                   <p>{singleReview.review}</p>
                 </div>
               ))
            }
            )
          } */}
        </div>
      )
}

export default TransactionHistory