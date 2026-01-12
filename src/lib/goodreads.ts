import { XMLParser } from "fast-xml-parser";

export interface Book {
  title: string;
  author: string;
  coverUrl: string;
  link: string;
  dateRead: Date | null;
}

interface RssItem {
  title?: string;
  author_name?: string;
  book_large_image_url?: string;
  book_image_url?: string;
  link?: string;
  user_read_at?: string;
}

interface RssChannel {
  item?: RssItem | RssItem[];
}

interface RssRoot {
  rss?: {
    channel?: RssChannel;
  };
}

const parser = new XMLParser();

export function parseBookFromItem(item: RssItem): Book {
  const title = item.title ?? "";
  const author = item.author_name ?? "";
  const coverUrl = item.book_large_image_url ?? item.book_image_url ?? "";
  const link = item.link ?? "";

  let dateRead: Date | null = null;
  if (item.user_read_at && item.user_read_at.trim() !== "") {
    const parsed = new Date(item.user_read_at);
    if (!isNaN(parsed.getTime())) {
      dateRead = parsed;
    }
  }

  return { title, author, coverUrl, link, dateRead };
}

export function parseGoodreadsRss(xml: string): Book[] {
  const result = parser.parse(xml) as RssRoot;
  const channel = result.rss?.channel;

  if (!channel?.item) {
    return [];
  }

  const items = Array.isArray(channel.item) ? channel.item : [channel.item];
  return items.map(parseBookFromItem);
}

export function filterBooksReadInYear(books: Book[], year: number): Book[] {
  return books.filter((book) => {
    if (!book.dateRead) return false;
    return book.dateRead.getFullYear() === year;
  });
}

export function sortBooksByDateRead(
  books: Book[],
  order: "asc" | "desc" = "desc"
): Book[] {
  return [...books].sort((a, b) => {
    if (!a.dateRead || !b.dateRead) return 0;
    const diff = a.dateRead.getTime() - b.dateRead.getTime();
    return order === "desc" ? -diff : diff;
  });
}

export async function fetchShelf(
  userId: string,
  shelf: string
): Promise<Book[]> {
  const url = `https://www.goodreads.com/review/list_rss/${userId}?shelf=${shelf}`;
  const response = await fetch(url);
  const xml = await response.text();
  return parseGoodreadsRss(xml);
}

// Inline tests
if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest;

  const sampleItemXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <item>
      <title>The Great Gatsby</title>
      <author_name>F. Scott Fitzgerald</author_name>
      <book_large_image_url>https://example.com/gatsby.jpg</book_large_image_url>
      <book_image_url>https://example.com/gatsby-small.jpg</book_image_url>
      <link>https://www.goodreads.com/review/show/123</link>
      <user_read_at>Sat, 15 Mar 2026 00:00:00 +0000</user_read_at>
    </item>
  </channel>
</rss>`;

  const multipleItemsXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <item>
      <title>Book One</title>
      <author_name>Author One</author_name>
      <book_image_url>https://example.com/one.jpg</book_image_url>
      <link>https://example.com/1</link>
      <user_read_at>Mon, 10 Feb 2026 00:00:00 +0000</user_read_at>
    </item>
    <item>
      <title>Book Two</title>
      <author_name>Author Two</author_name>
      <book_image_url>https://example.com/two.jpg</book_image_url>
      <link>https://example.com/2</link>
      <user_read_at>Tue, 05 Jan 2025 00:00:00 +0000</user_read_at>
    </item>
    <item>
      <title>Book Three</title>
      <author_name>Author Three</author_name>
      <book_image_url>https://example.com/three.jpg</book_image_url>
      <link>https://example.com/3</link>
      <user_read_at></user_read_at>
    </item>
  </channel>
</rss>`;

  const emptyFeedXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
  </channel>
