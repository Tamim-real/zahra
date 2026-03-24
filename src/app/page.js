"use client";

import CustomerReview from "./Components/CustomerReview";
import Jersey from "./Components/Jersey";
import NewArrivalList from "./Components/NewArrivalList";
import Slider from "./Components/Slider";
import WinterCollection from "./Components/WinterCollection";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black mt-15">
      <Slider />

      {/* Container optimized for Mobile (Full Width) and Desktop (Centered) */}
      <main className="w-full px-4 md:w-10/12 lg:w-8/12 mx-auto space-y-12 py-8">
        
        {/* New Arrival Section */}
        <section>
          <h1 className="text-xl md:text-3xl font-bold text-center my-6 border bg-gray-200 dark:bg-zinc-800 py-3 rounded-xl tracking-tight">
            NEW ARRIVAL
          </h1>
          <NewArrivalList />
        </section>

        {/* Winter Collection */}
        <section>
          <h1 className="text-xl md:text-3xl font-bold text-center my-6 border bg-gray-200 dark:bg-zinc-800 py-3 rounded-xl tracking-tight">
            WINTER COLLECTION
          </h1>
          <WinterCollection />
        </section>

        {/* Jersey Section */}
        <section>
          <h1 className="text-xl md:text-3xl font-bold text-center my-6 border bg-gray-200 dark:bg-zinc-800 py-3 rounded-xl tracking-tight">
            JERSEY
          </h1>
          <Jersey />
        </section>

      </main>

      <section>
        <CustomerReview />
      </section>
    </div>
  );
}