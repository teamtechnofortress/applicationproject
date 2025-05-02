const LoadingSpinner = () => {
    return (
      <div className="flex justify-center items-center h-screen">
      <div 
        className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"
        style={{
          borderTopColor: '#e7fc41',
          animationDuration: '0.5s'  
        }}
      ></div>
    </div>
    );
  };
  
  export default LoadingSpinner;