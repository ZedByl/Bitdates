import { createFileRoute } from '@tanstack/react-router';
import { Header } from "@/components/header";
import { Box, Heading, Text } from "@chakra-ui/react";

export const Route = createFileRoute('/faq/')({
  component: FAQ,
});

function FAQ() {
  return (
    <Box>
      <Header/>
      <Box position={'relative'} mx={'auto'} maxW={768} md={{ maxW: 1440 }}>
        <Box mt={20}>
          <Heading mb={5} size={'3xl'}>Frequently Asked Questions (FAQ)</Heading>
          <Heading size={'lg'}> 1.What is the CryptoCalendar?</Heading>
          <Text> CryptoCalendar is a crypto events calendar that helps users stay informed about significant events
              in the cryptocurrency and blockchain industry, such as token listings, protocol updates,
              governance votes, and more.</Text>
          <br/>
          <Heading size={'lg'}> 2. How does CryptoCalendar gather information about crypto events?</Heading>
          <Text>CryptoCalendar sources data from multiple reliable APIs and verified news sources. Users can also
              create and submit events manually, making CryptoCalendar a comprehensive source for tracking crypto
              events (available in next versions).</Text>
          <br/>
          <Heading size={'lg'}>3. What types of events can I find on CryptoCalendar?</Heading>
          <Text>You can find various categories of crypto events on CryptoCalendar, including:
              Token Listings<br/>
              Airdrops<br/>
              Protocol Updates<br/>
              Hard Forks and Soft Forks<br/>
              Governance Voting<br/>
              Testnet and Mainnet Launches<br/>
              Partnerships and Alliances<br/>
              Conferences and Meetups<br/>
              Token Sales (ICO, IEO, IDO)<br/>
              Product and Service Launches<br/>
              Exchange Events<br/>
              Token Burns<br/>
              Educational and Promotional Events</Text>
          <br/>
          <Heading size={'lg'}>4. How often is the CryptoCalendar calendar updated?</Heading>
          <Text>The CryptoCalendar calendar is updated in real-time, with new events added daily. This ensures that
              users
              always have access to the latest and most relevant events in the cryptocurrency space.</Text>
          <br/>
          <Heading size={'lg'}>5. Can I add CryptoCalendar events to my personal calendar?</Heading>
          <Text>Yes, CryptoCalendar allows users to easily add events to their personal calendars (such as Google
              Calendar) with a single click, so you never miss an important event.</Text>
          <br/>
          <Heading size={'lg'}>6. Does CryptoCalendar offer notifications for upcoming crypto events?</Heading>
          <Text>Yes, users can subscribe to email notifications to receive timely updates about upcoming
              events in
              the crypto market, helping them stay informed and prepared.</Text>
          <br/>
          <Heading size={'lg'}>7. Do I need to create an account to use CryptoCalendar?</Heading>
          <Text>While users can browse some events without an account, creating an account unlocks additional
              features, such as event notifications, custom calendar integration, and personalized event
              tracking.</Text>
          <br/>
          <Heading size={'lg'}>8. Is there a fee for using the CryptoCalendar crypto events calendar?</Heading>
          <Text>CryptoCalendar offers a free version with essential features. Advanced features, such as
              personalized
              notifications and access to premium event insights, may be available through a
              subscription.</Text>
          <br/>
          <Heading size={'lg'}>9. Does CryptoCalendar support events from all cryptocurrency projects?</Heading>
          <Text>CryptoCalendar aims to cover events from a wide variety of cryptocurrency projects, from top market
              cap
              assets to emerging tokens, ensuring users have access to comprehensive market data.</Text>
          <br/>
          <Heading size={'lg'}>10. How secure is my data on CryptoCalendar?</Heading>
          <Text>CryptoCalendar follows strict data security protocols, complying with industry standards for data
              protection, and all personal data is securely stored within the European Economic Area
              (EEA).</Text>
        </Box>
      </Box>
    </Box>
  );
}
