"use client"

import { useState, useEffect } from "react";
import { Edit3, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import userPic from "@/assets/images/User Pic.png"
import ReviewPopup from "./ReviewPopup";
import { useReviewStore } from '@/store/review/reviewStore';
import { useTranslation } from "react-i18next";

interface CommentsProps {
  productId: string | number;
}

export default function Comments({ productId }: CommentsProps) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { t } = useTranslation();
  
  // استخدام store المراجعات
  const { 
    reviews, 
    loading, 
    fetchReviews, 
    clearReviews 
  } = useReviewStore();

  useEffect(() => {
    if (productId) {
      // جلب المراجعات عند تحميل المكون
      fetchReviews({ 
        product_id: productId.toString(),
        sort_by: 'created_at',
        sort_order: 'desc'
      });
    }

    // تنظيف عند إغلاق المكون
    return () => {
      clearReviews();
    };
  }, [productId, fetchReviews, clearReviews]);

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

  // إعادة تحميل المراجعات بعد إضافة مراجعة جديدة
  const handleReviewSubmitted = () => {
    fetchReviews({ 
      product_id: productId.toString(),
      sort_by: 'created_at',
      sort_order: 'desc'
    });
  }

  if (loading && reviews.length === 0) {
    return (
      <div className="rounded-lg bg-white p-4 md:p-8" dir="rtl">
        <div className="mb-4 md:mb-6 flex items-center justify-between">
          <h2 className="text-2xl md:text-[28px] font-bold text-[#211C4D]">
            {t("review.reviews") || "مراجعات"}
          </h2>
        </div>
        <div className="text-center py-8">
          <p className="text-gray-500">جاري تحميل المراجعات...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-lg bg-white p-4 md:p-8" dir="rtl">
        <div className="mb-4 md:mb-6 flex items-center justify-between">
          <h2 className="text-2xl md:text-[28px] font-bold text-[#211C4D]">
            {t("review.reviews") || "مراجعات"} ({reviews.length})
          </h2>
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 rounded-lg bg-[#211C4D17] px-4 py-2 md:px-5 md:py-2.5 text-[12px] md:text-[14px] font-medium text-[#211C4D] hover:bg-[#211C4D25]"
            onClick={() => setIsPopupOpen(true)}
          >
            {t("review.write_review") || "اكتب مراجعة"}
            <Edit3 className="h-3 w-3 md:h-4 md:w-4" />
          </Button>
        </div>

        {reviews.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">
              {t("review.no_reviews") || "لا توجد مراجعات لهذا المنتج بعد."}
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-4 gap-1.5 rounded-lg bg-[#211C4D17] px-4 py-2 md:px-5 md:py-2.5 text-[12px] md:text-[14px] font-medium text-[#211C4D] hover:bg-[#211C4D25]"
              onClick={() => setIsPopupOpen(true)}
            >
              {t("review.be_first") || "كن أول من يقيّم"}
              <Edit3 className="h-3 w-3 md:h-4 md:w-4" />
            </Button>
          </div>
        ) : (
          <div className="space-y-4 md:space-y-6">
            {reviews.map((comment) => (
              <div key={comment.id} className="rounded-lg bg-[#FAFAFA] p-4 md:p-6">
                <div className="mb-3 md:mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2 md:gap-3">
                    <img 
                      src={comment.user_avatar || userPic} 
                      alt={comment.user_name} 
                      className="h-10 w-10 md:h-14 md:w-14 rounded-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = userPic;
                      }}
                    />
                    <div>
                      <h3 className="text-sm md:text-base font-bold text-[#211C4D]">
                        {comment.user_name}
                      </h3>
                      <p className="text-xs md:text-sm text-[#211C4DB2]">
                        {new Date(comment.created_at).toLocaleDateString('ar-SA')}
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    {renderStars(comment.rating)}
                  </div>
                </div>
                <p className="text-right text-sm md:text-base leading-relaxed text-[#211C4DE5]">
                  {comment.comment}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {isPopupOpen && (
        <ReviewPopup 
          productId={productId}
          onClose={() => setIsPopupOpen(false)}
          onReviewSubmitted={handleReviewSubmitted}
        />
      )}
    </>
  )
}