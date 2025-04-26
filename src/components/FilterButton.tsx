export const FilterButton = ({ active, onClick, children ,moreClassname}: { active: boolean, onClick: () => void, children: React.ReactNode , moreClassname?:string}) => (
    <button
      className={`w-[200px] text-black font-semibold py-2 px-2 rounded-xl border-4 border-[#626F47] 
                  ${active ? "bg-[#A4B465]" : "bg-white"} 
                  ${moreClassname} 
                  hover:bg-[#626F47] hover:text-white hover:border-transparent transition-all duration-300 ease-in-out`}
      onClick={onClick}
    >
      {children}
    </button>
  );