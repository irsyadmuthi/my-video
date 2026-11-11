import {
    AbsoluteFill,
    Easing,
    interpolate,
    useCurrentFrame,
} from "remotion";

const chapters = [
    {
        number: "01",
        eyebrow: "PANGLIMA BESAR",
        title: "Jenderal\nSudirman",
        body: "Panglima Besar pertama angkatan bersenjata Republik Indonesia.",
        marker: "1916 — 1950",
        accent: "#d65b43",
    },
    {
        number: "02",
        eyebrow: "AWAL KEHIDUPAN",
        title: "Dari\nPurbalingga",
        body: "Lahir pada 24 Januari 1916 di Purbalingga, Jawa Tengah.",
        marker: "24 JANUARI 1916",
        accent: "#e2b45a",
    },
    {
        number: "03",
        eyebrow: "MASA REVOLUSI",
        title: "Memimpin\ndi tengah ujian",
        body: "Ia memimpin perjuangan militer Indonesia menghadapi upaya kembalinya kekuasaan kolonial Belanda.",
        marker: "KETEGUHAN · KEPEMIMPINAN",
        accent: "#6e9a91",
    },
    {
        number: "04",
        eyebrow: "WARISAN",
        title: "Jejak yang\ntetap menyala",
        body: "Kepemimpinan dan keteguhannya menjadi bagian penting dari ingatan perjuangan kemerdekaan Indonesia.",
        marker: "TKR  ·  TRI  ·  TNI",
        accent: "#d65b43",
    },
];

const chapterDuration = 180;

