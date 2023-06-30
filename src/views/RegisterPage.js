import React from "react";
import { Controller, useForm } from "react-hook-form";
import { ButtonC, InputC, TextAlt } from "../components";
import { useNavigate } from "react-router";
import { useAuth } from "../context/authContext";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { onRegister } = useAuth();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  const onSubmit = (data) => onRegister(data);

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
          Sign Up
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
                  name="username"
                  rules={{ required: true }}
                  render={({ field }) => (
                    <InputC type="text" label="Username" {...field} />
                  )}
                />
                {errors.username && <TextAlt />}
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
                <ButtonC type="submit" label={"Sign Up"} />
              </div>
              <div class="flex justify-center items-center mt-6">
                <a
                  onClick={() => navigate("/login")}
                  class="inline-flex items-center font-bold  text-xs text-center"
                >
                  <span class="ml-2">Already have an account?</span>
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
