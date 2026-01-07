import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import dataBase from "@/config/db"; // ✅ DEFAULT import
import { usersTable } from "@/config/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const user = await currentUser();

    if (!user || !user.primaryEmailAddress) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const users = await dataBase
      .select()
      .from(usersTable)
      .where(
        eq(
          usersTable.email,
          user.primaryEmailAddress.emailAddress
        )
      );

    if (users.length === 0) { // ✅ fixed typo
      const result = await dataBase
        .insert(usersTable)
        .values({
          name: user.fullName ?? "",
          email: user.primaryEmailAddress.emailAddress,
          credits: 10,
        })
        .returning({ usersTable });

      return NextResponse.json(result[0]?.usersTable);
    }

    return NextResponse.json(users[0]);
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating user", error },
      { status: 500 }
    );
  }
}
