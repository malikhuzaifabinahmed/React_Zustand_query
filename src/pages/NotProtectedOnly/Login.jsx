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
      <h1 className="mb-4 font-bold text-2xl">Login</h1>

      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Email</label>
          <input
            type="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className="p-2 border rounded w-full"
          />
          {formik.touched.email && formik.errors.email && (
            <div className="mt-1 text-red-600 text-sm">
              {formik.errors.email}
            </div>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-2">Password</label>
          <input
            type="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className="p-2 border rounded w-full"
          />
          {formik.touched.password && formik.errors.password && (
            <div className="mt-1 text-red-600 text-sm">
              {formik.errors.password}
            </div>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 p-2 rounded w-full text-white"
          disabled={loginMutation.isPending || !formik.isValid}
        >
          {loginMutation.isPending ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
}
