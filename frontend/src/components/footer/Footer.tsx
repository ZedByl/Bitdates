import { Box, Flex, Text, Link, VStack, HStack } from "@chakra-ui/react";
import {Logo} from "@/components/logo";

export const Footer = () => {
    return (
        <Box as="footer" bg="white.100" py={10} px={6}>
            <Flex
                px={10}
                justify="space-between"
                align="start"
                flexWrap="wrap"
            >
                <VStack align="start" >
                    <Logo/>
                    <Text fontSize="sm" color="gray.500">
                        Powered by Bitsgap
                    </Text>
                    <Text color="gray.700">contact@bitsfactory.io</Text>
                </VStack>

                <HStack align="start" >
                    <VStack align="start">
                        <Text fontWeight="bold">About</Text>
                        <Link href="/faq">FAQ</Link>
                        <Link href="/about">About</Link>
                        <Link href="#">Contacts</Link>
                    </VStack>

                    <VStack align="start">
                        <Text fontWeight="bold">Legal</Text>
                        <Link href="#">Cookies Policy</Link>
                        <Link href="/policy">Privacy Policy</Link>
                        <Link href="/terms">Terms of Use</Link>
                    </VStack>
                </HStack>

                {/* Right side with social icons */}
                <VStack align="start">
                    <Text fontWeight="bold">Follow us</Text>
                    <HStack>
                        {/*<Link href="#">*/}
                        {/*    <Icon  boxSize={5} />*/}
                        {/*</Link>*/}
                        {/*<Link href="#" >*/}
                        {/*    <Icon  boxSize={5} />*/}
                        {/*</Link>*/}
                        {/*<Link href="#" >*/}
                        {/*    <Icon  boxSize={5} />*/}
                        {/*</Link>*/}
                        {/*<Link href="#" >*/}
                        {/*    <Icon  boxSize={5} />*/}
                        {/*</Link>*/}
                        {/*<Link href="#" >*/}
                        {/*    <Icon  boxSize={5} />*/}
                        {/*</Link>*/}
                        {/*<Link href="#" >*/}
                        {/*    <Icon  boxSize={5} />*/}
                        {/*</Link>*/}
                        {/*<Link href="#" >*/}
                        {/*    <Icon  boxSize={5} />*/}
                        {/*</Link>*/}
                    </HStack>
                </VStack>
            </Flex>

            {/* Bottom text */}
            <Box textAlign="center" mt={10}>
                <Text fontSize="sm" color="gray.500">
                    © 2024 Bitsfactory, ltd
                </Text>
            </Box>
        </Box>
    );
};

