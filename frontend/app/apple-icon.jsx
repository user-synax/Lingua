import { ImageResponse } from "next/og";

// Apple touch icon (180px): same wordmark composition as /icon.

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f7f6f2",
          borderRadius: 40,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            fontFamily: "Inter, sans-serif",
            fontWeight: 700,
            fontSize: 44,
            letterSpacing: "-0.035em",
            color: "#001f1f",
          }}
        >
          <span>Lingua</span>
          <span
            style={{
              marginLeft: 4,
              width: 15,
              height: 15,
              borderRadius: 999,
              background: "#2a4e1c",
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  );
}
