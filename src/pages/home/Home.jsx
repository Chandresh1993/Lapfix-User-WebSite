const Home = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-6">
        <p className="text-3xl text-center font-bold text-blue-700 uppercase">
          Heading Page
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-md">
          <div className="flex items-center space-x-4">
            <p className="text-gray-700 font-medium">1.</p>
            <p className="text-gray-800 font-semibold">iPhone</p>
          </div>

          <div className="flex items-center space-x-4">
            <button className="text-blue-600 hover:underline font-medium">
              Edit
            </button>
            <button className="text-red-600 hover:underline font-medium">
              Delete
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-md">
          <div className="flex items-center space-x-4">
            <p className="text-gray-700 font-medium">1.</p>
            <p className="text-gray-800 font-semibold">iPhone</p>
          </div>

          <div className="flex items-center space-x-4">
            <button className="text-blue-600 hover:underline font-medium">
              Edit
            </button>
            <button className="text-red-600 hover:underline font-medium">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
