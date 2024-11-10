import { useUserContext } from "@/hooks/useUserContext";
import { MapPin } from "lucide-react";

export const Address = () => {
  const { user } = useUserContext();
  return (
    <div className="flex items-center gap-1 text-sm">
      <MapPin size="16" />
      {`${user?.street}, ${user?.city} - ${user?.state}`}
    </div>
  );
};
