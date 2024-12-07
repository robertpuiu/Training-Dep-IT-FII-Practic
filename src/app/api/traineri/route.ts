import { db } from "@/lib/db";

export async function GET(req: Request, res: Response) {
  try {
    const trainers = await db.user.findMany({
      where: {
        role: "TRAINER",
      },
      include: {
        partner: true,
        training: true,
      },
    });

    return new Response(JSON.stringify(trainers), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response("Could not fetch trainers", { status: 500 });
  }
}
