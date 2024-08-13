import React, { useEffect, useState } from 'react'
import './TransactionHistory.css'
import { backend_url } from "../../App";

const TransactionHistory = (props) => {
    const [transactionHistory, settransactionHistory] = useState([]);
    const userLoggedIn = !!localStorage.getItem("auth-token");
    const showTransactionHistory = async () => {
        await fetch(`${backend_url}/showTransactionHistory`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': `${localStorage.getItem("auth-token")}`,
          },
        }).then(async(resp) => {
           
            const json = await resp.json()
            settransactionHistory(json)
            console.log(json)
        })
      }

      useEffect(()=>{
        showTransactionHistory()
        
      },[])

      return (
        <div className="transhistory">
          
          {
            transactionHistory.map((transHistory) =>{
              const productListElement = transHistory.productList.map((prodList) =>{
                return(
                  <>
                    <h4>{prodList.name}</h4>
                    <h4>{prodList.new_price}</h4>
                  </>
                )
              })
              return(
                <>
                <h4>{transHistory.totalPrice}</h4>
                {productListElement}
                </>
              )
              
              
            } )

          }

          {/* <h4>{JSON.stringify(transactionHistory)}</h4> */}
        <div className="transhistory-box">
        {
          // props.productList.map((history) => (
          //   <div className='transhistory-text'>
          //     <h4>{transactionHistory.username}</h4>
          //     <p>{transactionHistory.review}</p>
          //   </div>
          // ))
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