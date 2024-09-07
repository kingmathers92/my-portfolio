import React, { useEffect, useState } from "react";

const VisitorCounter = () => {
  const [visitorCount, setVisitorCount] = useState(0);

  useEffect(() => {
    setVisitorCount(1234);
  }, []);

  return (
    <div className="visitor-counter p-4 bg-[#f3f4f6] rounded-lg shadow-md">
      <p className="text-xl font-bold">Visitors So Far:</p>
      <p className="text-3xl font-semibold">{visitorCount}</p>
    </div>
  );
};

export default VisitorCounter;
