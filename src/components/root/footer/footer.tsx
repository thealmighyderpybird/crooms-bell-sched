import CroomsBellScheduleApplet from "~/components/CroomsBellScheduleApplet";
import FeedAndUpdateRotation from "./FeedAndUpdateRotation";
import getSiteSettings from "~/lib/getSettings";
import footerStyles from "./footer.module.css";
import RandExp from "randexp";
import Link from "next/link";

export default async function Footer() {
    return <footer className={footerStyles.footer}>
        <div className={footerStyles.iconChain}>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className={footerStyles.footerIcon}>
                      <path d="M44 24c0 11.046-8.954 20-20 20S4 35.046 4 24S12.954 4 24 4s20 8.954 20 20m-20-4c-.69 0-1.25.56-1.25 1.25v12.5a1.25 1.25 0 1 0 2.5 0v-12.5c0-.69-.56-1.25-1.25-1.25m0-3a2 2 0 1 0 0-4a2 2 0 0 0 0 4"
                            fill="currentColor"></path>
                </svg>
                <div className={footerStyles.popout}>
                    <h3>Crooms Bell Schedule</h3>
                    <p>Website designed by Andrew Jennings.</p>
                    <p>Backend maintained by Andrew Jennings and Mikhail Tyukin.</p>
                    <h4 style={{ marginBlockStart: "0.75rem" }}>License</h4>
                    <p style={{ marginBlockEnd: "0.75rem" }}>
                        This website and its content is licensed by <Link href="https://creativecommons.org/licenses/by-nc-nd/4.0/">
                        CC BY-NC-ND 4.0</Link>.
                    </p>
                    <div className={ footerStyles.iconMenu }>
                        <Link target="CBSH_GitRepos" href="https://github.com/thealmighyderpybird/crooms-bell-sched/"
                              title="GitHub Repository">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"
                                      fill="currentColor" />
                            </svg>
                        </Link>
                        <Link href="https://buymeacoffee.com/croomssched" target="CBSH_buyUsACoffee"
                              title="Buy Me A Coffee">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <defs>
                                <mask id="lineMdBuyMeACoffeeFilled0">
                                    <path d="M5 6C5 4 7 6 11.5 6C16 6 19 4 19 6L19 7C19 8.5 17 9 12.5 9C8 9 5 9 5 7L5 6Z"
                                          fill="#fff" />
                                </mask>
                                <mask id="lineMdBuyMeACoffeeFilled1">
                                    <path
                                        fill="#fff"
                                        d="M10.125 18.15C10.04 17.29 9.4 11.98 9.4 11.98C9.4 11.98 11.34 12.31 12.5 11.73C13.66 11.16 14.98 11 14.98 11C14.98 11 14.4 17.96 14.35 18.46C14.3 18.96 13.45 19.3 12.95 19.3L11.23 19.3C10.73 19.3 10.21 19 10.125 18.15Z"
                                    ></path>
                                </mask>
                            </defs>
                            <g
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                            >
                                <path
                                    strokeDasharray="32"
                                    strokeDashoffset="32"
                                    d="M7.5 10.5c0 0 0.83 6.93 1 8.5c0.17 1.57 1.5 2 2.5 2l2 0c1.5 0 2.88 -1.14 3 -2c0.13 -0.86 1 -12 1 -12"
                                >
                                    <animate
                                        fill="freeze"
                                        attributeName="stroke-dashoffset"
                                        dur="0.4s"
                                        values="32;0"
                                    ></animate>
                                </path>
                                <path
                                    strokeDasharray="12"
                                    strokeDashoffset="12"
                                    d="M8 4c1.1 -0.57 2 -1 4 -1c2 0 4.5 0.5 4.5 3"
                                >
                                    <animate
                                        fill="freeze"
                                        attributeName="stroke-dashoffset"
                                        begin="0.8s"
                                        dur="0.2s"
                                        values="12;0"
                                    ></animate>
                                </path>
                            </g>
                            <rect
                                width="16"
                                height="5"
                                x="20"
                                y="4"
                                fill="currentColor"
                                mask="url(#lineMdBuyMeACoffeeFilled0)"
                            >
                                <animate
                                    fill="freeze"
                                    attributeName="x"
                                    begin="0.4s"
                                    dur="0.4s"
                                    values="20;4"
                                ></animate>
                            </rect>
                            <rect
                                width="8"
                                height="10"
                                x="8"
                                y="20"
                                fill="currentColor"
                                mask="url(#lineMdBuyMeACoffeeFilled1)"
                            >
                                <animate
                                    fill="freeze"
                                    attributeName="y"
                                    begin="1s"
                                    dur="0.4s"
                                    values="20;10"
                                ></animate>
                            </rect>
                        </svg>
                        </Link>
                        <Link href="https://discord.gg/9xjh5s5Bhb" target="CBSHDiscord" title="Our Discord Server">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                <path d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011a.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0a8 8 0 0 0-.412-.833a.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02a.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595a.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085a8 8 0 0 1-1.249.594a.05.05 0 0 0-.03.03a.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019a13.2 13.2 0 0 0 4.001-2.02a.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613c0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613c0 .888-.631 1.612-1.438 1.612"
                                      fill="currentColor" />
                            </svg>
                        </Link>
                        <Link href="https://instagram.com/croomsbellschedule" target="CBSHInstagram" title="Instagram">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M16 12a4 4 0 1 0-1.172 2.829A3.84 3.84 0 0 0 16 12.06l-.001-.063zm2.16 0a6.135 6.135 0 1 1-1.797-4.359a5.92 5.92 0 0 1 1.798 4.256l-.001.109zm1.687-6.406v.002a1.44 1.44 0 1 1-.422-1.018c.256.251.415.601.415.988v.029v-.001zm-7.84-3.44l-1.195-.008q-1.086-.008-1.649 0t-1.508.047c-.585.02-1.14.078-1.683.17l.073-.01c-.425.07-.802.17-1.163.303l.043-.014a4.12 4.12 0 0 0-2.272 2.254l-.01.027a6 6 0 0 0-.284 1.083l-.005.037a12 12 0 0 0-.159 1.589l-.001.021q-.039.946-.047 1.508t0 1.649t.008 1.195t-.008 1.195t0 1.649t.047 1.508c.02.585.078 1.14.17 1.683l-.01-.073c.07.425.17.802.303 1.163l-.014-.043a4.12 4.12 0 0 0 2.254 2.272l.027.01c.318.119.695.219 1.083.284l.037.005c.469.082 1.024.14 1.588.159l.021.001q.946.039 1.508.047t1.649 0l1.188-.024l1.195.008q1.086.008 1.649 0t1.508-.047c.585-.02 1.14-.078 1.683-.17l-.073.01c.425-.07.802-.17 1.163-.303l-.043.014a4.12 4.12 0 0 0 2.272-2.254l.01-.027c.119-.318.219-.695.284-1.083l.005-.037c.082-.469.14-1.024.159-1.588l.001-.021q.039-.946.047-1.508t0-1.649t-.008-1.195t.008-1.195t0-1.649t-.047-1.508c-.02-.585-.078-1.14-.17-1.683l.01.073a6.3 6.3 0 0 0-.303-1.163l.014.043a4.12 4.12 0 0 0-2.254-2.272l-.027-.01a6 6 0 0 0-1.083-.284l-.037-.005a12 12 0 0 0-1.588-.159l-.021-.001q-.946-.039-1.508-.047t-1.649 0zM24 12q0 3.578-.08 4.953a6.64 6.64 0 0 1-6.985 6.968l.016.001q-1.375.08-4.953.08t-4.953-.08a6.64 6.64 0 0 1-6.968-6.985l-.001.016q-.08-1.375-.08-4.953t.08-4.953A6.64 6.64 0 0 1 7.061.079L7.045.078q1.375-.08 4.953-.08t4.953.08a6.64 6.64 0 0 1 6.968 6.985l.001-.016Q24 8.421 24 12"
                                      fill="currentColor" />
                            </svg>
                        </Link>
                        <Link href="mailto:support@croomssched.tech" target="CBSHEmail" title="Email our Support">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                                <path d="M2.004 9.303A4.5 4.5 0 0 1 6.5 5h19a4.5 4.5 0 0 1 4.496 4.303l-1.476.82L16 16.864L3.48 10.123zM2 11.588V22.5A4.5 4.5 0 0 0 6.5 27h19a4.5 4.5 0 0 0 4.5-4.5V11.588l-.526.293l-13 7a1 1 0 0 1-.948 0L2.514 11.874z"
                                      fill="currentColor" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
            <div>
                <Link href="/settings">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className={footerStyles.footerIcon}>
                        <path d="M19.494 43.468c1.479.353 2.993.531 4.513.531a19.4 19.4 0 0 0 4.503-.534a1.94 1.94 0 0 0 1.474-1.672l.338-3.071a2.32 2.32 0 0 1 2.183-2.075c.367-.016.732.053 1.068.2l2.807 1.231a1.92 1.92 0 0 0 1.554.01c.247-.105.468-.261.65-.458a20.4 20.4 0 0 0 4.51-7.779a1.94 1.94 0 0 0-.7-2.133l-2.494-1.84a2.326 2.326 0 0 1 0-3.764l2.486-1.836a1.94 1.94 0 0 0 .7-2.138a20.3 20.3 0 0 0-4.515-7.777a1.94 1.94 0 0 0-2.192-.45l-2.806 1.236c-.29.131-.606.2-.926.2a2.34 2.34 0 0 1-2.32-2.088l-.34-3.06a1.94 1.94 0 0 0-1.5-1.681a21.7 21.7 0 0 0-4.469-.519a22 22 0 0 0-4.5.52a1.935 1.935 0 0 0-1.5 1.677l-.34 3.062a2.35 2.35 0 0 1-.768 1.488a2.53 2.53 0 0 1-1.569.6a2.3 2.3 0 0 1-.923-.194l-2.8-1.236a1.94 1.94 0 0 0-2.2.452a20.35 20.35 0 0 0-4.51 7.775a1.94 1.94 0 0 0 .7 2.137l2.488 1.836a2.344 2.344 0 0 1 .701 2.938a2.34 2.34 0 0 1-.7.829l-2.49 1.839a1.94 1.94 0 0 0-.7 2.135a20.3 20.3 0 0 0 4.51 7.782a1.93 1.93 0 0 0 2.193.454l2.818-1.237c.291-.128.605-.194.923-.194h.008a2.34 2.34 0 0 1 2.32 2.074l.338 3.057a1.94 1.94 0 0 0 1.477 1.673M24 30.25a6.25 6.25 0 1 1 0-12.5a6.25 6.25 0 0 1 0 12.5"
                              fill="currentColor"></path>
                    </svg>
                </Link>
                <div className={footerStyles.popout} style={{fontSize: "0.75rem"}}>
                    <span style={{background: "transparent"}}>Settings</span>
                </div>
            </div>
        </div>
        <div>
            <span id="feed-and-updates">
                <FeedAndUpdateRotation />
            </span>
            <div className={footerStyles.popout} style={{ maxWidth: "375px", width: "100%", right: 0 }}>
                <CroomsBellScheduleApplet id={new RandExp(/[a-f0-9]\w{10}/).gen()}
                                          settings={await getSiteSettings()} />
            </div>
        </div>
    </footer>;
}
