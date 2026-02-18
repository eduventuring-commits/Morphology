"use client";

import type { WordCard } from "@/lib/types";

interface ChunkDisplayProps {
  card: WordCard;
}

interface Chunk {
  text: string;
  type: "prefix" | "root" | "suffix";
  label: string;
}

export default function ChunkDisplay({ card }: ChunkDisplayProps) {
  // Build the ordered list of non-null morpheme chunks
  const chunks: Chunk[] = [];

  if (card.prefix) {
    chunks.push({ text: card.prefix, type: "prefix", label: "prefix" });
  }
  if (card.root) {
    chunks.push({ text: card.root, type: "root", label: "root" });
  }
  if (card.suffix) {
    chunks.push({ text: card.suffix, type: "suffix", label: "suffix" });
  }

  // If no morpheme data at all, fall back to just showing the word
  if (chunks.length === 0) {
    return (
      <div className="chunk-container" aria-label={`Word: ${card.word}`}>
        <span className="chunk-part" style={{ background: "#f5f5f5" }}>
          {card.word}
        </span>
      </div>
    );
  }

  return (
    <div
      className="chunk-container"
      role="group"
      aria-label={`Word broken into parts: ${chunks.map((c) => c.text).join(", ")}`}
    >
      {chunks.map((chunk, i) => (
        <span key={chunk.type} style={{ display: "flex", alignItems: "flex-end", gap: 0 }}>
          {i > 0 && (
            <span className="chunk-separator" aria-hidden="true">
              {" | "}
            </span>
          )}
          <span className={`chunk-part chunk-${chunk.type}`}>
            {chunk.text}
            <span className="chunk-label">{chunk.label}</span>
          </span>
        </span>
      ))}
    </div>
  );
}
