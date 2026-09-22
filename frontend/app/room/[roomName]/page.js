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
        setError(data.error + " — " + data.hint);
        return;
      }
      setToken(data.token);
      setUrl(data.url);
    } catch (e) {
      const msg = e.data?.error || e.message || "Failed to get token";
      if (e.data?.isPlaceholder) setError(e.data.error);
      else setError(msg);
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
                <p className="text-[11px] text-amber-700 mt-[6px]">Set LIVEKIT_URL / API_KEY / SECRET in backend/.env and restart. See backend/.env.example.</p>
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
