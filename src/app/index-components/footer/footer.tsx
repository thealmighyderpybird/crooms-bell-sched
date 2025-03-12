import footerStyles from "./footer.module.css";
import Link from "next/link";

export default function Footer() {
    return (<>
        <footer className={footerStyles.footer}>
            <div className={footerStyles.iconChain}>
                <div>
                    <span className="icon">info</span>
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
                    <span className="icon">settings</span>
                    <div className={footerStyles.popout} style={{fontSize: "0.75rem"}}>
                        <span style={{background: "transparent"}}>Settings</span>
                    </div>
                </div>
                <div>
                    <span className="icon">public</span>
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