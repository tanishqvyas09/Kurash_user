// import React from 'react';
// import Image from 'next/image';
// import Link from 'next/link';

// const Landing = () => {
//   return (
//     <div className="min-h-screen w-screen bg-[linear-gradient(171deg,_#180E1F_37.26%,_#4B3E56_95.51%)] flex flex-col items-center px-4 py-6 md:py-10 lg:py-16">
      
//       {/* Background Container */}
//       <div className="relative w-full max-w-5xl h-[220px] sm:h-[280px] md:h-[320px] rounded-[20px] overflow-hidden flex justify-center items-center">
        
//         {/* Noise texture */}
//         <Image
//           src="/Noise_Texture.png"
//           alt="Noise Texture"
//           fill
//           className="object-cover z-10 opacity-60 mix-blend-overlay"
//         />

//         {/* White radial spotlight effect */}
//         <div className="absolute z-0 w-full h-full pointer-events-none">
//           <div className="w-full h-full bg-[radial-gradient(circle,_rgba(240,240,240,0.3)_0%,_rgba(240,240,240,0)_100%)]" />
//         </div>

//         {/* Foreground Logo */}
//         <div className="absolute inset-0 flex items-center justify-center z-20 px-2 sm:px-4">
//           <Image
//             src="/Logo.svg"
//             width={220}
//             height={339}
//             alt="Logo"
//             className="drop-shadow-lg w-[60%] sm:w-[45%] md:w-[260px]"
//           />
//         </div>
//       </div>

//       {/* Text Section */}
//       <div className="flex flex-col mt-8 text-center md:text-left text-white text-[24px] sm:text-[28px] md:text-[32px] lg:text-[35px] font-medium leading-tight tracking-tight font-bricolage">
//         <div>Welcome to</div>
//         <div className="bg-gradient-to-b from-[#140320] via-[#6E6476] to-white bg-clip-text text-transparent">
//           The Indian
//         </div>
//         <div>Kurash Association</div>
//         </div>

//         {/* Button */}
//         <div className="mt-6 ml-0 flex justify-center md:justify-start">
//           <Link href="/sign-in">
//             <Image
//               src="/button.png"
//               alt="button"
//               width={280}
//               height={60}
//               className="transition-transform duration-300 ease-in-out hover:scale-110 cursor-pointer w-[70%] sm:w-[60%] md:w-[318px]"
//             />
//           </Link>
//         </div>
//     </div>
//   );
// };

// export default Landing;


//Version 2


import React from 'react';
import Image from 'next/image';
import Link from 'next/link';



const Registration_Success = () => {
  return (
    <div className="min-h-screen w-screen flex flex-col items-center  px-4 py-10 bg-[linear-gradient(171deg,_#180E1F_37.26%,_#4B3E56_95.51%)]">
      
      {/* Logo with glow */}
      <div className="relative w-[180px] h-[180px] md:w-[280px] md:h-[280px] mb-6 mt-[50px]">
        <Image
          src="/Logo.svg"
          alt="Logo"
          fill
          className="object-contain drop-shadow-xl"
        />
      </div>

      {/* Text */}
      <div className=" md:ml-20  sm:ml-0 sm:mr-15 font-bricolage mt-20 md:text-center ">
        <b> 
            <h1 className="text-3xl sm:text-4xl md:text-5xl text-white font-medium leading-tight">Registration Successful!</h1>
        </b> 
      </div>

      {/* Button */}
      <div className="mt-15 sm:mt-15  w-full max-w-xs ">
        <Link href="/homepage">
          <button className="w-full py-3 rounded-xl bg-white bg-opacity-10 text-black font-medium text-base shadow-lg backdrop-blur-sm transition-transform hover:scale-105">
            Login
          </button>
        </Link>
     
      </div>
    </div>
  );
};

export default Registration_Success;
