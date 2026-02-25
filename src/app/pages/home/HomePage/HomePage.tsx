import { useHealthCheckQuery } from "@/lib/apis/queries";

const HomePage = () => {
  const { data } = useHealthCheckQuery();

  console.log(data);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <h1 className="text-3xl font-bold text-primary">Hello, React!</h1>
    </div>
  );
};

export default HomePage;
