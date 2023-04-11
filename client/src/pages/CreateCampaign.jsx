import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { ethers } from "ethers"; //a utilty lib to interact with smart contract
import { money } from "../assets";

import { CustomButton, FormField,Loader } from "../components";
import { checkIfImage } from "../utils";//cheaks if img is valid
import { useStateContext} from "../context"

const CreateCampaign = () => {
  const [isLoading, setisLoading] = useState(false);
  const {createCampaign} = useStateContext();
  const [form, setform] = useState({ 
    name: '',
    title: '',
    description: '',
    target: '', 
    deadline: '',
    image: ''
  });

  const navigate = useNavigate();



  const handleFormFieldChange =(fieldname,e)=>{
    
     setform({...form ,[fieldname]: e.target.value}) // onchage event on input

  }





  const handleSubmit = async (e) => {

    e.preventDefault(); 


    checkIfImage(form.image,async (exist)=>{
      if(exist){

          setisLoading(true)
          await createCampaign({
            ...form,
            target:ethers.utils.parseUnits(form.target,18)
          }
          ); 
  
          setisLoading(false);
          navigate('/');


      }else{
        alert('Image not Valid')
        setform({...form,image:''})
      }

    })
   
  }






  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && <Loader />}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
          Start a Campaign
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full mt-[65px] flex flex-col gap-[30px]"
      >
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            LabelName="Your Name-"
            placeholder="Name"
            inputType="text"
            value={form.name}
            handleChange={(e)=>handleFormFieldChange('name',e)}
          />

          <FormField

            LabelName="Campaign Title-"
            placeholder="Title"
            inputType="text"
            value={form.title}
            handleChange={(e)=>handleFormFieldChange('title',e)}
          
          />
        </div>

        <FormField
          LabelName="Story-"
          placeholder="Write a story"
          isTextArea
          value={form.description}
          handleChange={(e)=>handleFormFieldChange('description',e)}
        />

        <div className="  w-full flex  bg-[#cf57e4] justify-center items-center rounded-[10px] p-4 h-[120px]">
          <img src={money} className="w-[40px] h-[40px] object-contain " />

          <h4 className="font-epilogue font-bold text-[25px] text-white ">
            100% amount raised will be awarded
          </h4>
        </div>

        <div className="flex flex-wrap gap-[40px]">
          <FormField
            LabelName="Target-"
            placeholder="ETH "
            inputType="text"
            value={form.target}
            handleChange={(e)=>handleFormFieldChange('target',e)}
          />

          <FormField
            LabelName="END DATE-"
            placeholder="End Date"
            inputType="date"
            value={form.deadline}
            handleChange={(e)=>handleFormFieldChange('deadline',e)}
          />

        </div>

         <FormField
            LabelName="Campaign image"
            placeholder="Enter your image url"
            inputType="url"
            value={form.image}
            handleChange={(e)=>handleFormFieldChange('image',e)}
          />

           <div className="flex justify-center items-center mt-[40px]">

            <CustomButton
              
            btnType="submit"
            title="Create Campaign"
            styles="bg-[#cf57e4]"

            />
           </div>

      </form>
    </div>
  );
};

export default CreateCampaign;
