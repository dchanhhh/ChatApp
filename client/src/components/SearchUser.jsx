import { useCallback, useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import Loading from "./Loading";
import UserSearchCard from "./UserSearchCard";
import toast from "react-hot-toast";
import axios from "axios";
import { IoClose } from "react-icons/io5";

const SearchUser = ({ onClose }) => {
  const [searchUser, setSearchUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const handleSearchUser = useCallback(async () => {
    const URL = `${import.meta.env.VITE_BACKEND_URL}/api/search-user`;
    try {
      setLoading(true);
      const response = await axios.post(URL, {
        search: search,
      });
      setLoading(false);

      setSearchUser(response.data.data);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }, [search]);

  useEffect(() => {
    handleSearchUser();
  }, [handleSearchUser, search]);

  console.log("searchUser", searchUser);

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-slate-700 bg-opacity-40 p-2 z-10">
      <div className="w-full max-w-lg mx-auto mt-10">
        {/*Input Search User*/}
        <div className="bg-white rounded h-14 overflow-hidden flex">
          <input
            type="text"
            placeholder="Search user by name, email..."
            className="w-full h-full outline-none px-4 py-1"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <div className="h-14 w-14 flex justify-center items-center">
            <IoSearchOutline size={25} />
          </div>
        </div>

        {/*Display Search User*/}
        <div className="bg-white mt-2 w-full h-full p-4 rounded max-h-[70vh] overflow-y-scroll">
          {/*no user found*/}
          {searchUser.length === 0 && !loading && (
            <p className="text-slate-500">No user found!</p>
          )}

          {loading && (
            <div><Loading /></div>
          )}

          {searchUser.length !== 0 && !loading &&
            searchUser.map((user) => {
              return (
                <UserSearchCard key={user._id} user={user} onClose={onClose} />
              );
            })}
        </div>
      </div>

      <div
        className="absolute top-0 right-0 hover:text-white text-2xl lg:text-4xl"
        onClick={onClose}
      >
        <button><IoClose /></button>
      </div>
    </div>
  );
};

export default SearchUser;