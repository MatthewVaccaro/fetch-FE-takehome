import { useCallback, useState, type ChangeEvent } from "react";
import type { Route } from "./+types/auth";
import { z, ZodError } from "zod";
import { API } from "~/api/api";
import { redirect } from "react-router";
import { useNavigate } from "react-router";
import { Form } from "react-router";

const formDataSechma = z.object({
  name: z.string(),
  email: z.string().email(),
});

export async function clientAction({ request }: Route.ActionArgs) {
  try {
    const formData = await request.formData();
    const formValues = Object.fromEntries(formData);
    const parsedData = formDataSechma.parse(formValues);

    const res = await API.post("/auth/login", parsedData);

    return redirect("/");
  } catch (e) {
    const err = e as Error | ZodError;
    console.log(err);
    return err;
  }
}

export default function Auth() {
  return (
    <section className="p-3 md:p-6">
      <h2 className="font-bold text-brand-purple text-center"> Fetch </h2>
      <div className="bg-brand-purple p-6 rounded-xl flex flex-col max-w-[650px] mx-auto">
        <h4 className="text-white mb-4 text-center font-medium">
          Create Account
        </h4>
        <Form method="post" className="flex flex-col gap-4">
          <label
            htmlFor="name"
            className="flex flex-col gap-1 text-white font-medium"
          >
            Full Name
            <input
              className="px-4 py-3 rounded-sm bg-white text-brand-purple font-semibold"
              name="name"
              placeholder="Enter your name"
            />
          </label>

          <label
            htmlFor="email"
            className="flex flex-col gap-1 text-white font-medium"
          >
            Email Address
            <input
              className="px-4 py-3 rounded-sm bg-white text-brand-purple font-semibold"
              type="email"
              name="email"
              placeholder="Enter a valid email"
            />
          </label>
          <button
            type="submit"
            className=" bg-brand-red rounded-md mt-3 px-6 py-3 text-white hover:bg-brand-red/70 duration-300 transition-all"
          >
            Create
          </button>
        </Form>
      </div>
    </section>
  );
}
