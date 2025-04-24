import { TiStarFullOutline, TiStarHalfOutline, TiStarOutline } from "react-icons/ti";

interface RatingProps {
  rating: number; // รับคะแนนจาก props
  maxRating: number; // จำนวนดาวสูงสุด (ปกติคือ 5)
}

const StarRating = ({ rating, maxRating }: RatingProps) => {
  const fullStars = Math.floor(rating); // จำนวนดาวเต็ม
  const halfStars = rating % 1 >= 0.5 ? 1 : 0; // ถ้ามีคะแนนครึ่งดาว
  const emptyStars = maxRating - fullStars - halfStars; // จำนวนดาวว่าง

  return (
    <div className="flex">
      {/* ดาวเต็ม */}
      {Array(fullStars).fill(<TiStarFullOutline size={24} color="gold" />)}

      {/* ดาวครึ่ง */}
      {halfStars > 0 && <TiStarHalfOutline size={24} color="gold" />}

      {/* ดาวว่าง */}
      {Array(emptyStars).fill(<TiStarOutline size={24} color="gold" />)}
    </div>
  );
};

export default StarRating;
