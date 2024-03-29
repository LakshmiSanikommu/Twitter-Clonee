import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
// import ProfileSection from "./ProfileSection.jsx";
import ViewProfile from "./ViewProfile.jsx";

function Widgets() {
  const [search, setSearch] = useState();
  const [profiles, setProfiles] = useState();
  function clearInput() {
    setSearch("");
  }
  useEffect(() => {
    async function dataFetching() {
      const data = await fetch("http://localhost:8001/profile").then((res) =>
        res.json()
      );
      setProfiles(data);
    }
    dataFetching();
  }, []);

  return (
    <div className=" col-span-2 mr-2 hidden pt-2 lg:inline ">
      <div className="flex  rounded-full bg-gray-200 p-2 text-gray-500">
        <IoSearch className="h-[2rem] w-[2rem]   " />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-gray-200 outline-none  "
          type="text"
          placeholder="Search Twitter"
        />
      </div>
      {search && (
        <div className=" mt-2 flex min-h-[25rem]   flex-col gap-3 rounded-lg p-2 shadow-[2px_4px_12px_6px_rgba(118,217,255,0.5)] ">
          {profiles?.filter((profile) => profile.userId.includes(search))
            .length ? (
            profiles
              ?.filter((profile) => profile.userId.includes(search))
              .map((profile) => (
                // <ProfileSection key={profile._id} profile={profile} />
                <ViewProfile
                  key={profile._id}
                  profile={profile}
                  clearInput={clearInput}
                />
              ))
          ) : (
            <div className=" p-4"> no results found for {search} </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Widgets;
