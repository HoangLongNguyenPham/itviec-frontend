import { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";

function Companies() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await api.get("/companies");
        console.log("Companies API:", res.data);
        setCompanies(res.data.data || []);
      } catch (err) {
        console.error("Error fetching companies:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCompanies();
  }, []);

  if (loading) return <p className="text-center mt-4">Loading...</p>;

  return (
    <div className="container my-4">
      <h2 className="mb-4 text-center">Companies</h2>
      {companies.length > 0 ? (
        <div className="row">
          {companies.map((company) => (
            <div key={company._id} className="col-md-4 mb-4">
              <div
                className="card shadow-sm h-100 text-center p-3 text-white"
                style={{ background: "linear-gradient(135deg, #91C8E4, #749BC2, #4682A9)" }}
              >
                <div className="card-body">
                  <h5 className="card-title fw-bold">{company.name}</h5>
                  <p className="mb-1">
                    📍 {company.address?.city || "N/A"},{" "}
                    {company.address?.country || ""}
                  </p>
                  <p className="mb-1">
                    👥 {company.size ? `${company.size} employees` : "Size: N/A"}
                  </p>
                  <p className="small">
                    {company.description || "No description available."}
                  </p>
                  <Link
                    to={`/companies/${company._id}`}
                    className="btn btn-light mt-3 w-100 fw-bold"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted">No companies found.</p>
      )}
    </div>
  );
}

export default Companies;
