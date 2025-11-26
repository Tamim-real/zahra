
import CustomerReview from "./Components/CustomerReview";
import Jersey from "./Components/Jersey";
import NewArrival from "./Components/NewArrival";
import NewArrivalList from "./Components/NewArrivalList";
import Slider from "./Components/Slider";
import WinterCollection from "./Components/WinterCollection";


export default function Home() {
  return (
    <div className=" min-h-screen  bg-zinc-50 font-sans dark:bg-black mt-15">
      <Slider></Slider>
      <div className="w-8/12 mx-auto">
        <h1 className="text-3xl  font-bold text-center my-3 border bg-gray-200 py-2 pl-2 rounded-xl ">NEW ARRIVAL</h1>
        <NewArrivalList></NewArrivalList>
      </div>
      <section className="w-8/12 mx-auto">
      <h1 className="text-3xl  font-bold text-center my-3 border bg-gray-200 py-2 pl-2 rounded-xl ">Winter Collection</h1>
        <WinterCollection></WinterCollection>
      </section>
      <section className="w-8/12 mx-auto">
      <h1 className="text-3xl  font-bold text-center my-3 border bg-gray-200 py-2 pl-2 rounded-xl ">Jersey</h1>
        <Jersey></Jersey>
      </section>
      <section>
        <CustomerReview></CustomerReview>
      </section>
    </div>
  );
}
