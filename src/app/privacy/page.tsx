import Card from "~/components/index/Card";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Privacy Policy",
};

export default function TermsOfService() {
    return <Card>
        <p style={{ marginBlockEnd: "0" }}><strong>Crooms Bell Schedule Privacy Policy</strong></p>
        <p>Effective Date: Wednesday, August 27th, 2025</p>
        <h3>1. Introduction</h3>
        <p>
            At the Crooms Bell Schedule (“we,” “our,” or “us”), we are committed to protecting your privacy and
            safeguarding your personal information. By using the Crooms Bell Schedule website or mobile application
            (collectively, the “Services”), you agree to the terms of this Privacy Policy.
        </p>
        <h3>2. Information Collected</h3>
        <p>When you access our Services, the following information may be automatically recorded in server logs:</p>
        <ul>
            <li>Internet Protocol (IP) Address</li>
            <li>User-Agent HTTP Header</li>
        </ul>
        <p>When you create an account, we collect and store the following information that you provide:</p>
        <ul>
            <li>Username</li>
            <li>Password (stored in a hashed format using the SHA512 algorithm)</li>
            <li>Profile Picture</li>
            <li>Content you post or submit through the Services</li>
        </ul>
        <h3>3. Use of Information</h3>
        <p>
            The information collected is used solely for the purpose of providing, maintaining, and improving the
            Services. We do not sell, rent, or otherwise disclose your personal information to third parties except
            as required by law.
        </p>
        <h3>4. Data Retention and Deletion</h3>
        <p>
            You may permanently delete your account, along with all associated personal information and content,
            by using the following link: <Link href="https://account.croomssched.tech/account-center/account-deletion"
            target="_blank">https://account.croomssched.tech/account-center/account-deletion</Link>.
            Once deleted, this information cannot be recovered.
        </p>
        <h3>5. Applicability</h3>
        <p>
            This Privacy Policy applies to both the Crooms Bell Schedule website and the Crooms Bell Schedule App.
        </p>
        <h3>6. Changes to This Policy</h3>
        <p>
            We reserve the right to update or modify this Privacy Policy at any time. Any changes will be effective
            immediately upon posting to our Services. Continued use of the Services after such changes constitutes
            acceptance of the revised policy.
        </p>
        <h3>7. Contact Information</h3>
        <p>
            For questions or concerns about this Privacy Policy,
            please contact us through the support section of our Services.
        </p>
        <p style={{ marginBlockEnd: "0" }}>
            <strong>By using the Crooms Bell Schedule Services, you acknowledge that you have read, understood, and
                agree to be bound to this Policy.</strong>
        </p>
    </Card>;
};