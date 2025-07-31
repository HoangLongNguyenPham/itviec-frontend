import { useEffect, useState } from "react";
import api from "../api";

function Home() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/jobs")
      .then((res) => {
        console.log("API Data:", res.data);
        setJobs(res.data.jobs || []); // ✅ đảm bảo luôn là mảng
      })
      .catch((err) => {
        console.error("API Error:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
       

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">Latest Jobs</h2>

        {loading ? (
          <p className="text-gray-600">Loading jobs...</p>
        ) : jobs.length === 0 ? (
          <p className="text-gray-600">No jobs available.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-bold text-red-600">{job.title}</h3>
                <p className="text-gray-700 font-medium">{job.jobTitle}</p>
                <p className="text-sm text-gray-500">
                  {job.address?.city || "Unknown City"} • {job.employmentType}
                </p>
                <p className="text-gray-600 mt-2">{job.description || "No description provided."}</p>
                <p className="mt-3 text-gray-800 font-semibold">
                  💰 {job.salaryMin || 0} - {job.salaryMax || 0} USD
                </p>
                <button className="mt-4 bg-red-600 text-white w-full py-2 rounded hover:bg-red-700">
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Home;
