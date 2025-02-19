import { FC } from "react";
import {
  Create,
} from "react-admin";
import { Toaster } from "@/components/ui/toaster.tsx";
import { Form } from "@/admin/events/Form";
import { fetchAPI } from "@/service/http.service.ts";
import { EventAPI } from "@/models/event.ts";
import { APIEndpoints } from "@/api/constants.ts";

export const EventCreate: FC = () => {
  const handleSubmit = (formData: FormData) => new Promise<EventAPI>((resolve, reject) => {
    try {
      const data = fetchAPI.post(APIEndpoints.EVENTS + '/create', {}, { body: formData });
      return resolve(data);
    } catch (e) {
      return reject(e);
    }
  });

  return (
    <Create component="div">
      <Form fetchData={handleSubmit} />
      <Toaster />
    </Create>
  );
};
