
interface bannertybe {
  image:string
}
const CategoriesSection = ({image}:bannertybe) => {
  return (
    <div className="w-full md:my-15 xl:px-[90px] px-2 pt-0 md:pt-0  md:h-[190.38px] h-[140px] md:px-[0px]  rounded-[15px] md:rounded-[16px] overflow-hidden">
      <img 
        src={image}
        alt="Categories" 
        className="w-full h-full rounded-[20px]  object-contain"
      />
    </div>
  );
};

export default CategoriesSection;
