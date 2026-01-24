import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { MapPin, Building2, Home, Navigation, Hash, Mail } from "lucide-react";

interface City {
    id: number;
    name: string;
}

interface SaudiNationalAddressFormProps {
    register: any;
    errors: any;
    watch?: any;
    setValue?: any;
    cities: City[];
    isLoading?: boolean;
}

// Validation patterns
const POSTAL_CODE_PATTERN = /^\d{5}$/;
const ADDITIONAL_NUMBER_PATTERN = /^\d{4}$/;
const BUILDING_NUMBER_PATTERN = /^\d+$/;
const PO_BOX_PATTERN = /p\.?\s*o\.?\s*box|صندوق\s*بريد|ص\.?\s*ب\.?/i;

export default function SaudiNationalAddressForm({
    register,
    errors,
    setValue,
    cities,
    isLoading = false,
}: SaudiNationalAddressFormProps) {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === "ar";

    // Set default country value
    useEffect(() => {
        if (setValue) {
            setValue("country", "المملكة العربية السعودية");
        }
    }, [setValue]);

    // P.O Box validation function
    const validateNoPOBox = (value: string) => {
        if (PO_BOX_PATTERN.test(value)) {
            return t("saudiNationalAddress.validation.noPOBox");
        }
        return true;
    };

    const inputBaseClass = `w-full bg-[#F6F6F6] rounded-lg px-4 py-3 text-[#211C4D] focus:outline-none transition-all duration-200`;
    const inputErrorClass = `border-2 border-red-500`;
    const inputValidClass = `focus:ring-2 focus:ring-[#F3AC5D] focus:border-[#F3AC5D] border border-transparent`;

    const labelClass = `block text-[#211C4D] mb-2 text-[15px] font-medium flex items-center gap-2`;
    const errorClass = `mt-1.5 text-red-500 text-sm flex items-center gap-1`;
    const requiredBadge = `text-red-500 text-xs`;
    const optionalBadge = `text-gray-400 text-xs font-normal`;

    return (
        <div
            className="bg-white rounded-2xl border border-[#E5E5E5] p-6 shadow-sm"
            dir={isRTL ? "rtl" : "ltr"}
        >
            {/* Section Header */}
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 bg-gradient-to-br from-[#F3AC5D] to-[#FF7B54] rounded-xl flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                    <h3 className="text-[#211C4D] text-xl font-bold">
                        {t("saudiNationalAddress.title")}
                    </h3>
                    <p className="text-gray-500 text-sm">
                        {t("saudiNationalAddress.deliveryNote")}
                    </p>
                </div>
            </div>

            <div className="space-y-5">
                {/* Building Number */}
                <div>
                    <label className={labelClass}>
                        <Building2 className="w-4 h-4 text-[#F3AC5D]" />
                        {t("saudiNationalAddress.buildingNumber")}
                        <span className={requiredBadge}>*</span>
                    </label>
                    <input
                        type="text"
                        inputMode="numeric"
                        placeholder={t("saudiNationalAddress.placeholders.buildingNumber")}
                        className={`${inputBaseClass} ${errors.building_number ? inputErrorClass : inputValidClass
                            }`}
                        {...register("building_number", {
                            required: t("saudiNationalAddress.validation.buildingNumberRequired"),
                            pattern: {
                                value: BUILDING_NUMBER_PATTERN,
                                message: t("saudiNationalAddress.validation.buildingNumberDigitsOnly"),
                            },
                        })}
                    />
                    {errors.building_number && (
                        <p className={errorClass}>
                            <span className="text-red-500">⚠</span>
                            {errors.building_number.message}
                        </p>
                    )}
                </div>

                {/* Street Name */}
                <div>
                    <label className={labelClass}>
                        <Navigation className="w-4 h-4 text-[#F3AC5D]" />
                        {t("saudiNationalAddress.streetName")}
                        <span className={requiredBadge}>*</span>
                    </label>
                    <input
                        type="text"
                        placeholder={t("saudiNationalAddress.placeholders.streetName")}
                        className={`${inputBaseClass} ${errors.street_name ? inputErrorClass : inputValidClass
                            }`}
                        {...register("street_name", {
                            required: t("saudiNationalAddress.validation.streetNameRequired"),
                            minLength: {
                                value: 2,
                                message: t("saudiNationalAddress.validation.streetNameMinLength"),
                            },
                            validate: validateNoPOBox,
                        })}
                    />
                    {errors.street_name && (
                        <p className={errorClass}>
                            <span className="text-red-500">⚠</span>
                            {errors.street_name.message}
                        </p>
                    )}
                </div>

                {/* District */}
                <div>
                    <label className={labelClass}>
                        <Home className="w-4 h-4 text-[#F3AC5D]" />
                        {t("saudiNationalAddress.district")}
                        <span className={requiredBadge}>*</span>
                    </label>
                    <input
                        type="text"
                        placeholder={t("saudiNationalAddress.placeholders.district")}
                        className={`${inputBaseClass} ${errors.district ? inputErrorClass : inputValidClass
                            }`}
                        {...register("district", {
                            required: t("saudiNationalAddress.validation.districtRequired"),
                            minLength: {
                                value: 2,
                                message: t("saudiNationalAddress.validation.districtMinLength"),
                            },
                            validate: validateNoPOBox,
                        })}
                    />
                    {errors.district && (
                        <p className={errorClass}>
                            <span className="text-red-500">⚠</span>
                            {errors.district.message}
                        </p>
                    )}
                </div>

                {/* City and Postal Code Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* City */}
                    <div>
                        <label className={labelClass}>
                            <MapPin className="w-4 h-4 text-[#F3AC5D]" />
                            {t("City")}
                            <span className={requiredBadge}>*</span>
                        </label>
                        <div className="relative">
                            <select
                                className={`${inputBaseClass} appearance-none cursor-pointer ${errors.city_id ? inputErrorClass : inputValidClass
                                    } ${isRTL ? "pr-4 pl-10" : "pl-4 pr-10"}`}
                                {...register("city_id", {
                                    required: t("City is required"),
                                    validate: (value: string) => value !== "" || t("Please select a city"),
                                })}
                                disabled={isLoading}
                            >
                                <option value="">{t("Select City")}</option>
                                {cities.map((city) => (
                                    <option key={city.id} value={city.id}>
                                        {city.name}
                                    </option>
                                ))}
                            </select>
                            <svg
                                className={`absolute top-1/2 ${isRTL ? "left-3" : "right-3"} w-4 h-4 text-[#747783] transform -translate-y-1/2 pointer-events-none`}
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                            </svg>
                        </div>
                        {errors.city_id && (
                            <p className={errorClass}>
                                <span className="text-red-500">⚠</span>
                                {errors.city_id.message}
                            </p>
                        )}
                    </div>

                    {/* Postal Code */}
                    <div>
                        <label className={labelClass}>
                            <Mail className="w-4 h-4 text-[#F3AC5D]" />
                            {t("saudiNationalAddress.postalCode")}
                            <span className={requiredBadge}>*</span>
                        </label>
                        <input
                            type="text"
                            inputMode="numeric"
                            maxLength={5}
                            placeholder={t("saudiNationalAddress.placeholders.postalCode")}
                            className={`${inputBaseClass} ${errors.postal_code ? inputErrorClass : inputValidClass
                                }`}
                            {...register("postal_code", {
                                required: t("saudiNationalAddress.validation.postalCodeRequired"),
                                pattern: {
                                    value: POSTAL_CODE_PATTERN,
                                    message: t("saudiNationalAddress.validation.postalCodeFormat"),
                                },
                            })}
                        />
                        {errors.postal_code && (
                            <p className={errorClass}>
                                <span className="text-red-500">⚠</span>
                                {errors.postal_code.message}
                            </p>
                        )}
                    </div>
                </div>

                {/* Additional Number (Optional) */}
                <div>
                    <label className={labelClass}>
                        <Hash className="w-4 h-4 text-[#F3AC5D]" />
                        {t("saudiNationalAddress.additionalNumber")}
                        <span className={optionalBadge}>({t("saudiNationalAddress.optional")})</span>
                    </label>
                    <input
                        type="text"
                        inputMode="numeric"
                        maxLength={4}
                        placeholder={t("saudiNationalAddress.placeholders.additionalNumber")}
                        className={`${inputBaseClass} ${errors.additional_number ? inputErrorClass : inputValidClass
                            }`}
                        {...register("additional_number", {
                            pattern: {
                                value: ADDITIONAL_NUMBER_PATTERN,
                                message: t("saudiNationalAddress.validation.additionalNumberFormat"),
                            },
                        })}
                    />
                    {errors.additional_number && (
                        <p className={errorClass}>
                            <span className="text-red-500">⚠</span>
                            {errors.additional_number.message}
                        </p>
                    )}
                </div>

                {/* Country (Fixed) */}
                <div>
                    <label className={labelClass}>
                        <MapPin className="w-4 h-4 text-[#F3AC5D]" />
                        {t("saudiNationalAddress.country")}
                    </label>
                    <div className="flex items-center gap-3 bg-[#F6F6F6] rounded-lg px-4 py-3">
                        <span className="text-2xl">🇸🇦</span>
                        <span className="text-[#211C4D] font-semibold">
                            {t("saudiNationalAddress.saudiArabia")}
                        </span>
                    </div>
                    <input type="hidden" {...register("country")} />
                </div>
            </div>

            {/* Info Note */}
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-lg">ℹ️</span>
                    </div>
                    <p className="text-blue-700 text-sm leading-relaxed">
                        {t("saudiNationalAddress.deliveryNote")}
                    </p>
                </div>
            </div>
        </div>
    );
}
