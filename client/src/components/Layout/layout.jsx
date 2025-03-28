import { Toaster } from "react-hot-toast";

// components/Layout.jsx
export default function Layout({ children }) {
    return (
      <div className="bg-bgFull flex flex-row w-screen h-screen p-12 max-md:p-5">
     
        {children}
      </div>
    );
  }