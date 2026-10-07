import { Link } from "react-router";

export const Navbar = () => {
  return (
    <nav className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
        <Link to="/home" className="text-lg font-bold text-slate-900">
          Mi Blog
        </Link>

        <div className="flex items-center gap-4">
          <Link
            to="/home"
            className="text-sm text-slate-600 hover:text-teal-700"
          >
            Home
          </Link>
          <button
            type="button"
            className="rounded-md bg-slate-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-700"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};
