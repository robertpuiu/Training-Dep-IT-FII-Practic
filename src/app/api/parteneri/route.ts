import { db } from "@/lib/db";

export async function GET(req: Request, res: Response) {
  try {
    const partners = await db.partner.findMany();

    return new Response(JSON.stringify(partners), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response("Could not fetch partners", { status: 500 });
  }
}
