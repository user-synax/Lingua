"use client";

import { LiveKitRoom, VideoConference, ControlBar, RoomAudioRenderer } from "@livekit/components-react";
import { Button } from "@/components/ui/Button";

export default function RoomView({ token, url, roomName, onLeave, videoEnabled, audioEnabled }) {
  return (
    <div className="flex flex-col gap-[12px] animate-fade-in">
      <div className="rounded-[14px] overflow-hidden border border-[var(--color-forest-ink)]/10 shadow-[var(--shadow-md)] bg-[var(--color-forest-ink)]">
        <LiveKitRoom
          serverUrl={url}
          token={token}
          connect={true}
          video={videoEnabled}
          audio={audioEnabled}
          onDisconnected={() => onLeave?.()}
          className="flex flex-col"
          style={{ height: "68vh", minHeight: 420 }}
        >
          <div className="flex items-center justify-between px-[12px] py-[8px] bg-[var(--color-forest-ink)] text-white">
            <span className="text-[11px] tracking-[0.06em] uppercase text-white/70">Live · {roomName} · Board sync via data channel (stub)</span>
            <span className="rounded-full bg-white text-[var(--color-forest-ink)] px-[8px] py-[4px] text-[11px] font-medium">● LiveKit</span>
          </div>
          <div className="flex-1 bg-[#0f1f1f] relative">
            <VideoConference chatMessageFormatter={() => ""} />
            <RoomAudioRenderer />
          </div>
          <div className="bg-white border-t border-[var(--color-forest-ink)]/10 px-[8px] py-[6px] flex items-center justify-between">
            <ControlBar variation="minimal" />
            <Button variant="outlined" size="sm" onClick={() => onLeave?.()}>
              Leave →
            </Button>
          </div>
        </LiveKitRoom>
      </div>

      <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-[12px]">
        <div className="rounded-[14px] bg-white p-[14px] border border-[var(--color-forest-ink)]/10">
          <p className="text-[11px] tracking-[0.08em] uppercase text-[var(--color-mist)]">The Board — stub</p>
          <p className="text-[13px] text-[var(--color-lichen-gray)] mt-[6px]">CR-3 shared surface will sync via LiveKit data channel / CRDT. Placeholder for headings, redlines, doubt cards. Text selectable, tap gloss.</p>
          <div className="mt-[10px] rounded-[10px] bg-[var(--color-parchment)] p-[10px] border border-[var(--color-forest-ink)]/5">
            <p className="text-[12px] font-medium text-[var(--color-forest-ink)]">Example redline</p>
            <p className="text-[13px]"><span className="line-through decoration-red-500">Ich habe gegangen</span> → Ich bin gegangen</p>
          </div>
        </div>
        <div className="rounded-[14px] bg-[var(--color-mint-surface)] p-[14px] border border-[var(--color-forest-ink)]/5">
          <p className="text-[11px] tracking-[0.08em] uppercase text-[var(--color-slate)]">Live status</p>
          <p className="text-[13px] text-[var(--color-forest-ink)] mt-[6px]">Captions + translation stub (CR-4) — target language 1s behind. Doubt button → hand-raise queue (CR-5).</p>
          <div className="mt-[10px] flex gap-[6px]">
            <span className="rounded-full bg-white border border-[var(--color-forest-ink)]/10 px-[8px] py-[4px] text-[11px]">Low-bandwidth: audio+Board @300kbps</span>
          </div>
        </div>
      </div>
    </div>
  );
}
