// import React from 'react';
// import { Link } from 'react-router-dom';

// const HomePage = () => {
//   return (
//     <div className="min-h-screen flex gap-5 items-center justify-center bg-gray-100">
//       <img  class="w-[10cm] h-[6cm] rounded-xl" src='https://imgs.search.brave.com/2g3zWPBMG9PsUteUj5pPUugbY1x8rF5apWOqjUnPRRw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by90/b3Atdmlldy1kZWxp/Y2lvdXMtcHVtcGtp/bi1zb3VwLWJvd2xf/MTQwNzI1LTg1MjE4/LmpwZz9zZW10PWFp/c19oeWJyaWQ'/>

//       <div className="text-center bg-white p-8 rounded-xl shadow-2xl">
//         <h1 className="text-4xl font-bold mb-6 text-gray-800">Welcome to Recipe Book</h1>
//         <p className="text-xl mb-8 text-gray-600">
//           Discover and Create Delicious Recipes
//         </p>
//         <div className="space-x-4">
//           <Link 
//             to="/guest/recipes" 
//             className="bg-[#557e9b] text-black px-6 py-3 rounded-lg hover:bg-[#203e53] hover:text-white transition"
//           >
//             Browse Recipes
//           </Link>
//           {/* <Link 
//             to="/login" 
//             className="bg-[#444C38] text-white px-6 py-3 rounded-lg hover:bg-green-800 transition"
//           >
//             Host Login
//           </Link> */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomePage;


// import React from 'react';
// import { Link } from 'react-router-dom';

// const HomePage = () => {
//   return (
//     <div className="min-h-screen flex">
//       <div className="w-1/2 relative">
      
//         <img 
//           className="w-full h-full object-cover" 
//           src="https://t4.ftcdn.net/jpg/09/23/42/11/240_F_923421104_mYOB6gXTT34T12InuDi0wKNtVI3IpYyf.jpg" 
//           alt="Recipe Book" 
//         />
//         <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-white" />
//       </div>

//       <div className="w-1/2 flex flex-col justify-center items-center p-8 bg-white bg-opacity-80">
//         <h1 className="text-4xl font-bold mb-6 text-gray-800">Welcome to Recipe Book</h1>
//         <p className="text-xl mb-8 text-gray-600">
//           Discover and Create Delicious Recipes
//         </p>
//         <div className="space-x-4">
//           <Link 
//             to="/guest/recipes" 
//             className="bg-[#557e9b] text-black px-6 py-3 rounded-lg hover:bg-[#203e53] hover:text-white transition"
//           >
//             Browse Recipes
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomePage;
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen relative">
      <img 
        className="w-full h-full object-cover " 
        src="https://t4.ftcdn.net/jpg/09/23/42/11/240_F_923421104_mYOB6gXTT34T12InuDi0wKNtVI3IpYyf.jpg" 
        alt="Recipe Book" 
      />
      
      {/* <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-white" /> */}
      
      <div className="text-center bg-white p-8 rounded-xl shadow-2xl absolute inset-0 flex flex-col justify-center items-center bg-opacity-40">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">Welcome to Recipe Book</h1>
        <p className="text-xl mb-8 text-gray-700">
          Discover and Create Delicious Recipes
        </p>
        <div className="space-x-4">
          <Link 
            to="/guest/recipes" 
            className="bg-[#2f4f66] text-white px-6 py-3 rounded-lg hover:bg-[#203e53] hover:text-white transition"
          >
            Browse Recipes
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