</rss>`;

  const missingFieldsXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <item>
      <title>Minimal Book</title>
    </item>
  </channel>
</rss>`;

  describe("parseGoodreadsRss", () => {
    it("parses a single book from RSS", () => {
      const books = parseGoodreadsRss(sampleItemXml);

      expect(books).toHaveLength(1);
      expect(books[0].title).toBe("The Great Gatsby");
      expect(books[0].author).toBe("F. Scott Fitzgerald");
      expect(books[0].coverUrl).toBe("https://example.com/gatsby.jpg");
      expect(books[0].link).toBe("https://www.goodreads.com/review/show/123");
      expect(books[0].dateRead).toBeInstanceOf(Date);
      expect(books[0].dateRead?.getFullYear()).toBe(2026);
    });

    it("parses multiple books from RSS", () => {
      const books = parseGoodreadsRss(multipleItemsXml);
      expect(books).toHaveLength(3);
    });

    it("handles empty feed", () => {
      const books = parseGoodreadsRss(emptyFeedXml);
      expect(books).toHaveLength(0);
    });

    it("handles missing fields gracefully", () => {
      const books = parseGoodreadsRss(missingFieldsXml);

      expect(books).toHaveLength(1);
      expect(books[0].title).toBe("Minimal Book");
      expect(books[0].author).toBe("");
      expect(books[0].coverUrl).toBe("");
      expect(books[0].link).toBe("");
      expect(books[0].dateRead).toBeNull();
    });

    it("prefers book_large_image_url over book_image_url", () => {
      const books = parseGoodreadsRss(sampleItemXml);
      expect(books[0].coverUrl).toBe("https://example.com/gatsby.jpg");
    });

    it("falls back to book_image_url when large is missing", () => {
      const books = parseGoodreadsRss(multipleItemsXml);
      expect(books[0].coverUrl).toBe("https://example.com/one.jpg");
    });
  });

  describe("filterBooksReadInYear", () => {
    it("filters books by year correctly", () => {
      const books = parseGoodreadsRss(multipleItemsXml);
      const filtered = filterBooksReadInYear(books, 2026);

      expect(filtered).toHaveLength(1);
      expect(filtered[0].title).toBe("Book One");
    });

    it("excludes books with null dateRead", () => {
      const books = parseGoodreadsRss(multipleItemsXml);
      const filtered = filterBooksReadInYear(books, 2026);

      const hasNullDate = filtered.some((b) => b.dateRead === null);
      expect(hasNullDate).toBe(false);
    });

    it("returns empty array when no books match year", () => {
      const books = parseGoodreadsRss(multipleItemsXml);
      const filtered = filterBooksReadInYear(books, 2020);

      expect(filtered).toHaveLength(0);
    });
  });

  describe("sortBooksByDateRead", () => {
    it("sorts books by date in descending order by default", () => {
      const books = parseGoodreadsRss(multipleItemsXml).filter(
        (b) => b.dateRead !== null
      );
      const sorted = sortBooksByDateRead(books);

      expect(sorted[0].title).toBe("Book One"); // Feb 2026
      expect(sorted[1].title).toBe("Book Two"); // Jan 2025
    });

    it("sorts books by date in ascending order", () => {
      const books = parseGoodreadsRss(multipleItemsXml).filter(
        (b) => b.dateRead !== null
      );
      const sorted = sortBooksByDateRead(books, "asc");

      expect(sorted[0].title).toBe("Book Two"); // Jan 2025
      expect(sorted[1].title).toBe("Book One"); // Feb 2026
    });
  });

  describe("parseBookFromItem", () => {
    it("parses empty user_read_at as null", () => {
      const item: RssItem = {
        title: "Test",
        user_read_at: "",
      };
      const book = parseBookFromItem(item);
      expect(book.dateRead).toBeNull();
    });

    it("parses whitespace-only user_read_at as null", () => {
      const item: RssItem = {
        title: "Test",
        user_read_at: "   ",
      };
      const book = parseBookFromItem(item);
      expect(book.dateRead).toBeNull();
    });

    it("parses valid date string", () => {
      const item: RssItem = {
        title: "Test",
        user_read_at: "Sat, 15 Mar 2026 00:00:00 +0000",
      };
      const book = parseBookFromItem(item);
      expect(book.dateRead).toBeInstanceOf(Date);
      expect(book.dateRead?.getMonth()).toBe(2); // March is 2 (0-indexed)
    });
  });
}
