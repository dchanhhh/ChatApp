import { LuUserCircle2 } from "react-icons/lu";
import { useSelector } from "react-redux";

const Avatar = ({ userId, name, imageURL, width, height }) => {
  const onlineUser = useSelector((state) => state?.user?.onlineUser);

  let avatarName = "";

  if (name) {
    const splitName = name?.split(" ");

    if (splitName.length > 1) {
      avatarName = splitName[0][0] + splitName[1][0];
    } else {
      avatarName = splitName[0][0];
    }
  }

  const isOnline = onlineUser.includes(userId);
  return (
    <div
      className={`text-slate-800 rounded-full border shadow text-lg font-bold relative`}
      style={{ width: width + "px", height: height + "px" }}
    >
      {imageURL ? (
        <img
          style={{ width: width + "px", height: height + "px" }}
          className="rounded-full overflow-hidden"
          src={imageURL}
          width={width}
          height={height}
          alt={name}
        />
      ) : name ? (
        <div
          className="overflow-hidden rounded-full flex justify-center items-center"
          style={{ width: width + "px", height: height + "px" }}
        >
          {avatarName}
        </div>
      ) : (
        <LuUserCircle2 size={width} />
      )}

      {isOnline && (
        <div className="bg-green-600 p-1.5 absolute bottom-0 right-0 z-10 rounded-full"></div>
      )}
    </div>
  );
};

export default Avatar;
