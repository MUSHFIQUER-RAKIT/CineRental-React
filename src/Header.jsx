import { useContext, useState } from "react";
import Moon from "./assets/icons/moon.svg";
import Sun from "./assets/icons/sun.svg";
import Logo from "./assets/logo.svg";
import Ring from "./assets/ring.svg";
import ShopingCart from "./assets/shopping-cart.svg";
import CartDetails from "./cine/cartDetails";
import { MovieContext, ThemeContext } from "./context";
import Login from "./Pages/Login";
import Registation from "./Pages/Registation";

export default function Header() {
  const [showCart, setShowCart] = useState(false);
  const { state } = useContext(MovieContext);
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const [isLogin, setIsLogin] = useState(false);
  const [isRegistation, setIsRegistation] = useState(false);
  const [isLoginBtn, setIsLoginBtn] = useState(true);

  const [profile, setProfile] = useState("");

  function handleLogin() {
    setIsLogin(true);
  }
  function handleRegistation() {
    setIsRegistation(true);
  }

  function handleCartShow() {
    setShowCart(true);
  }

  return (
    <header>
      {showCart && <CartDetails onClose={() => setShowCart(false)} />}
      {isLogin && (
        <Login
          onClose={() => setIsLogin(false)}
          setIsLoginBtn={setIsLoginBtn}
          setProfile={setProfile}
        />
      )}
      {isRegistation && <Registation onClose={() => setIsRegistation(false)} />}
      <nav className="container flex items-center justify-between space-x-10 py-6">
        <a href="index.html">
          <img src={Logo} width="139" height="26" alt="logo" />
        </a>

        <ul className="flex items-center space-x-5">
          {isLoginBtn ? (
            <>
              <li className="bg-primary/20 dark:bg-primary/[7%] p-1 inline-block  rounded text-[#12CF6F]">
                <a href="#" onClick={handleLogin}>
                  Login
                </a>
              </li>
              <li className="bg-primary/20 dark:bg-primary/[7%] p-1 inline-block  rounded text-[#12CF6F]">
                <a href="#" onClick={handleRegistation}>
                  Sign up
                </a>
              </li>
            </>
          ) : (
            <div className="bg-primary/20 dark:bg-primary/[7%] p-1 inline-block  rounded text-[#12CF6F]">
              {profile}
            </div>
          )}

          <li>
            <a
              className="bg-primary/20 dark:bg-primary/[7%] rounded-lg backdrop-blur-[2px] p-1 inline-block"
              href="#"
            >
              <img src={Ring} width="24" height="24" alt="ring" />
            </a>
          </li>
          <li>
            <a
              className="bg-primary/20 dark:bg-primary/[7%] rounded-lg backdrop-blur-[2px] p-1 inline-block"
              href="#"
              onClick={() => setDarkMode(darkMode => !darkMode)}
            >
              <img
                src={darkMode ? Sun : Moon}
                width="24"
                height="24"
                alt="moon"
              />
            </a>
          </li>
          <li>
            <a
              className="bg-primary/20 dark:bg-primary/[7%] rounded-lg backdrop-blur-[2px] p-1 inline-block"
              href="#"
              onClick={handleCartShow}
            >
              <img src={ShopingCart} width="24" height="24" alt="cart" />
              {state.cartData.length > 0 && (
                <span className="rounded-full absolute top-[-12px] left-[28px] bg-[#12CF6F] text-white text-center p-[2px] w-[30px] h-[30px]">
                  {state.cartData.length}
                </span>
              )}
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
