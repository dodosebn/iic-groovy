const BackgroundDecor = () => {
  return (
    <>
      <div className="fixed top-0 w-full h-full bg-[#54cbca] -z-10" />
      
      <div className="fixed top-32 w-full h-full inset-0 overflow-hidden -z-10">
        {/* Left side - reduced by 2 Tailwind units (8px each) */}
        <div className="absolute top-16 left-48 w-5 h-5 rounded-full bg-pink-300" /> {/* was left-52 */}
        <div className="absolute top-16 left-64 w-16 h-2 bg-gray-200 rotate-[40deg]" /> {/* was left-72 */}
        <div className="absolute top-52 left-48 w-5 h-5 rounded-full bg-pink-200" /> {/* was left-52 */}
        <div className="absolute top-72 left-64 w-16 h-3 bg-gray-300 rotate-45" /> {/* was left-72 */}
        <div className="absolute top-96 left-72 w-5 h-5 rounded-full bg-blue-200" /> {/* was left-80 */}
        <div className="absolute top-[24rem] left-48 w-5 h-5 rounded-full bg-orange-400" /> {/* was left-52 */}
        <div className="absolute top-[30rem] left-64 w-12 h-2 bg-pink-200 rotate-45" /> {/* was left-72 */}
        <div className="absolute top-[36rem] left-72 w-5 h-5 rounded-full bg-blue-100" /> {/* was left-80 */}
        <div className="absolute bottom-8 left-64 w-32 h-3 bg-orange-300 rotate-45" /> {/* was left-72 */}

        {/* Right side - matched to new left positions */}
        <div className="absolute top-16 right-48 w-5 h-5 rounded-full bg-pink-300" /> {/* symmetric to left-48 */}
        <div className="absolute top-16 right-64 w-16 h-2 bg-gray-200 rotate-[40deg]" /> {/* symmetric to left-64 */}
        <div className="absolute top-52 right-48 w-5 h-5 rounded-full bg-pink-200" /> {/* symmetric to left-48 */}
        <div className="absolute top-72 right-64 w-16 h-3 bg-gray-300 rotate-45" /> {/* symmetric to left-64 */}
        <div className="absolute top-96 right-72 w-5 h-5 rounded-full bg-blue-200" /> {/* symmetric to left-72 */}
        <div className="absolute top-[24rem] right-48 w-5 h-5 rounded-full bg-orange-400" /> {/* symmetric to left-48 */}
        <div className="absolute top-[30rem] right-64 w-12 h-2 bg-pink-200 rotate-45" /> {/* symmetric to left-64 */}
        <div className="absolute top-[36rem] right-72 w-5 h-5 rounded-full bg-blue-100" /> {/* symmetric to left-72 */}
        <div className="absolute bottom-8 right-64 w-32 h-3 bg-orange-300 rotate-45" /> {/* symmetric to left-64 */}
      </div>
    </>
  );
};

export default BackgroundDecor;