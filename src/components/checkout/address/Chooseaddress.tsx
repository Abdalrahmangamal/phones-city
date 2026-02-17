import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { Edit2, X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAddressStore } from "@/store/profile/indexStore";
import type { Address as AddressType } from "@/store/profile/addressStore";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Chooseaddress() {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const isRTL = currentLanguage === "ar";

  const {
    addresses,
    selectedAddressId,
    deliveryMethod, // 🔧 جلب نوع التوصيل
    loading,
    error,
    fetchAddresses,
    deleteAddress,
    selectAddress,
    getSelectedAddress,
    setDeliveryMethod, // 🔧 لتحديث النوع
  } = useAddressStore();

  const [selected, setSelected] = useState<string>(
    deliveryMethod === "pickup" ? "showroomdelivery" : "Homedelivery"
  );
  const [localLoading, setLocalLoading] = useState(true);
  const navigate = useNavigate();

  const handleAddNewAddress = () => {
    navigate("/singleaddress");
  };

  useEffect(() => {
    const loadAddresses = async () => {
      setLocalLoading(true);
      try {
        await fetchAddresses();
      } catch (err) {
        console.error("Failed to load addresses:", err);
      } finally {
        setLocalLoading(false);
      }
    };

    loadAddresses();
  }, [fetchAddresses]);

  const handleSelectAddress = (id: number) => {
    selectAddress(id);
  };

  const handleDeleteAddress = async (id: number) => {
    try {
      await deleteAddress(id);
    } catch (error) {
      console.error("Failed to delete address:", error);
    }
  };

  const formatAddressForDisplay = (address: AddressType) => {
    // Build display string with national address components
    const streetParts = [];
    if (address.building_number) streetParts.push(address.building_number);
    if (address.street_name) streetParts.push(address.street_name);
    if (address.street_address && !address.street_name) streetParts.push(address.street_address);

    const districtParts = [];
    if (address.district) districtParts.push(address.district);
    if (address.postal_code) districtParts.push(address.postal_code);

    // Safe access to city name with fallback
    const cityName = address.city?.name || "";
    const areaString = districtParts.length > 0
      ? `${districtParts.join(" - ")} - ${cityName}, ${address.country}`
      : `${cityName}, ${address.country}`;

    return {
      id: address.id.toString(),
      label: address.label || (isRTL ? "عنوان" : "Address"),
      street: streetParts.join(" - ") || address.street_address,
      area: areaString.replace(/^, |, $/g, '').replace(/^- |- $/g, ''),
      phone: address.phone,
      isSelected: address.id === selectedAddressId,
    };
  };

  if (localLoading || loading) {
    return (
      <div className="w-full p-8 text-center">
        <p className="text-gray-500">{t("chooseAddress.loading")}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full p-8 text-center">
        <p className="text-red-500">{t("chooseAddress.error")} {error}</p>
        <Button onClick={fetchAddresses} className="mt-4">
          {t("chooseAddress.retry")}
        </Button>
      </div>
    );
  }

  const handleDeliveryChange = (value: "Homedelivery" | "showroomdelivery") => {
    setSelected(value);
    if (value === "Homedelivery") {
      setDeliveryMethod("delivery");
    } else {
      setDeliveryMethod("pickup");
    }
  };

  return (
    <div className="w-full" dir={isRTL ? "rtl" : "ltr"}>
      <div className="w-full">
        <p className={`text-[#211C4D] font-[600] text-[24px] ${isRTL ? 'text-right' : 'text-left'}`}>
          {t("chooseAddress.title")}
        </p>
      </div>

      <div className={`flex min-w-full max-w-sm flex-col justify-start items-start mt-10 gap-6 ${isRTL ? "items-end" : "items-start"}`}>
        <Tabs
          value={selected}
          onValueChange={(value) =>
            handleDeliveryChange(value as "Homedelivery" | "showroomdelivery")
          }
          className="w-full flex flex-col gap-35"
        >
          <TabsList className={`flex flex-col justify-start gap-[40px] w-full ${isRTL ? "items-end" : "items-start"}`}>
            <div className="w-full relative !border !border-[#D6D6D6] !rounded-[8px] h-[52px]">
              <TabsTrigger
                value="Homedelivery"
                className={`w-full !border flex items-center !border-[#D6D6D6] !rounded-[8px] h-[52px] ${isRTL ? "pr-11 justify-end" : "pl-11 justify-start"}`}
              >
                <p className={`text-[#211C4DB2] text-[24px] font-[500] ${isRTL ? "text-start" : "text-end"}`}>
                  {t("chooseAddress.homeDelivery")}
                </p>
              </TabsTrigger>
              <div className={`absolute top-4 ${isRTL ? "right-4" : "left-4"}`}>
                <label className="relative flex items-center justify-center cursor-pointer">
                  <input
                    type="radio"
                    name="deliveryMethod"
                    checked={selected === "Homedelivery" ? true : false}
                    onChange={() => handleDeliveryChange("Homedelivery")}
                    className="peer w-[20px] h-[20px] appearance-none border border-[#211C4D] rounded-full checked:bg-none transition-all duration-200"
                  />
                  <span className="absolute !left-[1px] top-[0px] hidden peer-checked:block text-white text-[16px]">
                    <svg
                      width="21"
                      height="21"
                      className="!w-[19px] !h-[19px]"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20ZM14.6339 8.38388C15.122 7.89573 15.122 7.10427 14.6339 6.61612C14.1457 6.12796 13.3543 6.12796 12.8661 6.61612L8.75 10.7322L7.13388 9.11612C6.64573 8.62796 5.85427 8.62796 5.36612 9.11612C4.87796 9.60427 4.87796 10.3957 5.36612 10.8839L7.86612 13.3839C8.35427 13.872 9.14573 13.872 9.63388 13.3839L14.6339 8.38388Z"
                        fill="#211C4D"
                      />
                    </svg>
                  </span>
                </label>
              </div>
            </div>
            <div className="w-full relative !border !border-[#D6D6D6] !rounded-[8px] h-[52px]">
              <TabsTrigger
                value="showroomdelivery"
                className={`w-full !border flex items-center !border-[#D6D6D6] !rounded-[8px] h-[52px] ${isRTL ? "pr-11 justify-end" : "pl-11 justify-start"}`}
              >
                <p className={`text-[#211C4DB2] text-[24px] font-[500] ${isRTL ? "text-start" : "text-end"}`}>
                  {t("chooseAddress.pickupFromShowroom")}
                </p>
              </TabsTrigger>
              <div className={`absolute top-4 ${isRTL ? "right-4" : "left-4"}`}>
                <label className="relative flex items-center justify-center cursor-pointer">
                  <input
                    checked={selected === "showroomdelivery" ? true : false}
                    type="radio"
                    name="deliveryMethod"
                    onChange={() => handleDeliveryChange("showroomdelivery")}
                    className="peer w-[20px] h-[20px] appearance-none border border-[#211C4D] rounded-full checked:bg-none transition-all duration-200"
                  />
                  <span className="absolute !left-[1px] top-[0px] hidden peer-checked:block text-white text-[16px]">
                    <svg
                      width="21"
                      height="21"
                      className="!w-[19px] !h-[19px]"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20ZM14.6339 8.38388C15.122 7.89573 15.122 7.10427 14.6339 6.61612C14.1457 6.12796 13.3543 6.12796 12.8661 6.61612L8.75 10.7322L7.13388 9.11612C6.64573 8.62796 5.85427 8.62796 5.36612 9.11612C4.87796 9.60427 4.87796 10.3957 5.36612 10.8839L7.86612 13.3839C8.35427 13.872 9.14573 13.872 9.63388 13.3839L14.6339 8.38388Z"
                        fill="#211C4D"
                      />
                    </svg>
                  </span>
                </label>
              </div>
            </div>
          </TabsList>
          <div>
            <TabsContent value="Homedelivery">
              <div className="w-full bg-background" dir={isRTL ? "rtl" : "ltr"}>
                <div className="mx-auto max-w-2xl">
                  <h1 className={`mb-8 text-2xl font-bold text-foreground ${isRTL ? "text-right" : "text-left"}`}>
                    {t("chooseAddress.selectAddress")}
                  </h1>

                  {addresses.length === 0 ? (
                    <div className="text-center p-8">
                      <p className="text-gray-500 mb-4">{t("chooseAddress.noAddresses")}</p>
                      <Button variant="outline" className="gap-2" onClick={handleAddNewAddress}>
                        <Plus className="h-4 w-4" />
                        <span>{t("chooseAddress.addNewAddress")}</span>
                      </Button>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-4">
                        {addresses.map((address) => {
                          const formattedAddress = formatAddressForDisplay(address);
                          return (
                            <div
                              key={address.id}
                              className="flex items-center gap-4 rounded-lg border border-border bg-[#F6F6F6] p-4"
                              dir={isRTL ? "rtl" : "ltr"}
                            >
                              {/* Center Content */}
                              <div className="flex-1">
                                <div className="mb-3 flex items-center gap-2">
                                  <button
                                    onClick={() => handleSelectAddress(address.id)}
                                    className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2 border-[#F3AC5D] transition-all hover:border-accent"
                                    aria-label={`${t("chooseAddress.selectAddress")} ${formattedAddress.label}`}
                                  >
                                    {formattedAddress.isSelected && (
                                      <div className="h-3 w-3 rounded-full bg-[#F3AC5D]" />
                                    )}
                                  </button>
                                  <span className="font-semibold text-foreground">
                                    {formattedAddress.street}
                                  </span>
                                  <span className="inline-block rounded bg-[#F3AC5D] text-[white] px-2 py-[2px] text-[12px] font-medium">
                                    {formattedAddress.label}
                                  </span>
                                </div>
                                <p className="mb-2 text-sm text-[#211C4D]">
                                  {formattedAddress.area}
                                </p>
                                <p className="text-sm font-medium text-[#211C4D]">
                                  {formattedAddress.phone}
                                </p>
                              </div>
                              {/* Actions */}
                              <div className="flex gap-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-muted-foreground hover:text-foreground"
                                >
                                  <Edit2 className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleDeleteAddress(address.id)}
                                  className="h-8 w-8 text-muted-foreground hover:text-foreground"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <div className="mt-8 flex justify-center">
                        <Button
                          variant="outline"
                          className="gap-2 text-muted-foreground hover:text-foreground bg-transparent"
                          onClick={handleAddNewAddress}
                        >
                          <Plus className="h-4 w-4" />
                          <span>{t("chooseAddress.add")}</span>
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </TabsContent>
            {/* <TabsContent value="showroomdelivery">cc</TabsContent> */}
          </div>
        </Tabs>
      </div>
    </div>
  );
}
