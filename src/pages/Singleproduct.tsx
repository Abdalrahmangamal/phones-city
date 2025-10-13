"use client";

import { useState } from "react";
import { Plus, Minus, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import Gallery from "@/components/singleproduct/Gallery";
import tamara from "@/assets/images/tamara.png";
import { Link } from "react-router-dom";

export default function ProductPage() {
  const [selectedColor, setSelectedColor] = useState("blue");
  const [quantity, setQuantity] = useState(1);

  const colors = [
    { name: "black", value: "#000000" },
    { name: "gray", value: "#9CA3AF" },
    { name: "pink", value: "#FFC0CB" },
    { name: "white", value: "#FFFFFF" },
    { name: "blue", value: "#1E3A8A" },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-background" dir="rtl">
        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <div className="bg-card rounded-lg shadow-sm p-8">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Product Images */}
              <Gallery />
              {/* Product Details */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-bold text-foreground leading-relaxed mb-3">
                    لابتوبه 15ARP9 من أبل مع شريحة ذكاء اصطناعي، شاشة 15.6 إنش
                    FHD IPS 100%، ذاكرة RAM 7.743SHS، رايزن SRGB 144Hz
                  </h1>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-[22px] h-[22px] ${
                            star <= 4
                              ? "fill-[#FC9231] text-[#FC9231]"
                              : "fill-none text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      (68 مراجعة)
                    </span>
                  </div>
                  <p className="text-sm text-primary">أختر لونك</p>
                </div>

                {/* Color Selection */}
                <div className="flex gap-3">
                  {colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        selectedColor === color.name
                          ? "border-primary scale-110"
                          : "border-border hover:border-muted-foreground"
                      }`}
                      style={{
                        backgroundColor: color.value,
                        boxShadow:
                          color.name === "white"
                            ? "inset 0 0 0 1px #e5e7eb"
                            : "none",
                      }}
                      aria-label={color.name}
                    />
                  ))}
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-[#C33104]">
                    1,104 ريس
                  </span>
                  <span className="text-lg text-muted-foreground line-through">
                    1,299 ريس
                  </span>
                </div>

                {/* Payment Options */}
                <div className="space-y-3 pt-6">
                  <div className="flex items-center gap-3 p-3 h-[72px] rounded-lg border-1 border-[#0000004D]">
                    <p className="text-[16px] font-[600] text-[#211C4D] ">
                      او قسم فاتورتك علي 3 دفعات بقيمه 24,020 رس بدون رسوم تأخير
                      ، <Link to={""}>لمعرفة التفاصيل</Link> متوافقه مع الشريعه الاسلاميه 
                    </p>
                    <div className="px-4 py-1 rounded text-sm font-bold text-card"><img src={tamara} className="w-[120px]" alt="" /></div>
                  </div>

                 
                </div>

                {/* Quantity and Add to Cart */}
                <div className="flex gap-4 pt-4">
                  <Button
                    size="lg"
                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg"
                  >
                    اشتري الآن
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="px-6 border-2 bg-transparent"
                  >
                    إضافة للسلة
                  </Button>
                  <div className="flex items-center border-2 border-border rounded-lg overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 hover:bg-accent transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-6 py-2 border-x-2 border-border font-bold min-w-[60px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-2 hover:bg-accent transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
}
