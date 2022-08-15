import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../api/axios'

const PURCHASE_URL = "./users/purchase"

const TokenPurchase = ({id}) => {
  const [tokens, setTokens] = useState('')
  const [vtokens, setVtokens] = useState('')
  const [price,setPrice] = useState('')
  const [form,setForm] = useState('')
  const navigate = useNavigate()

  const tokensPrice = (e) =>{
    let amount = e.target.value 
    if(amount === '') amount = 0
    if(vtokens ==='') setVtokens(0)
    if(amount>=0){
      setTokens(amount)
      let cost = 1*parseInt(amount) + 0.5 * parseInt(vtokens)
      setPrice(cost.toString() + "€")
    }
  }
  const vtokensPrice = (e) =>{
    let amount = e.target.value
    if(amount === '') amount = 0
    if(tokens === '') setTokens(0)
    if(amount>=0){
      setVtokens(amount)
      let cost = 1*parseInt(tokens) + 0.5 * parseInt(amount)
      setPrice(cost.toString() + "€")
    } 
  }

  const handlePurchase = async(e) =>{
    e.preventDefault()
    navigate("/")
    try {
      await axios.post(PURCHASE_URL,{tokens:tokens,vtokens:vtokens,id:id},
        {headers: {"Content-Type": "application/json"}, withCredentials:true })
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(()=>{
    setForm(
      <form onSubmit={handlePurchase}>
        <input type="text" id="tokens" className="fadeIn second"
        name="tokens" placeholder="tokens" required onChange={tokensPrice} value={tokens}/>
        <input type="text" id="vtokens" className="fadeIn third"
        name="tokens" placeholder="virtual tokens" required onChange={vtokensPrice} value={vtokens}/>
        <input type="text" id="price" className='fadeIn fourth' name='price' placeholder='price'
         readOnly required value={price}/>
        <input type="submit" className="fadeIn fourth" value="Purchase"/>
      </form>)
  },[tokens,vtokens,price])

  return (
    <div className="wrapper fadeInDown">
      <div id="formContent">
        <h2 className='active'> Token store </h2>
        <div className="fadeIn first">
          <h2 style={{color:"black"}}>Please enter an amount!</h2>
          <h2 style={{color:"red", width:"300px", marginTop:"10px"}}></h2>
        </div>
        {form}
      </div>
    </div>
  )
}

export default TokenPurchase