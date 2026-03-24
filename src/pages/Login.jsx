import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "https://shivtechsolution.com/wp-json/jwt-auth/v1/token",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("userToken", data.token);
        localStorage.setItem("userName", data.user_display_name);
        localStorage.setItem("userID", data.user_id); // Save the numeric ID
        navigate("/account");
      } else {
        alert("Login Failed: " + data.message);
      }
    } catch (err) {
      alert("Error connecting to auth server: ", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-10 max-w-md">
      <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
      <form
        onSubmit={handleLogin}
        className="space-y-4 p-8 border rounded-2xl shadow-sm"
      >
        <input
          type="text"
          placeholder="Username or Email"
          className="w-full border p-3 rounded-lg"
          onChange={(e) =>
            setCredentials({ ...credentials, username: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-lg"
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold"
        >
          {loading ? "Authenticating..." : "Login"}
        </button>
      </form>
    </div>
  );
}
