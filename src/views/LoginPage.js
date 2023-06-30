import React from "react";
import { Controller, useForm } from "react-hook-form";
import { ButtonC, InputC, TextAlt } from "../components";
import { useNavigate } from "react-router";
import { useAuth } from "../context/authContext";

const LoginPage = () => {
  const { onLogin } = useAuth();
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => await onLogin(data);

  return (
    <div class="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div
        class="absolute inset-x-0 transform-gpu overflow-hidden blur-3xl"
        aria-hidden="true"
      >
        <div class="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"></div>
      </div>
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Sign In
        </h2>
      </div>
      <div className="flex flex-col justify-center items-center mt-5">
        <div className="card w-full max-w-md shadow-2xl bg-base-100 ">
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div class="gap-x-8 gap-y-6 sm:col-span-2">
                <Controller
                  control={control}
                  name="email"
                  rules={{ required: true }}
                  render={({ field }) => (
                    <InputC type="email" label="Email" {...field} />
                  )}
                />

                {errors.email && <TextAlt />}
              </div>
              <div className="mt-2.5">
                <Controller
                  control={control}
                  name="password"
                  rules={{ required: true }}
                  render={({ field }) => (
                    <InputC type="password" label="Password" {...field} />
                  )}
                />
                {errors.password && <TextAlt />}
              </div>
              <div class="mt-10">
                <ButtonC type="submit" label={"Sign In"} />
              </div>
              <div class="flex justify-center items-center mt-6">
                <a
                  onClick={() => navigate("/register")}
                  class="inline-flex items-center font-bold  text-xs text-center"
                >
                  <span>
                    <svg
                      class="h-6 w-6"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                  </span>
                  <span class="ml-2">You don't have an account?</span>
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
