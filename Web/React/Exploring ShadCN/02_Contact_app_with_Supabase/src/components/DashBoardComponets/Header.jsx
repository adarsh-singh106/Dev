import { useNavigate } from "react-router-dom";
import ProfileDropDown from "./ProfileDropDown";

const Header = ({ showFavorites, setShowFavorites }) => {
  const navigate = useNavigate();
  return (
    <div className="flex w-93 my-3 justify-between items-center p-2 border-2 rounded-lg  bg-gray-300">
      <div
        className="text-2xl font-bold cursor-pointer"
        onClick={() => {
          setShowFavorites(false);
          navigate("/dashboard");
        }}
      >
        Add Mittr!
      </div>
      <ProfileDropDown
        showFavorites={showFavorites}
        setShowFavorites={setShowFavorites}
      />
    </div>
  );
};

export default Header;
