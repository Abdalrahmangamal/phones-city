"use client";
import "@/style.css";
import { useState } from "react";
import { X, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import laptops from "@/assets/images/airbuds.png";
import orangelabtop from "@/assets/images/orangelabtop.png";
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export default function CartSummary() {
  const [items, setItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "لابتوب أبل ماك بوك برو 13 M2، بيضاء",
      price: 1104,
      quantity: 1,
      image: orangelabtop,
    },
    {
      id: "2",
      name: "لابتوب أبل ماك بوك برو 13 M2، بيضاء",
      price: 399,
      quantity: 1,
      image: laptops,
    },
  ]);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="w-full max-w-2xl mx-auto" dir="rtl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[24px] font-[600]  text-[#211C4D] text-right">
          ملخص السلة
        </h1>
      </div>

      {/* Cart Items */}
      <div className="space-y-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between gap-1 lg:p-4 border-b border-border   hover:bg-muted/50 transition-colors"
          >
            {/* Right side - Product image */}
            <div className="flex-shrink-0">
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                className="lg:w-23 lg:h-23  md:w-20 w-20 md:h-20 h-20  object-contain  "
              />
            </div>

            {/* Center - Quantity controls and info */}
            <div className="flex-1 lg:pl-[40px] flex justify-between  ">
              {/* Product info */}
              <div className="text-sm  text-right">
                <p className="md:text-[16px] text-[11px]  max-w-[130px] font-[500] text-[#211C4D] ">
                  {item.name}
                </p>
                <p className="text-xs mt-1">#{item.id}</p>
              </div>
              <div className="flex items-center   rounded-md bg-background">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="h-8 w-8 text-black p-0"
                >
                  <Plus className="w-4 h-4" />
                </Button>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(
                      item.id,
                      Number.parseInt(e.target.value) || 1
                    )
                  }
                  className="w-[40px] h-[32px] border text-black outline-1 border-[#D9D9D9] rounded-[4px] text-center"
                  min="1"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="h-8 w-8 p-0 text-black"
                >
                  <Minus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex items-center gap-3">
                {/* Price */}
                <span className="font-bold text-[13px] md:text-lg text-foreground">
                  {item.price.toLocaleString("ar-SA")} ريس
                </span>
              </div>
            </div>
            {/* Left side - Remove button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeItem(item.id)}
              className="text-[#211C4D] hover:text-destructive hover:bg-destructive/10"
            >
              <X className="!w-[24px] !h-[24px] !font-[100] " />
            </Button>
          </div>
        ))}
      </div>

      {/* Total */}
      {items.length > 0 && (
        <div className="mt-8 p-4 bg-muted rounded-lg border border-border">
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-foreground">
              {total.toLocaleString("ar-SA")} ريس
            </span>
            <span className="text-muted-foreground">الإجمالي:</span>
          </div>
        </div>
      )}

      {/* Empty state */}
      {items.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">السلة فارغة</p>
        </div>
      )}
    </div>
  );
}
