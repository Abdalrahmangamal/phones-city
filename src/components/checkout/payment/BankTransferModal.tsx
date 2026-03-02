import React, { useState, useRef, useEffect } from "react";
import { X, Upload } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SaudiRiyalIcon } from "@/components/common/SaudiRiyalIcon";
import axiosClient from "@/api/axiosClient";
import axios from "axios";

interface BankTransferModalProps {
    isOpen: boolean;
    onClose: () => void;
    totalAmount: number;
    orderId?: number | string | null; // معرف الطلب لرفع إثبات الدفع
    uploadUrl?: string | null; // URL الرفع القادم من الـ API
    onSubmit: (file: File, bankDetails: BankDetails) => void;
    onUploadSuccess?: () => void; // callback بعد نجاح الرفع
    onCreateOrder?: () => Promise<{ orderId: number | string; uploadUrl?: string } | null>; // ⭐ إنشاء الطلب أولاً
}

interface BankDetails {
    bankName: string;
    accountHolderName: string;
    iban: string;
    accountNumber: string;
    branch?: string;
    bankInstructions?: string;
}

const MAX_UPLOAD_SIZE_MB = 10;
const MAX_UPLOAD_SIZE_BYTES = MAX_UPLOAD_SIZE_MB * 1024 * 1024;
const ALLOWED_FILE_TYPES = new Set([
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/heic",
    "image/heif",
    "application/pdf",
]);
const ALLOWED_EXTENSIONS = new Set([
    "jpg",
    "jpeg",
    "png",
    "webp",
    "heic",
    "heif",
    "pdf",
]);

const getFileExtension = (fileName: string) => {
    const parts = String(fileName || "").toLowerCase().split(".");
    return parts.length > 1 ? parts[parts.length - 1] : "";
};

const isAllowedFile = (file: File) => {
    const mime = String(file.type || "").toLowerCase();
    if (mime && ALLOWED_FILE_TYPES.has(mime)) return true;
    const ext = getFileExtension(file.name);
    return ALLOWED_EXTENSIONS.has(ext);
};

const isAbsoluteHttpUrl = (value: string) => /^https?:\/\//i.test(value);

const toAbsoluteUrl = (value: string) => {
    if (!value) return "";
    if (isAbsoluteHttpUrl(value)) return value;
    const base = import.meta.env.VITE_BASE_URL || window.location.origin;
    try {
        return new URL(value, base).toString();
    } catch {
        return value;
    }
};

