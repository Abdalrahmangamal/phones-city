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
      content: "أشتريت هذا اللابتوب لأطفالي للدراسة وأداءه أكثر من ممتاز. سريع وسهل الاستخدام. خدمة الشحن كانت سريعة أيضاً."
    }
  ]

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-6 h-6 ${
              star <= rating
                ? "fill-[#F3AC5D] text-[#F3AC5D]"
                : "fill-none text-[#F3AC5D] border border-[#F3AC5D]"
            }`}
          />
        ))}
      </div>
    )
  }

  return (
    <>
      <div className="rounded-lg bg-white p-8" dir="rtl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-[28px] font-bold text-[#211C4D]">مراجعات</h2>
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 rounded-lg bg-[#211C4D17] px-5 py-2.5 text-[14px] font-medium text-[#211C4D] hover:bg-[#211C4D25]"
            onClick={() => setIsPopupOpen(true)}
          >
            اكتب مراجعة
            <Edit3 className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="rounded-lg bg-[#FAFAFA] p-6">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img 
                    src={userPic} 
                    alt={comment.userName} 
                    className="h-14 w-14 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-base font-bold text-[#211C4D]">{comment.userName}</h3>
                    <p className="text-sm text-[#211C4DB2]">{comment.date}</p>
                  </div>
                </div>
                <div className="flex">
                  {renderStars(comment.rating)}
                </div>
              </div>
              <p className="text-right text-base leading-relaxed text-[#211C4DE5]">
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