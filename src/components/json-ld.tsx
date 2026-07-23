import type { JsonLdObject } from "@/lib/json-ld";

/** Serializa JSON-LD sem XSS por `</script>` no conteúdo. */
export function JsonLd({ data }: { data: JsonLdObject | JsonLdObject[] }) {
  const payload = Array.isArray(data) ? (data.length === 1 ? data[0] : data) : data;
  const json = JSON.stringify(payload).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
