import Layout from "@/components/layout/layout";
import Sidebar from "@/components/layout/Sidebar";
import "@/style.css";
import macbook from "@/assets/images/macbook.png";
import warning from "@/assets/images/warning.png";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import axiosClient from "@/api/axiosClient";

interface Product {
  id: number;
  slug: string;
  name: string;
}

interface PointsData {
  id: number;
  points_count: number;
  status: string;
  expire_at: string;
  used_at: string | null;
  description: string;
  product: Product;
  created_at: string;
  updated_at: string;
}

interface ApiResponse {
  status: boolean;
  message: string;
  data: PointsData[];
  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
  };
}

export default function Wallet() {
  const { t, i18n } = useTranslation();
  const direction = i18n.dir(); // "rtl" أو "ltr" حسب اللغة الحالية
  const isRTL = direction === "rtl";

  const [pointsData, setPointsData] = useState<PointsData[]>([]);
  const [totalPoints, setTotalPoints] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  const justifyDir = isRTL ? "justify-start" : "justify-start";
  const textAlign = isRTL ? "text-right" : "text-left";
  const flexDir = isRTL ? "flex-row" : "flex-row-reverse";
  useEffect(() => {
    const fetchPointsData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await axiosClient.get<ApiResponse>("/api/v1/points");

        if (response.data.status && response.data.data) {
          setPointsData(response.data.data);

          const total = response.data.data
            .filter((item) => item.status === "available")
            .reduce((sum, item) => sum + item.points_count, 0);

          setTotalPoints(total);
        } else {
          throw new Error(response.data.message || "Invalid response format");
        }
      } catch (err: any) {
        console.error("Error fetching points:", err);

        if (err.response) {
          if (err.response.status === 401) {
            setError("Authentication required. Please login again.");
          } else if (err.response.status === 404) {
            setError("API endpoint not found. Please check the URL.");
          } else if (err.response.status === 500) {
            setError("Server error. Please try again later.");
          } else {
            setError(`Error ${err.response.status}: ${err.response.data?.message || 'Unknown error'}`);
          }
        } else if (err.request) {
          setError("No response from server. Please check your connection.");
        } else {
          setError(err.message || "An error occurred while fetching points");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchPointsData();
  }, []);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`;
    } catch (e) {
      return dateString;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "available":
        return t("Valid");
      case "used":
        return t("Used");
      case "expired":
        return t("Expired");
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "text-[#40A529]";
      case "used":
        return "text-[#6c6c80]";
      case "expired":
        return "text-[#FF0000]";
      default:
        return "text-[#211C4D]";
    }
  };

  const handleRetry = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await axiosClient.get<ApiResponse>("/api/v1/points");

      if (response.data.status && response.data.data) {
        setPointsData(response.data.data);

        const total = response.data.data
          .filter((item) => item.status === "available")
          .reduce((sum, item) => sum + item.points_count, 0);

        setTotalPoints(total);
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch points");
    } finally {
      setIsLoading(false);
    }
  };

  

  return (
    <div>
      <Layout>
        <div className="flex flex-col mb-40 md:flex-row justify-center gap-[30px] mt-[80px]">
          <Sidebar />
          <div className="md:w-[883px] w-full">
            {/* Error message */}
            {error && (
              <div className="mb-4 p-4 bg-red-100 border border-red-400 rounded-md">
                <div className="flex justify-between items-center">
                  <p className="text-red-800">{error}</p>
                  <button
                    onClick={handleRetry}
                    className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm"
                  >
                    {t("Retry") || "Retry"}
                  </button>
                </div>
              </div>
            )}

            <div className="w-full justify-between h-[45px] px-7 p-5 bg-[#E5E5E5] flex items-center rounded-[8px]">
              <p className="text-[#211C4DCC] text-[16px] font-[500]">{t("WalletTitle")}</p>
              <p className="text-[#211C4D] font-[600]">{totalPoints} {t("TotalPoints")}</p>
            </div>

            <div className="w-full justify-between md:h-[60px] h-full px-7 mt-[20px] p-5 bg-[#F3AC5D73] flex items-center rounded-[8px]">
              <p className="text-[#211C4DCC] text-[24px] font-[500]">{t("AlertMessage")}</p>
              <img src={warning} alt="Warning" className="w-8 h-8" />
            </div>

            <div className="overflow-x-auto w-[100vw] md:w-[60vw] lg:w-full xl:w-[883px] md:px-0 px-[20px]">
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#211C4D]"></div>
                  <span className="ml-4 text-[#211C4D]">{t("Loading") || "Loading..."}</span>
                </div>
              ) : pointsData.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-[#6c6c80] text-lg">{t("NoPointsData") || "No points data available"}</p>
                  {!error && (
                    <button
                      onClick={handleRetry}
                      className="mt-4 px-6 py-2 bg-[#211C4D] text-white rounded-md hover:bg-[#211C4DCC]"
                    >
                      {t("Refresh") || "Refresh"}
                    </button>
                  )}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full border-separate border-spacing-y-3 mt-6 min-w-[883px]">
                    <thead>
                      <tr>
                        {/* Expiry Date */}
                        <th className={`pb-6 ${textAlign}`}>
                          <div className={`flex items-center ${justifyDir}`}>
                            <p className="bg-[#ABD1E7] text-[#211C4D] text-[13px] font-[500] pt-1 px-2 rounded-[8px] w-fit">
                              {t("ExpiryDate")}
                            </p>
                          </div>
                        </th>

                        {/* Product */}
                        <th className={`pb-6 w-[35%] ${textAlign}`}>
                          <div className={`flex items-center ${justifyDir}`}>
                            <p className="bg-[#ABD1E7] text-[#211C4D] text-[13px] font-[500] pt-1 px-5 rounded-[8px] w-fit">
                              {t("Product")}
                            </p>
                          </div>
                        </th>

                        {/* Points */}
                        <th className={`pb-6 ${textAlign}`}>
                          <div className={`flex items-center ${justifyDir}`}>
                            <p className="bg-[#ABD1E7] text-[#211C4D] text-[13px] font-[500] pt-1 px-5 rounded-[8px] w-fit">
                              {t("Points")}
                            </p>
                          </div>
                        </th>

                        {/* Transaction */}
                        <th className={`pb-6 ${textAlign}`}>
                          <div className={`flex items-center ${justifyDir}`}>
                            <p className="bg-[#ABD1E7] text-[#211C4D] text-[13px] font-[500] pt-1 px-5 rounded-[8px] w-fit">
                              {t("Transaction")}
                            </p>
                          </div>
                        </th>

                        {/* Status */}
                        <th className={`pb-6 ${textAlign}`}>
                          <div className={`flex items-center ${justifyDir}`}>
                            <p className="bg-[#ABD1E7] text-[#211C4D] text-[13px] font-[500] pt-1 px-5 rounded-[8px] w-fit">
                              {t("Status")}
                            </p>
                          </div>
                        </th>
                      </tr>
                    </thead>

                    <tbody className="bg-white">
                      {pointsData.map((item) => (
                        <tr key={item.id} className="h-[108px]">
                          {/* Expiry Date */}
                          <td className={`text-[#211C4D] border-b font-[500] py-4 ${textAlign}`}>
                            <div className={`flex items-center gap-2 ${justifyDir}`}>
                              {formatDate(item.expire_at)}
                            </div>
                          </td>

                          {/* Product */}
                          <td className="border-b py-4">
                            <div className={`flex w-[243px] h-[76px] p-1 bg-[#cbcbcb2b] border rounded-[8px] items-center ${flexDir} gap-3`}>
                              <img
                                src={macbook}
                                alt={item.product.name}
                                className="w-[75px] h-[76px] object-contain rounded-md"
                              />
                              <div className={`flex-1 ${isRTL ? 'pr-3 text-right' : 'pl-3 text-left'}`}>
                                <p className="font-[600] text-[14px] text-[#211C4D] truncate max-w-[150px]">
                                  {item.product.name}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* Points */}
                          <td className={`border-b font-[500] py-4 ${item.status === "expired" ? "text-[#FF0000]" : "text-[#211C4D]"} ${textAlign}`}>
                            <div className={`flex items-center ${justifyDir}`}>
                              {item.points_count}
                            </div>
                          </td>

                          {/* Transaction */}
                          <td className={`border-b font-[500] py-4 ${item.status === "expired" ? "text-[#FF0000]" : "text-[#40A529]"} ${textAlign}`}>
                            <div className={`flex items-center ${justifyDir}`}>
                              {item.status === "expired" ? `-${item.points_count}` : `+${item.points_count}`}
                            </div>
                          </td>

                          {/* Status */}
                          <td className={`border-b font-[600] py-4 w-[160px] ${getStatusColor(item.status)} ${textAlign}`}>
                            <div className={`flex items-center ${justifyDir}`}>
                              {getStatusText(item.status)}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}