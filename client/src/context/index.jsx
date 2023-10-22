import React, { useContext, createContext } from "react";

import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from "@thirdweb-dev/react"; //utility functions from thired web

import { constants, ethers, utils } from "ethers";

const StateContext = createContext();


export const StateContextProvider = ({ children }) => {
  const { contract } = useContract(
    "0xfA4Aa8147421ff668D4B525f8D35deF780eA9380"
  );



  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    "createCampaign"
  ); //this is finction use to call createCampaign function of contract and write to it;



  const address = useAddress(); // wallet adress use

  const connect = useMetamask(); // use to  connect wallet




  //creating function of campaign create and send in form data to createCampaign function of smartcontract
  
  const publishCampaign = async (form) =>{

    try {

      //NOTE : WE NEED TO SEND FORM DATA TO createCampaign Function in same order as in Contract
      
      const data = await createCampaign([
        address, //owner adress
        form.title,
        form.description,
        form.target,
        new Date(form.deadline).getTime(),
        form.image,
      ]);

      console.log("contract call sucess", data);
    } catch (error) {
      console.log("call failed", error);
    }
  };


  const getCampaigns = async( )=>{

const campaigns = await contract.call('getCampaigns')

//we need to parse the data of campaign to mak ein readeble so we can display in main component
const parsedCampaign = campaigns.map((campaign,i)=>({

owner : campaign.owner,
title:  campaign.title,
description  :campaign.description,
target:  ethers.utils.formatEther(campaign.target.toString()),
deadline: campaign.deadline.toNumber(),
amountCollected:  ethers.utils.formatEther(campaign.amountCollected.toString()),
image: campaign.image,
pId: i,



}))

return parsedCampaign;
      
  }




//thisfunction gets all campaigns first then filter according to wallet adress and shows the campaigns into profile section 
//which campaign created by which user

  const getusercampaigns = async ()=>{

    const allcampaigns = await getCampaigns();

    const filteredcampaigns = allcampaigns.filter((campaign)=>
    campaign.owner===address)

    return filteredcampaigns;

  }



  const Donate = async (pId, amount) => {
    const data = await contract.call('donateToCampaign', pId, { value: ethers.utils.parseEther(amount)});

    return data;
  }


   const getDonations = async (pId) => {
    const donations = await contract.call('getDonators', pId);
    const numberOfDonations = donations[0].length;

    const parsedDonations = [];

    for(let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString())
      })
    }

    return parsedDonations;
  }
 


  return (

    //retruning a contect provider ehich will provide context value to other componentd
    <StateContext.Provider
      value={{
        getDonations,
        Donate,
        getusercampaigns,
        getCampaigns,
        connect,
        address,
        contract,
        createCampaign: publishCampaign,
      }}
    >
      {children}
    </StateContext.Provider>


  );
};

export const useStateContext = () => useContext(StateContext);

//aftet this wrapping our main application inside statecontext provider i.e  main.jsx
