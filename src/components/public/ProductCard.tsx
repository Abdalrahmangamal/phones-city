import { useState, useEffect, memo } from "react";
import { Rating, RatingButton } from "@/components/ui/shadcn-io/rating";
import type { Product } from "@/types/index";
import { useLangSync } from "@/hooks/useLangSync";
import { Link } from "react-router-dom";
import { useCartStore } from "@/store/cartStore/cartStore";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useFavoritesStore } from "@/store/favoritesStore";
import { SaudiRiyalIcon } from "@/components/common/SaudiRiyalIcon";

interface ProductCardProps {
  product: Product;
  isNew?: boolean;
  favourite?: boolean;
  containerstyle?: string;
  imagecard: string;
  quantity?: string;
  variations?: { color: string; image: string }[];
}

function ProductCardInner({ product, imagecard, containerstyle, quantity }: ProductCardProps) {
  const { t } = useTranslation();

  const { addFavorite, removeFavorite, favorites } = useFavoritesStore();
  const favItem = favorites.find((f: any) => f?.product?.id === product.id);
  const initialFav = Boolean(favItem) || Boolean((product as any)?.is_favorite);

  // Local optimistic state for favorite heart
  const [localFavorite, setLocalFavorite] = useState<boolean>(initialFav);

  // Sync local state with store/product changes
  useEffect(() => {
    const currentFav = favorites.find((f: any) => f?.product?.id === product.id);
    setLocalFavorite(Boolean(currentFav) || Boolean((product as any)?.is_favorite));
  }, [favorites, (product as any)?.is_favorite, product.id]);

  const { addToCart, deleteToCart } = useCartStore();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const { lang } = useLangSync();

  const hasOptions = Array.isArray(product?.options) && product.options.length > 0;

  // الحصول على الـ variant المحدد بناءً على selectedIndex
  const getSelectedVariant = () => {
    if (hasOptions && product?.options?.[selectedIndex]) {
      return product.options[selectedIndex];
    }
    return null;
  };

  const selectedVariant = getSelectedVariant();

  // استخراج الأسعار بشكل آمن
  const extractPrice = (price: any): number => {
    if (!price && price !== 0) return 0;

    if (typeof price === 'number') return price;

    if (typeof price === 'string') {
      // إزالة أي رموز غير رقمية مثل العملة والفواصل
      const cleanStr = price.replace(/[^\d.-]/g, '').replace(/,/g, '');
      const num = parseFloat(cleanStr);
      return isNaN(num) ? 0 : num;
    }

    return 0;
  };

  // الحصول على الأسعار من الـ variant المحدد أو المنتج الرئيسي
  const original = selectedVariant
    ? extractPrice(selectedVariant.original_price || selectedVariant.price || product?.original_price)
    : extractPrice(product?.original_price || product?.price);

  const final = selectedVariant
    ? extractPrice(selectedVariant.final_price || selectedVariant.sale_price || product?.final_price)
    : extractPrice(product?.final_price || product?.price);

  const discountPercent = original > 0 && final < original
    ? Math.round(((original - final) / original) * 100)
    : 0;

  // حالة المخزون بناءً على البيانات الفعلية من الـ API
  const stockQuantity = selectedVariant?.quantity ?? product?.quantity ?? 0;
  const stockStatus = selectedVariant?.stock_status ?? product?.stock_status ?? "in_stock";

  const isOutOfStock = stockQuantity <= 0 || stockStatus === "out_of_stock";
  const isLimited = stockStatus === "limited" && stockQuantity > 0;

  // الصورة الحالية - أولوية للصورة من الـ variant المحدد
  const currentImage = selectedVariant?.images?.[0]?.url
    || product.main_image
    || "";

  // حالة السلة - مشتقة من بيانات السلة في الـ store
  const { items: cartItems } = useCartStore();

  const checkIsInCart = () => {
    if (!cartItems || cartItems.length === 0) return false;
    const hasMultiple = product.options && product.options.length > 1;
    if (hasMultiple && selectedVariant) {
      return cartItems.some((item: any) => item?.product?.id === selectedVariant.id || item?.product_option_id === selectedVariant.id);
    }
    return cartItems.some((item: any) => item?.product?.id === product.id);
  };

  const [isInCart, setIsInCart] = useState(checkIsInCart);

  // مزامنة حالة السلة مع الـ store عند تغيير العناصر أو الـ variant
  useEffect(() => {
    setIsInCart(checkIsInCart());
  }, [cartItems, selectedIndex, product.id]);

  return (
    <div
      key={product.id}
      className={`${containerstyle} max-w-[350px] md:!w-[250px] xl:!w-[320px] col-span-1 bg-white w-full rounded-[16px] p-[15px] shadow-[0px_4px_4px_0px_#00000040] flex flex-col hover:shadow-[0px_8px_12px_0px_#00000050] transition-shadow duration-300`}
    >
      {/* الصورة */}
      <div className="flex items-center justify-center pt-7 md:pt-0 relative">
        <Link to={`/${lang}/singleproduct/${product.slug}`}>
          <img
            src={currentImage}
            className={`md:!w-[220px] h-[160px] w-[160px] object-contain ${imagecard} md:!h-[220px]`}
            alt={product.name}
            loading="lazy"
          />
        </Link>

        <div className="flex w-full items-center justify-between absolute right-0 top-0 z-10 p-2">
          {/* زر المفضلة */}
          <button
            type="button"
            className="bg-[#EEF1F6] flex items-center justify-center w-[36px] h-[36px] rounded-full cursor-pointer hover:bg-[#e0e5f0] transition-colors z-[20]"
            onClick={(e: any) => {
              e.preventDefault();
              e.stopPropagation();
              const prev = localFavorite;
              setLocalFavorite(!prev);

              if (!prev) {
                addFavorite(product.id).catch(() => {
                  setLocalFavorite(prev);
                  toast.error(t("toast.favorites.addFailed"));
                });
              } else {
                const favId = favItem?.id || (product as any)?.favorite_id;
                removeFavorite(favId || product.id).catch(() => {
                  setLocalFavorite(prev);
                  toast.error(t("toast.favorites.removeFailed"));
                });
              }
            }}
          >
            {localFavorite ? (
              <svg width="21" height="18" viewBox="0 0 21 18" fill="red" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6.9 1.96094C4.11914 1.96094 1.75 4.04024 1.75 6.74073C1.75 8.60369 2.62235 10.1721 3.77849 11.4714C4.93066 12.7661 6.41714 13.853 7.76097 14.7626L10.0796 16.332C10.3335 16.5039 10.6665 16.5039 10.9204 16.332L13.239 14.7626C14.5829 13.853 16.0693 12.7661 17.2215 11.4714C18.3777 10.1721 19.25 8.60369 19.25 6.74073C19.25 4.04024 16.8809 1.96094 14.1 1.96094C12.6665 1.96094 11.4052 2.63308 10.5 3.50277C9.59484 2.63308 8.33347 1.96094 6.9 1.96094Z"
                  stroke=""
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6.9 1.96094C4.11914 1.96094 1.75 4.04024 1.75 6.74073C1.75 8.60369 2.62235 10.1721 3.77849 11.4714C4.93066 12.7661 6.41714 13.853 7.76097 14.7626L10.0796 16.332C10.3335 16.5039 10.6665 16.5039 10.9204 16.332L13.239 14.7626C14.5829 13.853 16.0693 12.7661 17.2215 11.4714C18.3777 10.1721 19.25 8.60369 19.25 6.74073C19.25 4.04024 16.8809 1.96094 14.1 1.96094C12.6665 1.96094 11.4052 2.63308 10.5 3.50277C9.59484 2.63308 8.33347 1.96094 6.9 1.96094Z"
                  stroke="#211C4D"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>

          {/* Badge: غير متوفر / كمية محدودة / نسبة الخصم */}
          {isOutOfStock ? (
            <div className="flex w-full items-center justify-end absolute right-0 top-0 p-1">
              <div className="w-fit px-1 md:px-3 h-[22px] flex items-center justify-center rounded-[4px] bg-[#6B7280] opacity-90">
                <p className={`text-white text-[13px] font-medium ${quantity}`}>{t("OutOfStock")}</p>
              </div>
            </div>
          ) : isLimited ? (
            <div className="flex w-full items-center justify-end absolute right-0 top-0 p-1">
              <div className="w-fit px-1 md:px-3 h-[22px] flex items-center justify-center rounded-[4px] bg-orange-600">
                <p className={`text-white text-[13px] font-medium ${quantity}`}>{t("LimitedQuantity")}</p>
              </div>
            </div>
          ) : discountPercent > 0 ? (
            <div className="flex w-full items-center justify-end absolute right-0 top-0 p-1">
              <div className="w-fit px-2 h-[22px] flex items-center justify-center rounded-[4px] bg-[#F03D3D]">
                <p className="text-white text-[13px]">{discountPercent}%</p>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {/* الاسم */}
      <Link to={`/${lang}/singleproduct/${product.slug}`}>
        <h2 className="text-[15px] md:text-[24px] font-[500] text-[#211C4D] line-clamp-1 mt-[10px]">
          {product?.name}
        </h2>
      </Link>




      {/* Spacer لملء المساحة */}
      <div className="flex-1" />

      {/* التقييم - دايماً فوق السعر */}
      <div className="flex items-center justify-start gap-0">
        <Rating defaultValue={product.average_rating} className="pointer-events-none">
          {Array.from({ length: 5 }).map((_, index) => (
            <RatingButton
              key={index}
              className="text-yellow-500 [&>svg]:w-3 [&>svg]:h-3 md:[&>svg]:h-5 md:[&>svg]:w-5"
            />
          ))}
        </Rating>
        <p className="text-[#9CA3AF] text-[10px] md:!w-[15px]">({product.reviews_count})</p>
      </div>

      {/* السعر + زر السلة */}
      <div className="flex items-center justify-between mt-auto pt-[10px] w-full">
        <div className="relative flex gap-2 md:gap-3">
          <p className="text-[#211C4D] md:text-[18px] text-[7px] font-[500] flex items-center gap-1">
            {final?.toLocaleString()} <SaudiRiyalIcon className="w-2 h-2 md:w-4 md:h-4" />
          </p>
          {final < original && (
            <div className="relative">
              <p className="text-[#211C4D] md:text-[18px] text-[7px] font-[500] opacity-60 flex items-center gap-1">
                {original?.toLocaleString()} <SaudiRiyalIcon className="w-2 h-2 md:w-4 md:h-4" />
              </p>
              <svg
                className="absolute top-1 md:top-3 w-full right-0 z-1"
                height="5"
                viewBox="0 0 87 5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 1.51396C6.40086 2.41917 2.25702 2.59053 0.748739 3.9048C-0.759546 5.21908 4.82858 2.71501 11.1019 3.83643C1.50418 7.64729 19.8998 0.595701 11.1019 3.83643C13.52 3.65675 37.5718 3.55427 43.4152 1.91822C46.3024 1.89069 47.0564 1.38262 49.7085 1.51396C52.3607 1.6453 54.6749 1.8494 56.4452 2.10758C58.2155 2.36576 61.0433 1.78554 61.5 2.10758C64.6992 1.20738 82.7675 2.99182 86.5 0.89135C81.2405 0.499791 75.344 0.22942 69.1506 0.0958978C62.9572 -0.0376246 56.5908 -0.0316571 50.418 0.113434C44.2452 0.258525 38.39 0.539867 33.189 0.941212C27.988 1.34256 21.9276 0.918209 18.5 1.51396C12.6347 1.00384 15 2.08409 15 1.51396Z"
                  fill="#F03D3D"
                />
              </svg>
            </div>
          )}
        </div>

        {/* زر السلة - معطل فقط إذا كان غير متوفر تماماً */}
        <button
          type="button"
          disabled={isOutOfStock}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();

            if (isOutOfStock) return;

            const hasMultiple = product.options && product.options.length > 1;
            const idToSend = hasMultiple ? selectedVariant?.id : product.id;

            if (!idToSend) return;

            if (!isInCart) {
              addToCart(idToSend, 1, hasMultiple)
                .then(() => {
                  setIsInCart(true);
                  toast.success(t("toast.cart.added", { name: product.name }), {
                    position: "bottom-right",
                    autoClose: 2000,
                  });
                })
                .catch((error: any) => {
                  let errorMessage = t("product.addToCartFailed");
                  if (error?.response?.data?.message) {
                    const apiMessage = error.response.data.message;
                    if (apiMessage.includes("out of stock") || apiMessage.includes("نفد المخزون")) {
                      errorMessage = t("product.outOfStock");
                    } else if (apiMessage.includes("already in cart")) {
                      errorMessage = t("product.alreadyInCart");
                      setIsInCart(true);
                    } else {
                      errorMessage = apiMessage;
                    }
                  }
                  toast.error(errorMessage, { position: "bottom-right", autoClose: 3000 });
                });
            } else {
              deleteToCart(idToSend)
                .then(() => {
                  setIsInCart(false);
                  toast.info(t("toast.cart.removed", { name: product.name }), {
                    position: "bottom-right",
                    autoClose: 2000,
                  });
                })
                .catch(() => {
                  toast.error(t("toast.cart.removeFailed"), {
                    position: "bottom-right",
                    autoClose: 3000,
                  });
                });
            }
          }}
          className={`w-[20px] h-[20px] md:w-[40px] md:h-[40px] flex items-center justify-center rounded-[8px] transition-all duration-200 z-[20] ${isOutOfStock
            ? "bg-gray-300 cursor-not-allowed opacity-60"
            : isInCart
              ? "bg-[#211C4D] shadow-[0px_4px_8px_0px_#211C4D4d] hover:shadow-[0px_6px_12px_0px_#211C4D66] cursor-pointer"
              : "bg-[#EEF1F6] hover:bg-[#dfe3ea] shadow-[0px_2px_4px_0px_#00000020] cursor-pointer"
            }`}
        >
          {isInCart ? (
            <svg width="18" height="18" className="w-[12px] md:w-[20px]" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2zM7.16 14l-.94-2h11.53c.75 0 1.41-.41 1.75-1.03l3.58-6.49A.996.996 0 0018.76 3H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C5.09 13.37 5 13.68 5 14a2 2 0 002 2h12v-2H7.42c-.14 0-.25-.11-.26-.25L7.16 14z" />
            </svg>
          ) : (
            <svg width="16" height="17" className="w-[12px] md:w-[20px]" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_2531_3183)">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.9987 14.3333C5.95267 14.3333 5.91536 14.3706 5.91536 14.4167C5.91536 14.4627 5.95267 14.5 5.9987 14.5C6.04472 14.5 6.08203 14.4627 6.08203 14.4167C6.08203 14.3706 6.04472 14.3333 5.9987 14.3333ZM4.7487 14.4167C4.7487 13.7263 5.30834 13.1667 5.9987 13.1667C6.68905 13.1667 7.2487 13.7263 7.2487 14.4167C7.2487 15.107 6.68905 15.6667 5.9987 15.6667C5.30834 15.6667 4.7487 15.107 4.7487 14.4167Z"
                  fill="#211C4D"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M13.332 14.3333C13.286 14.3333 13.2487 14.3706 13.2487 14.4167C13.2487 14.4627 13.286 14.5 13.332 14.5C13.3781 14.5 13.4154 14.4627 13.4154 14.4167C13.4154 14.3706 13.3781 14.3333 13.332 14.3333ZM12.082 14.4167C12.082 13.7263 12.6417 13.1667 13.332 13.1667C14.0224 13.1667 14.582 13.7263 14.582 14.4167C14.582 15.107 14.0224 15.6667 13.332 15.6667C12.6417 15.6667 12.082 15.107 12.082 14.4167Z"
                  fill="#211C4D"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.0820312 1.08333C0.0820312 0.761167 0.343198 0.5 0.665365 0.5H3.33203C3.61006 0.5 3.84945 0.696225 3.90402 0.96885L4.47734 3.83333H15.332C15.5059 3.83333 15.6707 3.91087 15.7815 4.04482C15.8923 4.17877 15.9376 4.35517 15.905 4.52594L14.8375 10.1236C14.7499 10.5649 14.5099 10.9612 14.1595 11.2433C13.8106 11.5241 13.3745 11.6738 12.9269 11.6667H6.45713C6.00951 11.6738 5.57343 11.5241 5.22461 11.2433C4.87434 10.9613 4.63436 10.5652 4.54664 10.1241L3.43249 4.55754C3.42828 4.54056 3.42481 4.52329 3.42213 4.50577L2.85388 1.66667H0.665365C0.343198 1.66667 0.0820312 1.4055 0.0820312 1.08333ZM4.71085 5L5.69086 9.89636C5.72515 10.069 5.81907 10.2241 5.95618 10.3345C6.0933 10.4448 6.26487 10.5035 6.44085 10.5001L6.45203 10.5H12.932L12.9432 10.5001C13.1192 10.5035 13.2908 10.4448 13.4279 10.3345C13.5645 10.2245 13.6582 10.0701 13.6928 9.89826L13.6932 9.89636L14.6269 5H4.71085Z"
                  fill="#211C4D"
                />
              </g>
              <defs>
                <clipPath id="clip0_2531_3183">
                  <rect width="16" height="16" fill="white" transform="translate(0 0.417969)" />
                </clipPath>
              </defs>
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

const ProductCard = memo(ProductCardInner, (prevProps, nextProps) => {
  return (
    prevProps.product.id === nextProps.product.id &&
    prevProps.product.name === nextProps.product.name &&
    prevProps.product.final_price === nextProps.product.final_price &&
    prevProps.product.main_image === nextProps.product.main_image &&
    prevProps.product.stock_status === nextProps.product.stock_status &&
    prevProps.product.quantity === nextProps.product.quantity
  );
});

export default ProductCard;