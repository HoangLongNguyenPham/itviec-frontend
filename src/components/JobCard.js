import React from "react";
import { Link } from "react-router-dom";

function JobCard({ job }) {
  return (
    <div className="border p-4 rounded-lg shadow hover:shadow-lg transition duration-300 bg-white">
      <Link to={`/jobs/${job._id}`} className="text-xl font-semibold text-red-600 hover:underline">
        {job.title}
      </Link>
      <p className="text-gray-700 mt-2">{job.companyName}</p>
      <p className="text-gray-500 text-sm mt-1">{job.description}</p>
    </div>
  );
}

export default JobCard;
