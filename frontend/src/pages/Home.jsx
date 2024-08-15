import { Google } from "../components/Google";

export const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-6xl mx-auto">
        <div className="flex flex-col justify-center p-6">
          <div className="text-6xl font-bold text-gray-800 py-5">Evently</div>
          <div className="text-2xl font-medium text-gray-600">
            Effortless Meeting Scheduling
          </div>
          <div className="text-xl text-gray-500 py-4">
            Streamline your meetings with automatic scheduling, Google Calendar
            integration, and instant invites.
          </div>
          <Google />
        </div>
        <div className="hidden md:block">
          <img
            src="https://via.placeholder.com/500"
            alt="Background Image"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};
