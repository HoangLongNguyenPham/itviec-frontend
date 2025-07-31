import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

function JobDetail() {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    api.get(`/jobs/${id}`).then((res) => setJob(res.data));
  }, [id]);

  if (!job) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-red-600">{job.title}</h2>
      <h3 className="text-xl mt-2">{job.companyName}</h3>
      <p className="mt-4">{job.description}</p>
    </div>
  );
}

export default JobDetail;