const SudirmanCharacter: React.FC<{
    frame: number;
    chapterFrame: number;
    chapterIndex: number;
    bob: number;
}> = ({ frame, chapterFrame, chapterIndex, bob }) => {
    const gestureRange = chapterIndex === 3 ? [16, 44] : [25, 52, 124, 151];
    const gestureValues = chapterIndex === 3 ? [0, 1] : [0, 1, 1, 0];
    const gesture = interpolate(chapterFrame, gestureRange, gestureValues, {
        easing: Easing.inOut(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const pose = chapterIndex === 1
        ? { elbowX: 333, elbowY: 239, wristX: 355, wristY: 184, handX: 380, handY: 170 }
        : chapterIndex === 2
            ? { elbowX: 327, elbowY: 281, wristX: 258, wristY: 294, handX: 238, handY: 289 }
            : { elbowX: 310, elbowY: 151, wristX: 259, wristY: 113, handX: 239, handY: 94 };
    const mix = (start: number, end: number) => start + (end - start) * gesture;
    const wave = chapterIndex === 1 ? Math.sin(frame / 4) * 5 * gesture : 0;
    const elbowX = mix(304, pose.elbowX) + wave * 0.35;
    const elbowY = mix(273, pose.elbowY);
    const wristX = mix(305, pose.wristX) + wave;
    const wristY = mix(350, pose.wristY);
    const handX = mix(307, pose.handX) + wave;
    const handY = mix(371, pose.handY);
    const rightArm = `M 280 203 L ${elbowX} ${elbowY} L ${wristX} ${wristY}`;
    const hand = `M ${wristX} ${wristY} L ${handX} ${handY}`;
    const blink = interpolate((frame + 37) % 150, [0, 3, 7], [0, 1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const breath = Math.sin(frame / 18) * 1.4;

    return (
        <svg
            viewBox="0 0 420 620"
            width={474}
            height={700}
            role="img"
            aria-label="Ilustrasi animasi Jenderal Sudirman"
            style={{
                position: "absolute",
                left: "50%",
                bottom: 55,
                transform: `translateX(-50%) translateY(${bob}px)`,
                overflow: "visible",
            }}
        >
            <ellipse cx="210" cy="590" rx="88" ry="10" fill="#20211d" opacity=".16" />
            <path d="M183 476h25v91h-25zM212 476h25v91h-25z" fill="#25251f" />
            <ellipse cx="194" cy="571" rx="22" ry="9" fill="#171916" />
            <ellipse cx="226" cy="571" rx="22" ry="9" fill="#171916" />

            <path d="M142 195 119 226 109 349" fill="none" stroke="#414432" strokeWidth="35" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M142 195 119 226 109 349" fill="none" stroke="#555840" strokeWidth="27" strokeLinecap="round" strokeLinejoin="round" />
            <ellipse cx="108" cy="361" rx="12" ry="15" fill="#b9845f" />

            <g transform={`translate(0 ${breath})`}>
                <path d="M160 179h100l20 64 1 246q-71 19-142 0l1-246z" fill="#50533e" stroke="#3f4233" strokeWidth="4" />
                <path d="M185 174 210 190 235 174 222 286 210 302 198 286z" fill="#e6dfcb" />
                <path d="m185 176 25 15-21 45-19-41zM235 176l-25 15 21 45 19-41z" fill="#414432" />
                <path d="M201 190 210 197 219 190 216 207 210 212 204 207z" fill="#282921" />
                <path d="M204 207 216 207 220 281 210 295 200 281z" fill="#282921" />
                <path d="M145 179 126 237l19 11 20-65zM275 179l19 58-19 11-20-65z" fill="#595d45" />
                <path d="M210 305v174" fill="none" stroke="#3f4233" strokeWidth="3" opacity=".75" />
                <path d="M151 334h22M247 334h22" fill="none" stroke="#3f4233" strokeWidth="3" />
                <circle cx="210" cy="333" r="5" fill="#c39a4e" />
                <circle cx="210" cy="380" r="5" fill="#c39a4e" />
                <circle cx="210" cy="427" r="5" fill="#c39a4e" />
                <path d="M196 151h28v39h-28z" fill="#b9845f" />
            </g>

            <g transform={`translate(0 ${Math.sin(frame / 24) * 1.2})`}>
                <ellipse cx="177" cy="116" rx="8" ry="13" fill="#a97755" />
                <ellipse cx="243" cy="116" rx="8" ry="13" fill="#a97755" />
                <path d="M180 94q0-34 30-36 31 2 30 37l-4 39q-7 27-26 29-20-2-27-29z" fill="#bd8a64" />
                <path d="M178 93V82c0-20 13-34 32-35 20 1 33 15 33 35v11q-32-8-65 0z" fill="#24231f" stroke="#171814" strokeWidth="2" />
                <path d="M177 89q33-10 66 0v8q-33-9-66 0z" fill="#40362b" />
                <path d="M169 98q41-13 82 0l-5 8q-36-7-72 0z" fill="#292820" stroke="#171814" strokeWidth="2" />
                <path d="M205 68h10l-2 13h-6z" fill="#c39a4e" />
                <path d="M189 111q7-4 13 0M219 111q7-4 13 0" fill="none" stroke="#302820" strokeWidth="3" strokeLinecap="round" />
                <ellipse cx="200" cy="120" rx="2.5" ry={3.2 - blink * 2.6} fill="#28251f" />
                <ellipse cx="224" cy="120" rx="2.5" ry={3.2 - blink * 2.6} fill="#28251f" />
                <path d="m212 119-3 15 6 1M205 145q7 4 14 0" fill="none" stroke="#815d48" strokeWidth="2.5" strokeLinecap="round" />
            </g>

            <path d={rightArm} fill="none" stroke="#3f4233" strokeWidth="37" strokeLinecap="round" strokeLinejoin="round" />
            <path d={rightArm} fill="none" stroke="#565a42" strokeWidth="29" strokeLinecap="round" strokeLinejoin="round" />
            <path d={hand} fill="none" stroke="#986d50" strokeWidth="17" strokeLinecap="round" />
            <path d={hand} fill="none" stroke="#bd8a64" strokeWidth="12" strokeLinecap="round" />
            <ellipse cx={handX} cy={handY} rx="10" ry="8" fill="#bd8a64" transform={`rotate(-28 ${handX} ${handY})`} />
            {chapterIndex === 1 && gesture > 0.05 && (
                <g transform={`translate(${handX} ${handY}) rotate(-25)`} stroke="#bd8a64" strokeWidth="4" strokeLinecap="round">
                    <path d="M1 0v-17M5 0l5-15M-3 0l-4-14M-7 2l-9-10" />
                </g>
            )}
        </svg>
    );
};

export const SudirmanMotion: React.FC = () => {
    const frame = useCurrentFrame();
    const chapterIndex = Math.min(
        Math.floor(frame / chapterDuration),
        chapters.length - 1,
    );
    const chapter = chapters[chapterIndex];
    const chapterFrame = frame - chapterIndex * chapterDuration;
    const enter = interpolate(chapterFrame, [0, 24], [0, 1], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const exit = chapterIndex === chapters.length - 1
        ? 1
        : interpolate(chapterFrame, [154, 179], [1, 0], {
            easing: Easing.in(Easing.cubic),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        });
    const visibility = enter * exit;
    const figureBob = Math.sin((frame / 30) * 0.8) * 4;
    const progress = frame / (chapterDuration * chapters.length - 1);

    return (
        <AbsoluteFill
            style={{
                backgroundColor: "#eee9dc",
                color: "#202b2a",
                fontFamily: "Georgia, 'Times New Roman', serif",
                overflow: "hidden",
            }}
        >
            <AbsoluteFill
                style={{
                    backgroundImage:
                        "linear-gradient(90deg, transparent 49.94%, rgba(32,43,42,.08) 50%, transparent 50.06%), repeating-linear-gradient(0deg, rgba(32,43,42,.025) 0px, rgba(32,43,42,.025) 1px, transparent 1px, transparent 7px)",
                    opacity: 0.6,
                }}
            />
            <div
                style={{
                    position: "absolute",
                    left: 94,
                    top: 76,
                    color: "#53605a",
                    fontFamily: "Arial, sans-serif",
                    fontSize: 20,
                    letterSpacing: 4,
                    fontWeight: 700,
                }}
            >
                REPUBLIK INDONESIA <span style={{ color: "#d65b43" }}> / </span> TOKOH
            </div>
            <div
                style={{
                    position: "absolute",
                    top: 76,
                    right: 96,
                    color: "#53605a",
                    fontFamily: "Arial, sans-serif",
                    fontSize: 20,
                    letterSpacing: 3,
                }}
            >
                CATATAN SEJARAH  /  {chapter.number}
            </div>

            <div
                style={{
                    position: "absolute",
                    left: 95,
                    top: 220,
                    width: 900,
                    opacity: visibility,
                    transform: `translateY(${(1 - enter) * 28}px)`,
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 18,
                        marginBottom: 34,
                        color: chapter.accent,
                        fontFamily: "Arial, sans-serif",
                        fontSize: 21,
                        fontWeight: 700,
                        letterSpacing: 5,
                    }}
                >
                    <span style={{ width: 54, height: 2, backgroundColor: chapter.accent }} />
                    {chapter.eyebrow}
                </div>
                <div
                    style={{
                        whiteSpace: "pre-line",
                        fontSize: chapterIndex === 0 ? 116 : 92,
                        lineHeight: 0.99,
                        fontWeight: 700,
                        letterSpacing: -2,
                    }}
                >
                    {chapter.title}
                </div>
                <div
                    style={{
                        width: 660,
                        marginTop: 32,
                        color: "#495650",
                        fontFamily: "Arial, sans-serif",
                        fontSize: 30,
                        lineHeight: 1.45,
                    }}
                >
                    {chapter.body}
                </div>
                <div
                    style={{
                        marginTop: 42,
                        color: "#202b2a",
                        fontFamily: "Arial, sans-serif",
                        fontSize: 19,
                        fontWeight: 700,
                        letterSpacing: 4,
                    }}
                >
                    {chapter.marker}
                </div>
            </div>

            <div
                style={{
                    position: "absolute",
                    right: 236,
                    top: 146,
                    bottom: 112,
                    width: 510,
                    border: "1px solid rgba(32,43,42,.2)",
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        inset: 18,
                        border: "1px solid rgba(32,43,42,.13)",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        bottom: 60,
                        height: 1,
                        backgroundColor: "rgba(32,43,42,.18)",
                    }}
                />
                <SudirmanCharacter
                    frame={frame}
                    chapterFrame={chapterFrame}
                    chapterIndex={chapterIndex}
                    bob={figureBob}
                />
                <div
                    style={{
                        position: "absolute",
                        right: 28,
                        bottom: 22,
                        color: "#53605a",
                        fontFamily: "Arial, sans-serif",
                        fontSize: 15,
                        letterSpacing: 2,
                    }}
                >
                    ILUSTRASI ANIMASI 2D
                </div>
            </div>

            {chapterIndex === 3 && (
                <div
                    style={{
                        position: "absolute",
                        right: 98,
                        top: 200,
                        color: "#53605a",
                        fontFamily: "Arial, sans-serif",
                        fontSize: 17,
                        lineHeight: 2.2,
                        letterSpacing: 1,
                        opacity: visibility,
                    }}
                >
                    <div>1945  TKR</div>
                    <div>TRI</div>
                    <div>1947  TNI</div>
                </div>
            )}

            <div
                style={{
                    position: "absolute",
                    left: 96,
                    right: 96,
                    bottom: 62,
                    height: 2,
                    backgroundColor: "rgba(32,43,42,.2)",
                }}
            >
                <div
                    style={{
                        width: `${progress * 100}%`,
                        height: "100%",
                        backgroundColor: chapter.accent,
                    }}
                />
            </div>
        </AbsoluteFill>
    );
};