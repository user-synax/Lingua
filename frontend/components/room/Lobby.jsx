"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";

export default function Lobby({ roomName, onJoin, joining }) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [camOn, setCamOn] = useState(true);
  const [micOn, setMicOn] = useState(true);
  const [devices, setDevices] = useState({ cameras: [], mics: [], speakers: [] });
  const [devicesReady, setDevicesReady] = useState(false);
  const [selectedCam, setSelectedCam] = useState("");
  const [selectedMic, setSelectedMic] = useState("");
  const [error, setError] = useState("");
  const [hasMic, setHasMic] = useState(false);

  useEffect(() => {
    async function loadDevices() {
      try {
        // request perm to enumerate labels
        await navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then((s) => s.getTracks().forEach((t) => t.stop())).catch(() => {});
        const devs = await navigator.mediaDevices.enumerateDevices();
        setDevices({
          cameras: devs.filter((d) => d.kind === "videoinput"),
          mics: devs.filter((d) => d.kind === "audioinput"),
          speakers: devs.filter((d) => d.kind === "audiooutput"),
        });
        if (devs.find((d) => d.kind === "videoinput")) setSelectedCam(devs.find((d) => d.kind === "videoinput").deviceId);
        if (devs.find((d) => d.kind === "audioinput")) setSelectedMic(devs.find((d) => d.kind === "audioinput").deviceId);
      } catch {
        setError("Could not list devices — check browser permissions.");
      } finally {
        setDevicesReady(true);
      }
    }
    loadDevices();
  }, []);

  // Single live preview stream: cam + mic together, held until device
  // change / toggle / unmount / join. Preview video stays muted (no echo);
  // the mic track runs live so Join inherits workable devices.
  useEffect(() => {
    if (!devicesReady) return;
    let cancelled = false;
    let live = null;
    async function start() {
      // stop previous before restart (device switch / toggle)
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
      if (videoRef.current) videoRef.current.srcObject = null;
      if (!camOn && !micOn) {
        setHasMic(false);
        return;
      }
      const wantVideo = camOn ? (selectedCam ? { deviceId: { exact: selectedCam } } : true) : false;
      const wantAudio = micOn ? (selectedMic ? { deviceId: { exact: selectedMic } } : true) : false;
      try {
        live = await navigator.mediaDevices.getUserMedia({ video: wantVideo, audio: wantAudio });
        if (cancelled) {
          live.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = live;
        if (videoRef.current) videoRef.current.srcObject = camOn ? live : null;
        setHasMic(!!live.getAudioTracks()[0] && micOn);
        setError("");
      } catch (e) {
        if (cancelled) return;
        // getUserMedia fails atomically: one blocked device must not kill
        // the other. Camera is optional, mic gates Join — so fall back to
        // audio-only first, then video-only. Stale exact deviceIds (unplugged
        // device) retry once with generic constraints.
        const generic = e?.name === "OverconstrainedError";
        if (micOn) {
          try {
            live = await navigator.mediaDevices.getUserMedia({
              video: false,
              audio: generic ? true : selectedMic ? { deviceId: { exact: selectedMic } } : true,
            });
            if (cancelled) {
              live.getTracks().forEach((t) => t.stop());
              return;
            }
            streamRef.current = live;
            if (videoRef.current) videoRef.current.srcObject = null;
            setHasMic(true);
            setError(camOn ? "Camera blocked — allow access or turn camera off (optional). Mic stays live." : "");
            return;
          } catch {
            if (cancelled) return;
          }
        }
        if (camOn) {
          try {
            live = await navigator.mediaDevices.getUserMedia({
              video: generic ? true : selectedCam ? { deviceId: { exact: selectedCam } } : true,
              audio: false,
            });
            if (cancelled) {
              live.getTracks().forEach((t) => t.stop());
              return;
            }
            streamRef.current = live;
            if (videoRef.current) videoRef.current.srcObject = live;
            if (!micOn) setError("");
          } catch {
            if (cancelled) return;
          }
        }
        if (videoRef.current && !streamRef.current) videoRef.current.srcObject = null;
        if (micOn) {
          setError("Microphone required — allow mic access. Camera is optional.");
          setHasMic(false);
        } else if (camOn && !streamRef.current) {
          setError("Camera blocked — allow access or turn camera off (optional).");
        }
      }
    }
    start();
    return () => {
      cancelled = true;
      if (live) live.getTracks().forEach((t) => t.stop());
      if (streamRef.current === live) streamRef.current = null;
    };
  }, [devicesReady, camOn, micOn, selectedCam, selectedMic]);

  return (
    <div className="mx-auto max-w-[980px] w-full grid md:grid-cols-[1.35fr_0.85fr] gap-[18px] animate-slide-up-soft">
      <div className="rounded-[14px] bg-white border border-[var(--color-forest-ink)]/10 shadow-[var(--shadow-md)] overflow-hidden">
        <div className="flex items-center justify-between px-[14px] py-[10px] border-b border-[var(--color-forest-ink)]/8">
          <span className="text-[11px] tracking-[0.06em] uppercase text-[var(--color-mist)]">Lobby · {roomName}</span>
          <span className={`h-[20px] rounded-full px-[8px] text-[11px] font-medium leading-[20px] ${hasMic ? "bg-[var(--color-meadow)] text-[var(--color-forest-ink)]" : "bg-red-100 text-red-700"}`}>{hasMic ? "Mic ok" : "Mic needed"}</span>
        </div>
        <div className="bg-[var(--color-parchment)] p-[14px]">
          <div className="relative aspect-video rounded-[12px] bg-[var(--color-forest-ink)] overflow-hidden border border-[var(--color-forest-ink)]/20">
            {camOn ? (
              <video ref={videoRef} autoPlay playsInline muted className="h-full w-full object-cover" />
            ) : (
              <div className="h-full w-full grid place-items-center text-white/70">
                <div className="text-center">
                  <p className="text-[14px] font-medium text-white">Camera off</p>
                  <p className="text-[12px] text-white/60">Optional — mic is required</p>
                </div>
              </div>
            )}
            <div className="absolute bottom-[10px] left-[10px] flex gap-[6px]">
              <span className="rounded-full bg-white/90 px-[8px] py-[4px] text-[11px] font-medium text-[var(--color-forest-ink)]">Preview</span>
              <span className="rounded-full bg-[var(--color-forest-ink)] text-white px-[8px] py-[4px] text-[11px]">{camOn ? "Camera on" : "Camera off"}</span>
            </div>
          </div>

          <div className="mt-[12px] grid grid-cols-2 gap-[10px]">
            <label className="flex flex-col gap-[6px] text-[11px]">
              <span className="tracking-[0.06em] uppercase text-[var(--color-mist)]">Camera</span>
              <select
                value={selectedCam}
                onChange={(e) => setSelectedCam(e.target.value)}
                className="h-[38px] rounded-[10px] border border-[var(--color-forest-ink)]/10 bg-white px-[10px] text-[13px]"
              >
                {devices.cameras.length === 0 && <option value="">No camera</option>}
                {devices.cameras.map((d) => (
                  <option key={d.deviceId} value={d.deviceId}>
                    {d.label || `Camera ${d.deviceId.slice(0, 4)}`}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-[6px] text-[11px]">
              <span className="tracking-[0.06em] uppercase text-[var(--color-mist)]">Microphone · required</span>
              <select
                value={selectedMic}
                onChange={(e) => setSelectedMic(e.target.value)}
                className="h-[38px] rounded-[10px] border border-[var(--color-forest-ink)]/10 bg-white px-[10px] text-[13px]"
              >
                {devices.mics.length === 0 && <option value="">No mic</option>}
                {devices.mics.map((d) => (
                  <option key={d.deviceId} value={d.deviceId}>
                    {d.label || `Mic ${d.deviceId.slice(0, 4)}`}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-[12px] flex gap-[8px]">
            <Button variant={camOn ? "filled" : "outlined"} size="sm" onClick={() => setCamOn((v) => !v)} className="flex-1">
              {camOn ? "Turn camera off" : "Turn camera on"}
            </Button>
            <Button variant={micOn ? "filled" : "outlined"} size="sm" onClick={() => setMicOn((v) => !v)} className="flex-1">
              {micOn ? "Mic on" : "Mic off"}
            </Button>
          </div>
          {error && <p className="mt-[10px] rounded-[10px] bg-amber-50 border border-amber-200 px-[10px] py-[8px] text-[12px] text-amber-800">{error}</p>}
        </div>
      </div>

      <div className="flex flex-col gap-[12px]">
        <div className="rounded-[14px] bg-[var(--color-mint-surface)] p-[16px] border border-[var(--color-forest-ink)]/5">
          <p className="text-[11px] tracking-[0.08em] uppercase text-[var(--color-slate)]">Before you join</p>
          <ul className="mt-[8px] grid gap-[6px] text-[13px] leading-[1.5] text-[var(--color-lichen-gray)] list-disc pl-[16px]">
            <li>Camera optional — leave off if shy (PRD Sofia).</li>
            <li>Mic required — tutor needs verbatim track.</li>
            <li>60-min class: Warm-up (5) → Teach (15) → Practice (20) → Recap (8).</li>
            <li>Board + captions appear after join.</li>
          </ul>
        </div>
        <div className="rounded-[14px] bg-white p-[16px] border border-[var(--color-forest-ink)]/10 shadow-[var(--shadow-md)]">
          <p className="text-[11px] tracking-[0.06em] uppercase text-[var(--color-mist)]">Room</p>
          <p className="text-[14px] font-medium text-[var(--color-forest-ink)] mt-[4px] break-all">{roomName}</p>
          <p className="text-[12px] text-[var(--color-lichen-gray)]">{devices.cameras.length} cameras · {devices.mics.length} mics found</p>
          <Button
            variant="filled"
            size="lg"
            className="w-full mt-[14px]"
            onClick={() => onJoin({ camOn, micOn })}
            disabled={joining || !hasMic || !micOn}
          >
            {joining ? "Joining…" : hasMic && micOn ? "Join room →" : "Enable mic to join"}
          </Button>
          <p className="text-[11px] text-[var(--color-mist)] mt-[8px] text-center">Median join ≤30s · Board updates ≤500ms</p>
        </div>
        <div className="rounded-[12px] bg-[var(--color-lavender-surface)] p-[12px] border border-[var(--color-forest-ink)]/10">
          <p className="text-[11px] font-medium text-[var(--color-forest-ink)]">Recording consent</p>
          <p className="text-[11px] text-[var(--color-lichen-gray)] mt-[4px]">Recording is optional for review. You’ll be asked after join; deletion within 24h. No voiceprints.</p>
        </div>
      </div>
    </div>
  );
}
