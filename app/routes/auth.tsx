import { useState, type ChangeEvent } from "react";
import type { Route } from "./+types/auth";
import { z, ZodError } from "zod";
import { API } from "~/api/api";
import { redirect } from "react-router";

const formDataSechma = z.object({
  name: z.string(),
  email: z.string().email(),
});

export async function action({ request }: Route.ActionArgs) {
  try {
    const formData = await request.formData();
    const formValues = Object.fromEntries(formData);
    const parsedData = formDataSechma.parse(formValues);

    const res = await API.post("/auth/login", parsedData);
    console.log(res.headers);
    // return redirect("/");
  } catch (e) {
    const err = e as Error | ZodError;
    console.log(err);
    return err;
  }
}

export default function Home() {
  const [form, setForm] = useState({
    name: "Matt Vaccaro",
    email: "vaccaro@hey.com",
  });
  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  return (
    <section>
      <h1> Auth</h1>

      <form method="post">
        <label htmlFor="name">
          Full Name
          <input
            name="name"
            value={form.name}
            onChange={onChange}
            placeholder="Enter your name"
          />
        </label>

        <label htmlFor="email">
          Email Address
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
            placeholder="Enter a valid email"
          />
        </label>
        <button type="submit"> Login </button>
      </form>
    </section>
  );
}
