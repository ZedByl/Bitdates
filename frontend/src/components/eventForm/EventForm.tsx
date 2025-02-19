import { useState } from "react";
import { useForm } from "react-hook-form";
import { Box, Flex, VStack } from "@chakra-ui/react";
import { FirstStep } from "@/components/eventForm/components/FirstStep";
import { SecondStep } from "@/components/eventForm/components/SecondStep";
import { UploadEvent } from "@/components/eventForm/components/UploadEvent";
import { CategorySelectState } from "@/components/categorySelect/typings.ts";
import { Toaster, toaster } from "@/components/ui/toaster";
import axios from "axios";
import { CoinApi } from "@/models/coin.ts";
import { useUserStore } from "@/stores/user/userStore.ts";
import { formatDateForApi } from "@/utils/helpers";
import { fetchAPI } from "@/service/http.service.ts";

export const EventForm = () => {
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState<CategorySelectState>();
  const [image, setImage] = useState<File>();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedCoin, setSelectedCoin] = useState<CoinApi | null>();
  const { user } = useUserStore();

  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
    setValue,
  } = useForm({
    defaultValues: {
      title: "",
      text: "",
      eventLink: "",
    },
  });

  const handleNext = () => {
    if (step === 1) {
      handleSubmit(() => setStep(2))();
    } else if (step === 2) {
      handleSubmit((items) => onCreateEvent(items))();
    }
  };

  const handlePrev = () => {
    if (step !== 1) {
      setStep(1);
    }
  };

  const onChangeCategory = (e: CategorySelectState) => {
    setCategory(e);
  };

  const onSelectDate = (value: Date | null) => {
    if (!value) return;
    setSelectedDate(value);
  };

  const onSelectToken = (item: CoinApi | null) => {
    if (item) {
      setSelectedCoin(item);
    }
  };

  const fetchUserOptions = async (input: string): Promise<CoinApi[]> => {
    if (!input) return [];

    try {
      return await fetchAPI.post<CoinApi[]>('/api/coins', { search: input });
    } catch (e) {
      console.error(e);
    }

    return [];
  };

  const onCreateEvent = (event: {title: string, text: string, eventLink: string}) => {
    const formData = new FormData();
    const { title, text, eventLink } = event;

    if (title) {
      formData.append("title", JSON.stringify({ en: title }));
    }
    if (text) {
      formData.append("description", JSON.stringify({ en: text }));
    }
    if (eventLink) {
      formData.append("proof", eventLink);
    }
    if (selectedDate) {
      formData.append("date_event", formatDateForApi(selectedDate));
    }
    if (user?.id) {
      formData.append("user_id", user?.id);
    }
    if (category && category?.value) {
      formData.append("categories", JSON.stringify([{
        id: category.value[0],
        name: category.label,
      }]));
    }
    if (selectedCoin) {
      formData.append("coins", JSON.stringify([selectedCoin]));
    }
    if (image) {
      formData.append("image", image);
    }

    const promise = new Promise((resolve, reject) => {
      axios.post('/api/events/create', formData)
        .then(({ data }) => {
          resolve({ response: data, error: null });
          setStep(3);
        })
        .catch((error) => {
          reject({ response: null, error: error });
        });
    });

    toaster.promise(promise, {
      success: {
        title: "Successfully uploaded!",
        description: "Looks great",
      },
      error: {
        title: "Upload failed",
        description: "Something wrong with the upload",
      },
      loading: { title: "Uploading...", description: "Please wait" },
    });
  };

  return (
    <Flex display="flex" justifyContent="center" w="100%" pt={{ base: "80px" }}>
      <Box w="100%" maxW="710px">
        <VStack align="stretch" gap="16px" px={{ base: "20px", md: 0 }}>
          {step === 1 && (
            <FirstStep
              selectedDate={selectedDate}
              register={register}
              onChangeCategory={onChangeCategory}
              onSelectDate={onSelectDate}
              onSelectToken={onSelectToken}
              errors={errors}
              handleNext={handleNext}
              setValue={setValue}
              getValues={getValues}
              fetchCoins={fetchUserOptions}
            />
          )}

          {step === 2 && (
            <SecondStep
              register={register}
              errors={errors}
              onCreateEvent={handleNext}
              setValue={setValue}
              getValues={getValues}
              setImage={setImage}
              handlePrev={handlePrev}
            />
          )}

          {step === 3 && <UploadEvent />}
        </VStack>
      </Box>

      <Toaster />
    </Flex>
  );
};
