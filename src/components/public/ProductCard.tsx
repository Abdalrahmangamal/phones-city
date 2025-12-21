import { useState, useEffect } from "react";
import { Rating, RatingButton } from "@/components/ui/shadcn-io/rating";
import type { Product } from "@/types/index";
import { useLangSync } from "@/hooks/useLangSync";
import { Link } from "react-router-dom";
// import { useCart } from "@/store/cart"; // Added cart import
import { useCartStore } from "@/store/cartStore/cartStore";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

interface ProductCardProps {
  product: Product;
  isNew?: boolean;
  favourite?: boolean;
  containerstyle?:string;
  imagecard:string;
  variations?: { color: string; image: string }[];
}
import { useFavoritesStore } from "@/store/favoritesStore";
export default function ProductCard({ product,imagecard,containerstyle }: ProductCardProps) {
  const { t } = useTranslation();

  const { addFavorite, removeFavorite, favorites } = useFavoritesStore();
  const favItem = favorites.find((f: any) => f?.product?.id === product.id);
  const initialFav = Boolean(favItem) || Boolean((product as any)?.is_favorite);

  // Local optimistic state to make the heart toggle reliable
  const [localFavorite, setLocalFavorite] = useState<boolean>(initialFav);

  // Keep local state in sync with store/product changes
  useEffect(() => {
    const currentFav = favorites.find(
      (f: any) => f?.product?.id === product.id
    );
    setLocalFavorite(
      Boolean(currentFav) || Boolean((product as any)?.is_favorite)
    );
  }, [favorites, (product as any)?.is_favorite, product.id]);
  const { addToCart, deleteToCart } = useCartStore();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedVariant = product.options[selectedIndex];
  // const isFavorite = favorites.some(f => f.product.id === product.id);

  const { lang } = useLangSync();
  const hasOptions =
    Array.isArray(product?.options) && product.options.length > 0;
  const currentImage = hasOptions
    ? selectedVariant?.images?.[0]?.url || product.main_image || ""
    : product.main_image || "";
  const original = hasOptions
    ? Number(selectedVariant?.original_price?.replace(/,/g, "")) || 0
    : Number(product?.original_price?.replace(/,/g, "")) || 0;

  const final = hasOptions
    ? Number(selectedVariant?.final_price?.replace(/,/g, "")) || 0
    : Number(product?.final_price?.replace(/,/g, "")) || 0;
  const discountPercent =
    original > 0 ? ((original - final) / original) * 100 : 0;
  const [isInCart, setIsInCart] = useState((product as any)?.in_cart || false);

  return (
    <div
      key={product.id}
      className={`${containerstyle} max-w-[350px] md:!w-[320px] col-span-1 bg-white w-full min-h-[350px] md:min-h-[400px] rounded-[16px] p-[15px] shadow-[0px_4px_4px_0px_#00000040] flex flex-col hover:shadow-[0px_8px_12px_0px_#00000050] transition-shadow duration-300`}
    >
      {/* الصورة */}
      <div className="flex items-center justify-center pt-7 md:pt-0 relative">
        <Link to={`/${lang}/singleproduct/${product.slug}`}>
          <img
            src={currentImage}
            className={`md:!w-[220px] h-[160px] w-[160px] object-contain ${imagecard} md:!h-[220px] `}
            alt={product.name}
          />
        </Link>

        <div
          className="flex w-full items-center justify-between absolute right-0 top-0 z-10 p-2"
          onClick={(e: any) => {
            e.stopPropagation();
            // optimistic toggle
            const prev = localFavorite;
            setLocalFavorite(!prev);

            if (!prev) {
              // add favorite
              try {
                const res: any = addFavorite(product.id);
                if (res && typeof res.then === "function") {
                  res.catch((err: any) => {
                    setLocalFavorite(prev);
                    toast.error("فشل إضافة للمفضلة. حاول مرة أخرى.");
                  });
                }
              } catch (err) {
                setLocalFavorite(prev);
                toast.error("فشل إضافة للمفضلة. حاول مرة أخرى.");
              }
            } else {
              // remove favorite
              const favId = favItem?.id || (product as any)?.favorite_id;
              try {
                const res: any = removeFavorite(favId || product.id);
                if (res && typeof res.then === "function") {
                  res.catch((err: any) => {
                    setLocalFavorite(prev);
                    toast.error("فشل إزالة من المفضلة. حاول مرة أخرى.");
                  });
                }
              } catch (err) {
                setLocalFavorite(prev);
                toast.error("فشل إزالة من المفضلة. حاول مرة أخرى.");
              }
            }
          }}
        >
          <div className="bg-[#EEF1F6] flex items-center justify-center w-[36px] h-[36px] rounded-full cursor-pointer hover:bg-[#e0e5f0] transition-colors">
            {localFavorite ? (
              <svg
                width="21"
                height="18"
                viewBox="0 0 21 18"
                fill="red"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.9 1.96094C4.11914 1.96094 1.75 4.04024 1.75 6.74073C1.75 8.60369 2.62235 10.1721 3.77849 11.4714C4.93066 12.7661 6.41714 13.853 7.76097 14.7626L10.0796 16.332C10.3335 16.5039 10.6665 16.5039 10.9204 16.332L13.239 14.7626C14.5829 13.853 16.0693 12.7661 17.2215 11.4714C18.3777 10.1721 19.25 8.60369 19.25 6.74073C19.25 4.04024 16.8809 1.96094 14.1 1.96094C12.6665 1.96094 11.4052 2.63308 10.5 3.50277C9.59484 2.63308 8.33347 1.96094 6.9 1.96094Z"
                  stroke=""
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg
                width="21"
                height="18"
                viewBox="0 0 21 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.9 1.96094C4.11914 1.96094 1.75 4.04024 1.75 6.74073C1.75 8.60369 2.62235 10.1721 3.77849 11.4714C4.93066 12.7661 6.41714 13.853 7.76097 14.7626L10.0796 16.332C10.3335 16.5039 10.6665 16.5039 10.9204 16.332L13.239 14.7626C14.5829 13.853 16.0693 12.7661 17.2215 11.4714C18.3777 10.1721 19.25 8.60369 19.25 6.74073C19.25 4.04024 16.8809 1.96094 14.1 1.96094C12.6665 1.96094 11.4052 2.63308 10.5 3.50277C9.59484 2.63308 8.33347 1.96094 6.9 1.96094Z"
                  stroke="#211C4D"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>

          {/* {isNew && (
            <div className="w-[41px] h-[20px] flex items-center justify-center rounded-[4px] bg-[#259ACB]">
              <p className="text-white text-[13px]">جديد</p>
            </div>
          )} */}
          {discountPercent > 0 && (
            <div className="flex w-full items-center justify-end absolute right-0 top-0 p-1">
              <div className="w-fit px-2 h-[22px] flex items-center justify-center rounded-[4px] bg-[#F03D3D]">
                <p className="text-white text-[13px]">
                  {discountPercent.toFixed(0)}%
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* الاسم */}
      <Link to={`/${lang}/singleproduct`}>
        <h2 className="text-[15px] md:text-[24px] font-[500] text-[#211C4D] line-clamp-1 mt-[10px]">
          {product?.name}
        </h2>
      </Link>
<div className="flex items-center justify-between">

      {/* الألوان */}
      {product?.options?.length > 1 && (
        <div className="flex items-center gap-[7px] mt-[10px] justify-start">
          {product.options.map((variant, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`
          flex items-center justify-center 
          transition border-2 text-[10px]
          ${
            variant.type === "size"
              ? "min-w-[40px] h-[22px] px-2 rounded-md bg-white text-[#211C4D]"
              : "w-[18px] h-[18px] rounded-full"
          }
          ${
            index === selectedIndex
              ? "border-[#211C4D] scale-110"
              : "border-gray-300"
          }
        `}
              style={{
                backgroundColor:
                  variant.type === "color" ? variant.value : "#fff",
              }}
              title={`Select ${variant.value}`}
            >
              {variant.type === "size" ? variant.value : ""}
            </button>
          ))}
        </div>
      )}

      {/* التقييم */}
      <div className="flex mt-[10px] items-center justify-start gap-0">
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
</div>


      {/* السعر + زر السلة */}
      <div className="flex items-center justify-between mt-[10px] w-full">
        <div className="relative flex gap-3">
          <p className="text-[#211C4D] md:text-[18px] text-[11px] font-[500]">
            {final?.toLocaleString()}
            {t("SAR")}
          </p>
          {final?.toLocaleString() == original?.toLocaleString() ? (
            ""
          ) : (
            <div className="relative">
              <p className="text-[#211C4D] md:text-[18px] text-[11px] font-[500]">
                {original?.toLocaleString()}
                {t("SAR")}
              </p>
              <svg
                className="absolute top-2 md:top-3 w-full right-0  z-1"
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
        <div
          onClick={() => {
            const hasMultiple = product.options.length > 1;
            const idToSend = hasMultiple ? selectedVariant.id : product.id;

            if (!isInCart) {
              addToCart(idToSend, 1, hasMultiple).then(() => {
                setIsInCart(true);
                toast.success(`تم إضافة ${product.name} إلى السلة`, {
                  position: "bottom-right",
                  autoClose: 2000,
                });
              });
            } else {
              deleteToCart(idToSend).then(() => {
                setIsInCart(false);
                toast.info(`تم حذف ${product.name} من السلة`, {
                  position: "bottom-right",
                  autoClose: 2000,
                });
              });
            }
          }}
          className={`w-[40px] h-[40px] flex items-center justify-center rounded-[8px] cursor-pointer transition-all duration-200 ${
            isInCart === true
              ? "bg-[#211C4D] shadow-[0px_4px_8px_0px_#211C4D4d] hover:shadow-[0px_6px_12px_0px_#211C4D66]"
              : "bg-[#EEF1F6] hover:bg-[#dfe3ea] shadow-[0px_2px_4px_0px_#00000020]"
          }`}
        >
          {isInCart ? (
            // شكل مختلف لما تكون في السلة
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2zM7.16 14l-.94-2h11.53c.75 0 1.41-.41 1.75-1.03l3.58-6.49A.996.996 0 0018.76 3H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C5.09 13.37 5 13.68 5 14a2 2 0 002 2h12v-2H7.42c-.14 0-.25-.11-.26-.25L7.16 14z" />
            </svg>
          ) : (
            // الشكل العادي للسلة
            <svg
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
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
                  <rect
                    width="16"
                    height="16"
                    fill="white"
                    transform="translate(0 0.417969)"
                  />
                </clipPath>
              </defs>
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}
