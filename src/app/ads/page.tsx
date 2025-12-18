export default function Page() {
    return <div>
        <section>
            <h2>Share something incredible.</h2>
            <p>
                We will show your ads to a wide variety of visitors on our website.
                And with a fee of $5 for one school year,
                there's nothing better than students advertising their
                products to students on a platform made by students.
            </p>
        </section>
        <iframe src="https://ad.croomssched.tech" style={{ userSelect: "none", marginBlockEnd: "0.75rem" }} />
        <section>
            <h2>We will work with you.</h2>
            <p>
                Have something you think others would be interested in?
                Contact Andrew <a href="mailto:andrew@croomssched.tech">via email</a> or
                with Discord <span style={{ color: "var(--accent-color)" }}>@andrew.da.computer.guy</span>.
            </p>
        </section>
        <section>
            <h2>Need more proof? Have comments?</h2>
            <p>
                Feel free to <a href="mailto:support@croomssched.tech">email the support account</a> to send
                your ideas or questions.
            </p>
        </section>
    </div>;
}