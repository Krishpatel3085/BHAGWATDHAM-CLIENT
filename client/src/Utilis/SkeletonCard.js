export const SkeletonCard = () => {
    return (
      <div className="animate-pulse">
        <div className="w-full h-64 bg-gray-300 rounded-lg mb-4"></div>
        <div className="h-4 w-2/3 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 w-1/3 bg-gray-300 rounded"></div>
      </div>
    );
  };