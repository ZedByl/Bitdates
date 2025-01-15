import { useEffect } from "react";
import { Box, Heading } from "@chakra-ui/react";
import { useNavigate } from "@tanstack/react-router";

const getRandom = () => {
  return Math.floor(Math.random() * 1000);
};

const chakraColors = [
  "rgba(246, 37, 132, 0.35)",
  "rgba(75, 200, 239, 0.60)",
  "rgba(3, 163, 245, 0.60)",
  "rgba(245, 71, 33, 0.85)",
  "rgba(246, 37, 132, 0.90)",
  "rgba(255, 33, 251, 0.35)",
  "rgba(255, 237, 54, 0.75)",
  "rgba(157, 237, 26, 0.65)",
];

const getRandomChakraColor = () => {
  return chakraColors[Math.floor(Math.random() * chakraColors.length)];
};

const Confetti = () => {
  const confettiShapes = [
    { size: { width: "16px", height: "16px" }, color: getRandomChakraColor(), transform: `rotate(${getRandom()}deg)` },
    { size: { width: "36px", height: "36px" }, color: getRandomChakraColor(), transform: `rotate(${getRandom()}deg)` },
    { size: { width: "24px", height: "24px" }, color: getRandomChakraColor(), transform: `rotate(${getRandom()}deg)` },
    { size: { width: "36px", height: "36px" }, color: getRandomChakraColor(), transform: `rotate(${getRandom()}deg)` },
    { size: { width: "120px", height: "20px" }, color: getRandomChakraColor(), transform: `rotate(${getRandom()}deg)` },
    { size: { width: "140px", height: "25px" }, color: getRandomChakraColor(), transform: `rotate(${getRandom()}deg)` },
    { size: { width: "60px", height: "20px" }, color: getRandomChakraColor(), transform: `rotate(${getRandom()}deg)` },
    { size: { width: "90px", height: "15px" }, color: getRandomChakraColor(), transform: `rotate(${getRandom()}deg)` },
    { size: { width: "8px", height: "8px" }, color: getRandomChakraColor(), transform: `rotate(${getRandom()}deg)` },
    { size: { width: "8px", height: "8px" }, color: getRandomChakraColor(), borderRadius: "full" },
    { size: { width: "12px", height: "12px" }, color: getRandomChakraColor(), borderRadius: "full" },
    { size: { width: "30px", height: "30px" }, color: getRandomChakraColor(), borderRadius: "full" },
    { size: { width: "14px", height: "14px" }, color: getRandomChakraColor(), borderRadius: "full" },
    { size: { width: "8px", height: "8px" }, color: getRandomChakraColor(), transform: `rotate(${getRandom()}deg)` },
    { id: 'circle', size: { width: "36px", height: "36px" }, transform: `rotate(${getRandom()}deg)` },
    { id: 'circle', size: { width: "16px", height: "16px" }, transform: `rotate(${getRandom()}deg)` },
    { id: 'circle', size: { width: "8px", height: "8px" }, transform: `rotate(${getRandom()}deg)` },
    { id: 'hexagon', size: { width: "16px", height: "16px" }, transform: `rotate(${getRandom()}deg)` },
    { id: 'hexagon', size: { width: "24px", height: "24px" }, transform: `rotate(${getRandom()}deg)` },
    { id: 'hexagon', size: { width: "8px", height: "8px" }, transform: `rotate(${getRandom()}deg)` },
    { id: 'star', size: { width: "8px", height: "8px" }, transform: `rotate(${getRandom()}deg)` },
    { id: 'star', size: { width: "18px", height: "18px" }, transform: `rotate(${getRandom()}deg)` },
    { id: 'star', size: { width: "28px", height: "28px" }, transform: `rotate(${getRandom()}deg)` },
  ];

  const randomPosition = () => {
    return {
      top: `${10 + Math.random() * 80}%`, // Значение от 40% до 60%
      left: `${10 + Math.random() * 80}%`, // Значение от 40% до 60%
    };
  };

  return confettiShapes.map((shape, index) => {
    const clipPath = shape?.id === "hexagon"
      ? "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"
      : shape?.id === "star"
        ? "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)"
        : "none";

    return (
      <Box
        key={index}
        position="absolute"
        width={shape.size.width}
        height={shape.size.height}
        bg={getRandomChakraColor()}
        style={randomPosition()}
        clipPath={clipPath}
        borderRadius={shape.borderRadius}
      />
    );
  });
};

export const UploadEvent = () => {
  const navigation = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigation({ to: '/' });
    }, 2500);
  }, [navigation]);

  return (
    <>
      <Box
        position={'absolute'}
        top={'50%'}
        left={'50%'}
        transform={'translate(-50%, -50%)'}
        zIndex={'10'}
      >
        <Heading
          fontSize="5xl"
          lineHeight={"50px"}
        >
                    Event was <br/> uploaded!
        </Heading>
      </Box>


      <Confetti />
    </>
  );
};
