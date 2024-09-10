import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaUsers } from "react-icons/fa";

const VisitorCount = () => {
  const [visitorCount, setVisitorCount] = useState(0);

  useEffect(() => {
    fetch("https://khaledbenyahya.com")
      .then((response) => response.json())
      .then((data) => setVisitorCount(data.count))
      .catch((error) => console.error("Error fetching visitor count:", error));
  }, []);

  return (
    <motion.div
      className="mt-4 text-lg text-gray-600 flex flex-col items-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <FaUsers className="text-6xl text-blue-600 mb-2" />
      <p className="font-semibold">
        You're among{" "}
        <span className="text-blue-600 text-3xl">{visitorCount}</span> amazing
        people
      </p>
      <p className="text-gray-500">who have visited my site!</p>
    </motion.div>
  );
};

export default VisitorCount;
