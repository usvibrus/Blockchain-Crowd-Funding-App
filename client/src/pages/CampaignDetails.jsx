import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ethers } from "ethers";

import { useStateContext } from "../context";
import { CustomButton, CountBox, Loader } from "../components";
import { calculateBarPercentage, daysLeft } from "../utils";
import { thirdweb } from "../assets";

const CampaignDetails = () => {
  //we can transfer state of components using react router
  //this state is passing into displaycampaign component
  const { state } = useLocation(); //destructure state  // this state cantaion entire campaign details

  const { getDonations, Donate, contract, address } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [donators, setDonators] = useState([]);

  const remainingDays = daysLeft(state.deadline);





  const fetchDonators = async () => {
    const data = await getDonations(state.pId);

    setDonators(data);
  };



  useEffect(() => {
    if (contract) fetchDonators();
  }, [contract, address]);



  const handleDonate = async () => {
    setIsLoading(true);

    await Donate(state.pId,amount);

    setIsLoading(false);
  };



  return (
    <div>
      {isLoading && (<Loader/>)}

      <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px] ">
        <div className="flex-1 flex-col">
          <img
            src={state.image}
            alt="campaign"
            className="w-full h-[410px] object-cover rounded-xl"
          />

          <div className="reletive w-full h-[5px] bg-[#3a3a42] mt-2">
            {
              //the progress bar showing how much campaign fuded
            }

            <div
              className="absolute h-[4px] bg-[#4acd8d]"
              style={{
                width: `${calculateBarPercentage(
                  state.target,
                  state.amountCollected
                )}%`,
                maxWidth: "100%",
              }}
            ></div>
          </div>
        </div>

        <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
          <CountBox title="Days Left" value={remainingDays} />
          <CountBox
            title={`Raised of ${state.target}`}
            value={state.amountCollected}
          />
          <CountBox title="Total Donators" value={donators.length} />
        </div>
      </div>

      <div className="mt-[60px] flex lg:flex-row flex-col gap-5 ">
        <div className="flex-[2] flex flex-col gap-[40px]">
          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white  uppercase">
              Creator
            </h4>

            <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px] ">
              <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                <img
                  src={thirdweb}
                  alt="user"
                  className="w-[60%] h-[60%] object-contain"
                />
              </div>
              <div>
                <h4 className=" font-epilogue font-semibold text-[14px] text-white break-all">
                  {state.owner}
                </h4>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
              Story
            </h4>

            <div className="mt-20px">
              <p className="mt-[4px] font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                {state.description}
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
              Donators
            </h4>

            <div className="mt-[20px] flex flex-col gap-4">
              {donators.length > 0 ? (
                donators.map((item, index) => <div> Donators</div>)
              ) : (
                <p className="mt-[4px] font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                  No Donators be First Donator
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1 ">
          <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
            FUND
          </h4>

          <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px] ">
            <p className="font-epilogue font-meduim text-[20px] leading-[30px] text-center text-[#808191]">
              Fund a Campaign
            </p>

            <div className="mt-[30px] ">
              <input
                type="number"
                placeholder="0.1 ETH"
                step="0.01"
                className="w-full py-[10px] sm:px-[20px] px-[10px] rounded-[10px] bg-[#2c2f32] text-[#808191] font-epilogue font-medium text-[16px] outline-none "
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <div className="my-[20px]  p-4 bg-[#13130a] rounded-[10px]  ">
                <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white">
                  Help Us to Achieve the Target
                </h4>
                <p className="mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191]">
                  Support the project for no reward, and Help To benefit Maximum
                  Peoples
                </p>
              </div>

              <CustomButton
                btnType="button"
                title="Donate"
                styles="w-full bg-[#8c6dfd]"
                handleClick={handleDonate}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
