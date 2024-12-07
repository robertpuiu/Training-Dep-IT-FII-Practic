import { db } from "@/lib/db";

export async function GET(req: Request, res: Response) {
  try {
    const areas = await db.area.findMany();

    return new Response(JSON.stringify(areas), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response("Could not retrieve areas", { status: 500 });
  }
}
