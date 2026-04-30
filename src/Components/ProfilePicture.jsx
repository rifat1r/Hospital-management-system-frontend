const ProfilePicture = ({ user, size }) => {
  const sizeClasses = {
    sm: "w-16 h-16 text-xl",
    md: "w-24 h-24 text-2xl",
    lg: "w-32 h-32 text-3xl",
  };
  const nameInitials = () => {
    return user?.name
      ?.split(" ")
      .map((n) => n[0].toUpperCase())
      .join("");
  };

  return (
    <div
      className={`${sizeClasses[size]} rounded-full overflow-hidden border `}
    >
      {user?.profilePicture ? (
        <img
          className="w-full h-full object-cover"
          src={user.profilePicture}
          alt={user?.name}
        />
      ) : (
        <div className=" bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center w-full h-full text-white">
          <h1 className="font-semibold  capitalize">{nameInitials()}</h1>
        </div>
      )}
    </div>
  );
};

export default ProfilePicture;
