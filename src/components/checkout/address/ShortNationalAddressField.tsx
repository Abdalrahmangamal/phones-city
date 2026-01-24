import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { UseFormRegister, FieldErrors, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { MapPin, Info, Check, X } from "lucide-react";

interface ShortNationalAddressFieldProps {
    register: UseFormRegister<any>;
    errors: FieldErrors<any>;
    setValue?: UseFormSetValue<any>;
    watch?: UseFormWatch<any>;
}

// Regex pattern for Short National Address: 4 uppercase letters + 4 digits
const SHORT_ADDRESS_PATTERN = /^[A-Z]{4}[0-9]{4}$/;

export default function ShortNationalAddressField({
    register,
    errors,
    setValue,
    watch,
}: ShortNationalAddressFieldProps) {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === "ar";
    const [showTooltip, setShowTooltip] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [isValid, setIsValid] = useState<boolean | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Handle input change with live validation
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;

        // Remove Arabic characters
        value = value.replace(/[\u0600-\u06FF]/g, "");

        // Remove spaces and special characters (only allow A-Z and 0-9)
        value = value.replace(/[^A-Za-z0-9]/g, "");

        // Convert to uppercase
        value = value.toUpperCase();

        // Limit to 8 characters
        value = value.slice(0, 8);

        // Enforce pattern: first 4 must be letters, last 4 must be digits
        let formatted = "";
        for (let i = 0; i < value.length; i++) {
            const char = value[i];
            if (i < 4) {
                // First 4 characters must be letters
                if (/[A-Z]/.test(char)) {
                    formatted += char;
                }
            } else {
                // Last 4 characters must be digits
                if (/[0-9]/.test(char)) {
                    formatted += char;
                }
            }
        }

        setInputValue(formatted);

        // Update form value
        if (setValue) {
            setValue("short_national_address", formatted, { shouldValidate: false });
        }

        // Validate
        if (formatted.length === 0) {
            setIsValid(null);
        } else if (formatted.length === 8 && SHORT_ADDRESS_PATTERN.test(formatted)) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    };

    // Handle blur validation
    const handleBlur = () => {
        setShowTooltip(false);
        if (inputValue.length === 0) {
            setIsValid(null);
        } else if (SHORT_ADDRESS_PATTERN.test(inputValue)) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    };

    const getInputBorderClass = () => {
        if (isValid === true) {
            return "border-2 border-green-500 focus:ring-green-500/30";
        } else if (isValid === false) {
            return "border-2 border-red-500 focus:ring-red-500/30";
        }
        return "border border-transparent focus:ring-[#F3AC5D] focus:border-[#F3AC5D]";
    };

    return (
        <div
            className="bg-white rounded-2xl border border-[#E5E5E5] p-6 shadow-sm"
            dir={isRTL ? "rtl" : "ltr"}
        >
            {/* Section Header */}
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 bg-gradient-to-br from-[#00A651] to-[#006B3F] rounded-xl flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                    <h3 className="text-[#211C4D] text-xl font-bold flex items-center gap-2">
                        {t("shortNationalAddress.title")}
                        <span className="text-xs font-normal text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                            {t("shortNationalAddress.optional")}
                        </span>
                    </h3>
                    <p className="text-gray-500 text-sm">
                        {t("shortNationalAddress.description")}
                    </p>
                </div>
            </div>

            {/* Input Field with Tooltip */}
            <div className="relative">
                <label className="block text-[#211C4D] mb-2 text-[15px] font-medium flex items-center gap-2">
                    {t("shortNationalAddress.label")}
                    <button
                        type="button"
                        className="text-gray-400 hover:text-[#F3AC5D] transition-colors"
                        onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                        onClick={() => setShowTooltip(!showTooltip)}
                    >
                        <Info className="w-4 h-4" />
                    </button>
                </label>

                {/* Tooltip */}
                {showTooltip && (
                    <div
                        className={`absolute z-50 ${isRTL ? "right-0" : "left-0"} top-0 transform -translate-y-full mb-2 w-80`}
                    >
                        <div className="bg-[#211C4D] text-white rounded-xl p-4 shadow-xl">
                            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/20">
                                <Info className="w-5 h-5 text-[#F3AC5D]" />
                                <span className="font-bold">{t("shortNationalAddress.tooltip.title")}</span>
                            </div>
                            <ul className={`space-y-2 text-sm ${isRTL ? "pr-2" : "pl-2"}`}>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#F3AC5D] mt-0.5">•</span>
                                    <span>{t("shortNationalAddress.tooltip.rule1")}</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#F3AC5D] mt-0.5">•</span>
                                    <span>{t("shortNationalAddress.tooltip.rule2")}</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#F3AC5D] mt-0.5">•</span>
                                    <span>{t("shortNationalAddress.tooltip.rule3")}</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#F3AC5D] mt-0.5">•</span>
                                    <span>{t("shortNationalAddress.tooltip.rule4")}</span>
                                </li>
                            </ul>
                            <div className="mt-3 pt-2 border-t border-white/20">
                                <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2">
                                    <span className="text-gray-300 text-sm">{t("shortNationalAddress.tooltip.example")}:</span>
                                    <code className="bg-[#F3AC5D] text-[#211C4D] px-3 py-1 rounded font-bold tracking-wider">
                                        RRRD2929
                                    </code>
                                </div>
                            </div>
                            {/* Arrow */}
                            <div
                                className={`absolute bottom-0 ${isRTL ? "right-6" : "left-6"} transform translate-y-full`}
                            >
                                <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-[#211C4D]"></div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Input */}
                <div className="relative">
                    <input
                        ref={inputRef}
                        type="text"
                        inputMode="text"
                        maxLength={8}
                        placeholder="RRRD2929"
                        value={inputValue}
                        onChange={handleInputChange}
                        onFocus={() => setShowTooltip(true)}
                        onBlur={handleBlur}
                        className={`w-full bg-[#F6F6F6] rounded-lg px-4 py-4 text-[#211C4D] text-xl font-mono tracking-[0.3em] text-center uppercase focus:outline-none focus:ring-2 transition-all duration-200 ${getInputBorderClass()} ${isRTL ? "pr-12" : "pl-12"}`}
                        style={{ letterSpacing: "0.3em" }}
                        {...register("short_national_address", {
                            validate: (value) => {
                                if (!value || value.length === 0) return true; // Optional field
                                if (!SHORT_ADDRESS_PATTERN.test(value)) {
                                    return t("shortNationalAddress.validation.invalidFormat");
                                }
                                return true;
                            },
                        })}
                    />

                    {/* Status Icon */}
                    <div
                        className={`absolute top-1/2 ${isRTL ? "right-4" : "left-4"} transform -translate-y-1/2`}
                    >
                        {isValid === true && (
                            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                <Check className="w-4 h-4 text-white" />
                            </div>
                        )}
                        {isValid === false && (
                            <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                                <X className="w-4 h-4 text-white" />
                            </div>
                        )}
                        {isValid === null && (
                            <MapPin className="w-5 h-5 text-gray-400" />
                        )}
                    </div>

                    {/* Character Counter */}
                    <div
                        className={`absolute top-1/2 ${isRTL ? "left-4" : "right-4"} transform -translate-y-1/2 text-sm font-mono`}
                    >
                        <span className={inputValue.length === 8 ? "text-green-500" : "text-gray-400"}>
                            {inputValue.length}/8
                        </span>
                    </div>
                </div>

                {/* Error Message */}
                {(errors.short_national_address || (isValid === false && inputValue.length > 0)) && (
                    <div className="mt-2 p-3 bg-red-50 rounded-lg border border-red-200">
                        <p className="text-red-600 text-sm flex items-center gap-2">
                            <span>⚠</span>
                            {errors.short_national_address?.message as string || t("shortNationalAddress.validation.invalidFormat")}
                        </p>
                        <p className="text-red-500 text-xs mt-1">
                            {t("shortNationalAddress.validation.example")}
                        </p>
                    </div>
                )}

                {/* Success Message */}
                {isValid === true && (
                    <div className="mt-2 p-3 bg-green-50 rounded-lg border border-green-200">
                        <p className="text-green-600 text-sm flex items-center gap-2">
                            <Check className="w-4 h-4" />
                            {t("shortNationalAddress.validation.valid")}
                        </p>
                    </div>
                )}
            </div>

            {/* Info Note */}
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-lg">ℹ️</span>
                    </div>
                    <div>
                        <p className="text-blue-700 text-sm leading-relaxed">
                            {t("shortNationalAddress.note")}
                        </p>
                        <p className="text-blue-500 text-xs mt-1">
                            {t("shortNationalAddress.noteOptional")}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
