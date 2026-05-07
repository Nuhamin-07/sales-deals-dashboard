import { useActionState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Signin = () => {
  const { signInUser } = useAuth();
  const navigate = useNavigate();
  const [error, submitAction, isPending] = useActionState(
    async (previousState, formData) => {
      const email = formData.get("email");
      const password = formData.get("password");
      const {
        success,
        data,
        error: signInError,
      } = await signInUser(email, password);
      if (signInError) {
        return new Error(signInError);
      }
      if (success && data?.session) {
        navigate("/dashboard");
        return null;
      }
      return null;
    },
  );

  return (
    <>
      <h1 className="landing-header">Paper Like A Boss</h1>
      <div className="sign-form-container">
        <form
          action={submitAction}
          aria-label="Sign in form"
          aria-describedby="form-description"
        >
          <div id="form-description" className="sr-only">
            Use this form to sign in to your account. Enter your email and
            password.
          </div>

          <h2 className="form-title">Sign in</h2>
          <p>
            Don't have an account yet?
            <Link className="form-link" to="/signup">
              Sign up
            </Link>
          </p>

          <label htmlFor="email">Email</label>
          <input
            className="form-input"
            type="email"
            name="email"
            id="email"
            placeholder=""
            required
            aria-required="true"
            //aria-invalid=
            //aria-describedby=
            //disabled=
          />

          <label htmlFor="password">Password</label>
          <input
            className="form-input"
            type="password"
            name="password"
            id="password"
            placeholder=""
            required
            aria-required="true"
            //aria-invalid=
            //aria-describedby=
            //disabled=
          />

          <button
            type="submit"
            className="form-button"
            //className=
            //aria-busy=
          >
            Sign In
            {/*'Signing in...' when pending*/}
          </button>

          {/* Error message */}
        </form>
      </div>
    </>
  );
};

export default Signin;
