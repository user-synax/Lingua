"use client";

import { useLocalParticipant } from "@livekit/components-react";
import { Button } from "@/components/ui/Button";

// PRD CR-6 learner controls (frontend only, no backend).
// Must render inside <LiveKitRoom>: mic toggles the learner's LiveKit audio
// track via useLocalParticipant. State is icon + text, never icon-only.
export default function LearnerControls({ onRequestRepeat, onRequestSlower }) {
  const { localParticipant, isMicrophoneEnabled } = useLocalParticipant();

  async function handleMicToggle() {
    await localParticipant.setMicrophoneEnabled(!isMicrophoneEnabled);
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
    </div>
  );
}
