
export const GetAttendingBadge: React.FC<{ attending: AttendanceProps }> = ({ attending }) => {
  
  if (attending === "YES") {
    return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Attending</span>
  } 
    
  return (
    <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">Not Attending</span>
  )
};

export const GetTraditionalWearBadge = ({ value }: { value: string }) => {
    if (!value) return <span className="text-gray-400 text-xs">Not specified</span>;
    
    return (
      <span className="px-2 py-1 rounded-full text-xs font-medium">
        {value}
      </span>
    );
  };