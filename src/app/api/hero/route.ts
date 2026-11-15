import { NextResponse } from "next/server";
import { getHeroSection, updateHeroImage } from "@/lib/portfolio-service";
import { getSessionUser } from "@/lib/auth";

export async function GET() {
  try {
    const data = await getHeroSection();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in GET /api/hero:", error);
    return NextResponse.json({ error: "Failed to fetch hero section" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { imageUrl, imageAlt } = body;

    if (!imageUrl || typeof imageUrl !== "string") {
      return NextResponse.json({ error: "Valid imageUrl is required." }, { status: 400 });
    }

    const success = await updateHeroImage(imageUrl, imageAlt);
    return NextResponse.json({ success, message: "Hero image updated successfully." });
  } catch (error) {
    console.error("Error in PUT /api/hero:", error);
    return NextResponse.json({ error: "Failed to update hero image" }, { status: 500 });
  }
}
