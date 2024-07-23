import { NextResponse } from "next/server";

export async function POST(request: Request) {
	const { topic } = await request.json();
	try {
		const relatedTopics = [`${topic} 1`, `${topic} 2`];
		return NextResponse.json({ topics: relatedTopics });
	} catch (e) {
		return new Response("Error. Failed to generate related topics.", {
			status: 202,
		});
	}
}
