"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import AuthGuard from "@/components/guards/AuthGuard";
import Lobby from "@/components/room/Lobby";
import RoomView from "@/components/room/RoomView";
import { LinguaLogo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";

// Video service not connected on the backend (token endpoint answers 503
// isPlaceholder). One honest line for learners; raw detail to the console
// for the engineer. Real rooms arrive once backend keys exist.
const ROOMS_OFF_MESSAGE =
  "Live rooms aren't switched on yet — the video service isn't connected. Placement, plan, and recap still work.";

function RoomInner() {
  const params = useParams();
  const roomName = params.roomName;
  const router = useRouter();
  const { user } = useAuth();
  const [token, setToken] = useState("");
  const [url, setUrl] = useState("");
  const [joining, setJoining] = useState(false);
  const [error, setError] = useState("");
  const [media, setMedia] = useState({ camOn: true, micOn: true });

  async function handleJoin({ camOn, micOn }) {
    setError("");
    setJoining(true);
    setMedia({ camOn, micOn });
    try {
      const data = await api.roomToken({ roomName, participantName: user?.name || user?.email });
      if (data.isPlaceholder) {
        console.warn("Room token placeholder:", data);
        setError(ROOMS_OFF_MESSAGE);
        return;
      }
      setToken(data.token);
      setUrl(data.url);
    } catch (e) {
      if (e.data?.isPlaceholder) {
        console.warn("Room token placeholder:", e.data);
        setError(ROOMS_OFF_MESSAGE);
      } else {
        setError(e.data?.error || e.message || "Failed to get token");
      }
    } finally {
      setJoining(false);
    }
  }

  function handleLeave() {
    setToken("");
    setUrl("");
    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen bg-[var(--color-parchment)] flex flex-col">
      <header className="sticky top-0 z-20 bg-[var(--color-parchment)]/85 backdrop-blur border-b border-[var(--color-forest-ink)]/10">
        <div className="mx-auto flex h-[64px] max-w-[1100px] items-center justify-between px-[20px] md:px-[24px]">
          <LinguaLogo />
          <div className="flex items-center gap-[8px]">
            <span className="hidden md:inline text-[12px] text-[var(--color-lichen-gray)]">{user?.email} · {roomName}</span>
            <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard")}>
              ← Dashboard
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1100px] px-[20px] md:px-[24px] py-[20px] md:py-[24px] flex-1 flex flex-col gap-[16px]">
        {!token ? (
          <>
            {error && (
              <div className="rounded-[12px] bg-amber-50 border border-amber-200 px-[14px] py-[12px] text-[13px] text-amber-800">
                {error}
              </div>
            )}
            <Lobby roomName={roomName} onJoin={handleJoin} joining={joining} />
          </>
        ) : (
          <RoomView token={token} url={url} roomName={roomName} onLeave={handleLeave} videoEnabled={media.camOn} audioEnabled={media.micOn} />
        )}
      </main>
    </div>
  );
}

export default function RoomPage() {
  return (
    <AuthGuard>
      <RoomInner />
    </AuthGuard>
  );
}
