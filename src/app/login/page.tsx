"use client";
import { useState } from "react";
import { Input } from "@/components/inputs/Input";
import { TextButton } from "@/components/buttons/Button";
import { useRouter } from "next/navigation";
import { BsEye, BsEyeSlash } from "react-icons/bs";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const login_api = process.env.NEXT_PUBLIC_LOGIN_URL;
  const router = useRouter();

  const setToken = (token: string) => {
    localStorage.setItem("AuthToken", token);
  };

  //Using the provided api for login as this was not availabele in 'https://fakestoreapi.noksha.dev/api'
  //would use api.post() instead of fetch() to validate credentials if i were using 'https://fakestoreapi.com'
  const handleSubmit = async () => {
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${login_api}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(
          data.message || "Login failed. Please check your credentials.",
        );
      }

      setToken(data.token);
      router.push("/products");
      setLoading(false);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    }
  };

  return (
    <>
      <div className="h-screen flex items-center justify-center">
        <div className="p-6 bg-white rounded-2xl flex flex-col items-center">
          username: johnd
          <br />
          password: m38rmF$
          <div className=" flex flex-col items-center gap-4 mb-4">
            <div className="w-fit">
              <svg
                viewBox="0 0 154 32"
                xmlns="http://www.w3.org/2000/svg"
                className="w-[100px] md:w-[134px] h-[36px] mix-blend-difference text-white md:mix-blend-difference mix-blend-mode:difference"
                fill="currentColor"
              >
                <path d="M63.6095 31.8637C62.4128 31.8637 61.4405 31.8365 60.6926 31.7821C59.9447 31.7277 59.122 31.5577 58.2245 31.2722C57.327 30.9866 56.6267 30.5786 56.1235 30.0483C55.6204 29.5179 55.192 28.7632 54.8384 27.7841C54.4849 26.805 54.3081 25.6084 54.3081 24.1873V9.31055H66.3428V14.41H60.2643V23.793C60.2643 24.9352 60.5498 25.7172 61.121 26.1319C61.6921 26.5535 62.5216 26.7574 63.6095 26.7574H66.4176V31.8569H63.6095V31.8637Z"></path>
                <path d="M79.0719 31.8637C77.8752 31.8637 76.9029 31.8365 76.155 31.7821C75.4071 31.7277 74.5844 31.5577 73.6869 31.2722C72.7894 30.9866 72.0891 30.5786 71.5859 30.0483C71.0828 29.5179 70.6544 28.7632 70.3008 27.7841C69.9473 26.805 69.7705 25.6084 69.7705 24.1873V9.31055H81.8052V14.41H75.7267V23.793C75.7267 24.9352 76.0122 25.7172 76.5834 26.1319C77.1545 26.5535 77.984 26.7574 79.0719 26.7574H81.88V31.8569H79.0719V31.8637Z"></path>
                <path d="M23.9402 9.37158L15.0196 31.8023H8.88663L0 9.37158H6.93525L11.9531 24.5271L17.0117 9.37158H23.947H23.9402Z"></path>
                <path d="M41.7587 9.11426V14.7916C38.903 14.7916 36.7953 15.3288 35.4354 16.4031C34.0756 17.4773 33.3956 19.3811 33.3956 22.1008V31.8034H26.9023V9.37263H32.9809L33.3616 12.4187C33.7696 11.5416 34.7011 10.7733 36.1425 10.1069C37.584 9.44062 39.4606 9.11426 41.7723 9.11426H41.7587Z"></path>
                <path d="M44.6299 9.37158H50.9872V31.8023H44.6299V9.37158Z"></path>
                <path d="M105.175 20.2494C105.175 20.8613 105.134 21.5141 105.052 22.2076H89.8152C90.0055 23.717 90.5427 24.9001 91.4402 25.75C92.3377 26.5999 93.4596 27.0283 94.799 27.0283C97.1584 27.0283 98.7902 26.1308 99.7013 24.329H104.889C104.502 26.5659 103.42 28.4017 101.653 29.8364C99.8849 31.271 97.5459 31.9917 94.6358 31.9917C91.3382 31.9917 88.6593 30.8971 86.6059 28.7145C84.5457 26.5251 83.519 23.717 83.519 20.2834C83.519 16.8498 84.4981 14.0009 86.4631 11.8251C88.4281 9.64937 91.1614 8.55469 94.6766 8.55469C97.9199 8.55469 100.476 9.60177 102.353 11.7027C104.23 13.8037 105.168 16.6458 105.168 20.2426L105.175 20.2494ZM94.6018 13.5929C92.0793 13.5929 90.5291 14.9732 89.9375 17.7405H98.967C98.525 14.9732 97.07 13.5929 94.6018 13.5929Z"></path>
                <path d="M118 32C114.703 32 112.051 30.9121 110.052 28.7432C108.046 26.5674 107.047 23.7389 107.047 20.2509C107.047 16.7629 108.04 13.9412 110.032 11.7926C112.024 9.63727 114.676 8.56299 118 8.56299C119.673 8.56299 121.169 8.78056 122.481 9.21572C123.793 9.65087 124.847 10.188 125.65 10.8271C126.445 11.4663 127.118 12.2346 127.669 13.1253C128.22 14.016 128.601 14.8455 128.825 15.6206C129.049 16.3889 129.199 17.1776 129.28 17.98H123.549C123.413 16.8921 122.882 15.947 121.951 15.1583C121.019 14.3696 119.891 13.9752 118.565 13.9752C116.919 13.9752 115.662 14.5463 114.798 15.6818C113.935 16.8173 113.499 18.3403 113.499 20.2509C113.499 22.1615 113.935 23.6301 114.798 24.786C115.662 25.9419 116.919 26.5198 118.565 26.5198C119.85 26.5198 120.965 26.0915 121.903 25.2416C122.842 24.3917 123.392 23.433 123.549 22.3723H129.28C129.199 23.229 129.049 24.0585 128.825 24.854C128.601 25.6495 128.22 26.4926 127.669 27.3901C127.118 28.2808 126.445 29.056 125.65 29.7223C124.854 30.3818 123.793 30.9257 122.481 31.3541C121.169 31.7825 119.673 32 118 32Z"></path>
                <path d="M145.096 9.19447C147.714 9.19447 149.747 9.90159 151.188 11.3158C152.63 12.7301 153.357 14.7427 153.357 17.3604V31.802H146.884V18.1763C146.884 15.9461 145.64 14.8311 143.158 14.8311C141.833 14.8311 140.67 15.171 139.67 15.8441C138.671 16.5173 138.175 17.4148 138.175 18.5367V31.802H131.702V3.24512H138.175V11.9006C139.011 11.0643 140.051 10.4047 141.302 9.91519C142.553 9.43244 143.811 9.18767 145.089 9.18767L145.096 9.19447Z"></path>
                <circle cx="47.9568" cy="3.3269" r="3.3269"></circle>
              </svg>
            </div>
            <h1>Vrit Technologies</h1>
            <p>Sign in to your account</p>
          </div>
          <form onSubmit={handleSubmit}>
            <Input
              label="Email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              autoComplete="email"
              required
            />

            <div className="mb-8">
              <label className="form-label">Password</label>
              <div style={{ position: "relative" }}>
                <input
                  className="w-full min-w-0 border rounded py-3 px-4 font-body text-base/6 text-gray-900 bg-white outline-none transition-[border-color,box-shadow] duration-150"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  required
                  style={{ paddingRight: 42 }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  style={{
                    position: "absolute",
                    right: 10,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 4,
                    display: "flex",
                    alignItems: "center",
                    color: "var(--color-text-muted, #888)",
                  }}
                >
                  {showPassword ? <BsEye /> : <BsEyeSlash />}
                </button>
              </div>
            </div>

            {error && <div className="text-red-500">{error}</div>}

            <TextButton onClick={handleSubmit}>
              {loading ? "Signing in..." : "Sign in"}
            </TextButton>

            <div style={{ textAlign: "right", marginTop: 12 }}>
              <a
                href="/forgot-password"
                style={{
                  fontSize: 13,
                  color: "var(--color-primary)",
                  textDecoration: "none",
                }}
              >
                Forgot password?
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
