import layoutStyles from "./layout.module.css";
import getSession from "~/lib/session.server";
import UserTags from "~/prowler/UserTags";
import styles from "./page.module.css";
import Link from "next/link";

export default async function Page() {
    const { sid, uid } = await getSession();

    return <div>
        <p>Everyone should be able to feel welcome on our platforms.
            That is why we've created our Diversity, Equity, and Inclusion page to inform you on
            all the ways we try to help you build your corner of the Crooms Bell Schedule.
        </p>
        <section className={ layoutStyles.green }>
            <h2 className={ styles.dynamicText }>Diversity</h2>
            <p>We welcome everyone to the Crooms Bell Schedule,
                regardless of background, race, ethnicity, gender, sexual orientation,
                or anything else that makes you who you are.
            </p>
            <h3 className={ styles.dynamicText }>Account Badges</h3>
            <div className={ styles.badgeContainer }>
                <UserTags userTagList={[ "pride", "gay", "lesbian", "trans", "bi", "pan", "aroace", "arab", "african",
                    "hispanic" ]} />
            </div>
            <p>Account Badges are a feature for Crooms Bell Schedule accounts to allow you to express yourself
                through icons, flags, and more. We allow up to 5 badges per account.
                If there's a badge that's missing and you want to see it added, please <Link
                    href="mailto:support@croomssched.tech" className={ styles.dynamicText }
                    style={{ textDecorationColor: "#46a127" }}>contact us over email</Link>.
            </p>
            { (uid && sid) && <p style={{ textAlign: "center" }}>
                <Link href="https://account.croomssched.tech/account-center/account-badges"
                      className={ styles.dynamicText } style={{ margin: "auto", textDecorationColor: "#46a127" }}>
                Try them out in Account Center</Link>
            </p> }
        </section>
        <section className={ layoutStyles.red }>
            <h2 className={ styles.dynamicText }>Equity</h2>
            <p>Everyone should feel safe on our platforms,
                and everyone should be treated fairly by the same guidelines.</p>
            <p>Our <Link href="/terms" target="CBSH_Terms" className={ styles.dynamicText }
                         style={{ textDecorationColor: "#ef0402" }}>Terms of Service</Link> and <Link
                href="https://community.croomssched.tech/standards" target="CBSH_CS" className={ styles.dynamicText }
                style={{ textDecorationColor: "#ef0402" }}>Community Standards</Link> are designed to protect all our
                users and encourage them to treat everyone with the same respect.
            </p>
            <h3 className={ styles.dynamicText }>Reports</h3>
            <p>If you see something that violates our standards and makes you feel comfortable, report it.
                Our moderation team will review the content and take appropriate action per our Terms of Service.
                If you have any questions about our moderation team, you can reach out to them via our official Discord
                server.</p>
        </section>
        <section className={ layoutStyles.blue }>
            <h2 className={ styles.dynamicText }>Inclusion</h2>
            <p>Everyone is welcome to post and participate on the Crooms Bell Schedule platforms.
                This includes expressing their identities in the ways they want to.
                We also encourage people to include others in conversation on our platforms.
            </p>
            <h3 className={ styles.dynamicText }>Pronouns & Bios</h3>
            <p>Each Crooms Bell Schedule account comes with a place to put your pronouns and talk about yourself.
                Check your Prowler profile page to customize the information.</p>
            <h3 className={ styles.dynamicText }>Safe Direct Messaging</h3>
            <p>The Crooms Bell Schedule is working on creating safe connections between people through our new Messenger
                platform. Once completed and released, our users will have a quick and safe way to connect with others.
            </p>
        </section>
    </div>;
}