import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";

function SignUp() {
  const [formData, setFormData] = useState({});
  const [errMessage, setErrMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleForm = (e) => {
    // console.log([e.target.id]);
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    // console.log(formData);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password || !formData.username) {
      return setErrMessage("Please fill out all fields!");
    }
    try {
      setLoading(true);
      setErrMessage(null);
      const res = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrMessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        return navigate("/sign-in");
      }
    } catch (err) {
      setErrMessage(err.message);
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left */}
        <div className="flex-1">
          <Link to="/" className="font-semibold dark:text-black text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Faizans
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            This is a demo page for blog application. You can sign up with your
            email or continue with google.{" "}
          </p>
        </div>
        {/* right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label
                className="font-semibold dark:text-dark"
                value="Your Username"
              />
              <TextInput
                type="text"
                id="username"
                placeholder="Username"
                onChange={handleForm}
              />
            </div>
            <div>
              <Label
                className="font-semibold dark:text-dark"
                value="Your Email"
              />
              <TextInput
                type="email"
                id="email"
                placeholder="name@company.com"
                onChange={handleForm}
              />
            </div>
            <div>
              <Label
                className="font-semibold dark:text-dark"
                value="Your Password"
              />
              <TextInput
                type="password"
                id="password"
                placeholder="Password"
                onChange={handleForm}
              />
            </div>
            <Button
              disabled={loading}
              gradientDuoTone="purpleToPink"
              type="submit"
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Already have an account?</span>
            <Link to="/sign-in" className="text-blue-500">
              Sign In
            </Link>
          </div>
          {errMessage && (
            <Alert className="mt-5" color="failure">
              {errMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}

export default SignUp;
