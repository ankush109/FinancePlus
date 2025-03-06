import { LoaderCircle } from "lucide-react";
import React from "react";

const LoaderComponent = () => {
  return (
    <div className="flex justify-center items-center">
      <LoaderCircle className="animate-spin" size={40} />
    </div>
  );
};

export default LoaderComponent;
