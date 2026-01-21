import React, { useState, useRef } from "react";
import { X, Upload } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SaudiRiyalIcon } from "@/components/common/SaudiRiyalIcon";

interface BankTransferModalProps {
    isOpen: boolean;
    onClose: () => void;
    totalAmount: number;
    onSubmit: (file: File, bankDetails: BankDetails) => void;
}

interface BankDetails {
    bankName: string;
    accountHolderName: string;
    iban: string;
    accountNumber: string;
}

export default function BankTransferModal({
    isOpen,
    onClose,
    totalAmount,
    onSubmit,
}: BankTransferModalProps) {
    const { i18n } = useTranslation();
    const isRTL = i18n.language === "ar";
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [bankDetails, setBankDetails] = useState<BankDetails>({
        bankName: "",
        accountHolderName: "",
        iban: "",
        accountNumber: "",
    });

    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Check file size (max 2MB)
            if (file.size > 2 * 1024 * 1024) {
                alert(isRTL ? "حجم الملف يجب أن يكون أقل من 2 ميجا" : "File size must be less than 2MB");
                return;
            }

            // Check file type
            if (!["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
                alert(isRTL ? "يجب أن يكون الملف بصيغة JPG, JPEG أو PNG" : "File must be JPG, JPEG or PNG");
                return;
            }

            setUploadedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async () => {
        if (!uploadedFile) {
            alert(isRTL ? "يرجى رفع صورة إيصال التحويل" : "Please upload transfer receipt");
            return;
        }

        if (!bankDetails.bankName || !bankDetails.accountHolderName || !bankDetails.iban || !bankDetails.accountNumber) {
            alert(isRTL ? "يرجى ملء جميع البيانات" : "Please fill all fields");
            return;
        }

        setIsSubmitting(true);
        try {
            await onSubmit(uploadedFile, bankDetails);
            onClose();
        } catch (error) {
            console.error("Error submitting bank transfer:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div
                className="bg-white rounded-2xl w-full max-w-[788px] max-h-[90vh] overflow-y-auto mx-4"
                dir={isRTL ? "rtl" : "ltr"}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b">
                    <h2
                        className="text-2xl font-semibold"
                        style={{ color: "#211C4D", fontFamily: "Roboto" }}
                    >
                        {isRTL ? "الحساب البنكي" : "Bank Account"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-100 transition"
                        style={{ background: "rgba(33, 28, 77, 0.1)" }}
                    >
                        <X className="w-5 h-5" style={{ color: "#211C4D" }} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Form Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* اسم البنك */}
                        <div className="space-y-2">
                            <label
                                className="block font-semibold text-base"
                                style={{ color: "#211C4D", fontFamily: "Roboto" }}
                            >
                                {isRTL ? "اسم البنك" : "Bank Name"}
                            </label>
                            <input
                                type="text"
                                value={bankDetails.bankName}
                                onChange={(e) =>
                                    setBankDetails({ ...bankDetails, bankName: e.target.value })
                                }
                                placeholder={isRTL ? "البنك السعودي" : "Saudi Bank"}
                                className="w-full h-14 px-4 border border-gray-300 rounded-lg text-base"
                                style={{
                                    fontFamily: "Roboto",
                                    color: "rgba(33, 28, 77, 0.8)",
                                    textAlign: isRTL ? "right" : "left",
                                }}
                            />
                        </div>

                        {/* اسم صاحب الحساب */}
                        <div className="space-y-2">
                            <label
                                className="block font-semibold text-base"
                                style={{ color: "#211C4D", fontFamily: "Roboto" }}
                            >
                                {isRTL ? "اسم صاحب الحساب" : "Account Holder Name"}
                            </label>
                            <input
                                type="text"
                                value={bankDetails.accountHolderName}
                                onChange={(e) =>
                                    setBankDetails({
                                        ...bankDetails,
                                        accountHolderName: e.target.value,
                                    })
                                }
                                placeholder={isRTL ? "محمد أحمد" : "Mohammed Ahmed"}
                                className="w-full h-14 px-4 border border-gray-300 rounded-lg text-base"
                                style={{
                                    fontFamily: "Roboto",
                                    color: "rgba(33, 28, 77, 0.8)",
                                    textAlign: isRTL ? "right" : "left",
                                }}
                            />
                        </div>

                        {/* رقم الآيبان */}
                        <div className="space-y-2">
                            <label
                                className="block font-semibold text-base"
                                style={{ color: "#211C4D", fontFamily: "Roboto" }}
                            >
                                {isRTL ? "رقم الآيبان (IBAN)" : "IBAN Number"}
                            </label>
                            <input
                                type="text"
                                value={bankDetails.iban}
                                onChange={(e) =>
                                    setBankDetails({ ...bankDetails, iban: e.target.value })
                                }
                                placeholder="SA4420000000123456789"
                                className="w-full h-14 px-4 border border-gray-300 rounded-lg text-base"
                                style={{
                                    fontFamily: "Roboto",
                                    color: "rgba(33, 28, 77, 0.8)",
                                    textAlign: isRTL ? "right" : "left",
                                }}
                            />
                        </div>

                        {/* رقم الحساب */}
                        <div className="space-y-2">
                            <label
                                className="block font-semibold text-base"
                                style={{ color: "#211C4D", fontFamily: "Roboto" }}
                            >
                                {isRTL ? "رقم الحساب" : "Account Number"}
                            </label>
                            <input
                                type="text"
                                value={bankDetails.accountNumber}
                                onChange={(e) =>
                                    setBankDetails({
                                        ...bankDetails,
                                        accountNumber: e.target.value,
                                    })
                                }
                                placeholder="1234567890123456"
                                className="w-full h-14 px-4 border border-gray-300 rounded-lg text-base"
                                style={{
                                    fontFamily: "Roboto",
                                    color: "rgba(33, 28, 77, 0.8)",
                                    textAlign: isRTL ? "right" : "left",
                                }}
                            />
                        </div>
                    </div>

                    {/* تأكيد العملية */}
                    <p
                        className="text-base"
                        style={{ color: "#211C4D", fontFamily: "Roboto" }}
                    >
                        {isRTL
                            ? "لتأكيد العملية يجب رفع إيصال التحويل البنكي ."
                            : "To confirm the transaction, please upload the bank transfer receipt."}
                    </p>

                    {/* Divider */}
                    <div
                        className="w-full h-px"
                        style={{ background: "rgba(33, 28, 77, 0.22)" }}
                    />

                    {/* الإجمالي */}
                    <div className="flex items-center justify-between py-2">
                        <span
                            className="font-semibold text-base"
                            style={{ color: "#211C4D", fontFamily: "Roboto" }}
                        >
                            {isRTL ? "الإجمالي" : "Total"}
                        </span>
                        <span
                            className="font-light text-base flex items-center gap-1"
                            style={{ color: "#211C4D", fontFamily: "Roboto" }}
                        >
                            {totalAmount.toLocaleString(isRTL ? "ar-SA" : "en-US")}
                            <SaudiRiyalIcon className="w-4 h-4" />
                        </span>
                    </div>

                    {/* رفع صورة تأكيد الدفع */}
                    <div className="space-y-4">
                        <h3
                            className="font-semibold text-base"
                            style={{ color: "#211C4D", fontFamily: "Roboto" }}
                        >
                            {isRTL ? "رفع صورة تأكيد الدفع" : "Upload Payment Confirmation"}
                        </h3>

                        {/* Upload Area */}
                        <div
                            className="w-full h-[200px] border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition"
                            style={{ borderColor: "#211C4D" }}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept=".jpg,.jpeg,.png"
                                onChange={handleFileChange}
                                className="hidden"
                            />

                            {previewUrl ? (
                                <div className="relative w-full h-full p-4">
                                    <img
                                        src={previewUrl}
                                        alt="Preview"
                                        className="w-full h-full object-contain rounded-lg"
                                    />
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setUploadedFile(null);
                                            setPreviewUrl(null);
                                        }}
                                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center gap-3">
                                    <Upload className="w-16 h-12" style={{ color: "#F3AC5D" }} />
                                    <p
                                        className="font-medium text-base"
                                        style={{ color: "#211C4D", fontFamily: "Roboto" }}
                                    >
                                        {isRTL
                                            ? "اضغط لرفع ملف (JPG, JPEG, PNG)"
                                            : "Click to upload file (JPG, JPEG, PNG)"}
                                    </p>
                                    <p
                                        className="text-xs"
                                        style={{
                                            color: "rgba(33, 28, 77, 0.5)",
                                            fontFamily: "Roboto",
                                        }}
                                    >
                                        {isRTL ? "الحد الأقصى: 2 ميجا" : "Max size: 2MB"}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* زر الدفع */}
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="w-full h-[68px] rounded-2xl flex items-center justify-center font-semibold text-2xl text-white transition hover:opacity-90 disabled:opacity-50"
                        style={{ background: "#F3AC5D", fontFamily: "Roboto" }}
                    >
                        {isSubmitting
                            ? isRTL
                                ? "جاري المعالجة..."
                                : "Processing..."
                            : isRTL
                                ? "دفع الآن"
                                : "Pay Now"}
                    </button>
                </div>
            </div>
        </div>
    );
}
