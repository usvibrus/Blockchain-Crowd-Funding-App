import React from 'react'
import { useState,useEffect } from 'react'
import { useStateContext} from "../context"
import { DisplayCampaigns } from '../components'

const Home = () => {


const[isLoading,setisLoading] = useState(false);
const[campaigns,setcampaigns] = useState([])


const {address,contract,getCampaigns} = useStateContext();


const fetchCampaigns = async ()=>{
  setisLoading(true)
  const data = await getCampaigns();
  setcampaigns(data);
  setisLoading(false);
}

useEffect(()=>{

  if(contract)fetchCampaigns();

  

},[address,contract,getCampaigns])

  return (
    <DisplayCampaigns
    title ="All Campaigns"
    isLoading = {isLoading}
    campaigns={campaigns}
    
    
    />
  )
}

export default Home
    