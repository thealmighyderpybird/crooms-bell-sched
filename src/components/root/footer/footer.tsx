import footerStyles from "./footer.module.css";
import Link from "next/link";

export default function Footer() {
    return (<>
        <footer className={footerStyles.footer}>
            <div className={footerStyles.iconChain}>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className={footerStyles.footerIcon}>
                          <path d="M44 24c0 11.046-8.954 20-20 20S4 35.046 4 24S12.954 4 24 4s20 8.954 20 20m-20-4c-.69 0-1.25.56-1.25 1.25v12.5a1.25 1.25 0 1 0 2.5 0v-12.5c0-.69-.56-1.25-1.25-1.25m0-3a2 2 0 1 0 0-4a2 2 0 0 0 0 4"
                                fill="currentColor"></path>
                    </svg>
                    <div className={footerStyles.popout}>
                        <h3>Crooms Bell Schedule</h3>
                        <p>Designed and maintained by Andrew Jennings.</p>
                        <h4>Join the team!</h4>
                        <p>
                            Join the development team on our <Link target="CBSH_GitRepos"
                                                                   href="https://github.com/thealmightyderpybird/crooms-bell-sched/"
                                                                    >GitHub Repository</Link>.
                        </p>
                        <h4>Support our development.</h4>
                        <p>
                            <Link href="https://buymeacoffee.com/croomssched" target="CBSH_buyUsACoffee">
                                Buy us coffee</Link> to help us keep our domain.
                        </p>
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
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className={footerStyles.footerIcon}>
                        <path d="M30.718 32.5c-.471 2.437-1.135 4.603-1.931 6.395c-.82 1.844-1.732 3.183-2.618 4.026C25.296 43.75 24.567 44 24 44s-1.296-.248-2.169-1.08c-.886-.842-1.798-2.18-2.617-4.025c-.797-1.792-1.46-3.958-1.932-6.395zm2.544 0c-.825 4.547-2.293 8.35-4.149 10.84c5.762-1.519 10.506-5.545 12.996-10.84zm9.822-2.5h-9.443c.234-1.91.359-3.922.359-6c0-1.897-.104-3.74-.3-5.5h9.534A20 20 0 0 1 44 24c0 2.09-.32 4.106-.916 6m-11.963 0H16.879a47 47 0 0 1-.379-6a47 47 0 0 1 .317-5.5h14.366A47 47 0 0 1 31.5 24a47 47 0 0 1-.38 6m-16.76 0a49 49 0 0 1-.36-6c0-1.897.104-3.74.3-5.5H4.767A20 20 0 0 0 4 24c0 2.09.32 4.106.916 6zm-8.47 2.5c2.49 5.295 7.235 9.321 12.997 10.84c-1.856-2.49-3.324-6.293-4.149-10.84zM28.788 9.105c.85 1.914 1.55 4.254 2.025 6.895H17.188c.476-2.64 1.175-4.981 2.026-6.895c.82-1.844 1.731-3.183 2.617-4.026C22.704 4.25 23.433 4 24 4s1.296.248 2.169 1.08c.886.842 1.798 2.18 2.617 4.025M33.349 16h8.987c-2.421-5.541-7.281-9.774-13.223-11.34c1.924 2.58 3.43 6.572 4.236 11.34M5.664 16h8.987c.806-4.768 2.312-8.76 4.236-11.34C12.945 6.226 8.085 10.459 5.664 16"
                              fill="currentColor"></path>
                    </svg>
                    <div className={footerStyles.popout + " submenu"}>
                        <Link href="mailto:support@croomssched.tech" target="CBSHEmail">Email our Support</Link>
                        <Link href="https://discord.gg/9xjh5s5Bhb" target="CBSHDiscord">Join our Discord Server</Link>
                        <Link href="https://instagram.com/croomssched" target="CBSHInstagram">View our Instagram</Link>
                    </div>
                </div>
            </div>
            <div>
                <span id="feed-and-updates">
                    <span id="date-time">Loading time...</span>
                    <span id="current-period" className="active">IT Industry ends in 56:57</span>
                </span>
                <div className="popout">

                </div>
            </div>
        </footer>
    </>)
}