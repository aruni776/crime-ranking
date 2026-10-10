import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";


function parseCSV(text: string): Record<string, string>[] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;

  text = text.replace(/^\uFEFF/, "");

  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    if (char === '"') {
      if (inQuotes && text[i + 1] === '"') {
        field += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      row.push(field);
      field = "";
    } else if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && text[i + 1] === "\n") i++;

      row.push(field);
      if (row.some((value) => value.trim() !== "")) rows.push(row);

      row = [];
      field = "";
    } else {
      field += char;
    }
  }

  if (field !== "" || row.length > 0) {
    row.push(field);
    if (row.some((value) => value.trim() !== "")) rows.push(row);
  }

  if (rows.length === 0) return [];

  const headers = rows[0].map((header) => header.trim());

  return rows.slice(1).map((values) =>
    Object.fromEntries(
      headers.map((header, index) => [
        header,
        (values[index] ?? "").trim(),
      ]),
    ),
  );
}

export async function GET() {
  try {
    const filePath = path.join(
      process.cwd(),
      "data",
      "articles.csv",
    );

    const csv = await readFile(filePath, "utf8");
    const articles = parseCSV(csv);

    const reviewedArticles = articles
      .filter(
        (article) =>
          article.is_reviewed?.toLowerCase() === "true",
      )
      .map((article) => ({
        id: article.id,
        title: article.title,
        source: article.source,
        published_on: article.published_on,
        location: article.location,
        crime_type: article.crime_type,
        url: article.url,
        is_reviewed: true,
      }));

    return NextResponse.json(reviewedArticles);
  } catch (error) {
    console.error("Failed to load articles:", error);

    return NextResponse.json(
      { error: "Unable to load article data." },
      { status: 500 },
    );
  }
}