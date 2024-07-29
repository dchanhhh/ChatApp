import logo from "../assets/logo.png";

const AuthLayouts = ({ children }) => {
  return (
    <>
      <header className="flex justify-center items-center flex-col pt-3 bg-white">
        <img src={logo} alt="logo" width={90} height={90} />
        <p className="flex justify-center py-2 font-bold text-3xl">Telegram</p>
        <p className="text-xl">a new area of messaging</p>
      </header>
      
      {children}
    </>
  );
};

export default AuthLayouts;
