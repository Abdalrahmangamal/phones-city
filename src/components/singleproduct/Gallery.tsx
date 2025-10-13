import { Heart } from "lucide-react";
import { useState } from "react";
import product1 from '@/assets/images/product1.png'
import product2 from '@/assets/images/product2.png'
import product3 from '@/assets/images/product3.png'
import product4 from '@/assets/images/bluephone.png'
import product5 from '@/assets/images/orangelabtop.png'
export default function gallery() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const productImages = [
    `${product1}`,
    `${product2}`,
    `${product3}`,
    `${product4}`,
    `${product5}`,
  ];
  return (
    <div>
      <div className="space-y-4">
        <div className="relative bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-8 aspect-[4/3] flex items-center justify-center">
          <div className="absolute top-4 left-4 bg-destructive text-white px-3 py-1 rounded text-sm font-bold">
            17%-
          </div>
          <button
            onClick={() => setIsWishlisted(!isWishlisted)}
            className="absolute top-4 right-4 p-2 bg-card rounded-full hover:bg-accent transition-colors"
          >
            <Heart
              className={`w-5 h-5 ${
                isWishlisted
                  ? "fill-destructive text-destructive"
                  : "text-muted-foreground"
              }`}
            />
          </button>
          <img
            src={productImages[selectedImage] || "/placeholder.svg"}
            alt="Laptop"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Thumbnail Images */}
        <div className="flex gap-3 justify-center">
          {productImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(idx)}
              className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                selectedImage === idx
                  ? "border-primary"
                  : "border-border hover:border-muted-foreground"
              }`}
            >
              <img
                src={img || "/placeholder.svg"}
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
