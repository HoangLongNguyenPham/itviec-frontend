import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api";

function CompanyDetail() {
  const { id } = useParams(); // Lấy ID công ty từ URL
  const [company, setCompany] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanyAndJobs = async () => {
      try {
        // 1️.Lấy thông tin chi tiết công ty
        const companyRes = await api.get(`/companies/${id}`);
        setCompany(companyRes.data);

        // 2️.Lấy danh sách job thuộc công ty
        const jobsRes = await api.get(`/jobs?companyId=${id}`);
        if (Array.isArray(jobsRes.data)) {
          setJobs(jobsRes.data);
        } else if (Array.isArray(jobsRes.data.data)) {
          setJobs(jobsRes.data.data); // Nếu API trả về { data: [] }
        } else {
          setJobs([]);
        }
      } catch (err) {
        console.error("Lỗi khi tải dữ liệu:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyAndJobs();
  }, [id]);

  if (loading) return <p className="p-6 text-center">Đang tải dữ liệu...</p>;
  if (!company) return <p className="p-6 text-center text-red-600">Không tìm thấy công ty.</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Thông tin công ty */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">{company.name}</h1>
        <p className="text-gray-600 mb-2">
          Địa chỉ: {company.address?.line}, {company.address?.city}, {company.address?.country}
        </p>
        <p>{company.description || "Chưa có mô tả công ty."}</p>
      </div>

      {/* Danh sách job */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Việc làm tại {company.name}</h2>
        {jobs.length === 0 ? (
          <p className="text-gray-500">Công ty chưa đăng việc làm nào.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="border rounded-lg p-4 shadow hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold">{job.title}</h3>
                <p className="text-gray-600">
                  Lương: {job.salary || "Thỏa thuận"} | Địa điểm: {job.location || "Không xác định"}
                </p>
                <Link
                  to={`/jobs/${job._id}`}
                  className="mt-3 inline-block text-red-600 hover:underline"
                >
                  Xem chi tiết công việc
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CompanyDetail;
