import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// Tags the Django backend is allowed to invalidate. Keep this in sync with
// every cacheTag(...) call in app/_lib/*.ts and app/_utils/*.ts.
// Currently only "management" is used anywhere in the app.
const VALID_TAGS = new Set(["management"]); 

export async function POST(request: NextRequest) {
    const secret = request.headers.get("x-revalidate-secret");

    if (!process.env.REVALIDATE_SECRET) {
        return NextResponse.json(
            { error: "REVALIDATE_SECRET is not configured on the frontend" },
            { status: 500 },
        );
    }

    if (secret !== process.env.REVALIDATE_SECRET) {
        return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
    }

    let body: unknown;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const tag = (body as { tag?: unknown })?.tag;

    if (typeof tag !== "string" || !VALID_TAGS.has(tag)) {
        return NextResponse.json(
            { error: `tag must be one of: ${[...VALID_TAGS].join(", ")}` },
            { status: 400 },
        );
    }

    revalidateTag(tag);

    return NextResponse.json({ revalidated: true, tag, now: Date.now() });
}