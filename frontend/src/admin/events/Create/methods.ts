import { toaster } from "@/components/ui/toaster.tsx";
import { EventCreateData } from "@/admin/events/Create/types.ts";
import { EventAPI } from "@/models/event.ts";

export const onUpdateEvent = async (values: EventCreateData, fetch: (form: FormData) => Promise<EventAPI | void>) => {
  const formData = new FormData();

  Object.entries(values).forEach(([key, value]) => {
    if (key && value) {
      if (key === 'image') {
        formData.append('image', value.rawFile);
      } else if (key === 'title' || key === 'description' || key === 'categories' || key === 'coins') {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value);
      }
    }
  });

  const promise = fetch(formData);

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
