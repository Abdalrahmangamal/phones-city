import { Heart } from "lucide-react";
import { useState } from "react";

export default function Gallery({ images = [], discountPercent = 0 }: { images?: any; discountPercent?: number }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Normalization قوي: يقبل أي شكل ممكن للـ images
  const normalizeImages = (input: any): { url: string }[] => {
    if (!input) return [];

    // حالة 1: string مباشر
    if (typeof input === "string" && input.trim() !== "") {
      return [{ url: input.trim() }];
    }

    // حالة 2: array
    if (Array.isArray(input)) {
      return input
        .map((item) => {
          // لو string
          if (typeof item === "string" && item.trim() !== "") {
            return { url: item.trim() };
          }
          // لو object فيه url
          if (typeof item === "object" && item !== null && item.url) {
            return { url: item.url };
          }
          // لو object فيه حقل تاني زي src أو path (نادر)
          if (typeof item === "object" && item !== null) {
            return { url: item.src || item.path || item.image || "/placeholder.svg" };
          }
          return null;
        })
        .filter(Boolean) as { url: string }[];
    }

    // حالة 3: object واحد فيه url
    if (typeof input === "object" && input !== null && input.url) {
      return [{ url: input.url }];
    }

    return [];
  };

  const safeImages = normalizeImages(images);

  // لو مفيش صور خالص، نضيف placeholder عشان المعرض ميبقاش فاضي
  const displayImages = safeImages.length > 0 
    ? safeImages 
    : [{ url: "/placeholder.svg" }];

  console.log("Original images:", images);
  console.log("Normalized displayImages:", displayImages);

  return (
    <div className="md:w-full">
      <div className="space-y-6 md:space-y-8">
        <div className="relative border border-border rounded-lg shadow-xl p-2 md:p-2 aspect-[4/3] flex items-center justify-center">
          {discountPercent > 0 && (
            <div className="absolute top-2 md:top-4 left-2 md:left-4 bg-destructive text-white px-2 py-0.5 md:px-3 md:py-1 rounded text-xs md:text-sm font-bold">
              {Math.round(discountPercent)}%
            </div>
          )}
          <button
            onClick={() => setIsWishlisted(!isWishlisted)}
            className="absolute top-2 md:top-4 right-2 md:right-4 p-1 md:p-2 bg-card rounded-full hover:bg-accent transition-colors"
            aria-label={isWishlisted ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
          >
            <Heart
              className={`w-4 h-4 md:w-5 md:h-5 ${
                isWishlisted
                  ? "fill-destructive text-destructive"
                  : "text-muted-foreground"
              }`}
            />
          </button>
          <img
            src={displayImages[selectedImage]?.url || "/placeholder.svg"}
            alt="Product main image"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Thumbnails */}
        {displayImages.length > 1 && (
          <div className="flex gap-2 md:gap-3 flex-wrap justify-center">
            {displayImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`w-16 h-16 md:w-20 md:h-20 rounded-md overflow-hidden border-2 shadow-md transition-all ${
                  selectedImage === idx
                    ? "border-primary"
                    : "border-border hover:border-muted-foreground"
                }`}
                aria-label={`عرض الصورة ${idx + 1}`}
              >
                <img
                  src={img.url}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-contain"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}