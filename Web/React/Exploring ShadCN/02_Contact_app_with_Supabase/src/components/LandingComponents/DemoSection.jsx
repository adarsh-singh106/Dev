import React from 'react';
import { Search, Plus } from 'lucide-react';
import { Input } from "@/components/ui/input";

const DemoSection = () => {
  return (
    <>
      {/* Search Bar Section */}
      {/* Centered container */}
      <div className="p-4 border-b flex justify-center">

        {/* Width controller */}
        <div className="flex items-center gap-3 w-full md:w-[400px]">

          <div className="relative grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 z-10" />
            <Input
              type="text"
              placeholder="Search..."
              className="pl-10 border-2 border-gray-800 focus-visible:ring-0"
              readOnly
            />
          </div>

          <button className="p-1 border-2 border-gray-800 rounded hover:bg-gray-100 transition shrink-0">
            <Plus className="h-6 w-6 text-gray-800" />
          </button>

        </div>
      </div>
    </>
  );
};

export default DemoSection;
