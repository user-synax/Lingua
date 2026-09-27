"use client";

import { useLocalParticipant, useRoomContext } from "@livekit/components-react";
import { Button } from "@/components/ui/Button";

// PRD CR-6 learner controls (frontend only, no backend).
// Must render inside <LiveKitRoom>: mic toggles the learner's LiveKit audio
// track via useLocalParticipant. State is icon + text, never icon-only.
// Leave disconnects explicitly; the room page then routes to /dashboard,
// where Recent rooms rejoins the same roomName (same room, fresh token).
export default function LearnerControls({ onRequestRepeat, onRequestSlower, onLeave }) {
  const room = useRoomContext();
  const { localParticipant, isMicrophoneEnabled } = useLocalParticipant();

  async function handleMicToggle() {
    await localParticipant.setMicrophoneEnabled(!isMicrophoneEnabled);
  }

  async function handleLeave() {
    try {
      await room.disconnect();
    } finally {
      onLeave?.();
    }
  }

  return (
    <div
      aria-label="Learner controls"
      className="flex items-center gap-[8px] flex-wrap"
    >
      <Button
        variant={isMicrophoneEnabled ? "filled" : "outlined"}
        size="sm"
        onClick={handleMicToggle}
        aria-pressed={isMicrophoneEnabled}
        aria-label={isMicrophoneEnabled ? "Mute microphone" : "Unmute microphone"}
        className="gap-[6px]"
      >
        <span
          aria-hidden="true"
          className={`h-[8px] w-[8px] rounded-full ${isMicrophoneEnabled ? "bg-[var(--color-meadow)]" : "bg-red-500"}`}
        />
        {isMicrophoneEnabled ? "Mic on" : "Mic muted"}
      </Button>
      <Button
        variant="outlined"
        size="sm"
        onClick={() => onRequestRepeat?.()}
        aria-label="Ask the tutor to repeat that"
      >
        Repeat that
      </Button>
      <Button
        variant="outlined"
        size="sm"
        onClick={() => onRequestSlower?.()}
        aria-label="Ask the tutor to speak slower"
      >
        Slower
      </Button>
      <Button
        variant="outlined"
        size="sm"
        onClick={handleLeave}
        aria-label="Leave the room and return to dashboard"
      >
        Leave →
      </Button>
    </div>
  );
}
