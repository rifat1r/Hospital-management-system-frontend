import React from "react";
import ProfilePicture from "../../../../Components/ProfilePicture";
import { Calendar, User } from "lucide-react";

const ScheduleHeader = ({ user }) => {
  return (
    <div className="flex items-center gap-4 border p-4 rounded-lg shadow mt-4">
      <ProfilePicture size="sm" user={user} />
      <div className="flex-1">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <User className="w-6 h-6 text-blue-600" />
          {user?.name}
        </h1>
        <p className="text-gray-600 mt-1">{user?.designation} </p>
      </div>
      <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg border border-blue-200">
        <Calendar className="w-5 h-5 text-blue-600" />
        <span className="text-sm font-medium text-blue-700">
          Weekly Schedule
        </span>
      </div>
    </div>
  );
};

export default ScheduleHeader;
