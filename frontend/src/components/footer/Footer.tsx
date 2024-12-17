import { Box, Flex, Text, Link, VStack, HStack, Stack } from '@chakra-ui/react';
import {Logo} from "@/components/logo";
import { Tg } from '@/components/footer/icons/Tg.tsx';
import { Yt } from '@/components/footer/icons/Yt.tsx';
import { Fb } from '@/components/footer/icons/Fb.tsx';
import { X } from '@/components/footer/icons/X.tsx';
import { Inst } from '@/components/footer/icons/Inst.tsx';
import { Disc } from '@/components/footer/icons/Disc.tsx';
import { In } from '@/components/footer/icons/In.tsx';

export const Footer = () => {
    return (
        <Box
          as="footer"
          bg="white.100"
          py={{ base: '30px' }}
          px={6}
          backgroundColor='#fff'
        >
            <Box
              mx={'auto'}
              maxW={768}
              md={{ maxW: 1440 }}
            >
                <Flex
                  justify={{ base: "space-between", xl: 'flex-start'}}
                  align="start"
                  flexWrap="wrap"
                >
                    <Stack
                      flexDirection={{ base: 'column', md: 'row', lg: 'row', xl: 'column' }}
                      alignItems={{ md: 'center', lg: 'unset' }}
                      justifyContent={{ md: 'space-between', lg: 'space-between' }}
                      gap='30px'
                      mb='30px'
                      width={{ md: '100%', lg: '100%', xl: '50%' }}
                    >
                        <Box>
                            <Logo/>
                            <Flex alignItems='center' gap='4px' >
                                <Text fontSize={{ base: "sm", md: 'md' }} color="gray.600">Powered by</Text> <Text fontSize={{ base: "sm", md: 'xl' }} fontWeight="bold" color="gray.600">Bitsgap</Text>
                            </Flex>
                        </Box>

                        <Text fontSize={{ base: "lg", md: 'xl' }} fontWeight="bold" color="gray.700">contact@bitsfactory.io</Text>
                    </Stack>

                    <HStack align="start" width={{ base: '100%', md: '60%', lg: '70%', xl: 'unset' }} gap={{ base: '12px', xl: '20px' }} >
                        <VStack align="start" width={{ base: '50%', md: 'auto', lg: '196px' }}>
                            <Text fontWeight="bold">About</Text>
                            <Link href="/faq">FAQ</Link>
                            <Link href="/about">About</Link>
                            <Link href="#">Contacts</Link>
                        </VStack>

                        <VStack align="start" width={{ base: '50%', md: 'auto', lg: '196px' }}>
                            <Text fontWeight="bold">Legal</Text>
                            <Link href="#">Cookies Policy</Link>
                            <Link href="/policy">Privacy Policy</Link>
                            <Link href="/terms">Terms of Use</Link>
                        </VStack>
                    </HStack>

                    {/* Right side with social icons */}
                    <VStack align="start" m={{ base: '40px auto 0', md: 'unset' }} width={{ lg: '196px' }}>
                        <Text fontWeight="bold" m={{ base: '0 auto', md: 'auto' }}>Follow us</Text>
                        <HStack gap={{ base: '10px' }} flexWrap={{ lg: 'wrap' }}>
                            <Link href="#">
                                <Tg />
                            </Link>
                            <Link href="#" >
                                <Yt />
                            </Link>
                            <Link href="#" >
                                <Fb />
                            </Link>
                            <Link href="#" >
                                <X />
                            </Link>
                            <Link href="#" >
                                <Inst />
                            </Link>
                            <Link href="#" >
                                <Disc />
                            </Link>
                            <Link href="#" >
                                <In />
                            </Link>
                        </HStack>
                    </VStack>
                </Flex>

                {/* Bottom text */}
                <Box textAlign="center" mt='80px'>
                    <Text fontSize="sm" color="gray.500">
                        © 2024 Bitsfactory, ltd
                    </Text>
                </Box>
            </Box>
        </Box>
    );
};

