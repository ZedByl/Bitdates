import {Header} from "@/components/header";
import {Box, Heading} from "@chakra-ui/react";

export const TermsPage = () => {
    return (
        <Box>
            <Header/>
            <Box position={'relative'} mx={'auto'} maxW={768} md={{maxW: 1440}} p={5}>
                <Box mt={20} mb={20} p={4}>
                    <Heading mb={5} size={'4xl'}>Terms and Conditions</Heading>
                    <ol>
                        <li><b>Applicability</b><br/>
                            These Terms and Conditions (hereinafter referred to as the "Agreement") govern the
                            commercial
                            relationship between you and Bitdates © (referred to as "we," "our," or "us"). By using our
                            services ("Services"), accessing our applications ("Applications"), or interacting with data
                            provided through our website ("Data" and "Website"), you acknowledge that you have read,
                            understood, and agree to comply with this Agreement.
                            By checking the acceptance box during registration, you confirm that you agree to be bound
                            by
                            these Terms and Conditions and that you are legally authorized to enter into this Agreement.
                            If
                            you do not agree with all the terms outlined here, you may not use our Services,
                            Applications,
                            or Data.
                        </li>
                        <li><b>Changes to the Agreement</b><br/>
                            We reserve the right to modify, update, or remove portions of this Agreement at our
                            discretion.
                            You will
                            be notified of any changes via email, your account dashboard, or directly through the
                            Website.
                            Your
                            continued use of our Services after changes have been made indicates your acceptance of the
                            revised
                            Agreement.
                        </li>
                        <li><b>Security Policy</b><br/>
                            By using our Website, Applications, or Services, you agree to comply with our Security
                            Policy,
                            which is
                            available on the Website. This policy outlines the security protocols we employ to protect
                            your
                            data,
                            including encryption, access controls, and other technical measures.
                        </li>
                        <li><b>Privacy Policy</b><br/>
                            Our collection, use, and protection of your personal data are governed by our Privacy
                            Policy,
                            which is
                            an integral part of this Agreement. We collect information, such as your first and last
                            name,
                            company
                            details, email address, trading activity, and device information, when you use our Services
                            or
                            Applications.
                            We process this data for the administration of our Services, billing, fraud prevention,
                            compliance with
                            legal obligations, and other purposes outlined in our Privacy Policy. You agree that your
                            personal data
                            may be disclosed when necessary to comply with legal obligations or government requests.
                        </li>
                        <li><b> Cookie Policy</b><br/>
                            Our Website uses cookies and similar technologies to improve your user experience and track
                            user
                            behavior. Cookies help us remember your preferences and enhance website functionality. You
                            may
                            manage
                            cookie preferences through your browser settings, though some features may not work
                            correctly
                            without
                            cookies.
                            For more detailed information, please refer to our Cookie Policy.
                        </li>
                        <li><b>Liability and Indemnity</b><br/>
                            To the maximum extent permitted by law, Bitdates © is not liable for any direct, indirect,
                            incidental,
                            or consequential damages arising out of your use or inability to use our Services,
                            Applications,
                            or
                            Data. This includes, but is not limited to, damages for loss of profits, data, or goodwill.
                            Our total liability to you under this Agreement will not exceed the amount paid by you for
                            the
                            use of
                            our Services during the three months preceding the claim. You agree to indemnify and hold us
                            harmless
                            from any claims, liabilities, or expenses arising from your misuse of our Services or your
                            violation of
                            this Agreement.
                        </li>
                        <li><b>Force Majeure</b><br/>
                            Neither party will be held liable for delays or failures in performance resulting from
                            circumstances
                            beyond their reasonable control, including but not limited to natural disasters, war,
                            strikes,
                            or
                            failures in telecommunications or internet services.
                        </li>
                        <li><b>Termination of the Agreement</b><br/>
                            This Agreement may be terminated by either party at any time with at least 24 hours’ notice.
                            If
                            the
                            Agreement is terminated, you may be eligible for a refund based on our Refund Policy. We
                            reserve
                            the
                            right to suspend or terminate your access to the Services if you violate this Agreement or
                            engage in
                            suspicious activity. Upon termination, you will no longer have access to the Services,
                            Applications, or Data, and any data we
                            hold on your behalf may be deleted, except for data we are legally required to retain.
                        </li>
                        <li><b>Governing Law and Dispute Resolution</b><br/>
                            This Agreement will be governed by and constructed in accordance with the laws of the
                            Republic
                            of
                            Estonia. Any disputes arising from or related to this Agreement shall be resolved in the
                            Harju
                            County
                            Court, Estonia.
                        </li>
                        <li><b>Miscellaneous</b><br/>
                            This Agreement constitutes the entire agreement between you and Bitdates © regarding your
                            use of
                            the
                            Services, Applications, and Data. Any prior agreements or representations, whether oral or
                            written, are
                            hereby superseded.
                            You may not assign or transfer your rights under this Agreement to any third party without
                            our
                            prior
                            written consent. Bitdates © reserves the right to assign its rights and obligations under
                            this
                            Agreement
                            to any affiliate or third party.
                            Should any provision of this Agreement be deemed invalid or unenforceable, the remaining
                            provisions
                            shall continue in full force and effect.
                        </li>
                    </ol>
                </Box>
            </Box>
        </Box>
    );
};

