
interface bannertybe {
  image:string
}
const CategoriesSection = ({image}:bannertybe) => {
  return (
    <div className="w-full md:my-15  md:h-[190.38px] h-[130px] md:px-[0px] px-[20px] rounded-[90px] md:rounded-[16px] overflow-hidden">
      <img 
        src={image}
        alt="Categories" 
        className="w-full h-full rounded-[20px] md:object-cover object-fill"
      />
    </div>
  );
};

export default CategoriesSection;
