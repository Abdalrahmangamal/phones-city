"use client"

import { useState } from "react";
import { Edit3, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import userPic from "@/assets/images/User Pic.png"
import ReviewPopup from "./ReviewPopup";

interface Comment {
  id: string
  userName: string
  date: string
  rating: number
  content: string
  userAvatar?: string
}

interface CommentsProps {
  productId?: string
}

export default function Comments({ productId }: CommentsProps) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  // Mock data - in a real app, this would come from an API
  const comments: Comment[] = [
    {
      id: "1",
      userName: "يوسف محمد",
      date: "24 January,2023",
      rating: 5,
      content: "اللابتوب يتعامل مع جميع مهامي المتعلقة بالعمل بكل سهولة. عمر البطارية جيد، وجودة البناء تشعر بأنها عالية الجودة. أوصي به بشدة للمهنيين!"
    },
    {
      id: "2",
      userName: "سارة أحمد",
      date: "15 December,2022",
      rating: 4,
      content: "منتج ممتاز بسعر مناسب. الشاشة واضحة والأداء سريع. كان عليّ فقط أن أعتاد على لوحة المفاتيح، لكن باقي المنتج رائع."
    },
    {
      id: "3",
      userName: "محمد علي",
      date: "10 November,2022",
      rating: 5,
      content: "أشتريت هذا اللابتوب لأطفالي للدراسة وأدائه أكثر من ممتاز. سريع وسهل الاستخدام. خدمة الشحن كانت سريعة أيضاً."
    }
  ]

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 md:w-6 md:h-6 ${
              star <= rating
                ? "fill-[#F3AC5D] text-[#F3AC5D]"
                : "fill-none text-[#F3AC5D]"
            }`}
          />
        ))}
      </div>
    )
  }

  return (
    <>
      <div className="rounded-lg bg-white p-4 md:p-8" dir="rtl">
        <div className="mb-4 md:mb-6 flex items-center justify-between">
          <h2 className="text-2xl md:text-[28px] font-bold text-[#211C4D]">مراجعات</h2>
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 rounded-lg bg-[#211C4D17] px-4 py-2 md:px-5 md:py-2.5 text-[12px] md:text-[14px] font-medium text-[#211C4D] hover:bg-[#211C4D25]"
            onClick={() => setIsPopupOpen(true)}
          >
            اكتب مراجعة
            <Edit3 className="h-3 w-3 md:h-4 md:w-4" />
          </Button>
        </div>

        <div className="space-y-4 md:space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="rounded-lg bg-[#FAFAFA] p-4 md:p-6">
              <div className="mb-3 md:mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 md:gap-3">
                  <img 
                    src={userPic} 
                    alt={comment.userName} 
                    className="h-10 w-10 md:h-14 md:w-14 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-sm md:text-base font-bold text-[#211C4D]">{comment.userName}</h3>
                    <p className="text-xs md:text-sm text-[#211C4DB2]">{comment.date}</p>
                  </div>
                </div>
                <div className="flex">
                  {renderStars(comment.rating)}
                </div>
              </div>
              <p className="text-right text-sm md:text-base leading-relaxed text-[#211C4DE5]">
                {comment.content}
              </p>
            </div>
          ))}
        </div>
      </div>
      {isPopupOpen && <ReviewPopup onClose={() => setIsPopupOpen(false)} />}
    </>
  )
}