import {
  Edit, TopToolbar, useRecordContext
} from 'react-admin';
import { Form } from "@/admin/events/Form";
import { EventAPI } from "@/models/event.ts";
import { fetchAPI } from "@/service/http.service.ts";
import { APIEndpoints } from "@/api/constants.ts";
import { Toaster } from "@/components/ui/toaster.tsx";
import { Button } from "@mui/material";
import ImageEye from "@mui/icons-material/RemoveRedEye";

const PostEditActions = () => {
  const record = useRecordContext();

  if (!record?.id) return null;

  return (
    <TopToolbar>
      <Button color="primary" size='small' onClick={() => window.open(`/events/${record?.id}`, "_blank")}>
        <ImageEye />
      </Button>
    </TopToolbar>
  );
};

export const EventDetail = () => {
  const handleSubmit = (formData: FormData) => new Promise<EventAPI>((resolve, reject) => {
    try {
      const id = formData.get('id');
      const data = fetchAPI.patch(APIEndpoints.EVENTS + '/' + id, {}, { body: formData });
      return resolve(data);
    } catch (e) {
      return reject(e);
    }
  });
    
  return (
    <Edit actions={<PostEditActions />} resource="events">
      <Form fetchData={handleSubmit} />
      <Toaster />
    </Edit>
  );
};
