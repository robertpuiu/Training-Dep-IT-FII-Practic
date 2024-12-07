import { getAuthSession } from "@/lib/auth";

import { UserRole } from "@prisma/client";
import { PartnerSchema } from "@/lib/validators/partner";
import { db } from "@/lib/db";
import { z } from "zod";

export async function PATCH(
  req: Request,
  { params }: { params: { partnerId: string } }
) {
  try {
    const session = await getAuthSession();

    if (!session) {
      return new Response("Unauthanticated", { status: 401 });
    }

    if (session.user.role !== UserRole.ADMIN) {
      return new Response("Unauthorized", { status: 403 });
    }

    const body = await req.json();

    const { name, imageUrl, tier, url } = PartnerSchema.parse(body);

    const partner = await db.partner.update({
      where: {
        id: params.partnerId,
      },
      data: {
        name,
        imageUrl,
        tier,
        url,
      },
    });

    return new Response(partner.name, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response("Could not update partner", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { partnerId: string } }
) {
  try {
    const session = await getAuthSession();

    if (!session) {
      return new Response("Unauthanticated", { status: 401 });
    }

    if (session.user.role !== UserRole.ADMIN) {
      return new Response("Unauthorized", { status: 403 });
    }

    // Check if the partner has any users connected to it
    const users = await db.user.findMany({
      where: {
        partnerId: params.partnerId,
      },
    });

    if (users.length > 0) {
      return new Response("Partner has users connected to it", { status: 422 });
    }

    await db.partner.delete({
      where: {
        id: params.partnerId,
      },
    });

    return new Response("Partner deleted", { status: 200 });
  } catch (error) {
    return new Response("Could not delete partner", { status: 500 });
  }
}
