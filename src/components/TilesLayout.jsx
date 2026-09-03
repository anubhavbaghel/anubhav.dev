import React from "react";
import Tile from "./Tile";
import ReconstructWords from "./ReconstructWords";
import CalHeatmap from "./CalHeatmap";
import androidLogo from "../../assets/Android_logo_2019_(stacked).svg";
import expoIcon from "../../assets/light-expo-svgrepo-com.svg";

function ExpoAndroidFlipTile({ id, title }) {
  const [showAndroid, setShowAndroid] = React.useState(false);
  const expoIconUrl = expoIcon || "/assets/Expo_App_Logo.svg";

  React.useEffect(() => {
    const intervalId = window.setInterval(() => {
      setShowAndroid((prev) => !prev);
    }, 4200);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <Tile
      key={id}
      title={title}
      color={"#0f1117"}
      className="tile--small tile--expo-flip"
      flipped={false}
    >
      <div
        className={`expo-flip-card ${showAndroid ? "is-flipped" : ""}`}
        aria-hidden
      >
        <div className="expo-flip-face expo-flip-face--front">
          <img src={expoIconUrl} alt="Expo" className="expo-flip-icon" />
        </div>
        <div className="expo-flip-face expo-flip-face--back">
          <img src={androidLogo} alt="Android" className="expo-flip-icon" />
        </div>
      </div>
    </Tile>
  );
}

export default function TilesLayout({
  tiles = [],
  nested = [],
  flipped = false,
  onOpenProjects = () => {},
  onOpenAbout = () => {},
  onOpenCertifications = () => {},
  showLabels = true,
}) {
  const renderNested = (items) =>
    items.map((n) => {
      switch (n.id) {
        case "n1":
          return (
            <Tile
              key={n.id}
              title={n.title}
              color={"#ffffff"}
              className="tile--slide tile--react tile--small"
              flipped={false}
            >
              <div className="tile-center-logo" aria-hidden>
                <img src={"/assets/React-icon.svg"} alt="React" />
              </div>
            </Tile>
          );
        case "n2":
          return (
            <Tile
              key={n.id}
              title={n.title}
              color={n.color}
              className="tile--js tile--small"
              flipped={false}
            >
              <div className="tile-top-left" aria-hidden>
                <div className="typing">console.log('helloworld')</div>
              </div>
              <div
                className="tile-bottom-right tile-bottom-right--big"
                aria-hidden
              >
                JS
              </div>
            </Tile>
          );
        case "n3":
          return (
            <Tile
              key={n.id}
              title={n.title}
              color={"#000000"}
              className="tile--slide tile--small"
              flipped={false}
            >
              <div className="tile-center-logo" aria-hidden>
                <img src={"/assets/Wordpress-Logo.svg"} alt="Wordpress" />
              </div>
            </Tile>
          );
        case "n5":
          return <ExpoAndroidFlipTile key={n.id} id={n.id} title={n.title} />;
        default:
          return (
            <Tile key={n.id} title={n.title} color={n.color} flipped={false} />
          );
      }
    });

  const renderTile = (t) => {
    if (t.id === "m1") {
      return (
        <Tile
          key={t.id}
          color={t.color}
          className="tile--dashboard tile--large"
          flipped={false}
          onActivate={onOpenAbout}
          style={{ gridRow: "span 2" }}
        >
          <div>
            <ReconstructWords words={["Namaste", "Hola", "Ciao", "Hello"]} />
            <div style={{ color: "#000", marginTop: 8, fontWeight: 400 }}>
              I’m Anubhav
            </div>
            <div
              id="description"
              style={{
                marginTop: 8,
                color: "#222",
                fontWeight: 400,
                fontSize: "1.5rem",
              }}
            >
              Web Developer who turns ideas into clean, fast, and functional web
              interfaces.
            </div>
          </div>
        </Tile>
      );
    }

    if (t.id === "t3") {
      return (
        <div
          key={t.id}
          className="technical-stack"
          style={{
            display: "grid",
            gridTemplateRows: "1fr auto",
            gap: "var(--tile-gap)",
          }}
        >
          <div className="nested-grid top-right">{renderNested(nested)}</div>
          {/* Activity heatmap moved to middle column (second row) */}
        </div>
      );
    }

    if (t.id === "t8") {
      return (
        <div
          key={t.id}
          className="social-media"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "1fr 1fr",
            gap: "var(--tile-gap)",
            padding: 0,
            background: "transparent",
          }}
        >
          <a
            key={`${t.id}-b-1`}
            href="https://www.threads.com/@code.anubhav"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "block", width: "100%", height: "100%" }}
          >
            <Tile
              color={"#ffffff"}
              className="tile--small tile--threads"
              style={{ background: "#ffffff", padding: "10%" }}
              flipped={false}
            >
              <div className="tile-center-logo" aria-hidden>
                <img
                  src={"/assets/Socials/Threads_(app)_logo.svg"}
                  alt="Threads"
                  style={{ width: "50%", height: "50%", objectFit: "contain" }}
                />
              </div>
            </Tile>
          </a>
          <a
            key={`${t.id}-b-2`}
            href="https://github.com/anubhavbaghel"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "block", width: "100%", height: "100%" }}
          >
            <Tile
              color={"#ffffff"}
              className="tile--small tile--github"
              style={{ background: "#ffffff", padding: 0 }}
              flipped={false}
            >
              <div className="tile-center-logo" aria-hidden>
                <img
                  src={"/assets/Socials/GitHub_Invertocat_Black_Clearspace.svg"}
                  alt="GitHub"
                  style={{ width: "80%", height: "80%", objectFit: "contain" }}
                />
              </div>
            </Tile>
          </a>
          <a
            key={`${t.id}-b-3`}
            href="https://www.linkedin.com/in/anubhav-baghel/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "block", width: "100%", height: "100%" }}
          >
            <Tile
              color={"#ffffff"}
              className="tile--small tile--linkedin"
              style={{ background: "#ffffff", padding: "10%" }}
              flipped={false}
            >
              <div className="tile-center-logo" aria-hidden>
                <img
                  src={"/assets/Socials/linkedin-svgrepo-com.svg"}
                  alt="LinkedIn"
                  style={{ width: "50%", height: "50%", objectFit: "contain" }}
                />
              </div>
            </Tile>
          </a>
          <a
            key={`${t.id}-b-4`}
            href="https://leetcode.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "block", width: "100%", height: "100%" }}
          >
            <Tile
              color={"#ffffff"}
              className="tile--small tile--leetcode"
              style={{ background: "#ffffff", padding: "10%" }}
              flipped={false}
            >
              <div className="tile-center-logo" aria-hidden>
                <img
                  src={"/assets/Socials/leetcode.png"}
                  alt="LeetCode"
                  style={{ width: "50%", height: "50%", objectFit: "contain" }}
                />
              </div>
            </Tile>
          </a>
        </div>
      );
    }

    if (t.id === "t7") {
      return (
        <Tile
          key={t.id}
          title={"Projects"}
          subtitle={t.subtitle}
          color={t.color}
          className="tile--medium tile--projects"
          flipped={false}
          noTilt={true}
          onActivate={onOpenProjects}
        >
          <div className="tile-title" style={{ fontWeight: 400 }}>
            Projects
          </div>
          <button
            className="ms-arrow-ne"
            aria-label="Open external"
            type="button"
          >
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M14 3h7v7" />
              <path d="M10 14L21 3" />
            </svg>
          </button>
        </Tile>
      );
    }

    if (t.id === "t9") {
      return (
        <Tile
          key={t.id}
          title={t.title}
          subtitle={t.subtitle}
          color={"#000000"}
          className="tile--small tile--quote"
          flipped={false}
          style={{ height: "100%" }}
        >
          <div className="tile-caption" aria-hidden>
            <div className="tile-caption-text">
              "Your work is going to fill a large part of your life, and the
              only way to be truly satisfied is to do what you believe is great
              work."
            </div>
            <div className="tile-caption-author">— Steve Jobs</div>
          </div>
        </Tile>
      );
    }

    if (t.id === "t10") {
      return (
        <div
          key={t.id}
          style={{
            display: "grid",
            gridTemplateRows: "2fr 1fr",
            gap: "var(--tile-gap)",
            width: "100%",
            height: "100%",
          }}
        >
          <a
            href="/assets/Anubhav_Wordpress_Dev_Resume.pdf"
            download="Anubhav_Wordpress_Dev_Resume.pdf"
            style={{ display: "block", width: "100%", height: "100%" }}
          >
            <Tile
              title={t.title}
              color={t.color}
              className="tile--small tile--resume"
              flipped={false}
              style={{ height: "100%" }}
            >
              <div style={{ padding: 12 }}>
                <div
                  className="tile-title"
                  style={{ fontWeight: 400, fontSize: "2rem" }}
                >
                  Resume
                </div>
              </div>
            </Tile>
          </a>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "var(--tile-gap)",
              width: "100%",
              height: "100%",
            }}
          >
            <a
              href="tel:+919873181404"
              style={{ display: "block", width: "100%", height: "100%" }}
            >
              <Tile
                title="Phone"
                color={"#107C10"}
                className="tile--small tile--contact tile--phone"
                flipped={false}
                style={{ height: "100%" }}
              >
                <div className="tile-center-logo" aria-hidden>
                  <svg
                    viewBox="0 0 24 24"
                    width="50%"
                    height="50%"
                    aria-hidden
                    focusable="false"
                    style={{ display: "block" }}
                  >
                    <path
                      d="M9 16C2.814 9.813 3.11 5.134 5.94 3.012l.627-.467a1.483 1.483 0 0 1 2.1.353l1.579 2.272a1.5 1.5 0 0 1-.25 1.99L8.476 8.474c-.38.329-.566.828-.395 1.301.316.88 1.083 2.433 2.897 4.246 1.814 1.814 3.366 2.581 4.246 2.898.474.17.973-.015 1.302-.396l1.314-1.518a1.5 1.5 0 0 1 1.99-.25l2.276 1.58a1.48 1.48 0 0 1 .354 2.096l-.47.633C19.869 21.892 15.188 22.187 9 16z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </Tile>
            </a>

            <a
              href="mailto:code.anubhavbaghel@gmail.com"
              style={{ display: "block", width: "100%", height: "100%" }}
            >
              <Tile
                title="Mail"
                color={"#0078D4"}
                className="tile--small tile--contact tile--mail"
                flipped={false}
                style={{ height: "100%" }}
              >
                <div className="tile-center-logo" aria-hidden>
                  <svg
                    viewBox="0 0 48 48"
                    width="50%"
                    height="50%"
                    aria-hidden
                    focusable="false"
                    style={{ display: "block" }}
                  >
                    <path
                      d="M6.47,10.71a2,2,0,0,0-2,2h0V35.32a2,2,0,0,0,2,2H41.53a2,2,0,0,0,2-2h0V12.68a2,2,0,0,0-2-2H6.47Zm33.21,3.82L24,26.07,8.32,14.53"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </Tile>
            </a>
          </div>
        </div>
      );
    }

      if (t.id === "t11") {
        return (
          <Tile
            key={t.id}
            title={t.title}
            color={t.color}
            className="tile--small"
            flipped={false}
            onActivate={onOpenProjects}
          >
            <div style={{ padding: 12 }}>
              <div className="tile-title" style={{ fontWeight: 400, fontSize: "4rem" }}>
                My work
              </div>
              <div style={{ marginTop: 8, fontSize: "0.95rem", opacity: 0.9 }}>
                Selected projects and case studies
              </div>
            </div>
          </Tile>
        );
      }

    return (
      <Tile
        key={t.id}
        title={t.title}
        subtitle={t.subtitle}
        color={t.color}
        flipped={false}
      />
    );
  };

  // group tiles into four columns; this lets each column be an independent section
  const byId = (id) => tiles.find((x) => x.id === id);
  const m1Tile = byId("m1");
  const quoteTile = byId("t9");
  const resumeTile = byId("t10");
  // merge into left column ordering: dashboard (m1) then bottom row with quote + resume/contact
  // technical stack belongs in Skills & Technologies (middle column)
  const colMiddle = [byId("t3")].filter(Boolean);
  // Projects (t7) should live in the Projects column; include socials and a 'My work' tile alongside projects
  const colRight = [byId("t7"), byId("t8"), byId("t11")].filter(Boolean);

  return (
    <section className="tiles-layout">
      <div className="tiles-column left-column">
        {showLabels ? <div className="tile-name">About Me</div> : null}
        <div className="tiles-column-inner">
          {m1Tile ? renderTile(m1Tile) : null}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "var(--tile-gap)",
              width: "100%",
              height: "100%",
            }}
          >
            {quoteTile ? renderTile(quoteTile) : null}
            {resumeTile ? renderTile(resumeTile) : null}
          </div>
        </div>
      </div>

      <div className="tiles-column middle-column">
        {showLabels ? (
          <div className="tile-name">Skills & Technologies</div>
        ) : null}
        <div className="tiles-column-inner">
          {colMiddle.map((t) => renderTile(t))}
          {/* Second row: Activity heatmap tile */}
          <Tile
            title="Activity"
            color={"#ffffff"}
            className="tile--small tile--github-heatmap"
            flipped={false}
            style={{ background: "transparent" }}
            >
              <div style={{ padding: 0, width: '100%', height: '100%', boxSizing: 'border-box' }}>
                <div style={{ display: 'block', width: '100%', height: '100%' }}>
                  <CalHeatmap />
                </div>
              </div>
            </Tile>

          <Tile
            title="Certifications and Achievements"
            color={"#111111"}
            className="tile--small tile--certifications"
            flipped={false}
            noTilt={true}
            onActivate={onOpenCertifications}
            style={{ background: "rgba(0,0,0,0.72)", border: "1px solid rgba(255,255,255,0.14)" }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "start",
                textAlign: "left",
                padding: "16px",
                color: "rgba(255,255,255,0.92)",
                fontSize: "2rem",
                fontWeight: 400,
                lineHeight: 1.3,
              }}
            >
              Certifications and Achievements
            </div>
          </Tile>
        </div>
      </div>

      <div className="tiles-column right-column">
        {showLabels ? <div className="tile-name" >Projects</div> : null}
        <div className="tiles-column-inner">
          {colRight.map((t) => renderTile(t))}
        </div>
      </div>
    </section>
  );
}
