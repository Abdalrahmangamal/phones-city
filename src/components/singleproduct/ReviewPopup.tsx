import React, { useState } from 'react';
import { useReviewStore } from '@/store/review/reviewStore';
import { useTranslation } from 'react-i18next';

const StarIcon = ({ rating, index, active }: { rating: number, index: number, active: boolean }) => {
  let face = null;
  if (rating > 0) {
    let mouth;
    if (rating <= 2) {
      // Sad mouth
      mouth = <path d="M13 22.5 C13 22.5 15.5 20.5 18.5 20.5 C21.5 20.5 24 22.5 24 22.5" stroke={active ? '#B36622' : '#C6C6C6'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />;
    } else if (rating === 3) {
      // Neutral mouth
      mouth = <path d="M13 22.5 L24 22.5" stroke={active ? '#B36622' : '#C6C6C6'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />;
    } else {
      // Happy mouth
      mouth = <path d="M13 20.5 C13 20.5 15.5 22.5 18.5 22.5 C21.5 22.5 24 20.5 24 20.5" stroke={active ? '#B36622' : '#C6C6C6'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />;
    }
    face = (
      <g>
        <circle cx="15" cy="16" r="1.5" fill={active ? '#B36622' : '#C6C6C6'} />
        <circle cx="22" cy="16" r="1.5" fill={active ? '#B36622' : '#C6C6C6'} />
        {mouth}
      </g>
    )
  }

  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 37 37"
      fill={active ? '#F3AC5D' : 'none'}
      xmlns="http://www.w3.org/2000/svg"
      className="cursor-pointer transition-transform hover:scale-110"
    >
      <path
        d="M18.5 2.3125L22.8375 11.0375L32.375 12.4375L25.4375 19.1875L27.175 28.6875L18.5 24.1L9.825 28.6875L11.5625 19.1875L4.625 12.4375L14.1625 11.0375L18.5 2.3125Z"
        stroke={active ? '#F3AC5D' : '#E8E8E8'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {face}
    </svg>
  );
};

interface ReviewPopupProps {
  productId: string | number;
  onClose: () => void;
  onReviewSubmitted?: () => void;
}

const ReviewPopup = ({ productId, onClose, onReviewSubmitted }: ReviewPopupProps) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const { createReview, submitting } = useReviewStore();
  const { t } = useTranslation();

  const handleSubmit = async () => {
    // Validation
    if (rating === 0) {
      alert(t('review.please_select_rating') || 'الرجاء اختيار تقييم');
      return;
    }

    const trimmedComment = comment.trim();
    if (!trimmedComment) {
      alert(t('review.please_write_review') || 'الرجاء كتابة مراجعة');
      return;
    }

    if (trimmedComment.length < 10) {
      alert(t('review.min_length') || 'المراجعة يجب أن تحتوي على 10 أحرف على الأقل');
      return;
    }

    const success = await createReview({
      product_id: productId,
      rating,
      comment: trimmedComment,
    });

    if (success) {
      onReviewSubmitted?.();
      onClose();
      // Reset form
      setRating(0);
      setComment('');
    }
  };

  const handleStarClick = (star: number) => {
    if (!submitting) {
      setRating(star);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-[699px] rounded-3xl p-6 bg-white shadow-[0px_30px_80px_0px_rgba(0,0,0,0.1)] flex flex-col justify-between gap-5 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center items-center relative">
          <h2 className="font-roboto font-medium text-base md:text-lg leading-8 text-[#211C4D] text-center w-full">
            {t('review.submit_review') || 'ارسال مراجعتك'}
          </h2>
          <button 
            onClick={onClose} 
            className="absolute right-0 bg-none border-none text-2xl cursor-pointer p-2 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
            aria-label={t('common.close') || 'إغلاق'}
            disabled={submitting}
          >
            &times;
          </button>
        </div>

        <div className="flex flex-col gap-6 items-center">
          <div className="flex flex-col gap-1 items-center">
            <label className="font-roboto font-normal text-sm md:text-base leading-[19.2px] text-[#211C4D]">
              {t('review.rate_order') || 'قيم الطلب'}
            </label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <div 
                  key={star} 
                  onClick={() => handleStarClick(star)}
                  className={`transition-opacity ${submitting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <StarIcon 
                    rating={rating} 
                    index={star} 
                    active={star <= rating} 
                  />
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {rating === 0 ? t('review.select_stars') || 'اختر النجوم للتقييم' : 
               rating <= 2 ? t('review.poor') || 'سيء' :
               rating === 3 ? t('review.average') || 'متوسط' :
               t('review.excellent') || 'ممتاز'}
            </p>
          </div>

          <div className="w-full">
            <label className="block font-roboto font-normal text-sm md:text-base leading-[19.2px] text-[#211C4D] mb-2">
              {t('review.your_review') || 'مراجعتك'}
            </label>
            <textarea
              placeholder={t('review.write_review_placeholder') || 'اكتب مراجعتك هنا...'}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full h-[120px] rounded-2xl p-4 bg-[#F6F6F6] border-none resize-none font-roboto text-sm md:text-base text-[#211C4D] focus:outline-none focus:ring-2 focus:ring-[#F3AC5D] transition-all"
              disabled={submitting}
              maxLength={500}
            />
            <div className="text-right text-sm text-gray-500 mt-1">
              {comment.length}/500 {t('review.characters') || 'حرف'}
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button 
            onClick={onClose}
            disabled={submitting}
            className="flex-1 h-[50px] rounded-2xl bg-gray-200 text-gray-700 border-none font-roboto font-bold text-lg md:text-xl cursor-pointer hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t('common.cancel') || 'إلغاء'}
          </button>
          <button 
            onClick={handleSubmit}
            disabled={submitting || rating === 0 || !comment.trim() || comment.trim().length < 10}
            className="flex-1 h-[50px] rounded-2xl bg-[#F3AC5D] text-white border-none font-roboto font-bold text-lg md:text-xl cursor-pointer hover:bg-[#e09a4d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? (t('common.sending') || 'جاري الإرسال...') : (t('common.send') || 'ارسال')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewPopup;