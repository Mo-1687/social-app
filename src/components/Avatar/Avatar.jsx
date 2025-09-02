import defaultPhoto from "../../assets/vecteezy_3d-cartoon-man-with-glasses-and-beard-illustration_51767450.png";
import { Link } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { useContext } from "react";
function Avatar({ photo, name, id, isPending }) {
  const { userData } = useContext(UserContext);

  const isUser = id ? id === userData?._id : true;
  function isInvalidPhoto() {
    if (photo?.endsWith("undefined") || photo === undefined) {
      return defaultPhoto;
    }
    return photo;
  }
  return (
    <Link to={"/profile"} className="interactive-hover w-12 h-12 relative">
      <div className=" w-full h-full rounded-full ring-2 ring-primary ring-offset-2 ring-offset-background flex-shrink-0 overflow-hidden  transition-all duration-300 group-hover:ring-primary-glow">
        <img
          src={isInvalidPhoto()}
          alt={name || "User"}
          className="w-full h-full object-cover"
        />
        {isPending && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-full"></div>
        )}
        {isUser && (
          <div className="absolute bottom-1 -right-1 w-3 h-3 bg-accent rounded-full border border-card shadow-lg animate-pulse-glow"></div>
        )}
      </div>
    </Link>
  );
}
export default Avatar;
