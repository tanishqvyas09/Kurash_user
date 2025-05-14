"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabaseClient";
import { useUser } from "@clerk/nextjs";

const Form_Page = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    birth_date: "",
    gender: "",
    weight: "",
    registered_association: "",
    email: "",
    phone: "",
    passport_number: "",
    state: "",
    aadhar_number: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenderSelect = (gender) => {
    setFormData((prev) => ({ ...prev, gender }));
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);
  const { user } = useUser();
  const clerkUserId = user?.id;

  const handleRegister = async () => {

    const requiredFields = [
        'first_name',
        'last_name',
        "birth_date",
        'registered_association',
        'gender',
        'weight',
        'email',
        'phone',
        'state',
        'aadhar_number'
      ];
    
    const missingFields = requiredFields.filter(field => !formData[field]);

    if (missingFields.length > 0) {
        alert(`Please fill the following fields: ${missingFields.join(', ')}`);
        return;
    }

    const formDataWithUserId = {
        ...formData,
        user_id: clerkUserId, 
      };

    const { data, error } = await supabase.from("players").insert([formDataWithUserId]);

    if (error) {
      console.error(error);
      alert("Something went wrong.");
    } else {
      alert("Player registered!");
      router.push("/register_success");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col px-4">
      <div className="mt-6 relative w-[80px] h-[80px] md:w-[50px] md:h-[50px]">
        <Image
          src="/Logo.svg"
          alt="Logo"
          fill
          className="object-contain drop-shadow-xl"
        />
      </div>
      <div className="flex flex-col items-center justify-center w-[317px] h-[89px] mt-70 text-[#340F1E] text-[25px]  tracking-[-0.32px] font-bricolage font-semibold">
        {step === 1 && (
          <>
            <span>Every legend has a name.</span>
            <span>Let's start with yours.</span>
            <div className="mt-4 ml-3 flex-grow p-[20px]  justify-center w-full  rounded-[20px] bg-[linear-gradient(168deg,_#180E1F_4.43%,_#4B3E56_101.95%)]">
              <span className="text-white font-normal text-[23px]">
                First Name
              </span>
              <input
                name="first_name"
                onChange={handleChange}
                value={formData.first_name}
                placeholder="Enter your first name"
                className="text-white mb-5 mt-2 w-full h-[49px] p-2 rounded-[10px] border border-[rgba(100,97,107,0.5)] bg-[radial-gradient(176.17%_50%_at_100%_-80%,rgba(175,106,140,0.46)_0%,rgba(98,65,83,0.38)_39%,rgba(0,0,0,0)_55%),radial-gradient(202.57%_57.49%_at_50%_100%,#2A1F33_0%,rgba(42,25,41,0.39)_100%),rgba(13,10,25,0.5)] placeholder:text-[14px]"
                required
              />
              <span className="text-white font-normal text-[23px]">
                Last Name
              </span>
              <input
                name="last_name"
                onChange={handleChange}
                value={formData.last_name}
                placeholder="Enter your last name"
                className="text-white mb-5 mt-2 w-full h-[49px] p-2 rounded-[10px] border border-[rgba(100,97,107,0.5)] bg-[radial-gradient(176.17%_50%_at_100%_-80%,rgba(175,106,140,0.46)_0%,rgba(98,65,83,0.38)_39%,rgba(0,0,0,0)_55%),radial-gradient(202.57%_57.49%_at_50%_100%,#2A1F33_0%,rgba(42,25,41,0.39)_100%),rgba(13,10,25,0.5)] placeholder:text-[14px]"
                required
              />
              <span className="text-white font-normal text-[23px]">
                Birth Date
              </span>
              <input
                type="date"
                name="birth_date"
                value={formData.birth_date}
                onChange={handleChange}
                className="text-white mb-5 w-full h-[49px] p-2 rounded-[10px] border border-[rgba(100,97,107,0.5)] bg-[radial-gradient(176.17%_50%_at_100%_-80%,rgba(175,106,140,0.46)_0%,rgba(98,65,83,0.38)_39%,rgba(0,0,0,0)_55%),radial-gradient(202.57%_57.49%_at_50%_100%,#2A1F33_0%,rgba(42,25,41,0.39)_100%),rgba(13,10,25,0.5)] text-[14px]"
                required
              />
              <div className="flex justify-center">
                <button
                  onClick={nextStep}
                  className="w-[200px] h-[50px] mt-15 mb-3 rounded-xl bg-white bg-opacity-10 text-black font-medium text-base shadow-lg backdrop-blur-sm transition-transform hover:scale-105 text-[19px]"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <span>Game is universal.</span>
            <span>Let’s get the details right.</span>
            <div className="mt-4 ml-3 flex-grow p-[20px]  justify-center w-full  rounded-[20px] bg-[linear-gradient(168deg,_#180E1F_4.43%,_#4B3E56_101.95%)]">
              <span className="text-white font-normal text-[23px] ">
                Gender
              </span>
              <div className="flex gap-4 mt-2 mb-5 text-[14px]">
                {["Male", "Female"].map((gender) => (
                  <button
                    key={gender}
                    type="button"
                    onClick={() => handleGenderSelect(gender)}
                    className={`px-6 py-1 h-[49px] w-[142px] rounded-lg border transition-all duration-200 ${
                      formData.gender === gender
                        ? "bg-purple-600 text-white border-purple-600"
                        : "bg-transparent text-white border-gray-400 hover:border-purple-400"
                    }`}
                  >
                    {gender}
                  </button>
                ))}
              </div>
              <span className="text-white font-normal text-[23px]">
                Weight (in Kgs)
              </span>
              <input
                name="weight"
                onChange={handleChange}
                value={formData.weight}
                placeholder="Enter your last name"
                className="text-white mb-5 mt-2 w-full h-[49px] p-2 rounded-[10px] border border-[rgba(100,97,107,0.5)] bg-[radial-gradient(176.17%_50%_at_100%_-80%,rgba(175,106,140,0.46)_0%,rgba(98,65,83,0.38)_39%,rgba(0,0,0,0)_55%),radial-gradient(202.57%_57.49%_at_50%_100%,#2A1F33_0%,rgba(42,25,41,0.39)_100%),rgba(13,10,25,0.5)] placeholder:text-[14px]"
                required
              />
              <span className="text-white font-normal text-[23px]">
                Registered Association
              </span>
              <select
                name="registered_association"
                onChange={handleChange}
                value={formData.registered_association}
                className="text-white mb-5 mt-2 w-full h-[49px] p-2 rounded-[10px] border border-[rgba(100,97,107,0.5)] bg-[radial-gradient(176.17%_50%_at_100%_-80%,rgba(175,106,140,0.46)_0%,rgba(98,65,83,0.38)_39%,rgba(0,0,0,0)_55%),radial-gradient(202.57%_57.49%_at_50%_100%,#2A1F33_0%,rgba(42,25,41,0.39)_100%),rgba(13,10,25,0.5)] text-[14px]"
              >
                <option value="">Select your Registered Association</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Indore">Indore</option>
              </select>
              <div className="flex gap-4 ">
                <button
                  onClick={prevStep}
                  className="w-[200px] h-[50px] mt-15 mb-3 rounded-xl bg-white bg-opacity-10 text-black font-medium text-base shadow-lg backdrop-blur-sm transition-transform hover:scale-105 text-[19px]"
                >
                  Back
                </button>
                <button
                  onClick={nextStep}
                  className="w-[200px] h-[50px] mt-15 mb-3 rounded-xl bg-white bg-opacity-10 text-black font-medium text-base shadow-lg backdrop-blur-sm transition-transform hover:scale-105 text-[19px]"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <span>Let’s make sure you never</span>
            <span>miss a moment.</span>
            <div className="mt-4 ml-3 flex-grow p-[20px]  justify-center w-full  rounded-[20px] bg-[linear-gradient(168deg,_#180E1F_4.43%,_#4B3E56_101.95%)]">
              <span className="text-white font-normal text-[23px]">
                Email Id
              </span>
              <input
                name="email"
                onChange={handleChange}
                value={formData.email}
                placeholder="Enter your Email Id"
                className="text-white mb-5 mt-2 w-full h-[49px] p-2 text-[20px] rounded-[10px] border border-[rgba(100,97,107,0.5)] bg-[radial-gradient(176.17%_50%_at_100%_-80%,rgba(175,106,140,0.46)_0%,rgba(98,65,83,0.38)_39%,rgba(0,0,0,0)_55%),radial-gradient(202.57%_57.49%_at_50%_100%,#2A1F33_0%,rgba(42,25,41,0.39)_100%),rgba(13,10,25,0.5)] placeholder:text-[14px]"
                required
              />
              <span className="text-white font-normal text-[23px]">
                Phone Number
              </span>
              <input
                name="phone"
                onChange={handleChange}
                value={formData.phone}
                placeholder="Enter your Phone Number"
                className="text-white mb-5 mt-2 w-full h-[49px] p-2 rounded-[10px] border border-[rgba(100,97,107,0.5)] bg-[radial-gradient(176.17%_50%_at_100%_-80%,rgba(175,106,140,0.46)_0%,rgba(98,65,83,0.38)_39%,rgba(0,0,0,0)_55%),radial-gradient(202.57%_57.49%_at_50%_100%,#2A1F33_0%,rgba(42,25,41,0.39)_100%),rgba(13,10,25,0.5)] placeholder:text-[14px]"
                required
              />
              <div className="flex gap-4 ">
                <button
                  onClick={prevStep}
                  className="w-[200px] h-[50px] mt-15 mb-3 rounded-xl bg-white bg-opacity-10 text-black font-medium text-base shadow-lg backdrop-blur-sm transition-transform hover:scale-105 text-[19px]"
                >
                  Back
                </button>
                <button
                  onClick={nextStep}
                  className="w-[200px] h-[50px] mt-15 mb-3 rounded-xl bg-white bg-opacity-10 text-black font-medium text-base shadow-lg backdrop-blur-sm transition-transform hover:scale-105 text-[19px]"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <span>Greatness starts local.</span>
            <span> We just need your base.</span>
            <div className="mt-4 ml-3 flex-grow p-[20px]  justify-center w-full  rounded-[20px] bg-[linear-gradient(168deg,_#180E1F_4.43%,_#4B3E56_101.95%)]">
              <span className="text-white font-normal text-[23px]">State</span>
              <input
                name="state"
                onChange={handleChange}
                value={formData.state}
                placeholder="Enter your State"
                className="text-white mb-5 mt-2 w-full h-[49px] p-2 rounded-[10px] border border-[rgba(100,97,107,0.5)] bg-[radial-gradient(176.17%_50%_at_100%_-80%,rgba(175,106,140,0.46)_0%,rgba(98,65,83,0.38)_39%,rgba(0,0,0,0)_55%),radial-gradient(202.57%_57.49%_at_50%_100%,#2A1F33_0%,rgba(42,25,41,0.39)_100%),rgba(13,10,25,0.5)] placeholder:text-[14px]"
                required
              />
              <span className="text-white font-normal text-[23px]">
                Aadhar Card Number
              </span>
              <input
                name="aadhar_number"
                onChange={handleChange}
                value={formData.aadhar_number}
                placeholder="Enter your 12 Digit Aadhar Card Number"
                className="text-white mb-5 mt-2 w-full h-[49px] p-2 rounded-[10px] border border-[rgba(100,97,107,0.5)] bg-[radial-gradient(176.17%_50%_at_100%_-80%,rgba(175,106,140,0.46)_0%,rgba(98,65,83,0.38)_39%,rgba(0,0,0,0)_55%),radial-gradient(202.57%_57.49%_at_50%_100%,#2A1F33_0%,rgba(42,25,41,0.39)_100%),rgba(13,10,25,0.5)] placeholder:text-[14px]"
                required
              />
              <span className="text-white font-normal text-[20px]">
                Passport Number (Optional)
              </span>
              <input
                name="passport_number"
                onChange={handleChange}
                value={formData.passport_number}
                placeholder="Enter your Passport Number"
                className="text-white mb-5 mt-2 w-full h-[49px] p-2 rounded-[10px] border border-[rgba(100,97,107,0.5)] bg-[radial-gradient(176.17%_50%_at_100%_-80%,rgba(175,106,140,0.46)_0%,rgba(98,65,83,0.38)_39%,rgba(0,0,0,0)_55%),radial-gradient(202.57%_57.49%_at_50%_100%,#2A1F33_0%,rgba(42,25,41,0.39)_100%),rgba(13,10,25,0.5)] placeholder:text-[14px]"
              />
              <div className="flex gap-4 ">
                <button
                  onClick={prevStep}
                  className="w-[200px] h-[50px] mt-15 mb-3 rounded-xl bg-white bg-opacity-10 text-black font-medium text-base shadow-lg backdrop-blur-sm transition-transform hover:scale-105 text-[19px]"
                >
                  Back
                </button>
                <button
                  onClick={handleRegister}
                  className="w-[200px] h-[50px] mt-15 mb-3 rounded-xl bg-white bg-opacity-10 text-black font-medium text-base shadow-lg backdrop-blur-sm transition-transform hover:scale-105 text-[19px]"
                >
                  Register
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Form_Page;
