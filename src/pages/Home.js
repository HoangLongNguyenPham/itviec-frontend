import { useEffect, useState } from "react";
import api from "../api";
import JobCard from "../components/JobCard";

function Home() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get("/jobs");
        setJobs(res.data.jobs || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="container my-5">
      <h2 className="fw-bold mb-4 text-primary-custom">Latest Jobs</h2>
      {loading ? (
        <p>Loading jobs...</p>
      ) : (
        <div className="row">
          {jobs.length > 0 ? (
            jobs.map((job) => <JobCard key={job._id} job={job} />)
          ) : (
            <p>No jobs available.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
