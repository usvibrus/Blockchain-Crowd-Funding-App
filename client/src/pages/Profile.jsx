import React from 'react'
import { useState,useEffect } from 'react'
import { useStateContext} from "../context"
import { DisplayCampaigns } from '../components'
const Profile = () => {


const[isLoading,setisLoading] = useState(false);
const[campaigns,setcampaigns] = useState([])


const {address,contract,getusercampaigns} = useStateContext();


const fetchCampaigns = async ()=>{
  setisLoading(true)
  const data = await getusercampaigns();
  setcampaigns(data);
  setisLoading(false);
}

useEffect(()=>{

  if(contract)fetchCampaigns();

  

},[address,contract])

  return (
    <DisplayCampaigns
    title ="All Campaigns"
    isLoading = {isLoading}
    campaigns={campaigns}
    
    
    />
  )
}

export default Profile
    