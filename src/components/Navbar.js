import React from "react";
import { useAuth } from "../context/authContext";

const Navbar = () => {
  const { onLogout, token } = useAuth();
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a href="#" className="btn btn-ghost normal-case text-xl">
          nuTech
        </a>
      </div>
      {token && (
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="account"
                  src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg"
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a href="#" onClick={() => onLogout()}>
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
