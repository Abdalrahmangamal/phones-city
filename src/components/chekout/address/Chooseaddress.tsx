import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {  useState } from "react";
import { Edit2, X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Address {
  id: string;
  label: string;
  street: string;
  area: string;
  phone: string;
  isSelected: boolean;
}

export default function Chooseaddress() {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "1",
      label: "المنزل",
      street: "2118 شارع الملك محمد",
      area: "أبو بكر الصديق، شيراء الطالبات 26522",
      phone: "09999999999999",
      isSelected: true,
    },
    {
      id: "2",
      label: "المنزل",
      street: "2118 شارع الملك محمد",
      area: "أبو بكر الصديق، شيراء الطالبات 26522",
      phone: "09999999999999",
      isSelected: false,
    },
  ]);
  const [selected, setSelected] = useState<string>("Homedelivery");
  const handleSelectAddress = (id: string) => {
    setAddresses(
      addresses.map((addr) => ({
        ...addr,
        isSelected: addr.id === id,
      }))
    );
  };
  const handleDeleteAddress = (id: string) => {
    setAddresses(addresses.filter((addr) => addr.id !== id));
  };

  return (
    <div className="w-full">
      <p className="text-[#211C4D] font-[600] text-start text-[24px]">
        كيف تريد استلام طلبك؟
      </p>
      <div className="flex min-w-full max-w-sm flex-col justify-start items-start mt-10 gap-6">
        <Tabs
          defaultValue="Homedelivery"
          className="w-full flex flex-col gap-35"
        >
          <TabsList className="flex flex-col justify-start gap-[40px] items-end w-full">
            <div className="w-full relative  !border !border-[#D6D6D6] !rounded-[8px] h-[52px]">
              <TabsTrigger
                value="Homedelivery"
                onClick={() => setSelected("Homedelivery")}
                className="w-full !border flex pr-11 items-center justify-end !border-[#D6D6D6] !rounded-[8px] h-[52px]"
              >
                <p className="text-[#211C4DB2] text-start text-[24px] font-[500] ">
                  توصيل منزلي
                </p>
              </TabsTrigger>
              <div className="absolute top-4 right-4">
                <label className="relative flex items-center justify-center cursor-pointer">
                  <input
                    type="checkbox"
                      checked={selected === "Homedelivery"? true : false} 
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
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20ZM14.6339 8.38388C15.122 7.89573 15.122 7.10427 14.6339 6.61612C14.1457 6.12796 13.3543 6.12796 12.8661 6.61612L8.75 10.7322L7.13388 9.11612C6.64573 8.62796 5.85427 8.62796 5.36612 9.11612C4.87796 9.60427 4.87796 10.3957 5.36612 10.8839L7.86612 13.3839C8.35427 13.872 9.14573 13.872 9.63388 13.3839L14.6339 8.38388Z"
                        fill="#211C4D"
                      />
                    </svg>
                  </span>
                </label>
              </div>
            </div>
            <div className="w-full relative  !border !border-[#D6D6D6] !rounded-[8px] h-[52px]">
              <TabsTrigger
                value="showroomdelivery"
                onClick={() => setSelected("showroomdelivery")}
                className="w-full !border flex pr-11 items-center justify-end !border-[#D6D6D6] !rounded-[8px] h-[52px]"
              >
                <p className="text-[#211C4DB2] text-start text-[24px] font-[500] ">
                  الاستلام من المعرض
                </p>
              </TabsTrigger>
              <div className="absolute top-4 right-4">
                <label className="relative flex items-center justify-center cursor-pointer">
                  <input
                  checked={selected === "showroomdelivery"? true : false}
                    type="checkbox"
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
                        fill-rule="evenodd"
                        clip-rule="evenodd"
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
              <div className=" w-full bg-background " dir="rtl">
                <div className="mx-auto max-w-2xl">
                  <h1 className="mb-8 text-right text-2xl font-bold text-foreground">
                    اختر العنوان
                  </h1>

                  <div className="space-y-4">
                    {addresses.map((address) => (
                      <div
                        key={address.id}
                        className="flex items-center gap-4 rounded-lg border border-border bg-[#F6F6F6] p-4"
                      >
                        {/* Center Content */}
                        <div className="flex-1">
                          <div className="mb-3 flex items-center gap-2">
                            <button
                              onClick={() => handleSelectAddress(address.id)}
                              className=" flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2 border-[#F3AC5D] transition-all hover:border-accent"
                              aria-label={`Select ${address.label}`}
                            >
                              {address.isSelected && (
                                <div className="h-3 w-3 rounded-full bg-[#F3AC5D]" />
                              )}
                            </button>
                            <span className="font-semibold text-foreground">
                              {address.street}
                            </span>
                            <span className="inline-block rounded bg-[#F3AC5D] text-[white] px-2 py-[2px] text-[12px] font-medium ">
                              {address.label}
                            </span>
                          </div>
                          <p className="mb-2 text-sm text-[#211C4D]">
                            {address.area}
                          </p>
                          <p className="text-sm font-medium text-[#211C4D]">
                            {address.phone}
                          </p>
                        </div>
                        {/* Left Actions */}
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
                    ))}
                  </div>

                  <div className="mt-8 flex justify-center">
                    <Button
                      variant="outline"
                      className="gap-2 text-muted-foreground hover:text-foreground bg-transparent"
                    >
                      <Plus className="h-4 w-4" />
                      <span>اضافة عنوان جديد</span>
                    </Button>
                  </div>
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