export default function BankTransferModal({
    isOpen,
    onClose,
    totalAmount,
    orderId,
    uploadUrl,
    onSubmit,
    onUploadSuccess,
    onCreateOrder,
}: BankTransferModalProps) {
    const { i18n } = useTranslation();
    const isRTL = i18n.language === "ar";
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [bankDetails, setBankDetails] = useState<BankDetails>({
        bankName: "",
        accountHolderName: "",
        iban: "",
        accountNumber: "",
        branch: "",
        bankInstructions: "",
    });

    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loadingBankDetails, setLoadingBankDetails] = useState(false);

    // Fetch bank details from API when modal opens
    useEffect(() => {
        if (isOpen) {
            fetchBankDetails();
        }
    }, [isOpen]);

    const fetchBankDetails = async () => {
        setLoadingBankDetails(true);
        try {
            const response = await axiosClient.get("/api/v1/settings/bank/details");
            if (response.data.status && response.data.data) {
                const data = response.data.data;
                setBankDetails({
                    bankName: data.bank_name || "",
                    accountHolderName: data.account_holder || "",
                    iban: data.iban || "",
                    accountNumber: data.account_number || "",
                    branch: data.branch || "",
                    bankInstructions: data.bank_instructions || "",
                });
            }
        } catch (error) {
            console.error("Error fetching bank details");
        } finally {
            setLoadingBankDetails(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Check file size
            if (file.size > MAX_UPLOAD_SIZE_BYTES) {
                alert(
                    isRTL
                        ? `حجم الملف يجب أن يكون أقل من ${MAX_UPLOAD_SIZE_MB} ميجا`
                        : `File size must be less than ${MAX_UPLOAD_SIZE_MB}MB`
                );
                return;
            }

            // Check file type
            if (!isAllowedFile(file)) {
                alert(
                    isRTL
                        ? "نوع الملف غير مدعوم. الصيغ المسموحة: JPG, JPEG, PNG, WEBP, HEIC, HEIF, PDF"
                        : "Unsupported file type. Allowed: JPG, JPEG, PNG, WEBP, HEIC, HEIF, PDF"
                );
                return;
            }

            setUploadedFile(file);
            // Only create preview URL for images, not PDFs
            if (file.type.startsWith('image/')) {
                setPreviewUrl(URL.createObjectURL(file));
            } else {
                setPreviewUrl(null);
            }
        }
    };

    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    const uploadProofFile = async (url: string, file: File) => {
        const normalizedUrl = String(url || "").trim();
        if (!normalizedUrl) {
            throw new Error(isRTL ? "رابط الرفع غير متوفر" : "Upload URL is missing");
        }

        const absoluteUrl = toAbsoluteUrl(normalizedUrl);
        const apiBaseNormalized = String(import.meta.env.VITE_BASE_URL || "").replace(/\/$/, "");
        const isApiUploadUrl = Boolean(apiBaseNormalized) && absoluteUrl.startsWith(apiBaseNormalized);
        const isExternalUploadUrl = !isApiUploadUrl;
        const token = localStorage.getItem("token");

        const formData = new FormData();
        formData.append("payment_proof", file);

        try {
            const response = await axios.post(absoluteUrl, formData, {
                timeout: 120000,
                headers: {
                    Accept: "application/json",
                    ...(isApiUploadUrl && token ? { Authorization: `Bearer ${token}` } : {}),
                },
            });

            if (response.status >= 200 && response.status < 300) {
                return response;
            }
        } catch (postError: any) {
            // Some gateways/storage links require PUT with raw file body.
            const status = Number(postError?.response?.status || 0);
            const allowPutFallback =
                isExternalUploadUrl && (status === 403 || status === 405 || status === 415 || status === 400);

            if (allowPutFallback) {
                const putResponse = await axios.put(absoluteUrl, file, {
                    timeout: 120000,
                    headers: {
                        "Content-Type": file.type || "application/octet-stream",
                    },
                });

                if (putResponse.status >= 200 && putResponse.status < 300) {
                    return putResponse;
                }
            }

            throw postError;
        }

        throw new Error(isRTL ? "فشل رفع إثبات الدفع" : "Failed to upload payment proof");
    };

    const getUploadErrorMessage = (error: any) => {
        const directMessage = error?.response?.data?.message;
        if (typeof directMessage === "string" && directMessage.trim()) {
            const nestedErrors = error?.response?.data?.errors?.errors;
            if (nestedErrors && typeof nestedErrors === "object") {
                const flattened = Object.values(nestedErrors)
                    .flat()
                    .map((msg) => String(msg))
                    .join(" - ");
                if (flattened) {
                    return `${directMessage}: ${flattened}`;
                }
            }
            return directMessage;
        }

        const flatErrors = error?.response?.data?.errors;
        if (flatErrors && typeof flatErrors === "object") {
            const flattened = Object.values(flatErrors)
                .flat()
                .map((msg) => String(msg))
                .join(" - ");
            if (flattened) return flattened;
        }

        return isRTL ? "حدث خطأ أثناء رفع إثبات الدفع" : "Error uploading payment proof";
    };

    const handleSubmit = async () => {
        if (!uploadedFile) {
            alert(isRTL ? "يرجى رفع صورة إيصال التحويل" : "Please upload transfer receipt");
            return;
        }

        setIsSubmitting(true);
        try {
            let currentOrderId = orderId;
            let currentUploadUrl = uploadUrl;

            // ⭐ إذا لم يكن هناك orderId، نقوم بإنشاء الطلب أولاً
            if (!currentOrderId && onCreateOrder) {
                const orderResult = await onCreateOrder();
                if (!orderResult) {
                    // فشل إنشاء الطلب
                    setIsSubmitting(false);
                    return;
                }
                currentOrderId = orderResult.orderId;
                currentUploadUrl = orderResult.uploadUrl;
            }

            // تحديد الـ URL للرفع - نستخدم uploadUrl من الـ API إذا كان متوفرًا
            const finalUploadUrl =
                currentUploadUrl ||
                (currentOrderId
                    ? `/api/v1/orders/${encodeURIComponent(String(currentOrderId))}/payment/upload-proof`
                    : null);

            if (!finalUploadUrl) {
                throw new Error(
                    isRTL
                        ? "تعذر تحديد رابط رفع إثبات الدفع. حاول مرة أخرى."
                        : "Could not determine payment proof upload URL. Please try again."
                );
            }

            await uploadProofFile(finalUploadUrl, uploadedFile);

            if (onUploadSuccess) {
                onUploadSuccess();
            }
            onClose();
        } catch (error: any) {
            console.error("Error submitting bank transfer");
            const errorMessage = getUploadErrorMessage(error);
            alert(errorMessage);
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
                    {loadingBankDetails ? (
                        <div className="flex items-center justify-center py-8">
                            <p className="text-base" style={{ color: "#211C4D", fontFamily: "Roboto" }}>
                                {isRTL ? "جاري تحميل بيانات الحساب البنكي..." : "Loading bank details..."}
                            </p>
                        </div>
                    ) : (
                        <>
                            {/* Bank Details Display */}
                            <div className="space-y-4">
                                <h3
                                    className="font-semibold text-lg"
                                    style={{ color: "#211C4D", fontFamily: "Roboto" }}
                                >
                                    {isRTL ? "معلومات الحساب البنكي" : "Bank Account Details"}
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* اسم البنك */}
                                    <div className="space-y-2">
                                        <label
                                            className="block font-semibold text-base"
                                            style={{ color: "#211C4D", fontFamily: "Roboto" }}
                                        >
                                            {isRTL ? "اسم البنك" : "Bank Name"}
                                        </label>
                                        <div
                                            className="w-full min-h-[56px] px-4 py-3 border border-gray-300 rounded-lg text-base bg-gray-50 flex items-center"
                                            style={{
                                                fontFamily: "Roboto",
                                                color: "rgba(33, 28, 77, 0.8)",
                                                textAlign: isRTL ? "right" : "left",
                                            }}
                                        >
                                            {bankDetails.bankName || (isRTL ? "غير متوفر" : "Not available")}
                                        </div>
                                    </div>

                                    {/* اسم صاحب الحساب */}
                                    <div className="space-y-2">
                                        <label
                                            className="block font-semibold text-base"
                                            style={{ color: "#211C4D", fontFamily: "Roboto" }}
                                        >
                                            {isRTL ? "اسم صاحب الحساب" : "Account Holder Name"}
                                        </label>
                                        <div
                                            className="w-full min-h-[56px] px-4 py-3 border border-gray-300 rounded-lg text-base bg-gray-50 flex items-center"
                                            style={{
                                                fontFamily: "Roboto",
                                                color: "rgba(33, 28, 77, 0.8)",
                                                textAlign: isRTL ? "right" : "left",
                                            }}
                                        >
                                            {bankDetails.accountHolderName || (isRTL ? "غير متوفر" : "Not available")}
                                        </div>
                                    </div>

                                    {/* رقم الآيبان */}
                                    <div className="space-y-2">
                                        <label
                                            className="block font-semibold text-base"
                                            style={{ color: "#211C4D", fontFamily: "Roboto" }}
                                        >
                                            {isRTL ? "رقم الآيبان (IBAN)" : "IBAN Number"}
                                        </label>
                                        <div
                                            className="w-full min-h-[56px] px-4 py-3 border border-gray-300 rounded-lg text-base bg-gray-50 flex items-center"
                                            style={{
                                                fontFamily: "Roboto",
                                                color: "rgba(33, 28, 77, 0.8)",
                                                textAlign: isRTL ? "right" : "left",
                                            }}
                                        >
                                            {bankDetails.iban || (isRTL ? "غير متوفر" : "Not available")}
                                        </div>
                                    </div>

                                    {/* رقم الحساب */}
                                    <div className="space-y-2">
                                        <label
                                            className="block font-semibold text-base"
                                            style={{ color: "#211C4D", fontFamily: "Roboto" }}
                                        >
                                            {isRTL ? "رقم الحساب" : "Account Number"}
                                        </label>
                                        <div
                                            className="w-full min-h-[56px] px-4 py-3 border border-gray-300 rounded-lg text-base bg-gray-50 flex items-center"
                                            style={{
                                                fontFamily: "Roboto",
                                                color: "rgba(33, 28, 77, 0.8)",
                                                textAlign: isRTL ? "right" : "left",
                                            }}
                                        >
                                            {bankDetails.accountNumber || (isRTL ? "غير متوفر" : "Not available")}
                                        </div>
                                    </div>

                                    {/* Branch */}
                                    {bankDetails.branch && (
                                        <div className="space-y-2">
                                            <label
                                                className="block font-semibold text-base"
                                                style={{ color: "#211C4D", fontFamily: "Roboto" }}
                                            >
                                                {isRTL ? "الفرع" : "Branch"}
                                            </label>
                                            <div
                                                className="w-full min-h-[56px] px-4 py-3 border border-gray-300 rounded-lg text-base bg-gray-50 flex items-center"
                                                style={{
                                                    fontFamily: "Roboto",
                                                    color: "rgba(33, 28, 77, 0.8)",
                                                    textAlign: isRTL ? "right" : "left",
                                                }}
                                            >
                                                {bankDetails.branch}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Bank Instructions */}
                                {bankDetails.bankInstructions && (
                                    <div className="space-y-2">
                                        <label
                                            className="block font-semibold text-base"
                                            style={{ color: "#211C4D", fontFamily: "Roboto" }}
                                        >
                                            {isRTL ? "تعليمات البنك" : "Bank Instructions"}
                                        </label>
                                        <div
                                            className="w-full min-h-[80px] px-4 py-3 border border-gray-300 rounded-lg text-base bg-gray-50"
                                            style={{
                                                fontFamily: "Roboto",
                                                color: "rgba(33, 28, 77, 0.8)",
                                                textAlign: isRTL ? "right" : "left",
                                            }}
                                        >
                                            {bankDetails.bankInstructions}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    )}

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
                                accept=".jpg,.jpeg,.png,.pdf"
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
                            ) : uploadedFile && uploadedFile.type === 'application/pdf' ? (
                                <div className="relative w-full h-full p-4 flex flex-col items-center justify-center">
                                    <svg className="w-16 h-16 text-red-500 mb-2" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M6,4H13V9H18V20H6V4M8,12V14H16V12H8M8,16V18H13V16H8Z" />
                                    </svg>
                                    <p className="text-sm font-medium text-gray-700">{uploadedFile.name}</p>
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
                                            ? "اضغط لرفع ملف (JPG, JPEG, PNG, PDF)"
                                            : "Click to upload file (JPG, JPEG, PNG, PDF)"}
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
