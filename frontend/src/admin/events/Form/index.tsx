import {
  AutocompleteInput,
  DateInput,
  ImageField,
  ImageInput,
  required,
  SelectInput,
  SimpleForm,
  TextInput, useRecordContext
} from "react-admin";
import { categories as categoriesMock } from "@/admin/events/Create/mock.tsx";
import { Typography } from "@mui/material";
import { throttle } from "@/utils/throttle";
import { fetchAPI } from "@/service/http.service.ts";
import { CoinApi } from "@/models/coin.ts";
import { APIEndpoints } from "@/api/constants.ts";
import { toaster } from "@/components/ui/toaster.tsx";
import { FC, useCallback, useEffect, useState } from "react";
import { CategorySelectState } from "@/components/categorySelect/typings.ts";
import { EventCreateData } from "@/admin/events/Create/types.ts";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useUserStore } from "@/stores/user/userStore.ts";
import { EventAPI } from "@/models/event.ts";
import { onUpdateEvent } from "@/admin/events/Create/methods.ts";
import { formatDateForApi } from "@/utils/helpers";
import { Box } from "@chakra-ui/react";

type Props = {
    fetchData: (formData: FormData) => Promise<EventAPI>
}

export const Form: FC<Props> = ({ fetchData }) => {
  const { user } = useUserStore();
  const record = useRecordContext<EventAPI>();
  const [coins, setCoins] = useState<CoinApi[]>([]);
  const [currentCoin, setCurrentCoin] = useState<CoinApi>();
  const [category, setCategory] = useState<CategorySelectState>({ id: '', value: null, label: '' });

  const onSubmit = async (values: EventCreateData) => {
    if (!category.value || !user?.id) return;

    if (!category.inputs) {
      categoriesMock.forEach((value) => {
        if (value.inputs) {
          value.inputs.forEach((item) => {
            values[item.name] = JSON.stringify(null);
          });
        }
      });
    }

    await onUpdateEvent({
      ...values,
      user_id: user.id,
      date_event: formatDateForApi(values?.date_event),
      categories: [{
        id: category.value[0],
        name: category.label,
      }],
      coins: currentCoin ? [currentCoin] : [],
    }, fetchData);
  };

  const fetchTokens = throttle(async (input: string) => {
    if (!input) return;
    try {
      const data = await fetchAPI.post<CoinApi[]>(APIEndpoints.COINS, { search: input }) || [];
      setCoins(data);
    } catch (error) {
      console.error("Ошибка загрузки токенов:", error);
      toaster.error({
        title: "Get error coins",
      });
    }

  }, 300);

  const handleFetchTokens = useCallback((_: any, value: string) => {
    if (fetchTokens) fetchTokens(value);
  }, []);

  useEffect(() => {
    if (record) {
      if (record.coins?.length > 0) {
        setCoins(record.coins);
        setCurrentCoin(record.coins[0]);
      }

      if (record.categories?.length > 0) {
        const selectedCategory = categoriesMock.find((item) =>
          item.value?.find((mockId) =>
            record.categories.find(({ id }) => mockId === id))
        );
        if (selectedCategory) {
          setCategory(selectedCategory);
        }
      }
    }
  }, [record]);

  return (
    <SimpleForm onSubmit={onSubmit as SubmitHandler<FieldValues>}>
      <TextInput
        source="title.en"
        label="Title"
        validate={required()}
        fullWidth
      />

      <TextInput
        source="description.en"
        label="Description"
        multiline
        rows={5}
        validate={required()}
        fullWidth
      />

      <DateInput
        source="date_event"
        label="Event Date"
        validate={required()}
        fullWidth
      />

      <TextInput
        source="proof"
        label="Event Link"
        validate={[
          required("A link to the event is required"),
          (value) =>
            /^https?:\/\/[\w.-]+/.test(value || "")
              ? undefined
              : "Enter the correct link",
        ]}
        fullWidth
      />

      {record?.image_url && (
        <Box>
          <Typography variant="subtitle1">Current Image</Typography>
          <img
            src={record.image_url}
            alt="Event Image"
            style={{ maxWidth: "60%", height: "auto", borderRadius: 8 }}
          />
        </Box>
      )}

      <ImageInput
        source="image"
        label="New Image"
        accept={{ "image/*": [".png", ".jpg", ".webp"] }}
      >
        <ImageField source="src" title="title" />
      </ImageInput>

      <AutocompleteInput
        source="coins"
        label="Coin"
        choices={coins.map((coin) => ({ id: String(coin.id), name: coin.fullname }))}
        onInputChange={handleFetchTokens}
        onChange={(key) => {
          const item = coins.find((coin) => coin.id === key);
          setCurrentCoin(item);
        }}
        validate={required()}
        fullWidth
      />

      <SelectInput
        source="categories"
        label="Event Category"
        choices={categoriesMock.map((category) => category.value && ({
          id: String(category.id),
          name: category.label
        }))}
        validate={required()}
        onChange={(event) => {
          const item = categoriesMock.find((category) => category.id === event.target.value);

          if (item) setCategory(item);
        }}
        fullWidth
      />

      {category?.inputs && category?.inputs?.length > 0 && (
        <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
            Advanced Settings
        </Typography>
      )}

      {category?.inputs?.map((field) => (
        <field.component
          key={field.name}
          source={field.name}
          label={field.label}
          fullWidth
        />
      ))}
    </SimpleForm>
  );
};
