import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

function Companies() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await api.get("/companies");
        console.log("API Companies:", res.data); // Log để kiểm tra dữ liệu trả về

        // Kiểm tra dữ liệu trả về có phải array không
        if (Array.isArray(res.data)) {
          setCompanies(res.data);
        } else if (Array.isArray(res.data.data)) {
          setCompanies(res.data.data); // Một số API trả về { status, data: [] }
        } else {
          setCompanies([]); // Nếu không phải array, gán mảng rỗng
        }
      } catch (err) {
        console.error("Lỗi khi lấy danh sách công ty:", err);
        setCompanies([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCompanies();
  }, []);

  if (loading) return <p className="p-6 text-center">Đang tải danh sách công ty...</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-6">Danh sách công ty</h2>
      {companies.length === 0 ? (
        <p className="text-center text-gray-500">Không có công ty nào.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {companies.map((company) => (
            <div key={company._id} className="border rounded-lg p-4 shadow hover:shadow-lg">
              <h3 className="text-xl font-semibold">{company.name}</h3>
              <p className="text-gray-600">{company.address?.city || "Chưa cập nhật địa chỉ"}</p>
              <Link
                to={`/companies/${company._id}`}
                className="mt-3 inline-block text-red-600 hover:underline"
              >
                Xem chi tiết
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Companies;
