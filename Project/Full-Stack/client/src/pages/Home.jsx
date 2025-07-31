import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex flex-col items-center justify-center text-center bg-blue-50 px-4">
        <h2 className="text-4xl font-bold text-blue-700 mb-4">
          Welcome to JobPortal
        </h2>
        <p className="text-lg text-gray-700 max-w-xl">
          Find your dream job or post opportunities for others. Whether you're a
          job seeker or a job poster, our platform connects talent with
          opportunity.
        </p>
        <div className="mt-6">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition">
            Explore Jobs
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
