import {
  IconButton, Text,
  VStack, useBreakpointValue, HStack, ClipboardTrigger, ClipboardIndicator, Icon,
} from "@chakra-ui/react";
import { FiMail, FiShare2 } from "react-icons/fi";
import {
  DrawerBackdrop, DrawerBody, DrawerCloseTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer.tsx";
import { LuCheck } from "react-icons/lu";
import { ClipboardRoot } from "@/components/ui/clipboard.tsx";
import { MdInsertLink } from "react-icons/md";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaTelegram } from "react-icons/fa";

const ShareEvent = () => {
  const isDescktop = useBreakpointValue({ lg: true });

  const shareLinks = {
    telegram: `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(window.location.href)}`,
    email: `mailto:?subject=Check%20this%20event&body=${encodeURIComponent(window.location.href)}`,
  };

  const handleLink = (link: string) => {
    window.open(link, '_blank');
  };

  return (
    <>
      <DrawerRoot placement={isDescktop ? 'end' : 'bottom'}>
        <DrawerBackdrop />
        <DrawerTrigger asChild>
          <IconButton
            colorPalette={"gray"}
            size="lg"
            borderRadius="14px"
            h={{ base: "54px" }}
            w={{ base: "54px" }}
            variant="outline"
            aria-label="Share event"
          >
            <FiShare2 />
          </IconButton>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Share event</DrawerTitle>
          </DrawerHeader>
          <DrawerCloseTrigger />

          <DrawerBody>
            <HStack justify="space-between">
              <VStack>
                <ClipboardRoot value={window.location.href}>
                  <ClipboardTrigger asChild>
                    <IconButton variant="outline" rounded="full" size="lg" >
                      <ClipboardIndicator copied={<LuCheck />}>
                        <MdInsertLink />
                      </ClipboardIndicator>
                    </IconButton>
                  </ClipboardTrigger>
                </ClipboardRoot>
                <Text textStyle="xs" color={'gray.400'}>Copy Link</Text>
              </VStack>

              <VStack>
                <IconButton
                  variant="outline"
                  rounded="full"
                  size="lg"
                  onClick={() => handleLink(shareLinks.email)}
                >
                  <FiMail />
                </IconButton>
                <Text textStyle="xs" color={'gray.400'}>Email</Text>
              </VStack>

              <VStack>
                <Icon onClick={() => handleLink(shareLinks.telegram)} fontSize="50px" color="blue.500" cursor={'pointer'}  _hover={{ color: "blue.400", outline: "none" }}>
                  <FaTelegram />
                </Icon>
                <Text textStyle="xs" color={'gray.400'}>Telegram</Text>
              </VStack>

              <VStack>
                <Icon onClick={() => handleLink(shareLinks.whatsapp)} fontSize="50px" color="green.500" cursor={'pointer'} _hover={{ color: "green.400", outline: "none" }}>
                  <IoLogoWhatsapp />
                </Icon>
                <Text textStyle="xs" color={'gray.400'}>WhatsApp</Text>
              </VStack>
            </HStack>
          </DrawerBody>
        </DrawerContent>
      </DrawerRoot>
    </>
  );
};

export default ShareEvent;
