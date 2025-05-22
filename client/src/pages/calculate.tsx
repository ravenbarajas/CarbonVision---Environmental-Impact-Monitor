import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TransportForm from "@/components/carbon-calculator/transport-form";
import EnergyForm from "@/components/carbon-calculator/energy-form";
import DietForm from "@/components/carbon-calculator/diet-form";
import ShoppingForm from "@/components/carbon-calculator/shopping-form";

const Calculate = () => {
  const [activeTab, setActiveTab] = useState("transport");

  return (
    <section className="mb-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">Calculate Your Impact</h2>
        <p className="text-neutral-600 dark:text-neutral-400">Input your activities to see your environmental impact</p>
      </div>
      
      {/* Activity Input Form */}
      <div className="bg-white dark:bg-card rounded-lg shadow-sm p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6 grid grid-cols-4 border-b rounded-none border-neutral-200 dark:border-neutral-700 p-0 h-auto space-x-0 dark:bg-transparent">
            <TabsTrigger 
              value="transport" 
              className="py-4 px-1 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none data-[state=inactive]:text-neutral-600 dark:data-[state=inactive]:text-neutral-400 data-[state=inactive]:hover:text-neutral-800 data-[state=inactive]:bg-transparent dark:data-[state=inactive]:hover:text-neutral-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-1 h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                <path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                <path d="M5 17h-2v-6l2 -5h9l4 5h1a2 2 0 0 1 2 2v4h-2m-4 0h-6" />
                <path d="M6 9h11" />
              </svg>
              Transport
            </TabsTrigger>
            <TabsTrigger 
              value="energy" 
              className="py-4 px-1 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none data-[state=inactive]:text-neutral-600 dark:data-[state=inactive]:text-neutral-400 data-[state=inactive]:hover:text-neutral-800 data-[state=inactive]:bg-transparent dark:data-[state=inactive]:hover:text-neutral-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-1 h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M13 3l-2 13l-2 -3l-7 6l1 -4l6 -4l-3 -4z" />
                <path d="M11 16l-2 3l3 2l5 -6l-3 -4l-2 6" />
              </svg>
              Energy
            </TabsTrigger>
            <TabsTrigger 
              value="diet" 
              className="py-4 px-1 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none data-[state=inactive]:text-neutral-600 dark:data-[state=inactive]:text-neutral-400 data-[state=inactive]:hover:text-neutral-800 data-[state=inactive]:bg-transparent dark:data-[state=inactive]:hover:text-neutral-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-1 h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 11v3a5 5 0 0 0 5 5h10a5 5 0 0 0 5 -5v-12h-5" />
                <path d="M12 6a2 2 0 0 1 -2 -2c0 -1.1 .9 -2 2 -2z" />
                <path d="M19 6a2 2 0 0 1 -2 -2c0 -1.1 .9 -2 2 -2z" />
                <path d="M8 4h8" />
              </svg>
              Diet
            </TabsTrigger>
            <TabsTrigger 
              value="shopping" 
              className="py-4 px-1 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none data-[state=inactive]:text-neutral-600 dark:data-[state=inactive]:text-neutral-400 data-[state=inactive]:hover:text-neutral-800 data-[state=inactive]:bg-transparent dark:data-[state=inactive]:hover:text-neutral-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-1 h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 9h11a6 6 0 0 1 3.709 10.756l-.2 .224a4 4 0 0 1 -2.909 1.02h-11.6a4 4 0 0 1 -2.905 -1.02l-.2 -.224a6 6 0 0 1 2.905 -10.756" />
                <path d="M12 4v5" />
              </svg>
              Shopping
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="transport">
            <TransportForm />
          </TabsContent>
          
          <TabsContent value="energy">
            <EnergyForm />
          </TabsContent>
          
          <TabsContent value="diet">
            <DietForm />
          </TabsContent>
          
          <TabsContent value="shopping">
            <ShoppingForm />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Calculate;
