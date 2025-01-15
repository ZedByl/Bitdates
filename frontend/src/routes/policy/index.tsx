import { createFileRoute } from '@tanstack/react-router';
import { Header } from "@/components/header";
import { Box, Heading, Text } from "@chakra-ui/react";

export const Route = createFileRoute('/policy/')({
  component: PrivacyPolicy,
});

function PrivacyPolicy() {
  return (
    <Box>
      <Header/>
      <Box position={'relative'} mx={'auto'} maxW={768} md={{ maxW: 1440 }} p={5}>
        <Box mt={20} mb={20}>
          <Heading size={'4xl'} mb={5}>Privacy Policy</Heading>
          <Text>This privacy policy (“Privacy Policy”) describes how Bitdates ©, as the data controller,
                      collects, uses, and discloses personal data provided by you or collected by us through the
                      website https://www.bitdates.io (“Website”) or when you use the services we provide
                      (“Services”). <br/>By using our Website or Services, you agree to the terms outlined in this
                      Privacy Policy. If you do not agree with any part of these terms, please refrain from accessing
                      or using our Services or Website.</Text>
          <Text><b>1.Types of Data We Collect</b></Text>
                  We collect the following types of personal data:<br/>
          <ul style={{ marginLeft: '20px' }}>
            <li><Text><b>Identity Data: </b>First name, last name, date of birth.</Text></li>
            <li><Text><b>Contact Data:</b> Email address, mailing address, phone number.</Text></li>
            <li><Text><b>Financial Data:</b> Bank account details, payment card details, billing
                          address.</Text></li>
            <li><Text><b>Technical Data::</b> IP address, browser type, time zone, device
                          information,
                          operating system.</Text></li>
            <li><Text><b>Usage Data: </b> Information about how you interact with our Website or
                          Services, including page response times, download errors, and other usage
                          metrics.
                          We do not collect any special categories of personal data (such as race,
                          religion,
                          or health data).</Text></li>
          </ul>
          <b>2. Methods of Data Collection</b>
          <Text>We collect your data through the following means:</Text>
          <ul style={{ marginLeft: '20px' }}>
            <li><Text><b>Direct Interactions:</b> Data you provide when registering on the Website,
                          contacting
                          us,
                          or using our Services.</Text></li>
            <li><Text><b>Automated Technologies:</b> We automatically collect data through cookies and
                          server
                          logs
                          as you browse our Website.</Text></li>
            <li><Text><b>Third-Party Sources:</b> We may receive personal data from analytics providers,
                          payment
                          processors, or other service providers.</Text></li>
          </ul>
          <Text><b>3. Purpose of Processing Your Data</b></Text>
                  We use your personal data for the following purposes:<br/>
          <ul style={{ marginLeft: '20px' }}>
            <li>To register you as a client and provide our Services.</li>
            <li>To manage billing, payments, and transactions.</li>
            <li>To enhance and improve our Website and Services by analyzing user behavior.</li>
            <li>To comply with legal obligations, such as fraud prevention and compliance checks.</li>
          </ul>
          <Text><b>4. Cookies and Similar Technologies</b></Text>
          <Text>Our Website uses cookies to improve user experience and provide custom features. You can
                      manage your
                      cookie preferences via your browser settings. Disabling cookies may affect your ability to
                      use
                      certain features of the Website. For more details, please refer to our Cookie Policy.</Text>
          <Text><b>5. Disclosure of Personal Data</b></Text>
                  We may disclose your personal data under the following circumstances:
          <ul style={{ marginLeft: '20px' }}>
            <li><b>Legal Compliance:</b> To comply with legal obligations or respond to lawful requests
                          from
                          government
                          authorities.
            </li>
            <li><b>Fraud Prevention:</b> To protect against fraud, security threats, or unauthorized
                          access.
            </li>
            <li><b>Service Providers:</b> To trusted third-party service providers (e.g., payment
                          processors)
                          for
                          processing transactions or maintaining our Services, under strict confidentiality
                          agreements.
                          We will never sell your personal data to third parties for marketing purposes without
                          your
                          explicit consent.
            </li>
          </ul>
          <Text><b>6. Data Security</b></Text>
          <Text>We implement industry-standard security measures to protect your personal data. Access to
                      your
                      personal data is limited to authorized personnel and is stored securely within the European
                      Economic
                      Area (EEA). We also ensure that any third-party service providers follow adequate security
                      measures.</Text>
          <Text><b>7. Data Retention</b></Text>
          <Text> We retain your personal data only for as long as necessary to fulfill the purposes for
                      which
                      it
                      was
                      collected. This may include retention for legal, tax, or regulatory reasons. Once your data
                      is
                      no
                      longer required, we will securely delete or anonymize it. Specific retention periods may
                      apply
                      depending on the type of data processed.</Text>
          <Text><b>8. Your Rights</b></Text>
                  You have the right to:
          <ul style={{ marginLeft: '20px' }}>
            <li>Access your personal data.</li>
            <li>Request corrections to any inaccurate or incomplete personal data.</li>
            <li> Request deletion of your personal data where applicable (e.g., if it is no longer
                          needed
                          for the
                          purposes for which it was collected).
            </li>
            <li> Object to processing of your data for direct marketing purposes.</li>
            <li> Withdraw consent to data processing at any time.</li>
                      To exercise these rights, please contact us at contact@bitdates.io.
          </ul>
          <Text><b>9. International Transfers</b></Text>
          <Text>
                      If we transfer your personal data outside the EEA, we ensure that the receiving entity
                      complies
                      with
                      appropriate safeguards, such as entering into standard contractual clauses approved by the
                      European
                      Commission.
          </Text>
          <Text><b>10. Contact Us</b></Text>
          <Text> If you have any questions, concerns, or requests regarding this Privacy Policy, please
                      contact
                      us at
                      contact@bitdates.io.</Text>
        </Box>
      </Box>
    </Box>
  );
}
