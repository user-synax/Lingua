import { ImageResponse } from "next/og";

// App icon: the wordmark idea at install size — forest "Lingua" with the
// deep-forest full-stop on parchment. Generated at build, no assets.

export const size = {
  width: 512,
  height: 512,
};

export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: 112,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            fontFamily: "Inter, sans-serif",
            fontWeight: 700,
            fontSize: 128,
            letterSpacing: "-0.035em",
            color: "#001f1f",
          }}
        >
          <span>Lingua</span>
          <span
            style={{
              marginLeft: 10,
              width: 44,
              height: 44,
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
