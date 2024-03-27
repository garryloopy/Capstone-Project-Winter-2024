"use client"
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLoadingState } from "@/components/useLoadingState";
import Loading from "@/components/Loading";
import OpenEye from "@/app/icons/OpenEye";
import CloseEye from "@/app/icons/CloseEye";



const Register = () => {
  const [viewMessage, setViewMessage] = useState();
  const [showPassword, setShowPassword] = useState(true);
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(false);
  const [lowercaseValidate, setLowercaseValidate] = useState(false);
  const [uppercaseValidate, setUppercaseValidate] = useState(false);
  const [digitValidate, setDigitValidate] = useState(false);
  const [specialCharValid, setSpecialCharValid] = useState(false);
  const formRef = useRef(null);
  const router = useRouter();
  const loading = useLoadingState();
  const [buttonLoading, setButtonLoading] = useState(false);

  useEffect(() => {
    validatePassword(password);
  }, [password]);

  const validatePassword = (password) => {
    const lowercaseRegex = new RegExp("(?=.*[a-z])");
    const uppercaseRegex = new RegExp("(?=.*[A-Z])");
    const digitRegex = new RegExp("(?=.*\\d)");
    const specialCharRegex = new RegExp("(?=.*[@$!%*?&])");

    const isLowercaseValid = lowercaseRegex.test(password);
    const isUppercaseValid = uppercaseRegex.test(password);
    const isDigitValid = digitRegex.test(password);
    const isSpecialCharValid = specialCharRegex.test(password);

    setPasswordLength(password && password.length >= 8);
    setLowercaseValidate(isLowercaseValid);
    setUppercaseValidate(isUppercaseValid);
    setDigitValidate(isDigitValid);
    setSpecialCharValid(isSpecialCharValid);
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmitClick = async (ev) => {
    ev.preventDefault();
    if (
      passwordLength &&
      lowercaseValidate &&
      uppercaseValidate &&
      digitValidate &&
      specialCharValid
    ) {
      setButtonLoading(true);
      const formData = new FormData(ev.currentTarget);
      const userInput = Object.fromEntries(formData);

      try {
        const res = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userInput),
        });

        const { message } = await res.json();
        setViewMessage(message);

        setPassword("");

        if (res.ok) {
          formRef.current.reset();
          router.push("/sign-in");
        }
        setButtonLoading(false);
      } catch (error) {
        console.log(error);
        setViewMessage("An error occurred. Please try again.");
      }
    } else {
      setViewMessage("The password is not matched");
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <section
          className={`p-[2rem] my-10 flex flex-col gap-8 justify-center items-center w-full lg:w-[50%] mx-auto border-2 border-gray-200 rounded-md bg-gray-100/80 `}
        >
          <h1 className="lg:text-3xl md:text-xl text-md text-primary">
            Create account
          </h1>

          <form
            ref={formRef}
            onSubmit={handleSubmitClick}
            className="flex flex-col justify-center items-center gap-4 w-full "
          >
            {viewMessage && (
              <span className="p-4 mb-2 text-lg font-semibold text-red-500">
                {viewMessage}
              </span>
            )}
            <label className="w-full">
              <span className=" text-gray-700 text-sm sm:text-md">
                Full name
              </span>
              <input type="text" name="name" className="form_input" required />
            </label>
            <label className="w-full">
              <span className=" text-gray-700 text-sm sm:text-md">
                Email address
              </span>
              <input
                type="email"
                name="email"
                className="form_input"
                required
              />
            </label>
            <label className="w-full relative">
              <span className=" text-gray-700 text-sm sm:text-md">
                Password
              </span>
              <input
                type={!showPassword ? "text" : "password"}
                name="password"
                value={password}
                className="form_input"
                onChange={(e) => {
                  setPassword(e.target.value);
                  setViewMessage("");
                }}
                required
              />
            
              <div
                className="w-4 h-4 absolute top-[40%] right-[15px] cursor-pointer"
                onClick={togglePassword}
              >
                {showPassword ? <OpenEye /> : <CloseEye />}
              </div>
            </label>

            <label className="w-full">
              <span className=" text-gray-700 text-sm sm:text-md">
                EmployeeId
              </span>
              <input
                type="text"
                name="employeeId"
                required
                className="form_input"
                onChange={() => {
                  setViewMessage("");
                }}
              />
            </label>

            <div className="text-sm flex flex-col gap-2 self-start ">
              <div className="flex gap-4 items-center ">
                <input
                  type="checkbox"
                  checked={passwordLength}
                  className="w-4 h-4"
                />
                <p>At least 8 characters in length</p>
              </div>

              <div className="flex gap-4 items-center">
                <input
                  type="checkbox"
                  checked={lowercaseValidate}
                  className="w-4 h-4"
                />
                <p>Contains at least one lowercase letter</p>
              </div>

              <div className="flex gap-4 items-center">
                <input
                  type="checkbox"
                  checked={uppercaseValidate}
                  className="w-4 h-4"
                />
                <p>Contains at least one uppercase letter</p>
              </div>

              <div className="flex gap-4 items-center">
                <input
                  type="checkbox"
                  checked={digitValidate}
                  className="w-4 h-4"
                />
                <p>Contains at least one digit</p>
              </div>

              <div className="flex gap-4 items-center">
                <input
                  type="checkbox"
                  checked={specialCharValid}
                  className="w-4 h-4"
                />
                <p>
                  Contains at least one special character from the set [@$!%*?&]
                </p>
              </div>
            </div>

            <button type="submit" className="sign_button mt-2">
              {buttonLoading ? "Loading ..." : "Register"}
            </button>
          </form>

          <Link className="mt-4 self-end text-sm" href="/sign-in">
            Already have an account?{" "}
            <span className="underline font-semibold">Login</span>
          </Link>
        </section>
      )}
    </>
  );
};

export default Register;
