import { z } from "zod";

export type Dog = z.infer<typeof dogSchema>;
export const dogSchema = z.object({
  img: z.string(),
  name: z.string(),
  age: z.number(),
  breed: z.string(),
  zip_code: z.string(),
  id: z.string(),
});
