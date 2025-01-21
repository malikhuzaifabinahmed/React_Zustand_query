import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import { useLogin } from "@/hooks/mutations/auth";

export function Login() {
  const navigate = useNavigate();

  const loginMutation = useLogin({
    onSuccess: ({ access_token, refresh_token }) => {
      if (!access_token || !refresh_token) {
        throw new Error("Invalid authentication response");
      }
      toast.success("Login successful!");
      navigate("/");
    },
    onError: (error) => {
      if (error.response.status === 401) {
        toast.error("Invalid email or password. Please try again.");
        return;
      }
      toast.error(error.message || "Login failed. Please try again.");
    },

  });

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      loginMutation.mutate({
        email: values.email,
        password: values.password,
      });
    },
  });

  return (
    <div className="mx-auto mt-8 max-w-md">
      <h1 className="mb-4 font-bold text-2xl text-foreground">Login</h1>

      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 text-foreground">Email</label>
          <input
            type="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className="p-2 w-full border-input bg-background text-foreground rounded"
          />
          {formik.touched.email && formik.errors.email && (
            <div className="mt-1 text-destructive text-sm">
              {formik.errors.email}
            </div>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-foreground">Password</label>
          <input
            type="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className="p-2 w-full border-input bg-background text-foreground rounded"
          />
          {formik.touched.password && formik.errors.password && (
            <div className="mt-1 text-destructive text-sm">
              {formik.errors.password}
            </div>
          )}
        </div>
        <button
          type="submit"
          className="bg-primary text-primary-foreground hover:bg-primary/90 p-2 rounded w-full"
          disabled={loginMutation.isPending || !formik.isValid}
        >
          {loginMutation.isPending ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
}
