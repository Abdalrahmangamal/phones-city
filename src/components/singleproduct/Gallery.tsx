import { Heart } from "lucide-react";
import { useState } from "react";

export default function gallery({ images }: any) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const safeImages = Array.isArray(images) ? images : [];

 
  console.log(images)
  return (
    <div className="md:w-full">
      <div className="space-y-4">
        <div className="relative bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 md:p-8 aspect-[4/3] flex items-center justify-center">
          <div className="absolute top-2 md:top-4 left-2 md:left-4 bg-destructive text-white px-2 py-0.5 md:px-3 md:py-1 rounded text-xs md:text-sm font-bold">
            17%-
          </div>
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
            src={safeImages[selectedImage]?.url || "/placeholder.svg"}
            alt="Laptop"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Thumbnail Images */}
        <div className="flex gap-2 md:gap-3 flex-wrap justify-center">
          {safeImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(idx)}
              className={`w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                selectedImage === idx
                  ? "border-primary"
                  : "border-border hover:border-muted-foreground"
              }`}
              aria-label={`عرض الصورة ${idx + 1}`}
            >
              <img
                src={img?.url || "/placeholder.svg"}
                alt={`View ${idx + 1}`}
                className="w-full h-full object-contain"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
