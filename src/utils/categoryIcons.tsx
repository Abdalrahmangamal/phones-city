import {
    Smartphone,
    Tablet,
    Laptop,
    Headphones,
    Watch,
    Gamepad,
    Camera,
    Battery,
    Speaker,
    Component,
    Tv,
    Monitor,
    HardDrive,
    Cable,
    Router,
    Zap,
    TrendingUp,
    Landmark,
    Percent,
    Cpu
} from "lucide-react";
import React from "react";

// Custom Apple Icon
const AppleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        {...props}
        viewBox="0 0 384 512"
        fill="currentColor"
        height="1em"
        width="1em"
    >
        <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 52.3-11.4 69.5-34.3z" />
    </svg>
);

export const getCategoryIcon = (name: string, slug: string): React.ReactNode => {
    // Ensure we check safely even if values are undefined/null
    const lowerName = (name || "").toLowerCase();
    const lowerSlug = (slug || "").toLowerCase();

    // Brands (Prioritize specific brand logos if matching)
    if (lowerName.includes("apple") || lowerName.includes("iphone") || lowerName.includes("ايفون") || lowerName.includes("آبل") || lowerSlug.includes("apple") || lowerSlug.includes("iphone")) {
        return <AppleIcon className="w-4 h-4" />;
    }

    // Specific Product Types - Check these BEFORE generic brands like Samsung to avoid a Samsung Charger showing a phone icon

    // Best Sellers (Rising Arrow)
    if (lowerName.includes("best seller") || lowerName.includes("الأكثر مبيعا") || lowerName.includes("الاكثر مبيعا") || lowerName.includes("bestseller")) {
        return <TrendingUp className="w-4 h-4" />;
    }

    // Latest Offers
    if (lowerName.includes("offer") || lowerName.includes("discount") || lowerName.includes("sale") || lowerName.includes("عروض") || lowerName.includes("خصومات")) {
        return <Percent className="w-4 h-4" />;
    }

    // Bank Transfer
    if (lowerName.includes("bank") || lowerName.includes("transfer") || lowerName.includes("تحويل") || lowerName.includes("بنكي") || lowerName.includes("بنك")) {
        return <Landmark className="w-4 h-4" />;
    }

    // Electronics
    if (lowerName.includes("electronic") || lowerName.includes("إلكتروني") || lowerName.includes("الكتروني") || lowerName.includes("أجهزة") || lowerName.includes("اجهزة")) {
        return <Cpu className="w-4 h-4" />;
    }

    // Headphones / Audio / AirPods
    if (
        lowerName.includes("headphone") ||
        lowerName.includes("headset") ||
        lowerName.includes("earphone") ||
        lowerName.includes("airpods") ||
        lowerName.includes("bud") ||
        lowerName.includes("audio") ||
        lowerName.includes("sound") ||
        lowerName.includes("speaker") ||
        lowerName.includes("سماعة") ||
        lowerName.includes("سماعات") ||
        lowerName.includes("ايربودز") ||
        lowerName.includes("صوتيات")
    ) {
        // If it's specifically a speaker
        if (lowerName.includes("speaker") || lowerName.includes("مكبر")) return <Speaker className="w-4 h-4" />;
        return <Headphones className="w-4 h-4" />;
    }

    // Chargers / Cables / Adapters
    if (
        lowerName.includes("charger") ||
        lowerName.includes("adapter") ||
        lowerName.includes("cable") ||
        lowerName.includes("power") ||
        lowerName.includes("wire") ||
        lowerName.includes("شاحن") ||
        lowerName.includes("شواحن") ||
        lowerName.includes("كيبل") ||
        lowerName.includes("كابل") ||
        lowerName.includes("وصلة") ||
        lowerName.includes("رأس") ||
        lowerName.includes("فيش")
    ) {
        if (lowerName.includes("cable") || lowerName.includes("كيبل") || lowerName.includes("كابل") || lowerName.includes("wire") || lowerName.includes("سلك")) {
            return <Cable className="w-4 h-4" />;
        }
        return <Zap className="w-4 h-4" />; // Use Zap for power/chargers
    }

    // Batteries / Power Banks
    if (
        lowerName.includes("battery") ||
        lowerName.includes("power bank") ||
        lowerName.includes("powerbank") ||
        lowerName.includes("بطارية") ||
        lowerName.includes("بطاريات") ||
        lowerName.includes("باور") ||
        lowerName.includes("بنك طاقة")
    ) {
        return <Battery className="w-4 h-4" />;
    }

    // Smartwatches / Wearables
    if (
        lowerName.includes("watch") ||
        lowerName.includes("wearable") ||
        lowerName.includes("band") ||
        lowerName.includes("ساعة") ||
        lowerName.includes("ساعات") ||
        lowerName.includes("سوار")
    ) {
        return <Watch className="w-4 h-4" />;
    }

    // Routers / Networking
    if (
        lowerName.includes("router") ||
        lowerName.includes("network") ||
        lowerName.includes("wifi") ||
        lowerName.includes("modem") ||
        lowerName.includes("راوتر") ||
        lowerName.includes("روتر") ||
        lowerName.includes("شبكة") ||
        lowerName.includes("مودم") ||
        lowerName.includes("نت") ||
        lowerName.includes("مقوي")
    ) {
        return <Router className="w-4 h-4" />;
    }

    // Cameras
    if (
        lowerName.includes("camera") ||
        lowerName.includes("photo") ||
        lowerName.includes("lens") ||
        lowerName.includes("كاميرا") ||
        lowerName.includes("تصوير") ||
        lowerName.includes("عدسة")
    ) {
        return <Camera className="w-4 h-4" />;
    }

    // Tablets / iPads
    if (
        lowerName.includes("tablet") ||
        lowerName.includes("ipad") ||
        lowerName.includes("tab") ||
        lowerName.includes("تابلت") ||
        lowerName.includes("ايباد") ||
        lowerName.includes("لوحي")
    ) {
        return <Tablet className="w-4 h-4" />;
    }

    // Laptops / Computers
    if (
        lowerName.includes("laptop") ||
        lowerName.includes("macbook") ||
        lowerName.includes("notebook") ||
        lowerName.includes("computer") ||
        lowerName.includes("pc") ||
        lowerName.includes("لابتوب") ||
        lowerName.includes("لاب توب") ||
        lowerName.includes("كمبيوتر") ||
        lowerName.includes("ماك بوك")
    ) {
        return <Laptop className="w-4 h-4" />;
    }

    // TV / Monitors
    if (
        lowerName.includes("monitor") ||
        lowerName.includes("screen") ||
        lowerName.includes("display") ||
        lowerName.includes("tv") ||
        lowerName.includes("television") ||
        lowerName.includes("شاشة") ||
        lowerName.includes("تلفزيون") ||
        lowerName.includes("تلفاز")
    ) {
        if (lowerName.includes("tv") || lowerName.includes("television") || lowerName.includes("تلفزيون")) {
            return <Tv className="w-4 h-4" />;
        }
        return <Monitor className="w-4 h-4" />;
    }

    // Gaming
    if (
        lowerName.includes("game") ||
        lowerName.includes("console") ||
        lowerName.includes("playstation") ||
        lowerName.includes("xbox") ||
        lowerName.includes("ps5") ||
        lowerName.includes("ps4") ||
        lowerName.includes("controller") ||
        lowerName.includes("لعبة") ||
        lowerName.includes("العاب") ||
        lowerName.includes("بلاستيشن") ||
        lowerName.includes("اكس بوكس") ||
        lowerName.includes("تحكم") ||
        lowerName.includes("يد")
    ) {
        return <Gamepad className="w-4 h-4" />;
    }

    // Storage / Hard Drives
    if (
        lowerName.includes("storage") ||
        lowerName.includes("disk") ||
        lowerName.includes("drive") ||
        lowerName.includes("memory") ||
        lowerName.includes("sd") ||
        lowerName.includes("تخزين") ||
        lowerName.includes("ذاكرة") ||
        lowerName.includes("هارد") ||
        lowerName.includes("قرص")
    ) {
        return <HardDrive className="w-4 h-4" />;
    }

    // Accessories (Generic)
    if (
        lowerName.includes("accessory") ||
        lowerName.includes("accessories") ||
        lowerName.includes("case") ||
        lowerName.includes("cover") ||
        lowerName.includes("اكسسوار") ||
        lowerName.includes("ملحقات") ||
        lowerName.includes("كفر") ||
        lowerName.includes("غطاء") ||
        lowerName.includes("حماية") ||
        lowerName.includes("protection")
    ) {
        return <Component className="w-4 h-4" />;
    }

    // Brands (Fallback if no specific product type matched)
    if (lowerName.includes("samsung") || lowerSlug.includes("samsung") || lowerName.includes("سامسونج") || lowerName.includes("galaxy")) {
        return <Smartphone className="w-4 h-4" />;
    }
    if (lowerName.includes("huawei") || lowerSlug.includes("huawei") || lowerName.includes("هواوي")) {
        return <Smartphone className="w-4 h-4" />;
    }
    if (lowerName.includes("xiaomi") || lowerSlug.includes("xiaomi") || lowerName.includes("شاومي")) {
        return <Smartphone className="w-4 h-4" />;
    }
    if (lowerName.includes("honor") || lowerSlug.includes("honor") || lowerName.includes("هونر")) {
        return <Smartphone className="w-4 h-4" />;
    }

    // Default
    return <Smartphone className="w-4 h-4" />; // Matches Phones/Generic
};
